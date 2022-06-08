import React from 'react';


class ModalComment extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            comment: this.props.model
        }
    }

    render(){

        const comment = this.state.comment;

        return (
            <div className="modal_comment_each">
            <img className="modal_comment_img" src={comment.user.thumb_url} alt= {"Recommends" + comment.user.username }></img>
            <section className="modal_each_comment_box">
                <div className="user_comment modal_comment_each_content"> 
                    <p className="user">
                        {comment.user.username}
                    </p>
                    <p>{comment.text}</p>
                </div>
                <p className="time_passed"> {comment.display_time} </p>
            </section>
            <button className="icon_button">
                <i className="far fa-heart modal_icon"></i>
            </button>
        </div>
        )
    }
}

export default ModalComment;