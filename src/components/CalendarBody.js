import React, { Component } from 'react';
import { connect } from 'react-redux';
import './CalendarBody.css';
import  ScheduleCell from './ScheduleCell';
import { deleteEvents, requestEvent, cancelEvent } from '../actions/index';
import moment from 'moment';

const weekdays = moment.weekdays(); //['Monday', 'Tuesday', 'Wedndesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const hoursOfDay = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];
const timeSlots = [1,2];

class CalendarBody extends Component {

  render() {
    return (
      <div className="CalendarBody">
        <table id="calendar">
					<thead>
						<tr>
							<th></th>
							{weekdays.map((weekday, index) => {
								console.log('weekday', weekday)
								return (
									
										<th key={weekday}>
										<span className="day">{index+1}</span>
										<br />
										<span className="long">{weekday}</span>
										</th>
									
								)}
							)}
						</tr>
					</thead>
					<tbody>
						{hoursOfDay.map((hour, index) => {
							return timeSlots.map((timeSlot, timeSlotIndex) => {
								return (
									<tr key={`hour_${hour}_timeSlot_${timeSlot}`}>
										{timeSlotIndex === 0 && <td className="hour" rowSpan={timeSlots.length}><span>{`${hour}:00`}</span></td>}
										{weekdays.map((weekday, weekdayIndex) => {

											let scheduledCell;
											if(this.props.events) {
												if(this.props.events[weekday]) {
													if(this.props.events[weekday][hour]) {
														if(this.props.events[weekday][hour][timeSlot]){
															const eventToRender = this.props.events[weekday][hour][timeSlot];
															console.log('eventToRender', eventToRender)
															scheduledCell=(
																	<ScheduleCell 
																		{...eventToRender}
																		deleteEvents={() => this.props.dispatch(deleteEvents(eventToRender.id))}
																		requestEvent={() => this.props.dispatch(requestEvent(eventToRender.id))}
																		cancelEvent={() => this.props.dispatch(cancelEvent(eventToRender.id))}
																	/>
															)
														}
													}
												}
											}


											return (
							
												// make the cell that is selected distinguishable, set a class to change in css file
												<td className={(this.props.selectedTimeSlots.find(selectedTimeSlot => 
												 selectedTimeSlot.weekday === weekday &&
												 selectedTimeSlot.hour === hour &&
												 selectedTimeSlot.timeSlot === timeSlot
												) ? "highlighted" : '') }
													key={`weekday_${weekday}_hour_${hour}_timeSlot_${timeSlot}`}
														onClick={() => {this.props.onClickCell({weekday, hour, timeSlot})}}
														
												>
													{scheduledCell}
												</td>
												)
											})
										}
								</tr>
								)
							})
							}
						)}
						
					</tbody>
				</table>
      </div>
    );
  }
}

export default connect()(CalendarBody);
