import './App.css';
import TaskList from "./TaskList";
import NewTaskForm from "./NewTaskForm";
import Footer from "./Footer";
import {Component} from "react";

export default class App extends Component{

    state = {
        tasks: [
            {id: 1, description: '1', status: 'editing'},
            {id: 2, description: '2', status: 'completed'},
            {id: 3, description: '3', status: 'active'},
        ],

        activeTab: 'all',
    }

    deleteItem = (id) => {
        this.setState(() => {
            return {
                tasks: this.state.tasks.filter(el => id !== el.id)
            }
        })
    }

    changeStatus = (id) => {
        this.setState(() => {
            return {
                tasks: this.state.tasks.map(el => {
                    if (el.id !== id) {
                        return el;
                    } else {
                        if (el.status === 'active') {
                            el.status = 'completed';
                        } else {
                            el.status = 'active';
                        }
                        return el;
                    }
                })
            }
        })
    }

    addTask = (description) => {
        this.setState({
            tasks: [...this.state.tasks, {id: Date.now(), description: description, status: 'active'}]
        })
    }

    changeTab = (newTab) => {
        this.setState({activeTab: newTab});
    }

    clearCompleted = () => {
        this.setState({tasks: this.state.tasks.filter(el => el.status !== 'completed')})
    }

    render() {
        const leftCount = this.state.tasks.filter(el => el.status === 'active').length;

        return (
            <section className="todoapp">
                <NewTaskForm addTask={(value) => this.addTask(value)}/>
                <TaskList
                    tasks={
                    this.state.activeTab === 'all'
                        ? this.state.tasks
                        : this.state.tasks.filter(el => el.status === this.state.activeTab)}
                    onDelete={(id) => this.deleteItem(id)}
                    onChangeStatus={(id) => this.changeStatus(id)}
                />
                <Footer
                    leftCount={leftCount}
                    activeTab={this.state.activeTab}
                    changeTab={(newTab) => this.changeTab(newTab)}
                    clearCompleted={this.clearCompleted}
                />
            </section>
        );
    }
}
