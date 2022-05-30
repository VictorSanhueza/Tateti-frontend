import React, { useState } from "react"
import { Form } from "react-bootstrap"
import DangerLabel from "../common/DangerLabel"
import { useErrorHandler } from "../common/ErrorHandler"
import ErrorLabel from "../common/ErrorLabel"
import FormButton from "../common/FormButton"
import FormInput from "../common/FormInput"

export default function TokenValue(props: any) {
    const [tokenOption, setTokenOption] = useState<string>()
    const [newToken, setNewToken] = useState<string>("")

    const errorHandler = useErrorHandler()

    const handleClick = (choice: boolean) => {
        if (choice) {
            setNewToken((Math.random() + 1).toString(36).substring(7))
            setTokenOption("1")
        } else {
            setNewToken("")
            setTokenOption("2")
        }
    }

    const handleJoinGame = () => {
        errorHandler.cleanRestValidations()
        if (!newToken) {
            errorHandler.addError("tokenValue2", "No puede estar vacío")
        }
        if (!errorHandler.hasErrors()) {
            return
        }
        props.onClick(newToken)
    }

    return(
        <div className="container">
            <div>
                <div className="row">
                    <div className="col-md-2"></div>
                    <button
                        onClick={() => handleClick(true)}
                        className="btn btn-success col-md-3">
                        Nueva Partida
                    </button>
                    <button
                        onClick={() => handleClick(false)}
                        className="btn btn-success col-md-3 offset-md-2">
                        Partida Existente
                    </button>
                </div>            
            </div>
            <br/>
            {tokenOption === "1" ? (
                <Form>
                    <FormInput
                        label="Token para invitar a un jugador"
                        leyenda="Token"
                        errorHandler={errorHandler}  
                        name="tokenValue"
                        value={newToken}
                        onChange={(e) => setNewToken(e.target.value)}
                    />
                    <br/>           
                    <FormButton label="Ingresar" onClick={props.onClick(newToken)}></FormButton>
                </Form>
            ) : null }
            {tokenOption === "2" ? (
                <Form>
                    <FormInput
                        label="Ingrese el token para unirse a una partida"
                        leyenda="Token"
                        errorHandler={errorHandler}
                        name="tokenValue"
                        value={newToken}
                        onChange={(e) => setNewToken(e.target.value)}
                    />
                    <DangerLabel message={errorHandler.errorMessage}/>
                    <br/>
                    <FormButton label="Unirse" onClick={handleJoinGame}></FormButton>
                </Form>            
            ) : null }                      
        </div>
    )
}