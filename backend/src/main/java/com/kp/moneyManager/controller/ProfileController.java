package com.kp.moneyManager.controller;

import com.kp.moneyManager.dto.AuthDTO;
import com.kp.moneyManager.dto.ProfileDTO;
import com.kp.moneyManager.entity.ProfileEntity;
import com.kp.moneyManager.repository.ProfileRepository;
import com.kp.moneyManager.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;
    private final ProfileRepository profileRepository;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<ProfileDTO> registerProfile(@RequestBody ProfileDTO profileDTO) {
        ProfileDTO registeredProfile = profileService.registerProfile(profileDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(registeredProfile);
    }

    @GetMapping("/activate")
    public ResponseEntity<String> activateProfile(@RequestParam String token) {
        Optional<ProfileEntity> profileOpt = profileRepository.findByActivationToken(token);

        if (profileOpt.isPresent()) {
            ProfileEntity profile = profileOpt.get();

            if (profile.getIsActive()) {
                return ResponseEntity.ok("Your Profile is Already Activated, Please Log in");
            }

            boolean isActivated = profileService.activateProfile(token);
            if (isActivated) {
                return ResponseEntity.status(200).body("Your Profile is Activated");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Activation Token is Not Found or Already Used");
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Invalid Activation Token");
        }
    }

    // login
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody AuthDTO authDTO) {
        try {
            String email = authDTO.getEmail() != null ? authDTO.getEmail().trim() : "";
            authDTO.setEmail(email);

            // First check if user exists
            Optional<ProfileEntity> profileOpt = profileRepository.findByEmail(email);
            if (profileOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("Message", "User not found with email: " + email + ". Please register first."));
            }

            ProfileEntity profile = profileOpt.get();

            // Auto-activate profile if not yet active
            if (profile.getIsActive() == null || !profile.getIsActive()) {
                profile.setIsActive(true);
                profileRepository.save(profile);
            }

            // If stored password in DB is plain text (not BCrypt), upgrade to BCrypt
            if (profile.getPassword() != null && !profile.getPassword().startsWith("$2")) {
                if (profile.getPassword().equals(authDTO.getPassword())) {
                    profile.setPassword(passwordEncoder.encode(authDTO.getPassword()));
                    profileRepository.save(profile);
                }
            }

            // Then attempt authentication
            Map<String, Object> response = profileService.authenticateAndGenerateToken(authDTO);
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("Message", "Invalid email or password"));
        }
    }

    // Direct password reset endpoint
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String newPassword = body.get("newPassword");

        if (email == null || newPassword == null || newPassword.trim().length() < 6) {
            return ResponseEntity.badRequest()
                    .body(Map.of("Message", "Valid email and new password (min 6 chars) are required."));
        }

        Optional<ProfileEntity> profileOpt = profileRepository.findByEmail(email.trim());
        if (profileOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("Message", "No account found with email: " + email));
        }

        ProfileEntity profile = profileOpt.get();
        profile.setPassword(passwordEncoder.encode(newPassword.trim()));
        profile.setIsActive(true);
        profileRepository.save(profile);

        return ResponseEntity.ok(Map.of("Message", "Password updated successfully! You can now log in."));
    }

    @GetMapping("/test")
    public String test() {
        return "Running Sucessfully";
    }
}
