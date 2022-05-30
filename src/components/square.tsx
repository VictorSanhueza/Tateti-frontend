import React, { useState } from "react";
import "./board.css"
export default function Square(props: any){
    const[number, setNumber] = useState(props.number)
    
    return(
        <button className="square" onClick={props.onClick} data-testid="board-square">
            {props.value}
        </button>
    )
}