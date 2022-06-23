import React from 'react'
import './index.css'

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
                    <th>VIP</th>
                    <th></th>    
                </tr>
                </thead>
                <tbody>
                {props.appointments.filter(appointment => appointment.status.id === 1).map(appointment => {
                    return (
                    <tr key={appointment.href}>
                        <td>{ appointment.vin }</td>
                        <td>{ appointment.customer_name }</td>
                        <td>{ appointment.date }</td>
                        <td>{ appointment.time }</td>
                        <td>{ appointment.technician.employee_name }</td>
                        <td>{ appointment.reason }</td>
                        <td>{ (appointment.vip)? "✅":"❌" }</td>
                        <td>
                            <button className="cancel" onClick={() => props.onCancel(appointment)}>Cancel</button>
                            <button className="finish" onClick={() => props.onFinish(appointment)}>Finished</button>
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

