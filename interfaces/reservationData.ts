export default interface ReservationData {
    restaurantId: string;
    restaurantName: string;
    restaurantAddress: string;
    restaurantCity: string;
    reservationDate: Date;
    guests: number;
    first_name: string;
    last_name: string;
    email: string;
}