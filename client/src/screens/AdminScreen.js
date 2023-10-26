import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import axios from "axios";
import Loader from "../components/Loader";
import Swal from 'sweetalert2';
import { EditUser } from "./EditUser";

const { TabPane } = Tabs;

function AdminScreen() {
    return (
        <div className="mt-3 ml-3 mr-3 bs">
            <h2 className="text-center" style={{ fontSize: '30px' }}><b>Admin Panel</b></h2>
            <Tabs defaultActiveKey='1'>
                <TabPane tab='Bookings' key="1">
                    <Bookings />
                </TabPane>
                <TabPane tab='Rooms' key="2">
                    <Rooms />
                </TabPane>
                <TabPane tab='Add Room' key="3">
                    <Addroom />
                </TabPane>
                <TabPane tab='Users' key="4">
                    <Users />
                </TabPane>
            </Tabs>
        </div>
    );
}

export default AdminScreen;

// Booking Screen
export function Bookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get("/api/bookings/getallbookings");
                setBookings(response.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
                setError(error);
            }
        }

        fetchData();
    }, []);

    return (
        <div className="row">
            <div className="col-md-12">
                <h1>Bookings</h1>
                {loading ? (
                    <Loader />
                ) : (
                    <table className="table table-bordered table-dark">
                        <thead className="bs">
                            <tr>
                                <th>Booking ID</th>
                                <th>User ID</th>
                                <th>Room</th>
                                <th>From</th>
                                <th>To</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map(booking => (
                                <tr key={booking._id}>
                                    <td>{booking._id}</td>
                                    <td>{booking.userid}</td>
                                    <td>{booking.room}</td>
                                    <td>{booking.fromdate}</td>
                                    <td>{booking.todate}</td>
                                    <td>{booking.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

// ROOMS FUNCTION
export function Rooms() {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get("/api/rooms/getallrooms");
                setRooms(response.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
                setError(error);
            }
        }

        fetchData();
    }, []);

    return (
        <div className="row">
            <div className="col-md-12">
                <h1>Rooms</h1>
                {loading ? (
                    <Loader />
                ) : (
                    <table className="table table-bordered table-dark">
                        <thead className="bs">
                            <tr>
                                <th>Room ID</th>
                                <th>Name</th>
                                <th>Romm Category</th>
                                <th>Rent Per Night</th>
                                <th>Capacity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rooms.map(room => (
                                <tr key={room._id}>
                                    <td>{room._id}</td>
                                    <td>{room.name}</td>
                                    <td>{room.type}</td>
                                    <td>{room.rentpernight}</td>
                                    <td>{room.maxcount}</td>
                                    <td>{room.phonenumber}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

// USERS FUNCTION

export function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingUser, setEditingUser] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get("/api/users/getallusers");
                setUsers(response.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
                setError(error);
            }
        }

        fetchData();
    }, []);

    const handleDeleteUser = async (userId) => {
        try {
            await axios.delete(`/api/users/deleteuser/${userId}`);
            setUsers(users.filter(user => user._id !== userId));
            Swal.fire('Success', 'User deleted successfully', 'success');
        } catch (error) {
            console.error(error);
            Swal.fire('Error', 'Failed to delete user', 'error');
        }
    };

    const handleEditUser = (user) => {
        setEditingUser(user);
    };

    return (
        <div className="row">
            <div className="col-md-12">
                <h1>Users</h1>
                {loading ? (
                    <Loader />
                ) : (
                    <table className="table table-dark table-bordered">
                        <thead>
                            <tr>
                                <th>User ID</th>
                                <th>User Name</th>
                                <th>User Email</th>
                                <th>Is Admin</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.isAdmin ? 'YES' : 'NO'}</td>
                                    <td>
                                        <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
                                        <button onClick={() => handleEditUser(user)}>Edit</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                {editingUser && (
                    <EditUser user={editingUser} onEdit={(updatedUser) => {
                        setEditingUser(null);
                        const updatedUsers = users.map(user =>
                            user._id === updatedUser._id ? updatedUser : user
                        );
                        setUsers(updatedUsers);
                    }} />
                )}
            </div>
        </div>
    );
}

export function Addroom() {
    const [name, setName] = useState("");
    const [nightlyrate, setNightlyRate] = useState("");
    const [capacity, setCapacity] = useState("");
    const [description, setDescription] = useState("");
    const [imageURL1, setImageURL1] = useState("");
    const [roomcategory, setRoomCategory] = useState("");
    const [type, setType] = useState("");

    async function addRoom() {
        const newRoom = {
            name,
            nightlyrate,
            description,
            roomcategory,
            imageUrls: [imageURL1],
            type,
        };

        try {
            const result = await axios.post('/api/rooms/addroom', newRoom);
            console.log(result);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="row">
            <div className="col-md-5">
                <input type="text" className="form-control" placeholder="Room Name" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="text" className="form-control" placeholder="Night Rate" value={nightlyrate} onChange={(e) => setNightlyRate(e.target.value)} />
                <input type="text" className="form-control" placeholder="Capacity" value={capacity} onChange={(e) => setCapacity(e.target.value)} />
                <input type="text" className="form-control" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>

            <div className="col-md-5">
                <input type="text" className="form-control" placeholder="Type" value={type} onChange={(e) => setType(e.target.value)} />
                <input type="text" className="form-control" placeholder="Room Category" value={roomcategory} onChange={(e) => setRoomCategory(e.target.value)} />
                <input type="text" className="form-control" placeholder="Image URL 1" value={imageURL1} onChange={(e) => setImageURL1(e.target.value)} />
       
                <div className="text-right">
                    <button className="btn btn-primary mt-2" onClick={addRoom}>Add Room</button>
                </div>
            </div>
        </div>
    );
}
