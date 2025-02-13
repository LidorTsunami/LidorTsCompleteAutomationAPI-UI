export const defaultBookingData = {
    firstname: 'John',
    lastname: 'Doe',
    totalprice: 150,
    depositpaid: true,
    bookingdates: {
        checkin: '2025-03-01',
        checkout: '2025-03-07'
    },
    additionalneeds: 'Breakfast'
};

export const updatedBookingData = {
    firstname: 'Jane',
    lastname: 'Doe',
    totalprice: 200,
    depositpaid: false,
    bookingdates: {
        checkin: '2025-04-01',
        checkout: '2025-04-07'
    },
    additionalneeds: 'Lunch'
};

export const partialUpdateData = {
    additionalneeds: 'Dinner'
};
