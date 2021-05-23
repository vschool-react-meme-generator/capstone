import React from "react"
import MemeWidget from "./MemeWidget"


function App() {
    return(
        <div className="master">
            <div className="left-container">
                <div className="meme-generator">
                    <p>Roy's Meme Generator Component will go here</p> 
                    {/* Roy's meme generator component goes here */}
                </div>
                
            </div>
            <div className="right-container">
                {/* all of these components below are hardcoded right now for visual reference only. They will only exist after someone submits the meme from the meme generator */}
                <MemeWidget />  
                <MemeWidget /> 
                <MemeWidget /> 
                <MemeWidget />        
            </div>           
        </div>

    )
}

export default App
