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
        this.editSavedMeme = this.editSavedMeme.bind(this)
        this.saveEditMeme = this.saveEditMeme.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleEditChange = this.handleEditChange.bind(this)
    }
    deleteSavedMeme(e) {
        let { id } = e.target
        id = Number(id)
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
    editSavedMeme(e) {
        let { id } = e.target
        id = Number(id)
        console.log("we are editing", id)
        
        let newSavedMemes = this.state.savedMemes.map(meme => {
            if (meme.id === id) {
                meme.editModeOn = true
                console.log("Within State, we tuurned on edit mode of meme id " + meme.id)
                return meme
            } else {
                return meme
            }
        })
        this.setState({ savedMemes: newSavedMemes })
        console.log("end of edit func")
    }

    saveEditMeme(e) {
        e.preventDefault()

        let {id} = e.target
        id = Number(id)

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
        this.setState({ [name]: value })
    }

    handleEditChange (e) {
        let {name, value, id } = e.target
        id = Number(id)
        console.log(name, id, value)

       //I have no idea how to access the correct meme in the savedMemes state array to update the topText and bottomText within the state. This is what I'm trying below:

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
                    editModeOn: false, 
                    topText: prevState.topText, 
                    bottomText: prevState.bottomText, 
                    imgUrl: prevState.randomImage, 
                    id: Math.floor(Math.random() * 1000000) 
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
            edit={this.editSavedMeme} 
            saveMeme={this.saveEditMeme}
            editChangeHandler={this.handleEditChange} />)

       
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