import React, {Component} from 'react';
import Task from "./Task";


export default class TaskList extends Component {

    render() {
        const elements = this.props.tasks.map(el => {
            const {id, ...itemProps} = el;
            return (
                <Task
                    key={id}
                    {...itemProps}
                    onDelete = {() => this.props.onDelete(id)}
                    onChangeStatus = {() => this.props.onChangeStatus(id)}
                    onChangeDescription = {(newDescription) => this.props.onChangeDescription(id, newDescription)}
                    onEdit = {() => this.props.onEdit(id)}
                />
            )
        })

        return (
            <ul className="todo-list">
                {elements}
            </ul>
        );
    }
};

