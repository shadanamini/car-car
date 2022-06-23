import React from 'react'

class SalesRecordForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            automobiles: [],
            salespersons: [],
            customer: [],
            salesprice: '',
        }

        this.handleAutomobileChange = this.handleAutomobileChange.bind(this)
        this.handleSalesPersonsChange = this.handleSalesPersonsChange.bind(this)
        this.handleCustomerChange = this.handleCustomerChange.bind(this)
        this.hanldeSalesPriceChange = this.hanldeSalesPriceChange.bind(this)
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state}
        console.log(data)
        const salesRecordUrl = 'http://localhost:8090/api/sales/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const response = await fetch(salesRecordUrl, fetchConfig)
        if (response.ok) {
            alert('New sales record created!')
            const newAppointment = await response.json()
            console.log(newAppointment);
            const cleared = {
                automobiles: '',
                salespersons: '',
                customer: '',
                salesprice: '',
            };
            this.setState(cleared);
        }
    }

    handleAutomobileChange(event) {
        const value = event.target.value
        this.setState({automobiles: value})
    }

    handleSalesPersonsChange(event) {
        const value = event.target.value
        this.setState({salespersons: value})
    }

    handleCustomerChange(event) {
        const value = event.target.value
        this.setState({customer: value})
    }

    async componentDidMount() {
        const url = 'http://localhost:8090/api/sales_persons/';    
        const response = await fetch(url);        
        if (response.ok) {
          const data = await response.json();
          this.setState({salespersons: data.salespersons})
        }
    }

    async componentDidMount() {
        const url = 'http://localhost:8090/api/potential_customers/';    
        const response = await fetch(url);        
        if (response.ok) {
          const data = await response.json();
          this.setState({customer: data.customer})
        }
    }

    async componentDidMount() {
        const url = 'http://localhost:8090/api/potential_customers/';    
        const response = await fetch(url);        
        if (response.ok) {
          const data = await response.json();
          this.setState({customer: data.customer})
        }
    }
      

    render() {
      return (
        <div className="my-5 container">
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a sales record</h1>
            <form onSubmit={this.handleSubmit} id="create-vehicle-model-form">
            <div className="mb-3">
                <select onChange={this.handleAutomobileChange} value={this.state.automobiles} name="automobiles" id="automobiles" className='form-select' required>
                    <option value="">Choose an automobile</option>
                    {this.state.automobiles.map(automobiles => {
                        return (
                            <option key={automobiles.id} value={automobiles.id}>
                                {automobiles}
                            </option>
                        );
                    })}
                </select>
              </div>
              <div className="mb-3">
                <select onChange={this.handleSalesPersonsChange} value={this.state.salespersons} name="salespersons" id="salespersons" className='form-select' required>
                    <option value="">Choose a sales person</option>
                    {this.state.salespersons.map(salespersons => {
                        return (
                            <option key={salespersons.id} value={salespersons.id}>
                                {salespersons}
                            </option>
                        );
                    })}
                </select>
              </div>
              <div className="mb-3">
                <select onChange={this.handleCustomerChange} value={this.state.customer} name="customer" id="customer" className='form-select' required>
                    <option value="">Choose a customer</option>
                    {this.state.customer.map(customer => {
                        return (
                            <option key={customer.id} value={customer.id}>
                                {customer}
                            </option>
                        );
                    })}
                </select>
              </div>
              <input type="number" name='Sales price'></input>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
      </div>
      );
    }
  }

export default SalesRecordForm