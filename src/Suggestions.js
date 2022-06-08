import React from 'react';
import Suggestion from './Suggestion';
import {getHeaders} from './utils';

class Suggestions extends React.Component {  
    constructor(props) {
        super(props);
        this.state = {
            suggs: [],
        }
        // constructor logic
        console.log('Suggestions component created');
        this.getSuggFromServer();
    }

    getSuggFromServer() {
        // fetch posts
        console.log('Suggestions component mounted');

        fetch("api/suggestions/", {
        method: "GET",
        headers: getHeaders()
    })
    .then(response => response.json())
    .then(data => {
        this.setState({
            suggs: data
        })
        console.log("check this out: ", data.length)
        console.log(data);
    });
    }

    render () {

        return (
            <section className="rec_list">
                <h2 className="rec_sugg">Suggestions for you</h2>

                {this.state.suggs.length === 0 ?(<div id="posts">Loading Suggestions...</div>)
                    :
                    (
                        this.state.suggs.map( sugg => {
                            return (
                                <Suggestion 
                                    model={sugg}
                                    userId={this.props.userId}
                                    key={"sugg" + sugg.id}/>
                            )
                        })
                    ) 
                }
            </section>
        )     
    }
}

export default Suggestions;