import React, {Component} from "react"
import axios from "axios"

class MemeGenerator extends Component {
    constructor(){
        super()
        this.state = {
            topText:"",
            bottomText:"",
            randomImage:"",
            //allMemeImages:[],
            topText:"",
            bottomText:"",
            memes: [],
            savedMemes: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
     // Initial get request for meme
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
                console.log(prevState)
                return {
                    savedMemes: [...prevState.savedMemes, {topText: prevState.topText, bottomText: prevState.bottomText, imgUrl: prevState.randomImage}],
                    randomImage: this.state.memes[Math.ceil(Math.random() * this.state.memes.length)].url
                }
            })
        }
    
        render(){
            //console.log("State Saved Meme" + this.state.savedMemes[0].name)
            console.log(this.state)
            return(
                <div>
                        <div className="meme">
                            <img src= {this.state.randomImage?this.state.randomImage:null} style={{width: "150px", height: "150px"}} alt="" />
                            <h2 className="top">{this.state.topText}</h2>
                            <h2 className="boottom">{this.state.bottomText}</h2>
                        </div>
                    <form onSubmit={this.handleSubmit} className="meme-form">
                        
                        <input
                        type="text"
                        name="topText"
                        placeholder="Top Text"
                        value= {this.state.topText}
                        onChange={this.handleChange}
                         />
                        <input
                        type="text"
                        name="bottomText"
                        placeholder="Bottom Text"
                        value= {this.state.bottomText}
                        onChange={this.handleChange}
                         />
                        <button>Gen</button>
                    </form>  

                    <div>
                        <h1>Saved Memes</h1>
                        {this.state.savedMemes.map(meme => 
                            <div><h3>{meme.topText}</h3>
                            <h3>{meme.bottomText}</h3>
                            <img style={{width: "150px", height: "150px"}} src={meme.imgUrl} /></div>)}
                    </div> 
                </div>
            )
    }
}

export default MemeGenerator