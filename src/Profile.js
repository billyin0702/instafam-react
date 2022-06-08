import React from 'react';

class Profile extends React.Component {  

    render () {
        return (
            <section className="rec_header">
            {/* <!-- Profile Url to Thumb Url --> */}
            <img className="rec_img" src={this.props.user_img} alt={"Suggestions for:" + this.props.username}></img>
            <h2 className="rec_title" >{this.props.username}</h2>
        </section>
        );
    }
}

export default Profile;