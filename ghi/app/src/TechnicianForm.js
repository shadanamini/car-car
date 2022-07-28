import React from 'react'

class TechnicianForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            employeeName: '',
            employeeNumber:'',
        }
        this.handleEmployeeNameChange = this.handleEmployeeNameChange.bind(this)
        this.handleEmployeeNumberChange = this.handleEmployeeNumberChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state}
        data.employee_name = data.employeeName;
        delete data.employeeName;
        data.employee_number = data.employeeNumber;
        delete data.employeeNumber;
        console.log(data)
        const TechnicianUrl = 'http://localhost:8080/api/technicians/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const response = await fetch(TechnicianUrl, fetchConfig)
        if (response.ok) {
            alert('New automotive technician is created!')
            const newTechnician = await response.json()
            console.log(newTechnician);
            const cleared = {
                employeeName: '',
                employeeNumber: '',
            };
            this.setState(cleared);
        }
    }

    handleEmployeeNameChange(event) {
        const value = event.target.value
        this.setState({employeeName: value})
    }

    handleEmployeeNumberChange(event) {
        const value = event.target.value
        this.setState({employeeNumber: value})
    }

    render() {
      return (
        <div className="my-5 container">
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <div class="col-md-12 text-center">
              <h1>Create Technician</h1>
            </div>
            <form onSubmit={this.handleSubmit} id="create-technician-form">
              <div className="form-floating mb-3">
                <input value={this.state.employeeName} onChange={this.handleEmployeeNameChange} placeholder="EmployeeName" name="employee_name" required type="text" id="employee_name" className="form-control"/>
                <label htmlFor="fabric">Technician Name</label>
              </div>
              <div className="form-floating mb-3">
                <input value={this.state.employeeNumber} onChange={this.handleEmployeeNumberChange} placeholder="EmployeeNumber" name="employee_number" required type="text" id="employee_number" className="form-control"/>
                <label htmlFor="style_name">Employee Number</label>
              </div>
              <div class="col-md-12 text-center">
                <button className="btn btn-primary">Create!</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      </div>
      );
    }
  }

export default TechnicianForm