import { Page } from 'playwright';
import { HomePage } from './homePage';

export class LoginPage {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async login(email: string, password: string): Promise<HomePage> {
        await this.page.getByRole('textbox', { name: 'Email' }).fill(email);
        await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
        await this.page.getByRole('button', { name: 'Log in' }).click();
        await this.page.getByLabel('Firm').selectOption('qaa');
        await this.page.getByRole('button', { name: 'Log in' }).click();
        return new HomePage(this.page);
    }
}
