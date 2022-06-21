import React from 'react'

class VehicleModelsForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            pictureUrl:'',
            manufacturers: [],
        }
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handlePictureUrlChange = this.handlePictureUrlChange.bind(this)
        this.handleManufacturerChange = this.handleManufacturerChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state}
        data.picture_url = data.pictureUrl;
        delete data.pictureUrl;
        delete data.manufacturers;
        console.log(data)
        const vehicleModelUrl = 'http://localhost:8100/api/models/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const response = await fetch(vehicleModelUrl, fetchConfig)
        if (response.ok) {
            alert('New vehicle model created!')
            const newVehicleModel = await response.json()
            console.log(newVehicleModel);
            const cleared = {
                name: '',
                pictureUrl: '',
                manufacturer: '',
            };
            this.setState(cleared);
        }
    }

    handleNameChange(event) {
        const value = event.target.value
        this.setState({name: value})
    }

    handlePictureUrlChange(event) {
        const value = event.target.value
        this.setState({pictureUrl: value})
    }

    handleManufacturerChange(event) {
        const value = event.target.value
        this.setState({manufacturer: value})
    }

    async componentDidMount() {
        const url = 'http://localhost:8100/api/manufacturers/';    
        const response = await fetch(url);        
        if (response.ok) {
          const data = await response.json();
          this.setState({manufacturers: data.manufacturers})
        }
    }
      

    render() {
      return (
        <div className="my-5 container">
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a vehicle model</h1>
            <form onSubmit={this.handleSubmit} id="create-vehicle-model-form">
              <div className="form-floating mb-3">
                <input value={this.state.name} onChange={this.handleNameChange} placeholder="Name" name="name" required type="text" id="name" className="form-control"/>
                <label htmlFor="fabric">Name</label>
              </div>
              <div className="form-floating mb-3 datepicker">
                <input value={this.state.pictureUrl} onChange={this.handlePictureUrlChange} placeholder="Picture Url" name="picture_url" required type="text" id="picture_url" className="form-control"/>
                <label htmlFor="style_name">Picture Url</label>
              </div>
              <div className="mb-3">
                <select onChange={this.handleManufacturerChange} value={this.state.manufacturer} name="manufacturer" id="manufacturer" className='form-select' required>
                    <option value="">Choose a Manufacturer</option>
                    {this.state.manufacturers.map(manufacturer => {
                        return (
                            <option key={manufacturer.id} value={manufacturer.id}>
                                {manufacturer.name}
                            </option>
                        );
                    })}
                </select>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
      </div>
      );
    }
  }

export default VehicleModelsForm