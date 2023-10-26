import { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';

export function EditUser({ user, onEdit }) {
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);

    const handleEdit = async () => {
        try {
            const updatedUser = { name, email };
            await axios.put(`/api/users/updateuser/${user._id}`, updatedUser);

            Swal.fire('Success', 'Update Successful', 'success');
            onEdit(updatedUser); 
        } catch (error) {
            console.error(error);
            Swal.fire('Error', 'Failed to update user', 'error');
        }
    };

    return (
        <div>
            <h3>Edit User</h3>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
            <button onClick={handleEdit}>Save Changes</button>
        </div>
    );
}