import React from 'react';
import LikeButton from './LikeButton';
import Bookmark from './Bookmark';
import AddComment from './AddComment';
import {getHeaders} from './utils';
import Modal from './Modal';

class Post extends React.Component {  

    constructor(props) {
        super(props);
        this.state = {
            post: this.props.model,
            modal: false
        }

        this.focusPost = React.createRef();
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.individualComment2Html = this.individualComment2Html.bind(this);
        this.focusToPost = this.focusToPost.bind(this);

        this.requeryPost = this.requeryPost.bind(this);
    }

    requeryPost() {
        fetch(`/api/posts/${this.state.post.id}`, {
                headers: getHeaders()
            })
            .then(response => response.json())
            .then(data => {
                this.setState({ 
                    post: data // Update post inside the state
                });
            });
    }

    individualComment2Html(comment, postId){

        return (
            <div className="user_comment" id = {`comment` + postId}> 
                <p> <span className="user">{comment.user.username}</span> <span>{comment.text.length > 200? <button className="more_button">more</button> : comment.text}</span></p>
            </div>
        )
    
    };

    showModal(){
        this.setState({
            modal: true
        })
    }

    hideModal(){
        this.setState({
            modal: false
        })
    }

    focusToPost(){
        this.focusPost.current.focus();
    }

    render () {
        
        const post = this.state.post;
        const comments = this.state.post.comments;

        return (
            <section className="each_card">
                <section className="card_header">
                    <h2 className='card_header_name'>{post.user.username}</h2>
                    <button className="fas fa-ellipsis-h icon-size"></button>
                </section>

                <img className="card_img" src= {post.image_url} alt={"Post by:" +  post.user.usernmae}></img>

                {/*Bottom Section*/}
                <section className="card_bottom">
                    {/* Card icon bar , Need to modify for like and bookmark buttons*/}
                    <section className="card_icon_bar">
                        <section className="icon-bar-left">
                            
                            <LikeButton 
                                    postId={post.id} 
                                    likeId={post.current_user_like_id}
                                    requeryPost={this.requeryPost} /> 

                            <button className="icon_button">
                                <i className="far fa-comment icon-size"></i>
                            </button>
                            <button className="icon_button">
                                <i className="far fa-paper-plane icon-size"></i>
                            </button>
                        </section>

                        <Bookmark 
                                postId={post.id} 
                                bookmarkId={post.current_user_bookmark_id}
                                requeryPost={this.requeryPost} />
                    </section>

                    {/* Likes */}
                    <section className="likes">
                        <p className="likes_text">{post.likes.length === 1 ? post.likes.length + ' Like' : post.likes.length + ' Likes'}</p>
                    </section>

                    <section className= "user_caption">
                        <div className="user_comment">
                            <p> <span className="user"> {post.user.username} </span> <span>{post.caption.length > 200? post.caption.substring(0,200) + `...` +  <button className="more_button">more</button> : post.caption} </span></p>
                            <p className="time_passed" > {post.display_time}</p>
                        </div>
                    </section>

                    {/* Custom Messages and what not */}
                    {/* Structure for each comment */}
                    <section className="post_comment">
                        {post.comments.length>1 ? <button className="open" id={'open_button_post' + post.id} data-post-id={post.id} onClick = {this.showModal} ref={this.focusPost}>
                                View all {comments.length} comments 
                            </button> : null}
                        {post.comments.length>0 ?this.individualComment2Html(comments[comments.length-1], post.id):null}
                        {post.comments.length>0 ? <p className="time_passed" > {post.comments[comments.length-1].display_time} </p>: null}
                    </section>
                    
                    {/* Leave a comment section */}
                    <AddComment
                        postId={post.id}
                        key={post.id + "post"}
                        requeryPost={this.requeryPost}
                    />
                    {/* Modal Section */}
                    {this.state.modal? <Modal hide_modal = {this.hideModal} 
                                                focusToPost={this.focusToPost} 
                                                post={this.state.post}
                                                key={"Modal" + post.id}/> : null}
                </section>
        </section>
        )
    }
}

export default Post;