import React, { Component } from 'react';
import './CalendarBody.css';
import { ScheduleCell } from './ScheduleCell';

const weekdays = ['Monday', 'Tuesday', 'Wedndesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const hoursOfDay = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];
const timeSlots = [1,2,3,4,5];

class CalendarBody extends Component {
	constructor(props){
		super(props);
		this.state={}
	}

  render() {
		// const cards = this.state.cards.map((card, index) =>
    //         <li key={index}>
    //             <Card {...card} />
		//         </li>
		

    return (
      <div className="CalendarBody">
        <table id="calendar">
					<thead>
						<tr>
							<th></th>
							{weekdays.map((weekday, index) => {
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
															scheduledCell=(
																	<ScheduleCell {...eventToRender}/>
															)
														}
													}
												}

												// ... scheduledCell = <ScheduleCell ...>
											}
											return (
												// <ScheduleCell 
												// 	key={`weekday_${weekday}_hour_${hour}_timeSlot_${timeSlot}`}
												// 	onClick={text => this.addCard(text)}
												// />
												<td key={`weekday_${weekday}_hour_${hour}_timeSlot_${timeSlot}`}
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

export default CalendarBody;
