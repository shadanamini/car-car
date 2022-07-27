import React from 'react'

class AppointmentsForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            vin: '',
            customerName:'',
            date:'',
            time:'',
            reason:'',
            technicians: []
        }
        this.handleVinChange = this.handleVinChange.bind(this)
        this.handleCustomerNameChange = this.handleCustomerNameChange.bind(this)
        this.handleDateChange = this.handleDateChange.bind(this)
        this.handleTimeChange = this.handleTimeChange.bind(this)
        this.handleReasonChange = this.handleReasonChange.bind(this)
        this.handleTechnicianChange = this.handleTechnicianChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state}
        data.customer_name = data.customerName;
        delete data.customerName;
        delete data.technicians;
        console.log(data)
        const appointmentsUrl = 'http://localhost:8080/api/appointments/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const response = await fetch(appointmentsUrl, fetchConfig)
        if (response.ok) {
            alert('New appointment created!')
            const newAppointment = await response.json()
            console.log(newAppointment);
            const cleared = {
                vin: '',
                customerName: '',
                date:'',
                time:'',
                reason: '',
                technician:'',
            };
            this.setState(cleared);
            this.props.load();
        }
    }

    handleVinChange(event) {
        const value = event.target.value
        this.setState({vin: value})
    }

    handleCustomerNameChange(event) {
        const value = event.target.value
        this.setState({customerName: value})
    }

    handleDateChange(event) {
        const value = event.target.value
        this.setState({date: value})
    }

    handleTimeChange(event) {
        const value = event.target.value
        this.setState({time: value})
    }

    handleReasonChange(event) {
        const value = event.target.value
        this.setState({reason: value})
    }

    handleTechnicianChange(event) {
        const value = event.target.value
        this.setState({technician: value})
    }

    async componentDidMount() {
        const url = 'http://localhost:8080/api/technicians/';    
        const response = await fetch(url);        
        if (response.ok) {
          const data = await response.json();
          this.setState({technicians: data.technicians})
        }
    }
      

    render() {
      return (
        <div className="my-5 container">
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create An Appointment</h1>
            <form onSubmit={this.handleSubmit} id="create-vehicle-model-form">
              <div className="form-floating mb-3">
                <input value={this.state.vin} onChange={this.handleVinChange} placeholder="Vin" name="vin" required type="text" id="vin" className="form-control"/>
                <label htmlFor="fabric">VIN</label>
              </div>
              <div className="form-floating mb-3">
                <input value={this.state.customerName} onChange={this.handleCustomerNameChange} placeholder="Customer Name" name="customer_name" required type="text" id="customer_name" className="form-control"/>
                <label htmlFor="style_name">Customer Name</label>
              </div>
              <div className="form-floating mb-3 datepicker">
                <input value={this.state.date} onChange={this.handleDateChange} placeholder="Date" name="date" required type="date" id="date" className="form-control"/>
                <label htmlFor="style_name">Date</label>
              </div>
              <div className="form-floating mb-3 datepicker">
                <input value={this.state.time} onChange={this.handleTimeChange} placeholder="Time" name="time" required type="time" id="time" className="form-control"/>
                <label htmlFor="style_name">Time</label>
              </div>
              <div className="form-floating mb-3">
                <input value={this.state.reason} onChange={this.handleReasonChange} placeholder="Reason" name="reason" required type="text" id="reason" className="form-control"/>
                <label htmlFor="style_name">Reason</label>
              </div>
              <div className="mb-3">
                <select onChange={this.handleTechnicianChange} value={this.state.technician} name="technician" id="technician" className='form-select' required>
                    <option value="">Choose Technician</option>
                    {this.state.technicians.map(technician => {
                        return (
                            <option key={technician.id} value={technician.id}>
                                {technician.employee_name}
                            </option>
                        );
                    })}
                </select>
              </div>
              <button className="btn btn-primary">Create!</button>
            </form>
          </div>
        </div>
      </div>
      </div>
      );
    }
  }

export default AppointmentsForm