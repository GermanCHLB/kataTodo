import React from 'react';

const Task = ({status, onChangeStatus, onDelete, description}) => {

    return (
        <li className={status}>
            <div className="view">
                <input className="toggle" type="checkbox" onChange={onChangeStatus} checked={status === 'completed'}/>
                <label onClick={onChangeStatus}>
                    <span className="description">{description}</span>
                    {/*<span className="created"></span>*/}
                </label>
                <button className="icon icon-edit"></button>
                <button className="icon icon-destroy" onClick={onDelete}></button>
            </div>
            {status === 'editing' ? <input type="text" className="edit" value="Editing task"/>: ''}
        </li>
    );
};

export default Task;