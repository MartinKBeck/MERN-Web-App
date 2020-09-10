import React, {Component} from 'react';
import axios from 'axios';

export default class InventoryList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inventory: []
        }
    }

    // When page renders use GET function to pull in data from db
    componentDidMount() {
        axios.get('http://localhost:4000/inv/')
        .then(response => {
            this.setState({inventory: response.data});
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    // Mapping of data from state
    inventoryList = (inventory) =>{
        return inventory.map((inventory) => (
            <tr>
                <td>{inventory.description}</td>
                <td>{inventory.quantity}</td>
            </tr>
        ))
    }

    render() {
        return (
            <div>
                <h3>Inventory List</h3>
                <table className="table table-striped table-bordered table-hover" style={{marginTop:20}}>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Quantity</th>
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