import React, { Component } from 'react'
import axios from "axios"

export default class CreateUser extends Component {
  state = {
    username: ''
  }


  onChange =(e) => {
    const {name, value} = e.target
    this.setState({
      [name]: value
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    const user = {
      username: this.state.username
    }
    console.log(user)
    axios.post("http://localhost:5000/users/add", user)
      .then(res => console.log(res.data))
    this.setState({
      username: ""
    })
  }

  render() {
    const { username } = this.state
    return (
      <div>
        <h3>Create New User</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={this.onChange}
              required
              name="username"
            />
          </div>
          <div className="form-group">
            <input type="submit" value="Create User" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}
