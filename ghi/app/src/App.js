import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import VehicleModelsForm from './VehicleModelsForm';
import VehicleModels from './VehicleModels';
import Automobiles from './AutomobilesList';
import AutomobilesForm from './AutomobilesForm';
import TechnicianForm from './TechnicianForm';
import AppointmentsForm from './AppointmentsForm';
import AppointmentsList from './AppointmentsList'
import React from 'react';
import ManufacturersForm from './ManufacturersForm';
import Manufacturers from './Manufacturers';
import SearchHistory from './ServiceHistory';


class App extends React.Component {
  constructor(props){
    super(props)
    this.state={
      models: [],
      autos: [],
      appointments: [],
    };
    this.loadVehicleModels = this.loadVehicleModels.bind(this);
    this.loadAutomobiles = this.loadAutomobiles.bind(this);
    this.loadAppointments = this.loadAppointments.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onFinish = this.onFinish.bind(this);
  }

  async loadVehicleModels() {
    const response = await fetch("http://localhost:8100/api/models/");
    if(response.ok){
      const data = await response.json();
      this.setState({models: data.models});
    }
  }

  async loadAutomobiles() {
    const response = await fetch("http://localhost:8100/api/automobiles/");
    if(response.ok){
      const data = await response.json();
      this.setState({autos: data.autos});
    }
  }
  async loadAppointments() {
    const response = await fetch("http://localhost:8080/api/appointments/");
    if(response.ok){
      const data = await response.json();
      this.setState({appointments: data.appointments});
    }
  }


  async onCancel(appointment){
    console.log('hello', appointment)
    if(window.confirm('Are you sure you want to cancel this appointment?')){
        const appointmentUrl = `http://localhost:8080/api/appointments/${appointment.id}/cancelled`
        const fetchConfig = {
            method: "put",
        }
    const response = await fetch(appointmentUrl, fetchConfig)
    if(response.ok){
        console.log('ok response')
        const newAppointments = this.state.appointments.filter((appoint) => appoint.id !== appointment.id)
        console.log(newAppointments)
        this.setState({appointments: newAppointments})
        console.log('set the state')
    }
    }
}

async onFinish(appointment){
  console.log('hello', appointment)
  if(window.confirm('Are you sure you finished this appointment?')){
      const appointmentUrl = `http://localhost:8080/api/appointments/${appointment.id}/finished`
      const fetchConfig = {
          method: "put",
      }
  const response = await fetch(appointmentUrl, fetchConfig)
  if(response.ok){
      console.log('ok response')
      const newAppointments = this.state.appointments.filter((appoint) => appoint.id !== appointment.id)
      console.log(newAppointments)
      this.setState({appointments: newAppointments})
      console.log('set the state')
  }
  }
}

// async onSearch(event){
//   event.preventDefault();
//   const appointmentUrl = `http://localhost:8080/api/appointments/`
//   const fetchConfig = {
//     method: "get",
//   }
//   const response = await fetch(appointmentUrl, fetchConfig)
//   console.log(response)
//   if(response.ok){
//     const value = event.target.value
//     this.setState({vin: value})
//     // const newAppointments = this.state.appointments.filter((appoint) => appoint.vin == vin)
//     // this.setState=({appointments: newAppointments})
//   }
// }



//   async onDelete(appointment){
//     console.log('hello', appointment)
//     if(window.confirm('Are you sure you want to delete this appointment?')){
//         const appointmentUrl = `http://localhost:8080/api/appointments/${appointment.id}`
//         const fetchConfig = {
//             method: "delete",
//         }
//     const response = await fetch(appointmentUrl, fetchConfig)
//     if(response.ok){
//         console.log('ok response')
//         const newAppointments = this.state.appointments.filter((appoint) => appoint.id !== appointment.id)
//         console.log(newAppointments)
//         this.setState({appointments: newAppointments})
//         console.log('set the state')
//     }
//     }
// }

  async componentDidMount(){
    this.loadVehicleModels()
    this.loadAutomobiles()
    this.loadAppointments()
  }
 
  render(){
    return(
      <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="manufacturers/">
            <Route path="" element={<Manufacturers /> } />
            <Route path="new" element={<ManufacturersForm />} />
          </Route>
          <Route path="models/">
            <Route path="" element={<VehicleModels models = {this.state.models} /> } />
            <Route path="new" element={<VehicleModelsForm load={this.loadVehicleModels} />} />
          </Route>
          <Route path="automobiles/">
            <Route path="" element={<Automobiles autos = {this.state.autos} /> } />
            <Route path="new" element={<AutomobilesForm load={this.loadAutomobiles} />} /> 
          </Route>
          <Route path="technicians/new" element={<TechnicianForm />} />
          <Route path="appointments/">
            <Route path="" element={<AppointmentsList appointments = {this.state.appointments} onCancel = {this.onCancel} onFinish = {this.onFinish}/> } />
            <Route path="new" element={<AppointmentsForm load={this.loadAppointments} />} />
            <Route path="history" element ={<SearchHistory appointments = {this.state.appointments} onSearch = {this.onSearch}/>} /> 
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
    )
  }
}

// finish: 
// class based components
// backend: instead of having view that handles delete, use put request for both. if service was deleted, it wasn't deleted.
// field on the service appointments(like presentation) that tells me the appointment status. By default, it is scheduled. When you click the 
// change status. when ticket is completed 



// import { useState, useEffect } from 'react';
// import logo from './logo.svg';
// import './App.css';
// function App() {
//   let [clue, setClue] = useState({question: 'loading...', answer: ''})
//   // setClue({question: 'Different question', answer: 'New!'})
//   async function fetchClue() {
//     const res = await fetch('https://jservice.xyz/api/random-clue');
//     const newClue = await res.json();
//     setClue(newClue)
//   }
//   useEffect(() => {
//     fetchClue()
//   }, [])
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           {clue.question}
//         </p>
//         <p>
//           {clue.answer}
//         </p>
//       </header>
//     </div>
//   );
// }
// export default App;

export default App;
