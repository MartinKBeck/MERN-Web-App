import React, {Component} from 'react';
import axios from 'axios';

export default class UpdateList extends Component {
    constructor(props) {
        super(props);
        
        this.removeItem = this.removeItem.bind(this);

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
    onChangeItem(index) {
        // Creating copy of current inventory state
        const holderArray = this.state.inventory.slice()

        // Removing chosen item from array
        holderArray.splice(index, 1)

        // Setting new state
        this.setState({
            inventory: holderArray
        })
    }

    // Function called when button is pressed
    async removeItem(id, index) {
        // After patch has been confirmed to database change state to change component
        await axios.delete('http://localhost:4000/inv/' + id)
        .then(res =>{
            // Helper function to remove item from state
            this.onChangeItem(index)
            console.log(res.data)  
        });

    } 

    // Mapping out GET data and create remove button
    inventoryList() {
        return this.state.inventory.map((inventory, index) =>{
            return(
                <tr key={inventory._id}>
                    <td>{inventory.description}</td>
                    <td>{inventory.quantity}</td>
                    <td>
                        <button type="button" id='btnDelete' className="btn-danger btn-sm" 
                        onClick={ e => 
                        window.confirm("Are you sure you want to delete this item?") &&                    
                        this.removeItem(inventory._id, index)}>Remove</button>                    
                    </td>
                </tr> 
            );
        })
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
                        {this.inventoryList()}
                        </tbody>
                </table>
            </div>
        )
    }
}