import React, {Component} from 'react';

export default class NewTaskForm extends Component{

    state = {
        inputValue: '',
    }

    handleChange(e) {
        this.setState({inputValue: e.target.value})
    }

    render() {
        return (
            <header className="header">
                <h1>todos</h1>
                <input
                    className="new-todo"
                    placeholder="What needs to be done?"
                    value={this.state.inputValue}
                    onChange={(e) => this.handleChange(e)}
                    autoFocus
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && this.state.inputValue !== '') {
                            this.props.addTask(this.state.inputValue);
                            this.setState({inputValue: ''})
                        }
                    }}
                />
            </header>
        );
    }
};

