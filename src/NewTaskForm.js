import React, { Component } from 'react'

export default class NewTaskForm extends Component {
  state = {
    inputValue: '',
    minutesValue: '',
    secondsValue: '',
  }

  handleChange(e) {
    this.setState({ inputValue: e.target.value })
  }

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <form
          className="new-todo-form"
          onKeyDown={(e) => {
            if (
              e.key === 'Enter' &&
              this.state.inputValue !== '' &&
              this.state.minutesValue !== '' &&
              this.state.secondsValue !== ''
            ) {
              this.props.addTask(this.state.inputValue, this.state.minutesValue, this.state.secondsValue)
              this.setState({ inputValue: '', minutesValue: '', secondsValue: '' })
            }
          }}
        >
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            value={this.state.inputValue}
            onChange={(e) => this.handleChange(e)}
            autoFocus
          />
          <input
            className="new-todo-form__timer"
            placeholder="Min"
            autoFocus
            value={this.state.minutesValue}
            onChange={(e) => {
              this.setState({ minutesValue: e.target.value })
            }}
          />
          <input
            className="new-todo-form__timer"
            placeholder="Sec"
            autoFocus
            value={this.state.secondsValue}
            onChange={(e) => {
              if (e.target.value.length < 3) {
                this.setState({ secondsValue: e.target.value })
              }
              console.log(this.state)
            }}
          />
        </form>
      </header>
    )
  }
}
