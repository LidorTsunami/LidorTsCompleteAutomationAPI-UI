import { test as base, TestType } from '@playwright/test';
import { BookingApiHelper } from '../helpers/apiHelper';

export const test: TestType<{ bookingApiHelper: BookingApiHelper }, {}> = base.extend<{
    bookingApiHelper: BookingApiHelper;
}>({
    bookingApiHelper: async ({ request }: any, use:(r:BookingApiHelper) => Promise<void>) => {
        const helper = new BookingApiHelper(request);
        await use(helper);
    }
});
