import React, {Component} from 'react';
import axios from 'axios';

export default class UpdateList extends Component {
    constructor(props) {
        super(props);
        
        this.onRemoveItem = this.onRemoveItem.bind(this);

        this.state = {
            inventory: []
        }
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

    // Helper function to change state value, since is array must create copy and modify copy
    onRemoveItem(index) {
        // Creating copy of current inventory state
        const holderArray = this.state.inventory.slice()

        // Removing chosen item from array
        holderArray.splice(index, 1)

        // Setting new state
        this.setState({
            inventory: holderArray
        })
    }

    onRemoveButton(id, index) {
        // After patch has been confirmed to database change state to change component
        axios.delete('http://localhost:4000/inv/' + id)
        .then(res =>{
            // Helper function to remove item from state
            this.onRemoveItem(index)
            console.log(res.data)  
        });

    } 

    // Creating function to map out data and create input/buttons
    inventoryList = (inventory) =>{
        
        return inventory.map((inventory, index) => (
            <tr>
                <td>{inventory.description}</td>
                <td>{inventory.quantity}</td>
                <td>

                    <button type="button" id='btnDelete' class="btn-danger btn-sm" 
                    onClick={ e => 
                        window.confirm("Are you sure you want to delete this item?") &&                    
                        this.onRemoveButton(inventory._id, index)}>Remove</button>                
                            
                </td>
            </tr>
        ))
    }

    changeInventory(id, amount, quantity, index){
        // console.log(this.state.inventory)
        var newQuantity = Number(quantity) + Number(amount)
        
        // Helper function  to change state to trigger component lifecycle
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
                <h3>Remove Items</h3>
                <table className="table table-striped table-bordered table-hover" style={{marginTop:20}}>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Quantity</th>
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