import React, {Component} from 'react';

export default class Task extends Component {
    state = {
        status: this.props.status,
    }

    toggleStatus = () => {
        this.props.onChangeStatus()
        this.setState(() => {
            if (this.state.status === 'active') {
              return {
                  status: 'completed'
              }
            } else {
                return {
                    status: 'active'
                }
            }
        })
    }

    render() {
        const {description} = this.props;

        return (
            <li className={this.state.status}>
                <div className="view">
                    <input className="toggle" type="checkbox" onChange={this.toggleStatus} checked={this.state.status === 'completed'}/>
                    <label onClick={this.toggleStatus}>
                        <span className="description">{description}</span>
                        {/*<span className="created"></span>*/}
                    </label>
                    <button className="icon icon-edit"></button>
                    <button className="icon icon-destroy" onClick={this.props.onDelete}></button>
                </div>

                {this.state.status === 'editing' ? <input type="text" className="edit" value="Editing task"/>: ''}
            </li>
        );
    }
};
