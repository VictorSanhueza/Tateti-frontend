import React from "react";
import { Player } from "./player";

export interface Game {
    id: string,
    player1: Player,
    player2: Player,
    token: string
} 
