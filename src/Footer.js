import React from 'react';

import TaskFilter from './TaskFilter';

const Footer = ({ leftCount, activeTab, changeTab, clearCompleted }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{leftCount} items left</span>
      <TaskFilter activeTab={activeTab} changeTab={(newTab) => changeTab(newTab)} />
      <button className="clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  );
}

export default Footer
