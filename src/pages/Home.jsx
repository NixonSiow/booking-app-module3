import BookingForm from "../components/BookingForm";
import BookingList from "../components/BookingList";
import { Button } from "react-bootstrap";
import { useState } from "react";

const Home = () => {
    const [showForm, setShowForm] = useState(false);

    return (
        <div>
            <Button className='mt-3' onClick={() => setShowForm(!showForm)}>Add Booking</Button>
            {showForm && <BookingForm />}
            <BookingList />
        </div>
    );
};

export default Home;
