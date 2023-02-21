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
        ]
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

    render() {
        return (
            <section className="todoapp">
                <NewTaskForm/>
                <TaskList
                    tasks={this.state.tasks}
                    onDelete={(id) => this.deleteItem(id)}
                    onChangeStatus={(id) => this.changeStatus(id)}
                />
                <Footer/>
            </section>
        );
    }
}
