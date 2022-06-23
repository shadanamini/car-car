import React from 'react'

class ServiceHistory extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            vin: '',
            appointments: []
        };
        this.handleVinChange = this.handleVinChange.bind(this)
        this.handleAppointmentChange=this.handleAppointmentChange.bind(this)
        this.onSearch = this.onSearch.bind(this)
    }

    async componentDidMount() {
        const response = await fetch("http://localhost:8080/api/appointments/");

        if(response.ok){
            const data = await response.json();
            this.setState({appointments: data.appointments});
        }
    }

    handleVinChange(event) {
        const value = event.target.value
        this.setState({vin: value})
    }     

    handleAppointmentChange(event){
        const value = event.target.value
        this.setState({appointment: value})
    }

    async onSearch(event) {
        event.preventDefault();
        const data = {...this.state}
        console.log("data", data)
        const appointmentsUrl = 'http://localhost:8080/api/appointments/';
        const fetchConfig = {
            method: "get",
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const response = await fetch(appointmentsUrl, fetchConfig)
        if (response.ok) {
            const results = await response.json()
            console.log(results)

        }
    }

 

    render() {
      return (
        <>
        <p></p>
        <div>
          <div className="input-group">
            <form onSubmit={this.onSearch} id="search-vin" className='search-bar'>
                <input value={this.state.vin} onChange={this.handleVinChange} 
                placeholder="Enter VIN" name="vin" required type="search" id="search" 
                className="form-control rounded" />
            </form>
        </div>
        <p></p>
           <div className="appointment-list">
            <h2>Service History</h2>
            <table className="table table-striped">
            <thead>
                <tr>
                    <th>VIN</th>
                    <th>Customer Name</th>
                    <th>Date</th>   
                    <th>Time</th>   
                    <th>Technician</th>   
                    <th>Reason</th>
                </tr>
                </thead>
                <tbody>
                {this.state.appointments.filter(appointment => appointment.vin === this.state.vin).map(appointment => {
                    return (
                    <tr key={appointment.href}>
                        <td>{ appointment.vin }</td>
                        <td>{ appointment.customer_name }</td>
                        <td>{ appointment.date }</td>
                        <td>{ appointment.time }</td>
                        <td>{ appointment.technician.employee_name }</td>
                        <td>{ appointment.reason }</td>
                    </tr>
                );           
            })}
            </tbody>
    </table>

             
</div>
          </div></>
      );
        }
    }
export default ServiceHistory
