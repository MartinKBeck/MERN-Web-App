import React, {Component} from 'react';
import axios from 'axios';

export default class UpdateList extends Component {
    constructor(props) {
        super(props);
        
        this.modifyQuantity = this.modifyQuantity.bind(this);
        this.onChangeAmount = this.onChangeAmount.bind(this);
        
        this.state = {
            inventory: [], 
            amount: '',
            currentPage: 1 ,
            paginationCount: 5,
            errors: {}
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

    // Function called when button is pressed
    async modifyQuantity(id, amount, quantity, index){
        var newQuantity = Number(quantity) + Number(amount)
        if (newQuantity<0){
            alert("Inventory cannot be less than 0")
        }
        // Setting up object to be sent in patch request
        const obj = {
            quantity: newQuantity
        }
        
        // After patch has been confirmed to database change state to change component
        await axios.patch('/inv/'+id, obj)
        .then(res =>{
            // Helper function to change state to trigger component lifecycle
            this.onChangeQuantity(newQuantity, index)
            console.log(res.data.message)  
        });
        
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

    // Mapping out GET data and creating input/buttons
    inventoryList() {
        // Slicing data for pagination table
        return this.state.inventory.slice(
            (this.state.paginationCount * (this.state.currentPage - 1)), 
            (this.state.paginationCount * (this.state.currentPage))).map((inventory, index) =>{
            return(
                <tr key={inventory._id}>
                    <td>{inventory.description}</td>
                    <td>{inventory.quantity}</td>
                    <td>
                        <input type='number' className="form-control"
                        onChange={this.onChangeAmount}/>
                    </td>
                    <td>
                        <div className="btn-toolbar">
                            <button type="button" id='btnRestock' className="btn-primary btn-sm" onClick={() => this.modifyQuantity(inventory._id, this.state.amount, inventory.quantity, index)}>Restock</button>
                            <button type="button" id='btnUse' className="btn-danger btn-sm" onClick={() => this.modifyQuantity(inventory._id, -this.state.amount, inventory.quantity, index)}>Use</button>
                        </div>
                    </td>
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
                <h3>Restock/Use</h3>
                <table className="table table-striped table-bordered table-hover" style={{marginTop:20}}>
                    <thead>
                        <tr>
                            <th>Item Name</th>
                            <th>Current Quantity</th>
                            <th>Change Amount</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.inventoryList()}
                        </tbody>
                </table>
                {previousEligible && <button className="btn btn-info" onClick={this.previousPage}>Previous Page</button>}
                {nextEligible && <button className="btn btn-info" onClick={this.nextPage} style={{float: 'right'}}>Next Page</button>}
            </div>
        )
    }
}