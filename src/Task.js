import React, {Component} from 'react';
import {formatDistanceToNow} from "date-fns";
import PropTypes from "prop-types";

export default class Task extends Component {
    state = {
        descriptionValue: this.props.description,
    }
    static defaultProps = {
        description: 'No description',
        createDate: Date.now(),
        status: 'active',
    }

    static propTypes = {
        createDate: PropTypes.number,
    }
   render() {
       return (
           <li className={this.props.status}>
               <div className="view">
                   <input
                       className="toggle"
                       type="checkbox"
                       onChange={this.props.onChangeStatus}
                       checked={this.props.status === 'completed'}/>
                   <label onClick={this.props.onChangeStatus}>
                       <span className="description">{this.props.description}</span>
                       <span className="created">
                           {
                               'created '
                               + formatDistanceToNow(this.props.createDate, {includeSeconds:true})
                               + ' ago'
                           }
                       </span>
                   </label>
                   <button className="icon icon-edit" onClick={this.props.onEdit}></button>
                   <button className="icon icon-destroy" onClick={this.props.onDelete}></button>
               </div>
               {this.props.status === 'editing'
                   ? <input
                       type="text"
                       className="edit"
                       autoFocus
                       onChange={(e) => {
                           this.setState({descriptionValue: e.target.value})
                       }}
                       onKeyDown={e => {
                           if (e.key === 'Enter') {
                                this.props.onChangeDescription(this.state.descriptionValue);
                           }
                       }}
                       value={this.state.descriptionValue}
                   />
                   : ''}
           </li>
       );
   }
};