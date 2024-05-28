import React, { useContext, useState } from 'react';
import { UserContext } from '../UserContext';
import './UserList.css';

const UserList = () => {
    const { users, loading, addUser, updateUser, deleteUser } = useContext(UserContext);
    const [newUser, setNewUser] = useState({ name: '', email: '' });
    const [editingUser, setEditingUser] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (editingUser) {
            setEditingUser({ ...editingUser, [name]: value });
        } else {
            setNewUser({ ...newUser, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingUser) {
            updateUser(editingUser.id, editingUser);
            setEditingUser(null);
        } else {
            addUser({ ...newUser, id: users.length + 1 });
            setNewUser({ name: '', email: '' });
        }
    };

    const handleEdit = (user) => {
        setEditingUser(user);
    };

    const handleDelete = (id) => {
        deleteUser(id);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="user-list">
            <h1>User Management</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={editingUser ? editingUser.name : newUser.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={editingUser ? editingUser.email : newUser.email}
                    onChange={handleChange}
                    required
                />
                <button type="submit">{editingUser ? 'Update User' : 'Add User'}</button>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <button onClick={() => handleEdit(user)}>Edit</button>
                                <button onClick={() => handleDelete(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
