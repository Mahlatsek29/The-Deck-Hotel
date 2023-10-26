import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import Swal from 'sweetalert2';

function BookingScreen() {
    const { roomid, fromdate, todate } = useParams();
    const fromdateFormatted = moment(fromdate, 'DD-MM-YYYY');
    const todateFormatted = moment(todate, 'DD-MM-YYYY');
    const totaldays = moment.duration(todateFormatted.diff(fromdateFormatted)).asDays() + 1;
    const [totalamount, setTotalAmount] = useState();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [room, setRoom] = useState(null);

    useEffect(() => {
        if (!localStorage.getItem('currentUser')) {
            window.location.href = '/login';
        }
        const fetchRoomData = async () => {
            try {
                setLoading(true);
                const response = await axios.post("http://localhost:5000/api/rooms/getroombyid", { roomid });
                setTotalAmount(response.data.nightlyrate * totaldays);
                setRoom(response.data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                setError(true);
            }
        };

        fetchRoomData();
    }, [roomid, totaldays]);
    
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))._id;

    async function onToken(token) {
        console.log(token);
        const bookingDetails = {
            room: room.name,
            roomid: room._id,
            userid: currentUser,
            fromdate: fromdate,
            todate: todate,
            totalamount,
            totaldays,
            token
        };
        try {
            setLoading(true);
            const result = await axios.post('http://localhost:5000/api/bookings/bookroom', bookingDetails);
            setLoading(false);
            Swal.fire('Room Booked Successfully', 'success').then(result => {
                window.location.href = '/bookings';
            });
            console.log(result);

        } catch (error) {
            setLoading(false);
            Swal.fire('OOPS!!! an error has occured', 'error');
        }
    }

    return (
        <div className='m-5'>
            {loading ? (
                <h1><Loader /></h1>
            ) : room ? (
                <div>
                    <div className='row mt-5 bs'>
                        <div className='col-md-5'>
                            <h1>{room.name}</h1>
                            <img src={room.imageurl[0]} className='bigimg' alt="Room" />
                        </div>
                    </div>
                    <div className='col-md-5  justify-content-center bs' style={{ float: 'right' }}>
                        <div>
                            <h1>Booking Details</h1>
                            <hr />
                            <b>
                                <p>Name : {room.name}</p>
                                <p>From Date : {fromdateFormatted.format('DD-MM-YYYY')}</p>
                                <p>To Date : {todateFormatted.format('DD-MM-YYYY')}</p>
                                <p>Capacity : {room.capacity} </p>
                            </b>
                        </div>

                        <div>
                            <b>
                                <h1>Amount</h1>
                                <hr />
                                <p>Total Days : {totaldays}</p>
                                <p> Nightly Rate : {room.nightlyrate}</p>
                                <p>Total amount: {totalamount}</p>
                            </b>
                        </div>

                        <div style={{ float: 'right' }}>
                            <StripeCheckout amount={totalamount * 100} token={onToken} currency='ZAR' stripeKey="pk_test_51NibPKEz5vk5ChZPe34ZI61ZUoZzDDVc8fGdqNHX8TfuBNVeLe6DI7EJGdrXY2XY0sFdVkHuDhIfDCdDHWMKOQUX00irW7V53a">
                                <button className="btn btn-outline-success" >Pay Now</button>
                            </StripeCheckout>
                        </div>
                    </div>
                </div>
            ) : (
                <Error />
            )}
        </div>
    );
}

export default BookingScreen;