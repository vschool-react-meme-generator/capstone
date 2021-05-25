import React, {Component} from "react"
import axios from "axios"

class MemeGenerator extends Component {
    constructor(){
        super()
        this.state = {
            topText:"",
            bottomText:"",
            randomImage:"",
            allMemeImages:[],
            topText:"",
            bottomText:"",
            memes: []
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

        handleSubmit(event){
            event.prevenDefault()
            const randomNumber = Math.random() * this.state.memes.length
            const randomMemeImage = this.state.memes[randomNumber].url
            this.setState({randomImage: randomMemeImage})
        }
    
        render(){
           // console.log("State Memes" + this.state.memes[5].name ? this.state.memes[5].name: null)
            return(
                <div>
                    <form onSubmit={this.handleSubmit} className="meme-form">
                        <div className="meme">
                            <img src= {this.state.randomImage?this.state.randomImage:null} style={{width: "150px", height: "150px"}} alt="" />
                            <h2 className="top">{this.state.topText}</h2>
                            <h2 className="boottom">{this.state.bottomText}</h2>
                        </div>

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
                </div>
            )
    }
}

export default MemeGenerator