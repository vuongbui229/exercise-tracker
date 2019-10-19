import React, { Component } from 'react'
import axios from "axios"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"


export default class EditExercise extends Component {
  state = {
    username: "",
    description: "",
    duration: 0,
    date: new Date(),
    users: []
  }

  componentDidMount() {
    axios.get(`http://localhost:5000/exercises/${this.props.match.params.id}`)
      .then(response => {
        this.setState({
          username: response.data.username,
          description: response.data.description,
          duration: response.data.duration,
          date: new Date(response.data.date)
        })
      })
      .catch(err => console.log(err))
    axios.get("http://localhost:5000/users")
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.username),
            username: response.data[0].username
          })
        }
      })
  }

  onChange =(e) => {
    const {name, value} = e.target
    this.setState({
      [name]: value
    })
  }

  onDateChange = date => {
    this.setState({
      date: date
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    const form = this.state
    const exercise = {
      username: form.username,
      description: form.description,
      duration: form.duration,
      date: form.date
    }
    console.log(exercise)
    axios.post(`http://localhost:5000/exercises/update/${this.props.match.params.id}`, exercise)
    window.location = "/"
  }

  render() {
    const { users, username, description, duration, date } = this.state
    return (
      <div>
        <h3>Edit Exercise Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <select 
              ref="userInput"
              className="form-control"
              value={username}
              onChange={this.onChange}
              required
              name="username"
            >{
              users.map(user => {
                return (
                  <option
                    key={user}
                    value={user}>{user}
                  </option>
                )
              })
            }</select>
          </div>
          <div className="form-group">
            <label>Description: </label>
            <input
              name="description"
              type="text"
              className="form-control"
              value={description}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <label>Duration (in minutes): </label>
            <input
              name="duration"
              type="text"
              className="form-control"
              value={duration}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <label>Date: </label>
            <DatePicker
              name="date"
              selected={date}
              onChange={this.onDateChange}
            />
          </div>
          <div className="form-group">
            <input type="submit" value="Save Exercise Log" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}
