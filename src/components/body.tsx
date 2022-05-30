import React, {useState} from "react";
import "bootstrap/dist/css/bootstrap.css";
import Register from "./register"
import PlayerList from "./playerList"
import axios from "axios";
import Board from "./board";
import { useErrorHandler } from "../common/ErrorHandler";
import { Game } from "./game";
import { Player } from "./player";

export default function Body() {    
    const [showHome, setShowHome] = useState(true);
    const [showRegister, setShowRegister] = useState(false);
    const [showError, setShowError] = useState(false);
    const [showPlayerList, setShowPlayerList] = useState(false);
    const [newGame, setNewGame] = useState(false)
    const [token, setToken] = useState("")
    const [game, setGame] = useState<Game>()


    const errorHandler = useErrorHandler()


    const register = () => {
        setShowRegister(true);
        setShowPlayerList(false);
    }

    const login = () => {
        setShowPlayerList(true);
        setShowRegister(false);
    }
        
    const hideHome = () => {
        setShowHome(false);
    }

    const startGameWith = async (newToken: string, player: Player) => {

        try {
            const game = await getGame(newToken, player)
            setShowPlayerList(false)
            setShowRegister(false)
            setGame(game)
            if (game && game.player1) {
                joinGame(player)
            } else {
                startGame(player)
            }
        } catch (error) {
            errorHandler.processRestValidations(error)
        }
    }

    const joinGame = (player: Player) => {
        if (game) {
            game.player2 = player
        }
        setBoard()
    }

    const startGame = (player: Player) => {
        if (game) {
            game.player1 = player   
        }
        setBoard()
    }

    const setBoard = () => {
        setNewGame(true)
    }

    async function getGame(token: string, player: Player) : Promise<Game> {
        const res =  (await axios.get("http://localhost:3000/games", {
            headers: {token: token, player_id: player.id}
        })).data as Game
        return res
    }

    return (
        <div className="container" id="bienvenido">
            <h1 className="jumbotron-heading">Bienvenido a Ta-Te-Ti</h1>
            {showHome ? (
                <div>
                    <div className="row">
                            <div className="col-md-2"></div>
                            <button
                                onClick={register}
                                className="btn btn-success col-md-3">
                                Registrarse
                            </button>
                            <button
                                onClick={login}
                                className="btn btn-success col-md-3 offset-md-2">
                                Ingresar
                            </button>
                    </div>            
                </div>
            ) : null}
            <br/>
            <br/>
            <br/>
            {showRegister ? (
                <Register getGame={startGameWith}/>
            ) : null}
            {showPlayerList ? (
                <PlayerList getGame={startGameWith}/>
            ) : null}
            {newGame ? (
                <Board game={game} />                  
            ) : null}
        </div>

    );      

}

