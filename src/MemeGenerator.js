import React from "react"

function MemeGenerator(props) {

    return (
        <div className="meme-generator">
            <div className="meme">
                <img src={props.randomImage ? props.randomImage : null} alt="" />
                <h2 className="top">{props.topText}</h2>
                <h2 className="bottom">{props.bottomText}</h2>
            </div>
            <form onSubmit={props.submitForm} className="meme-form">
                <input
                    type="text"
                    name="topText"
                    placeholder="Top Text"
                    value={props.topText}
                    onChange={props.changeHandler}
                />
                <input
                    type="text"
                    name="bottomText"
                    placeholder="Bottom Text"
                    value={props.bottomText}
                    onChange={props.changeHandler}
                />
                <button>Generate Meme</button>
            </form>


        </div>
    )
}

export default MemeGenerator