import React from 'react';

class AutomobilesForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            color: '',
            year: '',
            vin: '',
            models: [],
        };
        this.handleColorChange = this.handleColorChange.bind(this);
        this.handleYearChange = this.handleYearChange.bind(this);
        this.handleVinChange = this.handleVinChange.bind(this);
        this.handleModelChange = this.handleModelChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event){
        event.preventDefault();
        const data = {...this.state};
        delete data.models;
        console.log(data);
        const automobileUrl = 'http://localhost:8100/api/automobiles/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
            'Content-Type': 'application/json',
            },
        };
        const response = await fetch(automobileUrl, fetchConfig);
        if (response.ok) {
            alert('New automobile is created!')
            const newAutomobile = await response.json();
            console.log(newAutomobile);

            const cleared = {
                color: '',
                year: '',
                vin: '',
                model: '',
            };
            this.setState(cleared);
            this.props.load();  
        }
    }

    handleColorChange(event) {
        const value = event.target.value;
        this.setState({color: value})
    }                
    
    handleYearChange(event) {
        const value = event.target.value;
        this.setState({year: value})
    }

    handleVinChange(event) {
        const value = event.target.value;
        this.setState({vin: value})
    }

    handleModelChange(event) {
        const value = event.target.value;
        this.setState({model: value})
    }

    async componentDidMount() {
        const url = 'http://localhost:8100/api/models/';
  
        const response = await fetch(url);
  
        if (response.ok) {

            const data = await response.json();
            this.setState({models: data.models});  
        }
    }
  render() {
    return (
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <div class="col-md-12 text-center">
              <h1>Add Automobile To Inventory</h1>
            </div>
            <form onSubmit={this.handleSubmit} id="create-automobile-form">
              <div className="form-floating mb-3">
                <input value={this.state.color} onChange={this.handleColorChange} placeholder="Color" required type="text" name="color" id="color" className="form-control" />
                <label htmlFor="presenter_name">Color</label>
              </div>
              <div className="form-floating mb-3">
                <input value={this.state.year} onChange={this.handleYearChange} placeholder="Year" required type="text" name="year" id="year" className="form-control" />
                <label htmlFor="presenter_email">Year</label>
              </div>
              <div className="form-floating mb-3">
                <input value={this.state.vin} onChange={this.handleVinChange} placeholder="Vin" type="text" name="vin" id="vin" className="form-control" />
                <label htmlFor="company_name">VIN</label>
              </div>
              <div className="mb-3">
                <select value={this.state.model} onChange={this.handleModelChange} required name="model" id="model" className="form-select">
                  <option value="">Choose Model</option>
                  {this.state.models.map(model => {
                      return (
                          <option value={model.id} key={model.id}>
                              {model.name}
                          </option>
                      );
                  })}
                </select>
              </div>
              <div class="col-md-12 text-center">
                <button className="btn btn-primary">Create!</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default AutomobilesForm;