import React from 'react'
import './index.css'

function onDelete(event, id){
    if(window.confirm('Are you sure you want to delete this appointment?')){
        const appointmentUrl = `http://localhost:8080/api/appointments/${id}`
        const fetchConfig = {
            method: "delete",
        }
    const response = fetch(appointmentUrl, fetchConfig)
    if(response.ok){
        console.log('ok response')
        const rows = this.state.appointmentRows.map(row => row.filter(function(appointment) {
            return appointment.id !== id
        }))
        console.log(rows)
        this.setState({appointmentRows: rows})
        console.log('set the state')
    }
    }
}

function AppointmentsList(props) {
    return (
        <>
        <p></p>
        <h2>Service Appointments</h2>
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
                {props.appointments.map(appointment => {
                    return (
                    <tr key={appointment.href}>
                        <td>{ appointment.vin }</td>
                        <td>{ appointment.customer_name }</td>
                        <td>{ appointment.date }</td>
                        <td>{ appointment.time }</td>
                        <td>{ appointment.technician.employee_name }</td>
                        <td>{ appointment.reason }</td>
                        <td>
                            <button className="cancel" onClick={e => onDelete(e, appointment.id)}>Cancel</button>
                        </td>
                    </tr>
                );           
            })}
            </tbody>
    </table>
    </>
    );

}

export default AppointmentsList;

