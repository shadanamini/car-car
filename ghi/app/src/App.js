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
import SalesPersonForm from './SalesPersonForm';
import PotentialCustomerForm from './PotentialCustomerForm';
import React from 'react';
import ManufacturersForm from './ManufacturersForm';
import Manufacturers from './Manufacturers';
import SearchHistory from './ServiceHistory';
import SalesRecordForm from './SalesRecordForm';
import SalesRecordList from './SalesRecordList';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      models: [],
      autos: [],
      appointments: [],
      manufacturers: [],
      sales: [],
    };

    this.loadVehicleModels = this.loadVehicleModels.bind(this);
    this.loadAutomobiles = this.loadAutomobiles.bind(this);
    this.loadAppointments = this.loadAppointments.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onFinish = this.onFinish.bind(this);
    this.loadManufacturers = this.loadManufacturers.bind(this);

  }

  async loadVehicleModels() {
    const response = await fetch("http://localhost:8100/api/models/");
    if(response.ok){
      const data = await response.json();
      this.setState({models: data.models});
    }
  }

  async loadSales() {
    const response = await fetch("http://localhost:8090/api/sales/");
    if(response.ok) {
      const data = await response.json();
      this.setState({sales: data.sales});
    }
  }

  async loadAutomobiles() {
    const response = await fetch("http://localhost:8100/api/automobiles/");
    if(response.ok) {
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

  async onCancel(appointment) {
    if(window.confirm('Are you sure you finished this appointment?')){
        const appointmentUrl = `http://localhost:8080/api/appointments/${appointment.id}/cancelled`
        const fetchConfig = {
            method: "put",
        }
    const response = await fetch(appointmentUrl, fetchConfig)
    if(response.ok){
        const newAppointments = this.state.appointments.filter((appoint) => appoint.id !== appointment.id)
        this.setState({appointments: newAppointments})
      }
    }
  }

  async loadManufacturers() {
    const response = await fetch("http://localhost:8100/api/manufacturers/");
    if(response.ok){
      const data = await response.json();
      this.setState({manufacturers: data.manufacturers})
    }
  }

async onFinish(appointment) {
  if(window.confirm('Are you sure you finished this appointment?')){
      const appointmentUrl = `http://localhost:8080/api/appointments/${appointment.id}/finished`
      const fetchConfig = {
          method: "put",
      }
  const response = await fetch(appointmentUrl, fetchConfig)
  if(response.ok){
      const newAppointments = this.state.appointments.filter((appoint) => appoint.id !== appointment.id)
      this.setState({appointments: newAppointments})
    }
  }
}

  async componentDidMount() {
    this.loadVehicleModels()
    this.loadAutomobiles()
    this.loadAppointments()
    this.loadManufacturers()
    this.loadSales()
  }
 
  render() {
    return(
      <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="models/">
            <Route path="" element={<VehicleModels models = {this.state.models} /> } />
            <Route path="new" element={<VehicleModelsForm load={this.loadVehicleModels} />} />
          </Route>
          <Route path="manufacturers/">
            <Route path="" element={<Manufacturers manufacturers = {this.state.manufacturers} /> } />
            <Route path="new" element={<ManufacturersForm load={this.loadManufacturers} />} />
          </Route>
          <Route path="automobiles/">
            <Route path="" element={<Automobiles autos = {this.state.autos} /> } />
            <Route path="new" element={<AutomobilesForm load={this.loadAutomobiles} />} /> 
          </Route>
          <Route path="technicians/new" element={<TechnicianForm />} />
          <Route path="sales_persons/new" element={<SalesPersonForm />} />
          <Route path="sales/" element={<SalesRecordList sales = {this.state.sales} />} />
          <Route path="sales/new" element={<SalesRecordForm loadAutomobiles = {this.loadAutomobiles} />} />
          <Route path="potential_customers/new" element={<PotentialCustomerForm />} />
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

export default App;
