import React, { Component } from "react"
import MemeWidget from "./MemeWidget"
import MemeGenerator from "./MemeGenerator"
import axios from "axios"

class App extends Component {
    constructor() {
        super()
        this.state = {
            id: "",
            randomImage: "",
            topText: "",
            bottomText: "",
            memes: [],
            savedMemes: []
        }
        this.deleteSavedMeme = this.deleteSavedMeme.bind(this)
        this.saveEditMeme = this.saveEditMeme.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        
    }
   
    deleteSavedMeme(e) {
        let { id } = e.target
        console.log(`Removing ${id}`)

        let deleteMemeIndex = this.state.savedMemes.findIndex(function(meme) {
            return meme.id === id
        })

        let savedMemesAfterDelete = this.state.savedMemes
        
        savedMemesAfterDelete.splice(deleteMemeIndex, 1)
        this.setState({
            savedMemes: savedMemesAfterDelete
        })
    }
    
    

    saveEditMeme(e) {
        e.preventDefault()

        let {id} = e.target

        console.log("clicked save", id )

        let saveEditedMemes = this.state.savedMemes.map(meme => {
            if (meme.id === id) {
                meme.topText = "we saved it" // will eventually grab from prevstate
                meme.bottomText = "we saved it" //will eventually grab from prevstate
                return meme
            } else {
                return meme
            }
        })

        this.setState({ savedMemes: saveEditedMemes })
    }


    //initial ret request for meme
    componentDidMount() {
        axios.get("https://api.imgflip.com/get_memes")
            .then(res => this.setState({
                memes: res.data.data.memes,
                randomImage: res.data.data.memes[Math.ceil(Math.random() * res.data.data.memes.length)].url
            }))
            //.then(res => console.log(res.data.data.memes))
            .catch(err => console.log(err))
    }
    
    handleChange(event) {
        const { name, value } = event.target
        console.log (name, value)
        this.setState({ [name]: value })
    }    

    handleSubmit(e) {
        e.preventDefault()
        //const randomNumber = Math.random() * this.state.memes.length
        // const randomMemeImage = this.state.memes[randomNumber].url
        this.setState(prevState => {
            // console.log(prevState)
            return {
                savedMemes: [...prevState.savedMemes, 
                    {  
                    topText: prevState.topText, 
                    bottomText: prevState.bottomText, 
                    imgUrl: prevState.randomImage, 
                    id: Number(Math.floor(Math.random() * 1000000)) 
                    }
                ],

                randomImage: this.state.memes[Math.ceil(Math.random() * this.state.memes.length)].url,
                topText: "",
                bottomText: "",
                editModeOn: false
            }
        })
        console.log(this.state.savedMemes)
    }

    render() {
        
        const allSavedMemes = this.state.savedMemes.map((meme, i) => <MemeWidget 
            key={i} 
            id={meme.id} 
            toptext={meme.topText} 
            bottomtext={meme.bottomText} 
            image={meme.imgUrl}
            editMode={meme.editModeOn}  
            delete={this.deleteSavedMeme} 
            saveMeme={this.saveEditMeme}
            changeHandler={this.handleChange} />)

       
        return (
            <div className="master">
                <div className="left-container">
                    <MemeGenerator 
                        randomImage={this.state.randomImage} 
                        topText={this.state.topText} 
                        bottomText={this.state.bottomText} 
                        submitForm={this.handleSubmit} 
                        changeHandler={this.handleChange} 
                    />
                </div>
                <div className="right-container">
                    {allSavedMemes}
                </div>
            </div>
        )
    }
}
export default App