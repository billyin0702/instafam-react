import React from 'react';
import {getHeaders} from './utils';

class AddComment extends React.Component {  

    constructor(props) {
        super(props);
        this.postComment = this.postComment.bind(this);
        this.textInput = React.createRef();
        // constructor logic
        console.log('addComment component created');
    }

    postComment(){

        const postId = this.props.postId;
        const userRef = document.querySelector(`#ci_`+ this.props.postId);

        const postData = {
            "post_id": parseInt(postId, 10),
            "text": userRef.value
        };
        
        fetch("/api/comments", {
                method: "POST",
                headers: getHeaders(),
                body: JSON.stringify(postData)
            })
            .then(response => response.json())
            .then(data => {
                // Reset comment box
                userRef.value = "";

                console.log(data);
                console.log(postId, this.userComment)
                // Reload the post
                this.props.requeryPost();
                this.textInput.current.focus();

            })
    }

    render () {
        return (
            <section className="write_comment">
                <section className="wc_left">
                    <button className="icon_button">
                        <i className="far fa-smile icon-size"></i>
                    </button>
                    <input type="text" 
                            name="add a comment" 
                            className="comment_input" 
                            ref={this.textInput}
                            id={'ci_' + this.props.postId} 
                            placeholder="Add a comment..."></input>
                </section>

                <button 
                    className="post"
                    data-post-id= {this.props.postId}
                    onClick={this.postComment}
                    >Post</button>
            </section>
        )
    }
}

export default AddComment;