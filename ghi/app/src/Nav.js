import { NavLink } from 'react-router-dom';
import { menuItems } from './menuItems';
import MenuItems from './MenuItem'

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="menus">
          {menuItems.map((menu, index) => {
            return <MenuItems items={menu} key={index} />
          })}



            {/* <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="">Home</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="manufacturers">Manufacturers</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="manufacturers/new">New Manufacture</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="models">Vehicle Models</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="models/new">New Vehicle Model</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="automobiles">Automobiles</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="automobiles/new">New Automobile</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="technicians/new">New Technician</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="sales_persons/new">New Sales Person</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="potential_customers/new">New Potential Customer</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="appointments/new">New Appointment</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="appointments">Appointments</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="appointments/history">Service History</NavLink>
                <NavLink className="nav-link" aria-current="page" to="sales">Sales List</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="sales/new">Create Sales Record</NavLink>
            </li> */}
          </ul>
          
        </div>
      </div>
    </nav>
  )
}

export default Nav;
