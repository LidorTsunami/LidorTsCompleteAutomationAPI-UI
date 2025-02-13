import {Locator, Page} from 'playwright';
import { NewClientPage } from './newClientPage';

export class HomePage {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goToNewClientPage(): Promise<NewClientPage> {
        await this.page.getByRole('button', { name: '+ Add new client' }).click();
        return new NewClientPage(this.page);
    }

    async deleteClient(clientName: string): Promise<void> {
        await this.page.locator('#main-header-container').getByText('Clients').click();
        await this.page.locator('a').filter({ hasText: clientName }).first().click();
        await this.page.locator('#delete-client-id').click();
        await this.page.getByRole('radio', { name: 'Advisor does not see the' }).check();
        await this.page.getByRole('button', { name: 'Submit' }).click();
    }

    async assertClientExists(clientName: string): Promise<HomePage> {
        await this.page.locator('#main-header-container').getByText('Clients').click();
        const clientLocator: Locator = this.page.locator('a').filter({ hasText: clientName });
        await this.page.waitForTimeout(2000)
        const isClientVisible: boolean = await clientLocator.isVisible();
        if (!isClientVisible) {
            throw new Error(`Client with name "${clientName}" was not found on the page.`);
        }
        console.log(`Client with name "${clientName}" found.`);
        return new HomePage(this.page);
    }
}
