import React, { useEffect, useState } from "react";
import { User } from "./components/User";
import { AddUser } from "./components/AddUser";
import "./styles.css";

export default function App() {
    const [users, setUsers] = useState([]);
    //console.log(users)
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        await fetch("https://jsonplaceholder.typicode.com/posts")
            .then((response) => response.json())
            .then((data) => setUsers(data))
            .catch((error) => console.log(error));
    };

    const onAdd = async (name, email) => {
        await fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            body: JSON.stringify({
                title: name,
                body: email
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then((response) => {
                if (response.status !== 201) {
                    return;
                } else {
                    return response.json();
                }
            })
            .then((data) => {
                setUsers((users) => [data, ...users]);
            })
            .catch((error) => console.log(error));
    };

    const onEdit = async (id, name, email) => {
        await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: "PUT",
            body: JSON.stringify({
                name: name,
                email: email
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then((response) => {
                if (response.status !== 200) {
                    return;
                } else {
                    return response.json();
                }
            })
            .then((data) => {
                // setUsers((users) => [...users, data]);
                const updatedUsers = users.map((user) => {

                    if (user.id === id) {
                        user.title = name;
                        user.body = email;
                    }

                    return user;
                });

                setUsers((users) => updatedUsers);
            })
            .catch((error) => console.log(error));
    };

    const onDelete = async (id) => {
        await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: "DELETE"
        })
            .then((response) => {
                if (response.status !== 200) {
                    return;
                } else {
                    setUsers(
                        users.filter((user) => {
                            return user.id !== id;
                        })
                    );
                }
            })
            .catch((error) => console.log(error));
    };

    return (
        <div className="App">
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-md-6 text-left">
                        <h1>Todo</h1>
                        <p>The to do list to organize work & life</p>
                    </div>
                    <div className="col-xs-12 col-md-6 text-right">
                        <AddUser onAdd={onAdd} count={users.length} />
                    </div>
                    </div>
                    <hr/>
                    <div className="row">
                    {users.map((user, i) => (
                        <div className="col-xs-12 col-md-4" key={i}>
                            <User
                                id={user.id}
                                key={user.id}
                                title={user.title}
                                body={user.body}
                                onEdit={onEdit}
                                onDelete={onDelete}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}