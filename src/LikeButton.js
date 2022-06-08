import React from 'react';
import {getHeaders} from './utils';

class LikeButton extends React.Component {  

    constructor(props) {
        super(props);
        this.toggleLike = this.toggleLike.bind(this);
        this.like = this.like.bind(this);
        this.unlike = this.unlike.bind(this);
    }

    toggleLike(ev) {
        if (this.props.likeId) {
            console.log('unlike');
            this.unlike();
        } else {
            console.log('like');
            this.like();
        }
    }

    like() {
        console.log('code to like the post');
        // issue fetch request and then afterwards requery for the post:
        const postData = {
            post_id: parseInt(this.props.postId,10)
        }

        fetch(`/api/posts/likes`, {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(postData)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            this.props.requeryPost();
        });
    }

    unlike() {
        console.log('code to unlike the post');
        // issue fetch request and then afterwards requery for the post:
        fetch(`/api/posts/likes/${this.props.likeId}`, {
            method: "DELETE",
            headers: getHeaders()
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            this.props.requeryPost();
        });
    }

    render () {
        const likeId = this.props.likeId;
        const postId = this.props.postId;

        return (
            <button role="switch"
                className="icon_button"
                id = {"like_button_id_" + postId}
                aria-label= "Like/unlike"
                aria-checked = {likeId ? true : false}
                onClick={this.toggleLike}>
                    <i className={likeId ? 'fas fa-heart icon-size' : 'far fa-heart icon-size'}></i>
            </button>
        ) 
    }
}

export default LikeButton;