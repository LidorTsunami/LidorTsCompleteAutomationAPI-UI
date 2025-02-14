import { BrowserContext, chromium, Page, test as base, Browser, TestType } from '@playwright/test';
import { LoginPage } from "../pages/loginPage";
import { HomePage } from "../pages/homePage";
import { NewClientPage } from "../pages/newClientPage";


export const test: TestType<{
    newPage: Page;
    loginPage: LoginPage;
    homePage: HomePage;
    newClientPage: NewClientPage;
}, {}> = base.extend<{
    newPage: Page;
    loginPage: LoginPage;
    homePage: HomePage;
    newClientPage: NewClientPage;
}>({
    newPage: async ({}: any, use:(r:Page) => Promise<void>) => {
        const browser: Browser = await chromium.launch();
        const context: BrowserContext = await browser.newContext();
        const page: Page = await context.newPage();
        await use(page);
        const homePageObject: HomePage = new HomePage(page);
        await homePageObject.deleteClient("Lidor Sabag")
        await page.waitForTimeout(2000)
        await page.close();
        await context.close();
        await browser.close();
    },

    loginPage: async ({ newPage }: any, use:(r:LoginPage)=> Promise<void>) => {
        await newPage.goto("https://advisor-test.pontera.com/business/auth/signin");
        const loginPage: LoginPage = new LoginPage(newPage);
        await use(loginPage);
    },

    homePage: async ({ loginPage }: any, use:(r:HomePage) => Promise<void>) => {
        const homePage: HomePage = await loginPage.login('Maayan+Tester1@feex.com', 'Advisor0103Buckley');
        await use(homePage);
    },

    newClientPage: async ({ homePage }: any, use:(r:NewClientPage)=>Promise<void>) => {
        const newClientPage: NewClientPage = await homePage.goToNewClientPage();
        await use(newClientPage);
    }
});
