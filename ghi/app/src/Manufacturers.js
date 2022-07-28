import React from 'react'
import './index.css'

function Manufacturers(props) {
    return (
        <>
        <p></p>
        <div class="col-md-12 text-center">
            <h2>Manufacturers</h2>
        </div>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Name</th>
                </tr>
                </thead>
                <tbody>
                {props.manufacturers.map(manufacturer => {
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