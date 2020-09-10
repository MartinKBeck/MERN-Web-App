import React, {Component} from 'react';
import axios from 'axios';

export default class UpdateList extends Component {
    constructor(props) {
        super(props);

        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeQuantity = this.onChangeQuantity.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            inventory: [], 
            newItemDescription: '',
            newItemQuantity: ''
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

    // Function to change state value
    onChangeDescription(e) {
        this.setState({
            newItemDescription: e.target.value
        });
    }

    // Function to change state value
    onChangeQuantity(e) {
        this.setState({
            newItemQuantity: e.target.value
        })
    }

    // Helper function to change state value, since is array must create copy and modify copy
    onChangeItem(id) {
        this.setState({
            inventory: this.state.inventory.concat({description: this.state.newItemDescription, quantity: this.state.newItemQuantity, key:id})
        })
    }

    // Function called when button is pressed
    async onSubmit(e) {
        e.preventDefault()

        const newItem = {
            description: this.state.newItemDescription,
            quantity: this.state.newItemQuantity
        }

        await axios.post('http://localhost:4000/inv/', newItem)
        .then(res => {
            console.log(res.data.message);
            this.onChangeItem(res.data.id);
        })

        this.setState({
            newItemDescription: '',
            newItemQuantity: ''
        })
    }

    // Mapping out GET data
    inventoryList() {
        return this.state.inventory.map((inventory) =>{
            return(
                <tr key={inventory._id}>
                    <td>{inventory.description}</td>
                    <td>{inventory.quantity}</td>
                </tr> 
            );
        })
    }

    render() {
        return (
            <div>
                <h3>Create Items</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                        className="form-control"
                        value={this.state.newItemDescription}
                        onChange={this.onChangeDescription}/>
                    </div>
                    <div className="form-group">
                        <label>Quantity: </label>
                        <input type="number"
                        className="form-control"
                        value={this.state.newItemQuantity}
                        onChange={this.onChangeQuantity}/>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Item" className="btn btn-success"/>
                    </div>
                </form>

                <h4>Previous Items</h4>
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
        )}
}