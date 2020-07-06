import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addToCart } from './actions/cartActions'
import { itemsSearch } from './actions/cartActions'
import Serach from './Search';

 class Home extends Component{
  
    handleClick = (id)=>{
        this.props.addToCart(id); 
    }
    
    filterItems(keyword){
        this.props.itemsSearch(keyword.toLowerCase());
    }
    render(){
        let itemList = this.props.filteredItems.map(item=>{
            return(
                <div className="row" key={item.id}>
                    <div className="col s3 m3" key={item.id}>
                        <div className="card" key={item.id}>
                                <div className="card-image">
                                    <img src={item.img} alt={item.title}/>
                                <span className="card-title black-text">{item.title}</span>
                                    <span to="/" className="btn-floating halfway-fab waves-effect waves-light red" onClick={()=>{this.handleClick(item.id)}}><i className="material-icons">add</i></span>
                                </div>

                                <div className="card-content">
                                    <p>{item.desc}</p>
                                    <p><b>Price: {item.price}$</b></p>
                                </div>
                        </div>
                    </div>
                </div>
            )
        })

        return (
          <div className="container">
            <h3 className="center">Our items</h3>
            <div><Serach userText={(userInput) => { this.filterItems(userInput) }}/></div>                
            <div className="box">{itemList}</div>
          </div>
        );
    }
}
const mapStateToProps = (state)=>{
    return {
        items: state.items,
        filteredItems: (state.filteredItems.length === 0 ? state.items : state.filteredItems)
    }
  }
const mapDispatchToProps= (dispatch)=>{
    
    return{
        addToCart: (id)=>{dispatch(addToCart(id))},
        itemsSearch: (keyword) => { dispatch(itemsSearch(keyword))}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home)