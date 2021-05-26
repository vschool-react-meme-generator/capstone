import React, {Component} from "react"
import MemeWidget from "./MemeWidget"
import MemeGenerator from "./MemeGenerator"
import axios from "axios"


class App extends Component {
    constructor() {
        super()
        this.state={
            id:"",
            randomImage:"",
            topText:"",
            bottomText:"",
            memes:[],
            savedMemes:[]
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.deleteSavedMeme = this.deleteSavedMeme.bind(this)
        this.editSavedMeme = this.editSavedMeme.bind(this)
    }

    deleteSavedMeme(e) {
        const {id} = e.target

        console.log(`Removing ${id}`)

        let savedMemesAfterDelete = this.state.savedMemes
        savedMemesAfterDelete.splice(id, 1)

        this.setState({
            savedMemes: savedMemesAfterDelete
        })

    }

    editSavedMeme(e) {
        const {id} = e.target
        console.log(`we are editing ${id}`)

        // needs to update the savedMemes state property for the specific meme object item in the array that is being edited. 

        // within that specific meme that is being edited, there is a property called editModeOn that is set to false by default

        //this method of editSavedMeme() needs to flip that to true

        //Then, in the MemeWidget component, we can use a conditional rendering to evaluate wheter the component is in edit mode or not

    }

    //initial ret request for meme

    componentDidMount(){
        axios.get("https://api.imgflip.com/get_memes")
            .then(res => this.setState({
                memes: res.data.data.memes,
                randomImage: res.data.data.memes[Math.ceil(Math.random() * res.data.data.memes.length)].url
            }))
            //.then(res => console.log(res.data.data.memes))

            .catch(err => console.log(err)) 
            
    }

    handleChange(event){
        const {name,value} = event.target
        this.setState({[name]:value})

    }

    handleSubmit(e){
        e.preventDefault()
        //const randomNumber = Math.random() * this.state.memes.length
       // const randomMemeImage = this.state.memes[randomNumber].url

        this.setState(prevState => {
           // console.log(prevState)
            return {
                savedMemes: [...prevState.savedMemes, {editModeOn: false,topText: prevState.topText, bottomText: prevState.bottomText, imgUrl: prevState.randomImage}],
                randomImage: this.state.memes[Math.ceil(Math.random() * this.state.memes.length)].url,
                topText: "",
                bottomText: ""
            }
        })

        console.log(this.state.savedMemes)
    }




    render() {

        const allSavedMemes = this.state.savedMemes.map((meme, i) => <MemeWidget key={i} id={i} toptext={meme.topText} bottomtext={meme.bottomText} image={meme.imgUrl} delete={this.deleteSavedMeme} edit={this.editSavedMeme} editMode={meme.editModeOn}/> )

         //console.log("State Saved Meme" + this.state.savedMemes[0].name)
        /* console.log(this.state) */

        return(
            <div className="master">
                <div className="left-container">
                    <MemeGenerator randomImage={this.state.randomImage} topText={this.state.topText} bottomText={this.state.bottomText} submitForm={this.handleSubmit} changeHandler={this.handleChange} />
                        
                    
                    
                </div>
                <div className="right-container">
                    {allSavedMemes}
                </div>           
            </div>
    
        )

    }
}
    


export default App
