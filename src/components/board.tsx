import React, { useEffect, useState } from "react";
import { Player } from "./player";
import "./board.css"
import Square from "./square";
import { Game } from "./game";

export default function Board(props: {game: Game | undefined}) {
    const [player1, setPlayer1] = useState<Player | undefined>(props.game?.player1)
    const [player2, setPlayer2] = useState<Player | undefined>(props.game?.player2)
    const [token, setToken] = useState(props.game?.token)
    const [square, setSquare] = useState()
    const [gameCanStart, setGameCanStart] = useState(false)
    const [turn, setTurn] = useState<Player>()

    const boardSquares = [1,2,3,4,5,6,7,8,9]

    const winLines = [
        //Left to right
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        //Up to down
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        //Diagonals
        [0, 4, 8],
        [2, 4, 6]
    ];

    const handleClick = (i: any) => {
        return(
            i
        )
    }

    //chequeamos si ambos jugadores estan en la partida para iniciar
    useEffect(() => {
        let check = setInterval(
            () => checkGameCanStart(),
            1000
        );

        const checkGameCanStart = () => {
            if (player1 && player2) {
                setGameCanStart(true)
                setFirstTurn()
                clearInterval(check)
            }
        }
    })
    
    const setFirstTurn = () => {
        const firstTurn = randomIntFromInterval(1,2)
        
        if (firstTurn === 1) {
            setTurn(player1)
        } else {
            setTurn(player2)
        }
    }

    const randomIntFromInterval = (min: number, max: number) => { 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    const checkPlayerMove = () => {

    }

    return(
        <div className="container">
            <div className="tablero">
            {boardSquares.map((s) => {
                return(
                    <Square 
                        number={s}
                        onClick= {() => handleClick(s)}
                    />
                )
            })}           
        </div>
        </div>
        
    )
}
