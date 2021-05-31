import React from "react"

function MemeWidget(props) {
    //console.log(props)
    if(props.editMode === true ) {
        /* we probably need to change this one to a form */
        return(
            <div className="meme-widgets-editstate">
                
                <div className="saved-meme-widget-editstate">
                    
                    <img className="widget-image" src={props.image} alt="" />
                    
                    <form onSubmit={props.saveMeme}>
                        <input 
                            id={props.id}
                            name="topText"
                            className="saved-meme-toptext" 
                            placeholder={props.toptext} onChange={props.editChangeHandler} 
                        />
                        
                        <input 
                            id={props.id}
                            name="bottomText"
                            className="saved-meme-bottomtext" placeholder={props.bottomtext} onChange={props.editChangeHandler} 
                        />
                        
                        <div className="widget-buttons">
                            <button className="save-button" onClick={props.saveMeme} id={props.id}>Save Meme</button>
                        </div>                               
                    </form> 
                    
                </div>                 
                    
            </div>
        )
    } else {
        return (
                <div className="meme-widgets">
                    <div className="saved-meme-widget">
                        <img className="widget-image" src={props.image} alt="" />
                        <h3 className="saved-meme-toptext">{props.toptext}</h3>
                        <h3 className="saved-meme-bottomtext">{props.bottomtext}</h3>
                    </div>
                    <div className="widget-buttons">
                        <button onClick={props.edit} id={props.id}>Edit</button>
                        <button onClick={props.delete} id={props.id}>Delete</button>
                    </div>
                </div>
        )
    }
}
export default MemeWidget