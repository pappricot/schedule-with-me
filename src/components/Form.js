import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../basic.css';

class Form extends Component {

	constructor(props){
		super(props);
		this.state = {
			name: '',
			where: '',
			when: '',
			errors: {}
		}
	}

	handleSubmit(e){
		e.preventDefault();
		this.props.scheduleEvent({
			name: this.state.name,
			where: this.state.where,
			when: this.state.when,
			weekday: this.props.weekday,
			hour: this.props.hour,
			timeSlot: this.props.timeSlot,
			timeSlots: this.props.selectedTimeSlots,
		})
	}

  render() {
    return (
				<div className="Form">
        <form onSubmit={this.handleSubmit.bind(this)}>
            <label>Create your event: </label>
						<input 
							type="text" 
							name="name" 
							value={this.state.name}
							onChange={(e) => {this.setState({name: e.target.value})}}
						/>
						<br />
            <label>Where: </label>
						<input 
							type="text" 
							name="where" 
							value={this.state.where}
							onChange={(e) => {this.setState({where: e.target.value})}}
						/>
						<br />
            <label>When: </label>
						<input 
							type="text" 
							name="when" 
							value={this.state.when}
							onChange={(e) => {this.setState({when: e.target.value})}}
						/>
						<br />
						<input className="button"
							type="submit" 
							value="Schedule"
							disabled={!this.state.name || !this.state.where || !this.state.when}
						/>

        </form>
      </div>
    );
  }
}

const mapStoreToProps = (store) => ({
	//need to change to choose multiple cells at server end
	selectedTimeSlots: store.main.selectedTimeSlots,
	weekday: store.main.selectedTimeSlots[0].weekday,
	hour: store.main.selectedTimeSlots[0].hour,
	timeSlot: store.main.selectedTimeSlots[0].timeSlot,
})

export default connect(mapStoreToProps)(Form);
