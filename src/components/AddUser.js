import React, { useState } from "react";

export const AddUser = ({ onAdd, count }) => {
    const [newTask, setNewTask] = useState(false);

    const handleOnSubmit = (evt) => {
        evt.preventDefault();
        setNewTask(false);
        onAdd(evt.target.name.value, evt.target.email.value);
        evt.target.name.value = "";
        evt.target.email.value = "";
    };

    const newTaskToggle = () => {
        setNewTask(!newTask);
    }

    return (<>
        <h4 onClick={() => newTaskToggle()} className="add-task-button">Add Task +</h4>
        <h4>Remaining tasks: {count}</h4>
        {newTask &&
        <div className="new-task-container">
            <div className="new-task-background" onClick={() => setNewTask(false)}></div>
            <div className="new-task-form">
                <h3>Add Task <span onClick={() => setNewTask(false)}>X</span></h3>
                <hr/>
                <form onSubmit={handleOnSubmit}>
                    <input className="form-control mb-2" placeholder="Title" name="name" />
                    <textarea className="form-control" rows="5" placeholder="Body" name="email"></textarea>
                    <button className="btn btn-primary" onSubmit={handleOnSubmit}>Add</button>
                </form>
            </div>
        </div>
        }
    </>);
};