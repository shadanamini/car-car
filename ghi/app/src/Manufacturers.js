import React, { useState, useEffect } from 'react'
import './index.css'

function Manufacturers(props) {
    let [manufacturers, setManufacturers] = useState([])     
    useEffect(()=>{
        fetch("http://localhost:8100/api/manufacturers/")
            .then((response)=>response.json())
            .then((response)=>setManufacturers(response.manufacturers))
            .catch((error)=>console.error(error));    
    }, [])
    return (
        <>
        <p></p>
        <h2>Manufacturers</h2>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Name</th> 
                </tr>
                </thead>
                <tbody>
                {manufacturers.map(manufacturer => {
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