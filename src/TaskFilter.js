import React from 'react'

const TaskFilter = ({ activeTab, changeTab }) => {
  return (
    <ul className="filters">
      <li>
        <button className={activeTab === 'all' ? 'selected' : ''} onClick={() => changeTab('all')}>
          All
        </button>
      </li>
      <li>
        <button className={activeTab === 'active' ? 'selected' : ''} onClick={() => changeTab('active')}>
          Active
        </button>
      </li>
      <li>
        <button className={activeTab === 'completed' ? 'selected' : ''} onClick={() => changeTab('completed')}>
          Completed
        </button>
      </li>
    </ul>
  )
}

export default TaskFilter
