import { useEffect, useState } from "react";
import { fetchBookings, deleteBooking, updateBooking } from "../services/api";
import { Card, Button, Form, Container, Row, Col } from "react-bootstrap";

const BookingList = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingBooking, setEditingBooking] = useState(null); // Track which booking is being edited

    useEffect(() => {
        const loadBookings = async () => {
            try {
                const response = await fetchBookings();
                console.log("Loaded bookings:", response); // Debugging log
                setBookings(response || []); // Directly use response, assuming it’s an array
            } catch (err) {
                setError(err.message || "Failed to load bookings.");
            } finally {
                setLoading(false);
            }
        };
        loadBookings();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteBooking(id);
            setBookings(bookings.filter((booking) => booking.id !== id));
        } catch (error) {
            console.error("Delete Booking Error:", error.response?.data || error.message);
        }
    };

    const handleEditClick = (booking) => {
        setEditingBooking(booking);
    };

    const handleUpdate = async () => {
        try {
            const updatedBooking = await updateBooking(editingBooking.id, editingBooking);

            setBookings((prevBookings) =>
                prevBookings.map((booking) =>
                    booking.id === editingBooking.id ? updatedBooking : booking
                )
            );

            setEditingBooking(null); // Exit edit mode
        } catch (error) {
            console.error("Update Booking Error:", error.response?.data || error.message);
        }
    };

    if (loading) return <p>Loading bookings...</p>;
    if (error) return <p className="text-danger">Error: {error}</p>;

    return (
        <Container>
            <h3 className="my-4 text-center">Bookings</h3>
            {bookings.length === 0 ? (
                <p className="text-center">No bookings found.</p>
            ) : (
                <Row>
                    {bookings.map((booking) => (
                        <Col md={6} lg={4} key={booking.id} className="mb-4">
                            <Card className="shadow-sm">
                                <Card.Body>
                                    {editingBooking?.id === booking.id ? (
                                        // Show form when editing
                                        <>
                                            <Form.Group>
                                                <Form.Label>Event</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    value={editingBooking.title}
                                                    onChange={(e) => setEditingBooking({ ...editingBooking, title: e.target.value })}
                                                />
                                            </Form.Group>

                                            <Form.Group>
                                                <Form.Label>Service Type</Form.Label>
                                                <Form.Control
                                                    as="select"
                                                    value={editingBooking.serviceType}
                                                    onChange={(e) => setEditingBooking({ ...editingBooking, serviceType: e.target.value })}
                                                >
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
                                                    value={editingBooking.stylist}
                                                    onChange={(e) => setEditingBooking({ ...editingBooking, stylist: e.target.value })}
                                                />
                                            </Form.Group>

                                            <Form.Group>
                                                <Form.Label>Special Requests</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    value={editingBooking.specialRequests}
                                                    onChange={(e) => setEditingBooking({ ...editingBooking, specialRequests: e.target.value })}
                                                />
                                            </Form.Group>

                                            <Form.Group>
                                                <Form.Label>Date</Form.Label>
                                                <Form.Control
                                                    type="date"
                                                    value={editingBooking.date}
                                                    onChange={(e) => setEditingBooking({ ...editingBooking, date: e.target.value })}
                                                />
                                            </Form.Group>

                                            <Form.Group>
                                                <Form.Label>Time</Form.Label>
                                                <Form.Control
                                                    type="time"
                                                    value={editingBooking.time}
                                                    onChange={(e) => setEditingBooking({ ...editingBooking, time: e.target.value })}
                                                />
                                            </Form.Group>

                                            <div className="mt-3 d-flex justify-content-between">
                                                <Button variant="success" onClick={handleUpdate}>
                                                    Save
                                                </Button>
                                                <Button variant="secondary" onClick={() => setEditingBooking(null)}>
                                                    Cancel
                                                </Button>
                                            </div>
                                        </>
                                    ) : (
                                        // Show normal booking details
                                        <>
                                            <Card.Title>{booking.title || "Booking Details"}</Card.Title>
                                            <Card.Text><strong>Service Type:</strong> {booking.service_type || "Not specified"}</Card.Text>
                                            <Card.Text><strong>Stylist:</strong> {booking.stylist || "Not specified"}</Card.Text>
                                            <Card.Text><strong>Special Requests:</strong> {booking.special_requests || "None"}</Card.Text>
                                            <Card.Text><strong>Date:</strong> {booking.date}</Card.Text>
                                            <Card.Text><strong>Time:</strong> {booking.time}</Card.Text>

                                            <div className="mt-3 d-flex justify-content-between">
                                                <Button variant="primary" onClick={() => handleEditClick(booking)}>
                                                    Edit
                                                </Button>
                                                <Button variant="danger" onClick={() => handleDelete(booking.id)}>
                                                    Delete
                                                </Button>
                                            </div>
                                        </>
                                    )}
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
};

export default BookingList;
