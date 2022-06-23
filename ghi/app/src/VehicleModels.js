import React from 'react'
import './index.css'

function VehicleModels(props) {
    return (
        <>
        <p></p>
        <h2>Vehicle Models</h2>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Manufacturer</th>
                    <th>Picture</th>    
                </tr>
                </thead>
                <tbody>
                    {console.log(props)}
                {props.models.map(model => {
                    return (
                    <tr key={model.href}>
                        <td>{ model.name }</td>
                        <td>{ model.manufacturer.name }</td>
                        <td><img src={ model.picture_url } alt="vehicle_photo"/></td>
                    </tr>
                );           
            })}
            </tbody>
    </table>
    </>
    );

}

export default VehicleModels;

