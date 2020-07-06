import Item1 from '../../images/item1.jpg'
import Item2 from '../../images/item2.jpg'
import Item3 from '../../images/item3.jpg'
import Item4 from '../../images/item4.jpg'
import Item5 from '../../images/item5.jpg'
import Item6 from '../../images/item6.jpg'
import { ADD_TO_CART,REMOVE_ITEM,SUB_QUANTITY,ADD_QUANTITY,ADD_SHIPPING,ITEMS_SEARCH } from '../actions/action-types/cart-actions'


const initState = {
    items: [
        { id: 1, title: 'Red Clay Brick', desc: "Stuccoed Red Brick Peel and Stick Wallpaper.", price: 50,img:Item1},
        { id: 2, title: 'Hallow Clay Red Brick', desc: "Nw Standard 20Cm red.", price:80,img: Item2},
        { id: 3, title: 'Standard Red Bricks', desc: "Carriage House Brick Accent Panelling.",price:80,img: Item3},
        { id: 4, title: 'Pre- mixed Mortar', desc: "Pre-Mixed Tile & Stone Thin-Set Mortar - White 3.9L", price:260,img:Item4},
        { id: 5, title: 'Custom Building Mortar', desc: "Custom Building Products PremiumPlus Standard Thin-Set Mortar White 22.68 Kg.", price:160,img: Item5},
        { id: 6, title: 'Building Product MegaLite Mortar', desc: "Custom Building Products MegaLite 30 lb. Ultimate Performance Mortar in White.",price:90,img: Item6}
    ],
    addedItems:[],
    filteredItems:[],
    total: 0

}
const cartReducer= (state = initState,action)=>{
   
    //INSIDE HOME COMPONENT
    if(action.type === ADD_TO_CART){
          let addedItem = state.items.find(item=> item.id === action.id)
          //check if the action id exists in the addedItems
         let existed_item= state.addedItems.find(item=> action.id === item.id)
         if(existed_item)
         {
            addedItem.quantity += 1 
             return{
                ...state,
                 total: state.total + addedItem.price 
                  }
        }
         else{
            addedItem.quantity = 1;
            //calculating the total
            let newTotal = state.total + addedItem.price 
            
            return{
                ...state,
                addedItems: [...state.addedItems, addedItem],
                total : newTotal
            }
            
        }
    }
    if(action.type === REMOVE_ITEM){
        let itemToRemove= state.addedItems.find(item=> action.id === item.id)
        let new_items = state.addedItems.filter(item=> action.id !== item.id)
        
        //calculating the total
        let newTotal = state.total - (itemToRemove.price * itemToRemove.quantity )
        console.log(itemToRemove)
        return{
            ...state,
            addedItems: new_items,
            total: newTotal
        }
    }
    //INSIDE CART COMPONENT
    if(action.type=== ADD_QUANTITY){
        let addedItem = state.items.find(item=> item.id === action.id)
          addedItem.quantity += 1 
          let newTotal = state.total + addedItem.price
          return{
              ...state,
              total: newTotal
          }
    }
    if(action.type=== SUB_QUANTITY){  
        let addedItem = state.items.find(item=> item.id === action.id) 
        //if the qt == 0 then it should be removed
        if(addedItem.quantity === 1){
            let new_items = state.addedItems.filter(item=>item.id !== action.id)
            let newTotal = state.total - addedItem.price
            return{
                ...state,
                addedItems: new_items,
                total: newTotal
            }
        }
        else {
            addedItem.quantity -= 1
            let newTotal = state.total - addedItem.price
            return{
                ...state,
                total: newTotal
            }
        }
        
    }
    if(action.type === ITEMS_SEARCH){            
        let filtered = state.items.filter((item) => item.title.toLocaleLowerCase().includes(action.keyword));
        return {    
            ...state,        
            filteredItems: filtered 
        }  
    }

    if(action.type=== ADD_SHIPPING){
          return{
              ...state,
              total: state.total + 6
          }
    }

    if(action.type=== 'SUB_SHIPPING'){
        return{
            ...state,
            total: state.total - 6
        }
  }
    
  else{
    return state
    }
    
}

export default cartReducer
