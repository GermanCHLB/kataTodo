import React from 'react'

import Task from './Task'

const TaskList = ({ tasks, onChangeDescription, onChangeStatus, onEdit, onDelete, startTimer, pauseTimer }) => {
  const elements = tasks.map((el) => {
    const { id, ...itemProps } = el
    return (
      <Task
        key={id}
        {...itemProps}
        onDelete={() => onDelete(id)}
        onChangeStatus={() => onChangeStatus(id)}
        onChangeDescription={(newDescription) => onChangeDescription(id, newDescription)}
        onEdit={() => onEdit(id)}
        pauseTimer={() => pauseTimer(id)}
        startTimer={() => startTimer(id)}
      />
    )
  })

  return <ul className="todo-list">{elements}</ul>
}

export default TaskList
