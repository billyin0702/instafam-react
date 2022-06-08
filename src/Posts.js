import React from 'react';
import Post from './Post';
import {getHeaders} from './utils';

class Posts extends React.Component {

    constructor(props) {
        super(props);
        // constructor logic
        console.log('Posts component created');
        this.state = {
            posts: []
        }

        this.getPostsFromServer();
    }

    getPostsFromServer() {
        fetch('/api/posts', {
            headers: getHeaders()
        }).then(response => response.json())
        .then(data => {
            console.log(data);
            this.setState({
                posts: data
            })
        });
    }

    componentDidMount() {
        // fetch posts
        console.log('Posts component mounted');
    }
    
    render () {
        return this.state.posts.length === 0 ?
            (
                <div id="posts">Loading Posts...</div>
            )
            :
            (
                <div id="posts">
                    {
                        this.state.posts.map( post => {
                            return (
                                <Post model={post} key={'post-' + post.id} />
                            )
                        })
                    }
                </div>
            ) 
    }
}

export default Posts;