import './App.css'
import { Component } from 'react'

import TaskList from './TaskList'
import NewTaskForm from './NewTaskForm'
import Footer from './Footer'

export default class App extends Component {
  state = {
    tasks: [
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
    ],

    activeTab: 'all',
  }

  deleteItem = (id) => {
    this.setState(() => {
      return {
        tasks: this.state.tasks.filter((el) => id !== el.id),
      }
    })
  }

  changeStatus = (id) => {
    this.setState(() => {
      return {
        tasks: this.state.tasks.map((el) => {
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
        }),
      }
    })
  }

  addTask = (description, minutes, seconds) => {
    console.log(minutes, seconds)
    this.setState({
      tasks: [
        ...this.state.tasks,
        {
          id: Date.now(),
          description: description,
          status: 'active',
          createDate: Date.now(),
          minutes: Number(minutes),
          seconds: Number(seconds),
        },
      ],
    })
  }

  changeTab = (newTab) => {
    this.setState({ activeTab: newTab })
  }

  clearCompleted = () => {
    this.setState({ tasks: this.state.tasks.filter((el) => el.status !== 'completed') })
  }

  changeDescription = (id, newDescription) => {
    this.setState(() => {
      return {
        tasks: this.state.tasks.map((el) => {
          if (el.id === id) {
            el.status = 'active'
            el.description = newDescription
          }
          return el
        }),
      }
    })
  }

  onEdit = (id) => {
    this.setState({
      tasks: this.state.tasks.map((el) => {
        if (el.id === id) {
          el.status = 'editing'
        }
        return el
      }),
    })
  }

  updateTimers = () => {
    this.setState({
      tasks: this.state.tasks.map((el) => {
        let time = el.minutes * 60 + el.seconds
        if (!el.isPaused) {
          time += 1
        }
        el.minutes = Math.floor(time / 60)
        el.seconds = time % 60
        return el
      }),
    })
  }

  pauseTimer = (id) => {
    this.setState({
      tasks: this.state.tasks.map((el) => {
        if (el.id === id) {
          el.isPaused = true
        }
        return el
      }),
    })
  }

  startTimer = (id) => {
    this.setState({
      tasks: this.state.tasks.map((el) => {
        if (el.id === id) {
          el.isPaused = false
        }
        return el
      }),
    })
  }

  componentDidMount() {
    this.timer = setInterval(this.updateTimers, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render() {
    const leftCount = this.state.tasks.filter((el) => el.status === 'active').length

    return (
      <section className="todoapp">
        <NewTaskForm addTask={(...values) => this.addTask(...values)} />
        <TaskList
          tasks={
            this.state.activeTab === 'all'
              ? this.state.tasks
              : this.state.tasks.filter((el) => el.status === this.state.activeTab)
          }
          onDelete={(id) => this.deleteItem(id)}
          onChangeStatus={(id) => this.changeStatus(id)}
          onChangeDescription={(id, newDescription) => this.changeDescription(id, newDescription)}
          onEdit={(id) => this.onEdit(id)}
          pauseTimer={(id) => this.pauseTimer(id)}
          startTimer={(id) => this.startTimer(id)}
        />
        <Footer
          leftCount={leftCount}
          activeTab={this.state.activeTab}
          changeTab={(newTab) => this.changeTab(newTab)}
          clearCompleted={this.clearCompleted}
        />
      </section>
    )
  }
}
