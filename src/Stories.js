import React from 'react';
import Story from "./Story";
import { getHeaders } from './utils';

class Stories extends React.Component {  

    constructor(props) {
        super(props);
        this.state = {
            stories: []
        }
        // constructor logic
        console.log('Stories component created');

        // get items from server
        this.getStoriesFromServer();
    }

    getStoriesFromServer() {
        // fetch posts
        console.log('Stories component mounted');

        fetch('/api/stories/', {
            method: "GET",
            headers: getHeaders()
        })
        .then(response => response.json())
        .then(stories => {
            this.setState({
                stories: stories
            })
            console.log(stories);
        })
    }


    render () {
        return (
            <section className="story_bar">
            {/* <!-- Stories 1 to 6 --> */}
                {this.state.stories !== 0 ?
                (
                    this.state.stories.map( story => {
                        return (
                            <Story
                                model={story}
                                key={"story" + story.id}
                            />
                        )
                    })
                )
                : null
            }
            </section>
        );
    }
}

export default Stories;