import React, { useState } from 'react'
import { useMyItems } from '../listcontext/ListContext';
import './Todo.css';

const TodoList = () => {
    const [data, setMyData] = useState("");
    const {items, addToTheList, deleleThisItem, editThisItem, isEdit} = useMyItems();

  return (
    <div className="containerMain">
        <div className="myContainerData">
            <h2><i class="fa-solid fa-trophy"></i> Hey Champion <i class="fa-solid fa-trophy"></i></h2>
            <p>Create Your Day Task</p>
            <div className="inputContainer">
                <input type="text" value={data} onChange={(e) => setMyData(e.target.value)}/>
                <button type='button' onClick={() => addToTheList(data, setMyData)}>{
                    isEdit ? <i class="fa-solid fa-pen"></i>: <i class="fa-solid fa-plus"></i>
                }</button>
            </div>
            <div className="todoData">
                {
                    items.map((elem, index) => {
                        return (
                            <div className="data" key={index}>
                                <p>{elem}</p>
                                <div className="btnForEdit">
                                    <button type='button' onClick={() => editThisItem(index, setMyData)}><i class="fa-solid fa-pen"></i></button>
                                    <button type='button' onClick={() => deleleThisItem(index)}><i class="fa-solid fa-trash"></i></button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default TodoList;