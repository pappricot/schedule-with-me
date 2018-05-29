import React, { Component } from 'react';
//import './Form.css';

class Form extends Component {

	constructor(props){
		super(props);
		this.state = {
			name: '',
			where: '',
			when: ''
		}
	}

	handleSubmit(e){
		e.preventDefault();
		this.props.scheduleEvent({
			name: this.state.name,
			where: this.state.where,
			when: this.state.when
		})
	}

  render() {
    return (
				<div className="Form">
        <form onSubmit={this.handleSubmit.bind(this)}>
            <label>Don't see a time that suits you? Create your event: </label>
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
						<input 
							type="submit" 
							value="Schedule"
							disabled={!this.state.name || !this.state.where || !this.state.when}
						/>

        </form>
      </div>
    );
  }
}

export default Form;
