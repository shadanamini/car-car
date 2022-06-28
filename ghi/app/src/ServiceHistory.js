import React from 'react'

class ServiceHistory extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            vin: '',
            appointments:[],
        };
        this.handleVinChange = this.handleVinChange.bind(this)
        this.onSearch = this.onSearch.bind(this)
    }

    handleVinChange(event) {
        const value = event.target.value
        this.setState({vin: value})
    }     

    async onSearch(event) {
        event.preventDefault();
        const data = {...this.state}
        console.log("data", data)
        const appointmentsUrl = `http://localhost:8080/api/appointments/${data.vin}`; 
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
            this.setState({appointments: results})
        } 
    }

    render() {
      return (
        <>
        <p></p>
        <div>
          <div className="input-group">
            <form onSubmit={this.onSearch} id="search-bar" className='search-bar'>
                <input value={this.state.vin} onChange={this.handleVinChange} 
                placeholder="Enter VIN" name="vin" required type="search" id="search" 
                className="form-control rounded" />
                <p></p>
                <button className="btn btn-primary">Search</button>
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
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {this.state.appointments.map(appointment => {
                    return (
                    <tr key={appointment.href}>
                        <td>{ appointment.vin }</td>
                        <td>{ appointment.customer_name }</td>
                        <td>{ appointment.date }</td>
                        <td>{ appointment.time }</td>
                        <td>{ appointment.technician.employee_name }</td>
                        <td>{ appointment.reason }</td>
                        <td>{ appointment.status.name }</td>
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
