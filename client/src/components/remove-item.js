import React, {Component} from 'react';
import axios from 'axios';

export default class UpdateList extends Component {
    constructor(props) {
        super(props);
        
        this.removeItem = this.removeItem.bind(this);

        this.state = {
            inventory: [],
            currentPage: 1 ,
            paginationCount: 5
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
        await axios.delete('/inv/' + id)
        .then(res =>{
            // Helper function to remove item from state
            this.onChangeItem(index)
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

    // Mapping out GET data and create remove button
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
                {previousEligible && <button className="btn btn-info" onClick={this.previousPage}>Previous Page</button>}
                {nextEligible && <button className="btn btn-info" onClick={this.nextPage} style={{float: 'right'}}>Next Page</button>}
            </div>
        )
    }
}