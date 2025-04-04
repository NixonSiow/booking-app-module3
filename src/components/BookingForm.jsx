import { useState } from "react";
import { useDispatch } from "react-redux";
import { addBooking, getBookings } from "../store/bookingSlice";
import { Form, Button } from "react-bootstrap";

const BookingForm = () => {
    const dispatch = useDispatch(); // Initialize dispatch

    const [bookingData, setBookingData] = useState({
        title: "",
        serviceType: "",
        stylist: "",
        specialRequests: "",
        date: "",
        time: "",
        phone_number: "",
        email: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(addBooking(bookingData)).unwrap(); // Use correct state variable
            dispatch(getBookings()); // Fetch updated bookings

            setBookingData({ // Reset form fields
                title: "",
                serviceType: "",
                stylist: "",
                specialRequests: "",
                date: "",
                time: "",
                phone_number: "",
                email: "",
            });
        } catch (error) {
            console.error("Error adding booking:", error);
        }
    };

    return (
        <Form onSubmit={handleSubmit} className="mt-3">
            <Form.Group>
                <Form.Label>Event</Form.Label>
                <Form.Control
                    type="text"
                    value={bookingData.title}
                    onChange={(e) => setBookingData({ ...bookingData, title: e.target.value })}
                />
            </Form.Group>

            <Form.Group>
                <Form.Label>Service Type</Form.Label>
                <Form.Control
                    as="select"
                    value={bookingData.serviceType}
                    onChange={(e) => setBookingData({ ...bookingData, serviceType: e.target.value })}
                >
                    <option value="">Select Service</option>
                    <option value="Haircut">Haircut</option>
                    <option value="Beard Trim">Beard Trim</option>
                    <option value="Facial">Facial</option>
                    <option value="Manicure">Manicure</option>
                </Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label>Stylist</Form.Label>
                <Form.Control
                    type="text"
                    value={bookingData.stylist}
                    onChange={(e) => setBookingData({ ...bookingData, stylist: e.target.value })}
                />
            </Form.Group>

            <Form.Group>
                <Form.Label>Special Requests</Form.Label>
                <Form.Control
                    type="text"
                    value={bookingData.specialRequests}
                    onChange={(e) => setBookingData({ ...bookingData, specialRequests: e.target.value })}
                />
            </Form.Group>

            <Form.Group>
                <Form.Label>Date</Form.Label>
                <Form.Control
                    type="date"
                    value={bookingData.date}
                    onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                />
            </Form.Group>

            <Form.Group>
                <Form.Label>Time</Form.Label>
                <Form.Control
                    type="time"
                    value={bookingData.time}
                    onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}
                />
            </Form.Group>

            <Form.Group>
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                    type="text"
                    value={bookingData.phone_number}
                    onChange={(e) => setBookingData({ ...bookingData, phone_number: e.target.value })}
                />
            </Form.Group>

            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    value={bookingData.email}
                    onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                />
            </Form.Group>

            <Button type="submit">Book Appointment</Button>
        </Form>
    );
};

export default BookingForm;
