import React, { useState } from 'react'
import { formatDistanceToNow } from 'date-fns'

const Task = ({
  status = 'active',
  createDate,
  description,
  onChangeStatus,
  startTimer,
  seconds,
  minutes,
  pauseTimer,
  onEdit,
  onDelete,
  onChangeDescription,
}) => {
  const [descriptionValue, setDescriptionValue] = useState(description)

  let timer = ' ' + minutes + ':'
  if (String(seconds).length === 1) {
    timer += '0' + seconds
  } else {
    timer += seconds
  }

  return (
    <li className={status}>
      <div className="view">
        <input className="toggle" type="checkbox" onChange={onChangeStatus} checked={status === 'completed'} />
        <label onClick={onChangeStatus}>
          <span className="title">{description}</span>
          <span className="description">
            <button
              className="icon icon-play"
              onClick={(e) => {
                e.stopPropagation()
                startTimer()
              }}
            />
            <button
              className="icon icon-pause"
              onClick={(e) => {
                e.stopPropagation()
                pauseTimer()
              }}
            />
            {timer}
          </span>
          <span className="description">
            {'created ' + formatDistanceToNow(createDate, { includeSeconds: true }) + ' ago'}
          </span>
        </label>
        <button className="icon icon-edit" onClick={onEdit}></button>
        <button className="icon icon-destroy" onClick={onDelete}></button>
      </div>
      {status === 'editing' ? (
        <input
          type="text"
          className="edit"
          autoFocus
          onChange={(e) => {
            setDescriptionValue(e.target.value)
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onChangeDescription(descriptionValue)
            }
          }}
          value={descriptionValue}
        />
      ) : (
        ''
      )}
    </li>
  )
}

export default Task
