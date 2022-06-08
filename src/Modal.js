import React from 'react';
import ModalComment from './ModalComment';

class Modal extends React.Component{

    constructor(props){
        super(props);

        this.setFalse = this.setFalse.bind(this);
    }

    setFalse(){
        this.props.hide_modal();
        this.props.focusToPost();
    }

    // function after rendering to mount neccesary stuff
    componenetDidMount(){
        console.log("Modal mounted")
        this.modalFocus.current.focus();

        this.addEventListener('focus', function(event) {
            const modalElement = document.querySelector('.modal-bg');
            console.log('focus');
            if (modalElement.getAttribute('aria-hidden') === 'false' && !modalElement.contains(event.target)) {
                console.log('back to top!');
                event.stopPropagation();
                document.querySelector(`#close_button_post${modalElement.dataset.postId}`).focus();
            }
        }, true);
    }


    render(){

        const post = this.props.post;

        return(
            <div className="modal-bg" id={"modal-bg-post" + post.id} data-post-id={post.postId} aria-hidden="false" role="dialog">
                <button className="close" id={"close_button_post" + post.id} aria-label="Close the modal window" data-post-id={post.id} onClick={this.setFalse} data-keyboard="true" ref={this.modalFocus}>
                    <i className="fas fa-times"></i>
                </button>
                <section className="modal">
                    <img className="modal_image" src={post.image_url} alt={"Post by:" + post.user.username}></img>
                    <div className="modal_comments">
                        <div className="modal-user-header">
                            <img className="rec_img" src={post.user.thumb_url} alt={"Post by:" + post.user.username}></img>
                            <h2 className="rec_title modal_title"> {post.user.username} </h2>
                        </div>
                        <div className="modal-body">
                            {post.comments.map( comment => {
                                return <ModalComment model={comment} key={"modal_comment" + comment.id} />}
                            )}
                        </div>
                    </div>
                </section>
            </div>
    )
    }

}

export default Modal;