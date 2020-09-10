import React, {Component} from 'react';
import axios from 'axios';
import {TablePagination} from 'react-pagination-table';
import ReactPaginate from 'react-paginate';

export default class InventoryList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inventory: [],
            currentPage: 1 ,
            paginationCount: 5
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

    previousPage = () => {
        if (this.state.currentPage !==1){
            this.setState({
                currentPage: this.state.currentPage - 1})
        }

    }
    nextPage = () => {
        if (this.state.currentPage + 1 <= Math.ceil(this.state.inventory.length/this.state.paginationCount)){
            this.setState((prevState) => ({currentPage: (prevState.currentPage + 1)}))
        }
            
    }

    // Mapping out GET data
    inventoryList() {
        
        const currentPage = this.state  

        return this.state.inventory.slice(
            (this.state.paginationCount * (this.state.currentPage - 1)), 
            (this.state.paginationCount * (this.state.currentPage))).map((inventory) =>
            {
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
            <div className="container">
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
                <div className="btn-toolbar">
                    <button onClick={this.previousPage}>Previous Page</button>
                    <button onClick={this.nextPage}>Next Page</button>
                </div>
            </div>
        )
    }
}