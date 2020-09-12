import React, {Component} from 'react';

export default class Information extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inventory: [], 
            newItemDescription: '',
            newItemQuantity: '',
            currentPage: 1 ,
            paginationCount: 5,
        }
    }

    render() {
               return (
            <div className="container">
                <h3>Information</h3>
                <p>This application is a simple inventory management system. 
                    It interacts with an API to access a live database so the information modified, created, or deleted on this application will impact the database. Feel free to mess around with the application in anyway you feel like.
                    Using the above links in the navigation bar will allow you to interact with the various functions of this application. What each page does is described below.
                    <br/><b>Note*</b> When there are more than 5 items in the inventory list, every table will have pagination enabled allowing you to use the previous/next buttons to view the inventory list in 5 item increments.

                    <br/><br/><b>Inventory:</b> Shows the name of items in inventory and their current quantity.
                    <br/><b>Restock/Use:</b> Change quantity of items in inventory by entering the amount and pressing the restock/use buttons.
                    <br/><b>Create Items:</b> Fill in the respective item information and press the create button to add new items to the inventory list.
                    <br/><b>Remove Items:</b> Remove items in the inventory list by selecting the delete button next to the item in the table.

                    


                </p>
                <h3>About Me</h3>
                <p>Project created by Martin Beck. A graduate from the MS programs at UT Austin. This was my first time using the MERN tech stack to create a web application.
                    If you're curious about my process creating this application, checkout my article available [here] on medium that goes into detail.

                </p>
                <footer style={{marginTop:"70px"}}>
                </footer>
            </div>
            
        )}
}