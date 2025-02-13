import { test } from '../fixtures/fixtures';
import {HomePage} from "../pages/homePage";
import {NewClientPageFixture} from "../interfaces/fixtures.interface";

test('should add a new client successfully', async ({ newClientPage }: NewClientPageFixture) => {
    const homePage: HomePage = await newClientPage.addNewClient();
    await homePage.assertClientExists("Lidor Sabag")
});