import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

const Home = () => {
    const [users, setUser] = useState([]);
    

    useEffect(() => {
        loadUsers();
    })

    const loadUsers = async () => {
        const result = await axios.get("http://localhost:3001/users");

        setUser(result.data.reverse())
    };
    const deleteUser = async id => {
        await axios.delete(`http://localhost:3001/users/${id}`);
        loadUsers();
      };

    return (
        <div className="container">
            <div className="py-5">
                <h1>Home  am Page</h1>
                <table className="table border shadow">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">First</th>
                            <th scope="col">Last</th>
                            <th scope="col">Handle</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => (
                                <tr>
                                    <th scope="row">{index + 1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <Link className='btn btn-primary ms-2' to={`/users/${user.id}`}>View</Link>
                                        <Link className='btn btn-outline-primary ms-2' to={`/users/edit/${user.id}`}>Edit</Link>
                                        <Link className='btn btn-danger ms-2' onClick={() => deleteUser(user.id)}>Delete</Link>
                                    </td>
                                </tr>
                            )) 
                        }
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default Home
