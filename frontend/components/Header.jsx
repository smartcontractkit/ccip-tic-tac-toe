import React, { useContext, useState } from "react";
import { AppContext } from "../pages";
import Playing from "./Playing";
import End from "./End";
import Winner from "./Winner";

function Header() {
    
    const { winner, gameOver } = useContext(AppContext)

    return (
        <div >
            { !winner && !gameOver && <Playing /> }
            { gameOver && !winner && <End /> }
            { winner && <Winner /> }
        </div>
    )
}

export default Header