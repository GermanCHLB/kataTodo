import React, {Component} from 'react';
import Task from "./Task";


export default class TaskList extends Component {

    state = {
        tasks: this.props.tasks,
    }

    render() {
        const elements = this.state.tasks.map(el => {
            const {id, ...itemProps} = el;
            return (
                <Task
                    key={id}
                    {...itemProps}
                    onDelete = {() => this.props.onDelete(id)}
                    onChangeStatus ={() => this.props.onChangeStatus(id)}
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

