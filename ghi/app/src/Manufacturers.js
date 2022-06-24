import React from 'react'
import './index.css'

function Manufacturers(props) {
    return (
        <>
        <p></p>
        <h2>Manufacturer</h2>
        <table className="table table-striped">
            <thead>
                <tr>
                    {console.log(props)}
                    <th>Name</th>
                </tr>
                </thead>
                <tbody>
                {props.manufacturers.map(manufacturer => {
                    console.log(manufacturer)
                    return (
                    <tr key={manufacturer.href}>
                        <td>{ manufacturer.name }</td>
                    </tr>
                );           
            })}
            </tbody>
    </table>
    </>
    );

}

export default Manufacturers;