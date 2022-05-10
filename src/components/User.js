import React, { useState } from "react";

export const User = ({ title, body, id, onEdit, onDelete }) => {
    const [isEdit, setIsEdit] = useState(false);
    const [titleName, setTitleName] = useState(title);
    const [bodyName, setBodyName] = useState(body);

    const handleEdit = () => {
        setIsEdit(!isEdit);
    };

    const handleDelete = () => {
        onDelete(id);
    };

    const handleOnEditSubmit = (evt) => {
        evt.preventDefault();
        onEdit(id, titleName, bodyName);
        setIsEdit(!isEdit);
    };

    return (
        <div className="table">
            {isEdit
            ?<div className="new-task-container">
                <div className="new-task-background" onClick={() => setIsEdit(false)}></div>
                <div className="new-task-form">
                    <h3>Edit Task <span onClick={() => setIsEdit(false)}>X</span></h3>
                    <hr/>
                    <form onSubmit={handleOnEditSubmit}>
                        <div className="todo-content">
                            <input placeholder="Title" className="form-control" value={titleName} onChange={e => setTitleName(e.target.value)} />
                            <textarea placeholder="Body" className="form-control" rows="7" value={bodyName} onChange={e => setBodyName(e.target.value)} ></textarea>
                        </div>
                        <div className="todo-buttons">
                            <button type="submit" className="btn btn-info">Save</button>
                            <button className="btn btn-danger" disabled>Delete</button>
                        </div>
                    </form>
                </div>
            </div>
            :<div className="todo-items">
                <div className="todo-content">
                    <h4>{title}</h4>
                    <p>{body}</p>
                </div>
                <div className="todo-buttons">
                    <button className="btn btn-primary" onClick={handleEdit}>Edit</button>
                    <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
                </div>
            </div>
            }
        </div>
    );
};
