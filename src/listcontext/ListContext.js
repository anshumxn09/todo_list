import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from './ListReducer';


const getItems = () => {
    let items = localStorage.getItem("items");

    if(items){
        return JSON.parse(items);
    }else return [];
}

const ListContext = createContext();
const initialState = {
    items : getItems(),
    isEdit : false,
    editIndex : 0,
    actualItems : [],
}

const ListProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const addToTheList = (data, setMyData) => {
        dispatch({type : "ADD_TO_LIST", payload : {data, setMyData}});
    }

    const deleleThisItem = (id) => {
        dispatch({type : "DELETE_ME", payload : id});
    }

    const editThisItem = (id, setMyData) => {
        dispatch({type : "EDIT_ME", payload : {id, setMyData}})
        console.log(state.isEdit);
    }

    useEffect(() => {
        dispatch({type : "SET_LOCAL"})
    }, [state.items])
    return <ListContext.Provider value={{...state, addToTheList, deleleThisItem, editThisItem}}>{children}</ListContext.Provider>
}

const useMyItems = () => {
    return useContext(ListContext);
}

export {ListContext, ListProvider, useMyItems};
