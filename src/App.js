import './App.css'
import { useEffect, useState } from 'react'

import TaskList from './TaskList'
import NewTaskForm from './NewTaskForm'
import Footer from './Footer'

const App = () => {
  const [tasks, setTasks] = useState([
    { id: 1, description: '1', status: 'active', createDate: Date.now(), minutes: 12, seconds: 25, isPaused: false },
    {
      id: 2,
      description: '2',
      status: 'completed',
      createDate: Date.now(),
      minutes: 12,
      seconds: 25,
      isPaused: true,
    },
    { id: 3, description: '3', status: 'active', createDate: Date.now(), minutes: 12, seconds: 25, isPaused: false },
  ])

  const [activeTab, setActiveTab] = useState('all')

  const deleteItem = (id) => {
    setTasks(tasks.filter((el) => id !== el.id))
  }

  const changeStatus = (id) => {
    setTasks(
      tasks.map((el) => {
        if (el.id !== id) {
          return el
        } else {
          if (el.status === 'active') {
            el.status = 'completed'
            el.isPaused = true
          } else {
            el.status = 'active'
            el.isPaused = false
          }
          return el
        }
      })
    )
  }

  const addTask = (description, minutes, seconds) => {
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        description: description,
        status: 'active',
        createDate: Date.now(),
        minutes: Number(minutes),
        seconds: Number(seconds),
      },
    ])
  }

  const changeTab = (newTab) => {
    setActiveTab(newTab)
  }

  const clearCompleted = () => {
    setTasks(tasks.filter((el) => el.status !== 'completed'))
  }

  const changeDescription = (id, newDescription) => {
    setTasks(
      tasks.map((el) => {
        if (el.id === id) {
          el.status = 'active'
          el.description = newDescription
        }
        return el
      })
    )
  }

  const onEdit = (id) => {
    setTasks(
      tasks.map((el) => {
        if (el.id === id) {
          el.status = 'editing'
        }
        return el
      })
    )
  }

  const updateTimers = () => {
    setTasks(
      tasks.map((el) => {
        let time = el.minutes * 60 + el.seconds
        if (!el.isPaused) {
          time += 1
        }
        el.minutes = Math.floor(time / 60)
        el.seconds = time % 60
        return el
      })
    )
  }

  const pauseTimer = (id) => {
    setTasks(
      tasks.map((el) => {
        if (el.id === id) {
          el.isPaused = true
        }
        return el
      })
    )
  }

  const startTimer = (id) => {
    setTasks(
      tasks.map((el) => {
        if (el.id === id) {
          el.isPaused = false
        }
        return el
      })
    )
  }

  useEffect(() => {
    const timer = setInterval(updateTimers, 1000)

    return () => clearInterval(timer)
  })

  const leftCount = tasks.filter((el) => el.status === 'active').length

  return (
    <section className="todoapp">
      <NewTaskForm addTask={(...values) => addTask(...values)} />
      <TaskList
        tasks={activeTab === 'all' ? tasks : tasks.filter((el) => el.status === activeTab)}
        onDelete={(id) => deleteItem(id)}
        onChangeStatus={(id) => changeStatus(id)}
        onChangeDescription={(id, newDescription) => changeDescription(id, newDescription)}
        onEdit={(id) => onEdit(id)}
        pauseTimer={(id) => pauseTimer(id)}
        startTimer={(id) => startTimer(id)}
      />
      <Footer
        leftCount={leftCount}
        activeTab={activeTab}
        changeTab={(newTab) => changeTab(newTab)}
        clearCompleted={clearCompleted}
      />
    </section>
  )
}

export default App
