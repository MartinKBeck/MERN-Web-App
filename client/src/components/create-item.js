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
            newItemQuantity: '',
            currentPage: 1 ,
            paginationCount: 5,
        }
    }

    // Starting lifecycle and calling for data from database
    componentDidMount() {
        axios.get('/inv/')
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
        // Creating copy of current inventory state and concatenating new object
        const holderArray = this.state.inventory.concat({_id: id, description: this.state.newItemDescription, quantity: this.state.newItemQuantity})

        // Setting new state
        this.setState({
            inventory: holderArray
        })
    }

    // Function called when button is pressed
    async onSubmit(e) {
        e.preventDefault()

        const newItem = {
            description: this.state.newItemDescription,
            quantity: this.state.newItemQuantity
        }
        
        await axios.post('/inv/', newItem)
        .then(res => {
            console.log(res.data.message);
            this.onChangeItem(res.data.id);
        })

        this.setState({
            newItemDescription: '',
            newItemQuantity: ''
        })
    }

    // Function call for previous page button
    previousPage = () => {
        if (this.state.currentPage !==1){
            this.setState({
                currentPage: this.state.currentPage - 1})
        }
    }

    // Function call for next page button
    nextPage = () => {
        if (this.state.currentPage + 1 <= Math.ceil(this.state.inventory.length/this.state.paginationCount)){
            this.setState((prevState) => ({currentPage: (prevState.currentPage + 1)}))
        }           
    }

    // Mapping out GET data
    inventoryList() {
        // Slicing data for table pagination
        return this.state.inventory.slice(
            (this.state.paginationCount * (this.state.currentPage - 1)), 
            (this.state.paginationCount * (this.state.currentPage))).map((inventory) =>{
            return(
                <tr key={inventory._id}>
                    <td>{inventory.description}</td>
                    <td>{inventory.quantity}</td>
                </tr> 
            );
        })
    }

    render() {
        // Conditional setup for rendering previous/next page buttons
        let previousEligible = false
        if (this.state.currentPage<=1){
            previousEligible = false
        }
        else{
            previousEligible = true
        }

        let nextEligible = true
        if(this.state.currentPage + 1 > Math.ceil(this.state.inventory.length/this.state.paginationCount)){
            nextEligible = false
        }
        else{
            nextEligible = true
        }

        return (
            <div className="container">
                <h3>Create Items</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Item Name: </label>
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

                <h4>Current Inventory</h4>
                <table className="table table-striped table-bordered table-hover" style={{marginTop:20}}>
                    <thead>
                        <tr>
                            <th>Item Name</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.inventoryList()}
                    </tbody>
                </table>
                {previousEligible && <button className="btn btn-info" onClick={this.previousPage}>Previous Page</button>}
                {nextEligible && <button className="btn btn-info" onClick={this.nextPage} style={{float: 'right'}}>Next Page</button>}
            
                <footer style={{marginTop:"70px"}}>
                </footer>
            </div>
            
        )}
}