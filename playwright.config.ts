import { defineConfig } from '@playwright/test';
import { devices } from 'playwright';

export default defineConfig({
    projects: [
        {
            name: 'API Tests',
            testDir: './api-tests/tests',
            use: {
                baseURL: 'https://restful-booker.herokuapp.com',
            },
        },
        {
            name: 'UI Tests',
            testDir: './ui-tests/tests',
            use: {
                ...devices['Desktop Chrome'],
                headless: true,
            },
        },
    ],
    workers: 2
});
