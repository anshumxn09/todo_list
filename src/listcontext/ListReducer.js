const ItemsReducer = (state, action) => {
    switch(action.type){
        case 'EDIT_ME':
            let value = state.items.find((elem, index)=>{
                return action.payload.id === index;
            })
            action.payload.setMyData(value);
            state.isEdit = true;
            state.editIndex = action.payload.id;
            state.actualItems = state.items
            return {
                ...state,
            }
        case 'DELETE_ME':
            state.items = state.items.filter((elem, index) => {
                return index != action.payload;
            })
            state.actualItems = state.items;
            return {
                ...state,
            }
        case 'SET_LOCAL' : 
            localStorage.setItem('actual', JSON.stringify(state.actualItems));
            localStorage.setItem('items', JSON.stringify(state.items));
            return {
                ...state
            }
        case 'ADD_TO_LIST':
            if(action.payload.data && state.isEdit===false){
                let getAny = state.items.find((elem) => {
                    return elem === action.payload.data;
                })
                if(!getAny){
                    state.items = [...state.items, action.payload.data];
                    action.payload.setMyData("");
                }else window.alert('oops! already present');
            }
            if(action.payload.data && state.isEdit){
                state.items = state.items.map((elem, index) => {
                    if(index===state.editIndex){
                        return action.payload.data;
                    }else{
                        return elem;
                    }
                })
                action.payload.setMyData("");
                state.isEdit = false;
            }
            state.actualItems = state.items
            console.log(state.actualItems);
            return {
                ...state,
            } 
        default : 
            return {
                ...state,
            }
    }
}

export default ItemsReducer;