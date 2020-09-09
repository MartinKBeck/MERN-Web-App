import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const Inventory = props => (
    <tr>
        <td>{props.inventory.description}</td>
        <td>{props.inventory.quantity}</td>
    </tr>
)

export default class InventoryList extends Component {
    constructor(props) {
        super(props);
        this.state = {inventory: []}
    }

    componentDidMount() {
        axios.get('http://localhost:4000/inv/')
        .then(response => {
            this.setState({inventory: response.data});
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    // componentDidUpdate(){
    //     axios.get('http://localhost:4000/inv/')
    //     .then(response => {
    //         this.setState({inventory: response.data});
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     })
    // }

    inventoryList(){
        return this.state.inventory.map(function(currentInventory, i) {
            return <Inventory inventory={currentInventory} key={i} />;
        })
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
                        {this.inventoryList()}
                        
                    </tbody>
                </table>
            </div>
        )
    }
}