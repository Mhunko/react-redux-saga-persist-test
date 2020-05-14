import React from "react"
import {connect} from 'react-redux'
import {createPost, showAlert} from "../redux/actions";
import {Alert} from "./alert";

//import mapStateToProps from "react-redux/lib/connect/mapStateToProps";


class PostForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            title: ''
        }
    }

    submitHandler = event => {

        event.preventDefault()
        const {title} = this.state

        if (!title.trim()) {
            return this.props.showAlert('Post title cant be empty')
        }

        const newPost = {
            title, id: Date.now().toString()
        }
        console.log(newPost)
        this.props.createPost(newPost)
        this.setState({title: ''})
    }

    changeInputHandler = (event) => {
        event.persist()
        //console.log(event.target.value)  --- simply the text in the input field
        this.setState(prev => ({
            ...prev, ...{
                [event.target.name]: event.target.value // exp: "name" value in the input html is "title"
            }
        }))
    }

    render() {
        return (
            <form onSubmit={this.submitHandler}>
                {this.props.alert && <Alert text={this.props.alert}/>}
                <div className="form-group">
                    <label htmlFor="title">Post label</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        value={this.state.title}
                        name="title"
                        onChange={this.changeInputHandler}
                    />
                </div>
                <button className="btn btn-success" type="submit">Create</button>
            </form>
        )
    }
}

const mapDispatchToProps = {
    createPost, showAlert
}
const mapStateToProps = state => ({
    alert: state.app.alert
})

export default connect(mapStateToProps, mapDispatchToProps)(PostForm)