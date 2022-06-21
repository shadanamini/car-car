import React from 'react'
import './index.css'

function Automobiles(props) {
    return (
        <>
        <p></p>
        <h2>Vehicle Models</h2>
        <table className="table table-striped">
            <thead>
                <tr>
                    {console.log(props)}
                    <th>VIN</th>
                    <th>Color</th>
                    <th>Year</th>
                    <th>Model</th>
                    <th>Manufacturer</th>    
                </tr>
                </thead>
                <tbody>
                {props.autos.map(auto => {
                    console.log(auto)
                    return (
                    <tr key={auto.href}>
                        <td>{ auto.vin }</td>
                        <td>{ auto.color }</td>
                        <td>{ auto.year }</td>
                        <td>{ auto.model.name }</td>
                        <td>{ auto.model.manufacturer.name }</td>
                    </tr>
                );           
            })}
            </tbody>
    </table>
    </>
    );

}

export default Automobiles;