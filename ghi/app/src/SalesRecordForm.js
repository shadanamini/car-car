import React from 'react'

class SalesRecordForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

            automobiles: [],
            salespersons: [],
            potentialcustomers: [],
            salesprice: '',
            automobile: '',
            salesperson: '',
            potentialcustomer: '',

        }

        this.handleAutomobilesChange = this.handleAutomobilesChange.bind(this)
        this.handleSalesPersonsChange = this.handleSalesPersonsChange.bind(this)
        this.handleCustomersChange = this.handleCustomersChange.bind(this)
        this.hanldeSalesPriceChange = this.hanldeSalesPriceChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state}
        console.log(data)
        const salesRecordUrl = 'http://localhost:8090/api/sales/';
        // Confirm whether this is the correct URL
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
            const newSalesRecord = await response.json()
            console.log(newSalesRecord);
            const cleared = {
                automobile: '',
                salesperson: '',
                potentialcustomer: '',
                salesprice: '',
            };
            // Confirm whether these cleared fields are all required to be empty strings
            this.setState(cleared);
        }
    }

    handleAutomobilesChange(event) {
        const value = event.target.value
        this.setState({automobile: value})
    }

    handleSalesPersonsChange(event) {
        const value = event.target.value
        this.setState({salesperson: value})
    }

    handleCustomersChange(event) {
        const value = event.target.value
        this.setState({potentialcustomer: value})
    }

    hanldeSalesPriceChange(event) {
        const value = event.target.value
        this.setState({salesprice: value})
    }





    // async componentDidMount() {
    //     try {
    //       const data = await Promise.all([
    //         fetch('http://localhost:8090/api/sales/').then((response) => response.json()),
    //         fetch('http://localhost:8090/api/potential_customers').then((response) => response.json()),
    //         fetch('http://localhost:8100/api/automobiles').then((response) => response.json())
    //       ]);
    //     console.log(data)


    //     //   for (var i of data) {
    //     //     console.log(`RESPONSE ITEM \n`);
    //     //     for (var obj of i) {
    //     //       console.log(obj);
    //     //       //logger utility method, logs output to screen
    //     //       console.log(obj);
    //     //     }
    //     //   }
    
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   }


    async loadSales() {
        const response = await fetch("http://localhost:8090/api/sales/");
        if(response.ok) {
          const data = await response.json();
          console.log(data);
          this.setState({sales: data.sales});
        }
    }

    async loadCustomers() {
        const response = await fetch("http://localhost:8090/api/potential_customers/");
        if(response.ok) {
          const data = await response.json();
          console.log(data);
          this.setState({potentialcustomers: data.potentialcustomers});
        }
    }

    async loadAutos() {
        const response = await fetch("http://localhost:8090/api/automobile_vos/");
        if(response.ok) {
          const data = await response.json();
          console.log(data);
          this.setState({automobiles: data});
        }
    }

    async loadSalesPersons() {
        const response = await fetch("http://localhost:8090/api/sales_persons/");
        if(response.ok) {
          const data = await response.json();
          console.log(data);
          this.setState({salespersons: data.salespersons});
        }
    }


    async componentDidMount() {
        this.loadSales();
        this.loadCustomers();
        this.loadAutos();
        this.loadSalesPersons();
    }


    render() {
      return (
        <div className="my-5 container">
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a sales record</h1>
            <form onSubmit={this.handleSubmit} id="create-sales-record-form">
            <div className="mb-3">
                <select onChange={this.handleAutomobilesChange} value={this.state.automobile} name="automobile" id="automobile" className='form-select' required>
                    <option value="">Choose an automobile</option>
                    {this.state.automobiles.map(automobile => {
                        return (
                            <option key={automobile.id} value={automobile.id}>
                                {automobile.vin}
                            </option>
                        );
                    })}
                </select>
              </div>
              <div className="mb-3">
                <select onChange={this.handleSalesPersonsChange} value={this.state.salesperson} name="salesperson" id="salesperson" className='form-select' required>
                    <option value="">Choose a sales person</option>
                    {this.state.salespersons.map(salesperson => {
                        return (
                            <option key={salesperson.id} value={salesperson.id}>
                                {salesperson.employee_name}
                            </option>
                        );
                    })}
                </select>
              </div>
              <div className="mb-3">
                <select onChange={this.handleCustomersChange} value={this.state.potentialcustomer} name="potentialcustomer" id="potentialcustomer" className='form-select' required>
                    <option value="">Choose a customer</option>
                    {this.state.potentialcustomers.map(potentialcustomer => {
                        return (
                            <option key={potentialcustomer.id} value={potentialcustomer.id}>
                                {potentialcustomer.customer_name}
                            </option>
                        );
                    })}
                </select>
              </div>
              <div className="form-floating mb-3">
                <input onChange={this.handleSalesPriceChange} placeholder=" Sales Price" required type="number" name="price" id="price" className="form-control" />
                <label htmlFor="price">Sales Price</label>
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

export default SalesRecordForm