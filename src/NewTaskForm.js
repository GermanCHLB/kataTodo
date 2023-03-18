import React, { useState } from 'react'

const NewTaskForm = ({ addTask }) => {
  const [inputValue, setInputValue] = useState('')
  const [minutesValue, setMinutesValue] = useState('')
  const [secondsValue, setSecondsValue] = useState('')

  return (
    <header className="header">
      <h1>todos</h1>
      <form
        className="new-todo-form"
        onKeyDown={(e) => {
          if (e.key === 'Enter' && inputValue !== '' && minutesValue !== '' && secondsValue !== '') {
            addTask(inputValue, minutesValue, secondsValue)
            setInputValue('')
            setSecondsValue('')
            setMinutesValue('')
          }
        }}
      >
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          autoFocus
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          autoFocus
          value={minutesValue}
          onChange={(e) => setMinutesValue(e.target.value)}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          autoFocus
          value={secondsValue}
          onChange={(e) => {
            if (e.target.value.length < 3) {
              setSecondsValue(e.target.value)
            }
          }}
        />
      </form>
    </header>
  )
}

export default NewTaskForm
