import React, { useEffect, useState } from "react";
import { Tabs, Tag } from 'antd';
import axios from "axios";
import Loader from '../components/Loader';

const { TabPane } = Tabs;

const ProfileScreen = () => {
    const user = JSON.parse(localStorage.getItem('currentUser'));

    useEffect(() => {
        if (!user) {
            
            window.location.href = '/login';
        }
    }, []);

    return (
        <div className="ml-3 mt-3">
            <Tabs defaultActiveKey="1" centered>
                <TabPane tab='Profile' key='1'>
                    <h1>My Profile</h1>
                    <br />
                    <h1>Name: {user.name}</h1>
                    <h1>Email: {user.email}</h1>
                    <h1>isAdmin: {user.isAdmin ? 'YES' : 'No'}</h1>
                </TabPane>
                <TabPane tab='Bookings' key='2'>
                    <MyBookings />
                </TabPane>
            </Tabs>
        </div>
    );
};

export default ProfileScreen;

export function MyBookings() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getBookingsByUserId = async () => {
            try {
                const response = await axios.post('http://localhost:5000/api/bookings/getbookingsbyuserid', { userid: user._id });
                const data = response.data;
                setBookings(data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
                setError(error);
            }
        };

        getBookingsByUserId();
    }, []);

    async function cancelBooking(bookingid, roomid) {
        try {
            const result = await axios.post('http://localhost:5000/api/bookings/cancelbooking', { bookingid, roomid });
            console.log(result);
            setBookings(prevBookings => prevBookings.map(booking => {
                if (booking._id === bookingid) {
                    return { ...booking, status: 'cancelled' };
                }
                return booking;
            }));
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <div className="row">
                <div className="col-md-6">
                    {loading ? <Loader /> : (
                        bookings.length === 0 ? (
                            <p>No bookings found.</p>
                        ) : (
                            bookings.map(booking => (
                                <div className="bs" key={booking._id}>
                                    <h1>{booking.room}</h1>
                                    <p><b>BookingId</b>: {booking._id}</p>
                                    <p><b>CheckIn</b>: {booking.fromdate}</p>
                                    <p><b>CheckOut</b>: {booking.todate}</p>
                                    <p><b>Amount</b>: {booking.totalamount}</p>
                                    <p><b>Status</b>: {booking.status === 'cancelled' ? (
                                        <Tag color="red">CANCELLED</Tag>
                                    ) : (
                                        <Tag color='green'>CONFIRMED</Tag>
                                    )}</p>
                                    {booking.status !== 'cancelled' && (
                                        <div className="text-right">
                                            <button className="btn btn-secondary" onClick={() => cancelBooking(booking._id, booking.roomid)}>Cancel Booking</button>
                                        </div>
                                    )}
                                </div>
                            ))
                        )
                    )}
                </div>
            </div>
        </div>
    );
}
