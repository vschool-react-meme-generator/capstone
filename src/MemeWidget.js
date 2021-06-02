import React, {Component} from "react"

class MemeWidget extends Component {
    constructor(props) {
        super(props)
        this.state= {
            id: this.props.id,
            editMode:false,
            bottomText: this.props.bottomtext,
            topText: this.props.toptext,
        }

        this.editToggle = this.editToggle.bind(this)
        this.handleChangeEdit = this.handleChangeEdit.bind(this)
        this.saveMeme = this.saveMeme.bind(this)
    }

    editToggle(e) {

        this.setState(prevState => {
            return {
                editMode: !prevState.editMode
            }
        })
    }   

    handleChangeEdit(e) {
            const { name, value } = e.target
            this.setState({ [name]: value })
    }

    saveMeme(e) {
        e.preventDefault()
        let {id} = e.target
        id = Number(id)

        console.log(`FROM MEMEWIDGET'S saveMeme:\n\nid: ${id}\ntoptext: ${this.state.topText}\nbottomtext: ${this.state.bottomText}`)

        this.props.saveEditMeme(id, this.state.topText, this.state.bottomText, this.state.editMode)

        this.setState(prevState => {
            return {
                editMode: !prevState.editMode
            }
        })
        
    }

    render() {
        //console.log(props)
        if(this.state.editMode === true ) {
            
            //editMode = ON
            return(
                <div className="meme-widgets-editstate">
                    
                    <div className="saved-meme-widget-editstate">
                        
                        <img className="widget-image" src={this.props.image} alt="" />
                        
                        <form onSubmit={this.saveMeme} id={this.props.id}>
                            <input 
                                id={this.props.id}
                                name="topText"
                                className="saved-meme-toptext" 
                                placeholder={this.props.toptext}
                                onChange={this.handleChangeEdit}
                            />
                            
                            <input 
                                id={this.props.id}
                                name="bottomText"
                                className="saved-meme-bottomtext" placeholder={this.props.bottomtext}
                                onChange={this.handleChangeEdit} 
                            />
                            
                            <div className="widget-buttons">
                                <button className="save-button" id={this.props.id}>Save Meme</button>
                                
                            </div>                               
                        </form> 
                        
                    </div>                 
                        
                </div>
            )
        } 
        //editMode = OFF
        else {
            return (
                    <div className="meme-widgets">
                        <div className="saved-meme-widget">
                            <img className="widget-image" src={this.props.image} alt="" />
                            <h3 className="saved-meme-toptext">{this.props.toptext}</h3>
                            <h3 className="saved-meme-bottomtext">{this.props.bottomtext}</h3>
                        </div>
                        <div className="widget-buttons">
                            <button onClick={this.editToggle} id={this.props.id}>Edit</button>
                            <button onClick={this.props.delete} id={this.props.id}>Delete</button>
                        </div>
                    </div>
            )
        }
    }

}

export default MemeWidget