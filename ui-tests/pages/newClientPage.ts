import {Page} from 'playwright';
import {HomePage} from "./homePage";
import {defaultClientData} from "../test-data/testData";

export class NewClientPage {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async fillClientForm(): Promise<void> {
        await this.page.getByRole('textbox', { name: 'First name' }).fill(defaultClientData.firstname);
        await this.page.getByRole('textbox', { name: 'Last name' }).fill(defaultClientData.lastname);
        await this.page.getByRole('textbox', { name: 'SSN / ITIN' }).fill(defaultClientData.ssnOrItin);
        await this.page.getByRole('textbox', { name: 'Email' }).fill(defaultClientData.email);
        await this.page.getByRole('textbox', { name: 'Mobile phone' }).fill(defaultClientData.mobilePhone);
        await this.page.getByRole('textbox', { name: 'Street number' }).fill(defaultClientData.address.streetNumber);
        await this.page.getByRole('textbox', { name: 'Street name' }).fill(defaultClientData.address.streetName);
        await this.page.getByRole('textbox', { name: 'City' }).fill(defaultClientData.city);
        await this.page.locator('button').filter({ hasText: 'Select state' }).click();
        await this.page.locator('#bs-select-1-11').click();
        await this.page.getByRole('textbox', { name: 'Zip' }).fill(defaultClientData.zip);
        await this.page.locator('button').filter({ hasText: 'Select advisor' }).click();
        await this.page.locator('#bs-select-2-2').click();
    }

    async submitForm(): Promise<void> {
        await this.page.getByRole('button', { name: 'Add client' }).click();
    }

    async addNewClient(): Promise<HomePage> {
        await this.fillClientForm();
        await this.submitForm();
        return new HomePage(this.page);
    }

}
