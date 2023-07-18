import React, { useContext, useState } from "react";
import { AppContext } from "../pages";

function Playing() {
    
    const { currentChar } = useContext(AppContext)

    return (
        <div>Playing now: <span>{currentChar}</span></div>
    )
}

export default Playing