import { Page } from 'playwright';

export class ClientPage {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
        console.log(this.page);
    }
}
