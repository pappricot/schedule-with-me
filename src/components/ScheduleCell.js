import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router';
import {deleteEvents, requestEvent} from '../actions/index';

function ScheduleCell({joiners, currentUsername, owner, name, where, when, deleteEvents, requestEvent, cancelEvent, ...otherProps }) {
    console.log('here', joiners, currentUsername)
        const areYouOwner = owner.username === currentUsername;
        const areYouAJoiner = joiners && joiners.map(u => u.username).includes(currentUsername)
        return (
            <div className="cell">
                <h3>{name}</h3>
                <p>{where}</p>
                <p>{when}</p>
                
                {areYouOwner
                 &&
                <button 
                    onClick={
                        e => {e.stopPropagation() // to stop bubbling up and prevent the form to show up
                             deleteEvents()
                        }
                        
                    } 
                    className="btn btn-default"
                >
                    Delete
                </button>
                }
                {!areYouOwner && !areYouAJoiner
                &&
                <div>
                <button
                    onClick={
                        e => {e.stopPropagation()
                        requestEvent()
                        }
                    }
                >
                Request
                </button>
               
                </div>
                }
                {!areYouOwner && areYouAJoiner && 
                            <div>
                            <button
                                onClick={
                                    e => {e.stopPropagation()
                                    cancelEvent()
                                    }
                                }
                            >
                            Cancel
                            </button>
                           
                            </div>    
            

                }
            </div>
        )
}

const mapStateToProps = (state) => ({
    currentUsername: state.auth.currentUser.username

});

export default connect(mapStateToProps)(ScheduleCell)