import React from 'react'

class PotentialCustomerForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            customerName: '',
            customerAddress:'',
            customerPhoneNumber:'',
        }
        this.handleCustomerNameChange = this.handleCustomerNameChange.bind(this)
        this.handleCustomerAddressChange = this.handleCustomerAddressChange.bind(this)
        this.handleCustomerPhoneNumberChange = this.handleCustomerPhoneNumberChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state}
        data.customer_name = data.customerName;
        delete data.customerName;
        data.customer_address = data.customerAddress;
        delete data.customerAddress;
        data.customer_phone_number = data.customerPhoneNumber;
        delete data.customerPhoneNumber;
        console.log(data)
        const PotentialCustomerUrl = 'http://localhost:8090/api/potential_customers/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const response = await fetch(PotentialCustomerUrl, fetchConfig)
        if (response.ok) {
            alert('New potential customer is created!')
            const newPotentialCustomer = await response.json()
            console.log(newPotentialCustomer);
            const cleared = {
                customerName: '',
                customerAddress: '',
                customerPhoneNumber: '',
            };
            this.setState(cleared);
        }
    }

    handleCustomerNameChange(event) {
        const value = event.target.value
        this.setState({customerName: value})
    }

    handleCustomerAddressChange(event) {
        const value = event.target.value
        this.setState({customerAddress: value})
    }

    handleCustomerPhoneNumberChange(event) {
        const value = event.target.value
        this.setState({customerPhoneNumber: value})
    }

    render() {
      return (
        <div className="my-5 container">
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create Potential Customer</h1>
            <form onSubmit={this.handleSubmit} id="create-potentialcustomer-form">
              <div className="form-floating mb-3">
                <input value={this.state.customerName} onChange={this.handleCustomerNameChange} placeholder="CustomerName" name="customer_name" required type="text" id="customer_name" className="form-control"/>
                <label htmlFor="fabric">Customer Name</label>
              </div>
              <div className="form-floating mb-3">
                <input value={this.state.customerAddress} onChange={this.handleCustomerAddressChange} placeholder="CustomerAddress" name="customer_address" required type="text" id="customer_address" className="form-control"/>
                <label htmlFor="style_name">Customer Address</label>
              </div>
              <div className="form-floating mb-3">
                <input value={this.state.customerPhoneNumber} onChange={this.handleCustomerPhoneNumberChange} placeholder="CustomerPhoneNumber" name="customer_phonenumber" required type="text" id="customer_phonenumber" className="form-control"/>
                <label htmlFor="style_name">Customer Phone Number</label>
              </div>
              <button className="btn btn-primary">Create!</button>
            </form>
          </div>
        </div>
      </div>
      </div>
      );
    }
  }

export default PotentialCustomerForm