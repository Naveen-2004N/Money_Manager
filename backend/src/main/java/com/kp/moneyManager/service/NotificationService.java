package com.kp.moneyManager.service;

import com.kp.moneyManager.dto.ExpenseDTO;
import com.kp.moneyManager.entity.ProfileEntity;
import com.kp.moneyManager.repository.ProfileRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationService {

    private final ProfileRepository profileRepository;
    private final ExpenseService expenseService;

    @Scheduled(cron = "0 0 22 * * *", zone = "IST") // 10pm
    public void senDailyIncomeExpensesReminder() {
        log.info("Job started: senDailyIncomeExpensesReminder()");
        List<ProfileEntity> profiles = profileRepository.findAll();
        log.info("Daily income/expenses reminder logged for {} registered users", profiles.size());
    }

    @Scheduled(cron = "0 0 23 * * *", zone = "IST") // 11pm
    public void sendDailyExpenseSummary() {
        log.info("Send daily expense summary job started");
        List<ProfileEntity> profiles = profileRepository.findAll();

        for (ProfileEntity profile : profiles) {
            List<ExpenseDTO> todaysExpenses = expenseService.getExpensesForProfileIdOnDate(profile.getId(), LocalDate.now());
            if (!todaysExpenses.isEmpty()) {
                log.info("Daily summary for {}: {} expenses recorded today.", profile.getEmail(), todaysExpenses.size());
            }
        }
        log.info("Send daily expense summary job ended");
    }
}
