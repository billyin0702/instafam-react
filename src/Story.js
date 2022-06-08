import React from 'react';

class Story extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            story: this.props.model
        }
    }

    render() {

        const story = this.state.story;
        
        return (
            <section className="each_story">
                {/* <!-- Profile url changed to Thumb_url--> */}
                <img className="story_img" src={story.user.image_url} alt={"Story by:" + story.user.username}></img>
                <p className="story_text"> {story.user.username.length > 10 ? story.user.username.substring(0,7) + "...": story.user.username}</p>
            </section>
        )
    }
}

export default Story;