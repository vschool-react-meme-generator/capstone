import React from "react"

function MemeWidget(props) {

    if(props.editMode === false) {
        return(
            <div className="meme-widgets">
                    <div className="saved-meme-widget">
                        <img className="widget-image" src={props.image} />
                        <input className="saved-meme-toptext" placeholder={props.toptext} ></input>
                        <input className="saved-meme-bottomtext" placeholder={props.toptext} ></input>
                        
                    </div>
                    
                    <div className="widget-buttons">
                        <button onClick={props.edit} id={props.id}>Save</button>
                    </div>
                </div>
        )
        

    } else {
        return (

                <div className="meme-widgets">
                    <div className="saved-meme-widget">
                        <img className="widget-image" src={props.image} />
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