import { expect } from "@playwright/test";
import { test } from '../fixtures/fixture';
import { Booking } from "../interfaces/booking.interface";
import {BookingApiHelperFixture} from '../interfaces/fixture.interface'
import { defaultBookingData, updatedBookingData, partialUpdateData } from '../test-data/testData';

test('Health check', async ({ bookingApiHelper }: BookingApiHelperFixture) => {
    const isPingSuccessful: boolean = await bookingApiHelper.ping();
    expect(isPingSuccessful).toBe(true);
});

test('Should fetch all bookings', async ({ bookingApiHelper }: BookingApiHelperFixture) => {
    const bookings: Booking[] | null = await bookingApiHelper.getAllBookingsIds();
    expect(bookings).not.toBeNull();
    expect(Array.isArray(bookings)).toBe(true);
});

test('Should create a new booking', async ({ bookingApiHelper }: BookingApiHelperFixture) => {
    const { fetchedBooking } = await bookingApiHelper.createAndFetchBooking(bookingApiHelper, defaultBookingData);
    expect(fetchedBooking.firstname).toBe(defaultBookingData.firstname);
    expect(fetchedBooking.lastname).toBe(defaultBookingData.lastname);
});

test('Should update an existing booking', async ({ bookingApiHelper }: BookingApiHelperFixture) => {
    const { createdBooking } = await bookingApiHelper.createAndFetchBooking(bookingApiHelper, defaultBookingData);
    const { fetchedBooking: updatedFetchedBooking } = await bookingApiHelper.updateAndFetchBooking(bookingApiHelper, createdBooking.bookingid, updatedBookingData);
    expect(updatedFetchedBooking.firstname).toBe(updatedBookingData.firstname);
    expect(updatedFetchedBooking.lastname).toBe(updatedBookingData.lastname);
});

test('Should partially update an existing booking', async ({ bookingApiHelper }: BookingApiHelperFixture) => {
    const { createdBooking } = await bookingApiHelper.createAndFetchBooking(bookingApiHelper, defaultBookingData);
    const updatedBooking: Booking | null = await bookingApiHelper.partialUpdate(createdBooking.bookingid, partialUpdateData);
    expect(updatedBooking).not.toBeNull();
    expect(updatedBooking!.additionalneeds).toBe(partialUpdateData.additionalneeds);
    const fetchedBookingAfterPartialUpdate: Booking | null = await bookingApiHelper.getBookingById(createdBooking.bookingid);
    expect(fetchedBookingAfterPartialUpdate).not.toBeNull();
    expect(fetchedBookingAfterPartialUpdate!.additionalneeds).toBe(partialUpdateData.additionalneeds);
});


test('Should delete a booking', async ({ bookingApiHelper }: BookingApiHelperFixture) => {
    const { createdBooking } = await bookingApiHelper.createAndFetchBooking(bookingApiHelper, defaultBookingData);
    const deletionResult: boolean = await bookingApiHelper.deleteBooking(createdBooking.bookingid);
    expect(deletionResult).toBe(true);
    const fetchedBooking: Booking | null = await bookingApiHelper.getBookingById(createdBooking.bookingid);
    expect(fetchedBooking).toBeNull();
});


test('Should handle booking not found on fetch by ID', async ({ bookingApiHelper }: BookingApiHelperFixture) => {
    const nonExistentBookingId = 9999;
    const fetchedBooking: Booking | null = await bookingApiHelper.getBookingById(nonExistentBookingId);
    expect(fetchedBooking).toBeNull();
});
