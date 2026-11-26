package com.kp.moneyManager.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class DatabaseStartupLogger implements CommandLineRunner {

    @Override
    public void run(String... args) {
        log.info("==========================================================================");
        log.info("🚀 Money Manager Spring JPA Initialized Successfully!");
        log.info("📁 Database & Tables Auto-Managed via Java Hibernate Entities:");
        log.info("   - tbl_profiles    (User profiles & credentials)");
        log.info("   - tbl_categories  (Income & Expense categories)");
        log.info("   - tbl_incomes     (Income transaction records)");
        log.info("   - tbl_expenses    (Expense transaction records)");
        log.info("✨ No manual SQL or database creation required — handled purely via Java!");
        log.info("==========================================================================");
    }
}
