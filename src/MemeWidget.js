import React from "react"

function MemeWidget() {
    return (
        <div className="meme-widgets">
            <img className="widget-image" src="https://filmdaily.co/wp-content/uploads/2020/09/DirtyFunnyMemes-lede72-1300x1115.jpg" />
            <div className="widget-buttons">
                <button>Edit</button>
                <button>Delete</button>
            </div>
        </div>
    )
}

export default MemeWidget