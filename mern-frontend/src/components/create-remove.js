import React, {Component} from 'react';
import axios from 'axios';

export default class UpdateList extends Component {
    constructor(props) {
        super(props);
        this.state = {inventory: [], amount: ''}

        this.changeInventory = this.changeInventory.bind(this);
        this.onChangeAmount = this.onChangeAmount.bind(this);
    }

    // Starting lifecycle and calling for data from database
    componentDidMount() {
        axios.get('http://localhost:4000/inv/')
        .then(response => {
            this.setState({inventory: response.data});
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    // Helper function to change state value
    onChangeAmount(e) {
        this.setState({
            amount: e.target.value
        });
    }

    // Helper function to change state value, since is array must create copy and modify copy
    onChangeQuantity(e, index) {
        const newQuantity = this.state.inventory.slice()
        newQuantity[index].quantity = e
        this.setState({
            inventory: newQuantity
        })
    }

    // Creating function to map out data and create input/buttons
    inventoryList = (inventory) =>{
        
        return inventory.map((inventory, index) => (
            <tr>
                <td>{inventory.description}</td>
                <td>{inventory.quantity}</td>
                <td>
                        <button type="button" id='btnDelete' class="btn-danger btn-sm" onClick={() => this.changeInventory(inventory._id, -this.state.amount, inventory.quantity, index)}>Remove</button>                
                </td>
            </tr>
        ))
    }

    changeInventory(id, amount, quantity, index){
        // console.log(this.state.inventory)
        var newQuantity = Number(quantity) + Number(amount)
        
        // Helper function to change state to trigger component lifecycle
        this.onChangeQuantity(newQuantity, index)
        
        // Setting up object to be sent in patch request
        const obj = {
            quantity: newQuantity
        }
        
        // After state has changed send patch to database to udpate
        axios.patch('http://localhost:4000/inv/'+id, obj)
        .then(res => console.log(res.data));
    }

    render() {
        return (
            <div>
                <h3>Restock/Use</h3>
                <table className="table table-striped table-bordered table-hover" style={{marginTop:20}}>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Current Quantity</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.inventoryList(this.state.inventory)}
                        </tbody>
                </table>
            </div>
        )
    }
}