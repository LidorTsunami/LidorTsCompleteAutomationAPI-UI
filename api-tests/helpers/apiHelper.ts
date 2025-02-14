import { APIRequestContext, APIResponse } from 'playwright';
import { Booking, BookingResponse } from "../interfaces/booking.interface";

export class BookingApiHelper {
    token: string | null = null;

    constructor(private request: APIRequestContext) {}

    private async ensureToken(): Promise<string | null> {
        if (this.token) {
            return this.token;
        }
        const url: string = '/auth';
        const response: APIResponse = await this.request.post(url, {
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                username: 'admin',
                password: 'password123',
            }
        });
        if (response.status() === 200) {
            const responseBody: { token: string } = await response.json();
            this.token = responseBody.token;
            return this.token;
        } else {
            return null;
        }
    }

    public resetToken(): void {
        this.token = null;
    }

    public async ping(): Promise<boolean> {
        const url: string = '/ping';
        const response: APIResponse = await this.request.get(url);
        return response.status() === 201;
    }

    private async makeRequest(method: string, url: string, data?: any): Promise<APIResponse | null> {
        const token: string | null = await this.ensureToken();
        if (!token) return null;
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Cookie': `token=${token}`,
        };
        const response: APIResponse = await this.request[method](url, {
            headers,
            data,
        });
        if (response.status() < 200 || response.status() >= 300) {
            return null;
        }
        return response;
    }

    public async getAllBookingsIds(): Promise<Booking[] | null> {
        const url: string = '/booking';
        const response: APIResponse = await this.makeRequest('get', url);
        return response ? await response.json() : null;
    }

    public async getBookingById(id: number): Promise<Booking | null> {
        const url: string = `/booking/${id}`;
        const response: APIResponse = await this.makeRequest('get', url);
        return response ? await response.json() : null;
    }

    public async createBooking(bookingData: Booking): Promise<BookingResponse | null> {
        const url: string = '/booking';
        const response: APIResponse = await this.makeRequest('post', url, bookingData);
        return response ? await response.json() : null;
    }

    public async updateBooking(bookingId: number, bookingData: Booking): Promise<Booking | null> {
        const url: string = `/booking/${bookingId}`;
        const response:APIResponse | null = await this.makeRequest('put', url, bookingData);
        return response ? await response.json() : null;
    }

    public async partialUpdate(id: number, partialBookingData: Partial<Booking>): Promise<Booking | null> {
        const url: string = `/booking/${id}`;
        const response: APIResponse = await this.makeRequest('patch', url, partialBookingData);
        return response ? await response.json() : null;
    }

    public async deleteBooking(id: number): Promise<boolean> {
        const url: string = `/booking/${id}`;
        const response: APIResponse = await this.makeRequest('delete', url);
        return response && response.status() === 201;
    }

    public async createAndFetchBooking(
        bookingApiHelper: any,
        bookingData: Booking
    ): Promise<{ createdBooking: BookingResponse, fetchedBooking: Booking }> {
        const createdBooking: BookingResponse = await bookingApiHelper.createBooking(bookingData);
        const fetchedBooking: Booking = await bookingApiHelper.getBookingById(createdBooking.bookingid);
        return { createdBooking, fetchedBooking };
    }

    public async updateAndFetchBooking(
        bookingApiHelper: any,
        bookingId: number,
        updatedBookingData: Booking
    ): Promise<{ updatedBooking: Booking, fetchedBooking: Booking }> {
        const updatedBooking: Booking = await bookingApiHelper.updateBooking(bookingId, updatedBookingData);
        const fetchedBooking: Booking = await bookingApiHelper.getBookingById(bookingId);
        return { updatedBooking, fetchedBooking };
    }
}
