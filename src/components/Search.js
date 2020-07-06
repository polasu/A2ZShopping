import React, { Component } from 'react';


class Search extends Component{
    constructor(){
        super()
        this.state = {
            title: 'Search',
            keyword: ''
        }
    }
    
    inputChange(event) {
        //console.log(event.target.value);
        this.setState({ "keyword": event.target.value ? event.target.value : "User Text Here" })

        this.props.userText(event.target.value)
    }

    render() {       
        // in order to pass an object to a function we need to bind then use this keyword
        return (
            <div>                
                <input 
                    placeholder="search items here" 
                    onChange={this.inputChange.bind(this)} /> 
            </div>                
        )
    }

}
export default Search;