import React from 'react'

class ManufacturersForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
        }
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state}
        console.log(data)
        const ManufacturerUrl = 'http://localhost:8100/api/manufacturers/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const response = await fetch(ManufacturerUrl, fetchConfig)
        if (response.ok) {
            alert('New manufacturer is created!')
            const newManufacturer = await response.json()
            console.log(newManufacturer);
            const cleared = {
                name: '',
            };
            this.setState(cleared);
        }
    }

    handleNameChange(event) {
        const value = event.target.value
        this.setState({name: value})
    }

    render() {
      return (
        <div className="my-5 container">
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a manufacturer</h1>
            <form onSubmit={this.handleSubmit} id="create-manufacturer-form">
              <div className="form-floating mb-3">
                <input value={this.state.name} onChange={this.handleNameChange} placeholder="Name" name="name" required type="text" id="name" className="form-control"/>
                <label htmlFor="fabric">Name</label>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
      </div>
      );
    }
  }

export default ManufacturersForm