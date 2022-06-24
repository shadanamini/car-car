import React from 'react'
import './index.css'


function SalesRecordList(props) {
    return (
        <>
        <p></p>
        <h2>Sales</h2>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Sales Person</th>
                    <th>Employee Number</th>
                    <th>Purchaser</th>
                    <th>Automobile</th>   
                    <th>Sale Price</th>   
                </tr>
                </thead>
                <tbody>
                {props.sales.map(sale => {
                    return (
                    <tr key={sale.href}>
                        <td>{ sale.employee_name }</td>
                        <td>{ sale.employee_number }</td>
                        <td>{ sale.customer_name }</td>
                        <td>{ sale.vin }</td>
                        <td>{ sale.salesprice }</td>
                    </tr>
                );           
            })}
            </tbody>
    </table>
    </>
    );

}

export default SalesRecordList;