import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router';
import {deleteEvents} from '../actions/index';

export default function ScheduleCell(props) {
    console.log(props)
        return (
            <div className="cell">
                <h3>{props.name}</h3>
                <p>{props.where}</p>
                <p>{props.when}</p>
                <button 
                    onClick={
                        e => {e.stopPropagation() // to stop bubbling up and prevent the form to show up
                             props.deleteEvents()
                        }
                        
                    } 
                    className="btn btn-default"
                >
                    delete
                </button>
            </div>
        )
}