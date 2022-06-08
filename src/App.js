import React from 'react';
import NavBar from './NavBar';
import Stories from './Stories';
import Suggestions from './Suggestions';
import Profile from './Profile';
import Posts from './Posts';
import {getHeaders} from './utils';

class App extends React.Component {  

    constructor(props){
        super(props);
        // issue a fetch request to /api/profile endpoint
         this.state = {
            posts: [],
            user: {}
        }
        this.getProfileFromServer()
    }

    getProfileFromServer() {
        fetch('/api/profile', {
            method: "GET",
            // authentication headers added using
            headers: getHeaders()
        }).then(response => response.json())
        .then(data => {
            console.log("User Profile:", data)
            this.setState({
                user: data
            });
        });
    }


    render () {
        return (
            <div className="begin">
            {/* P1: The header section of the website */}
                <NavBar 
                    title="Instafam" 
                    username={this.state.user.username}
                />

                <main>
                    {/* <!-- Left Section of Display --> */}
                    <section className="main_left">

                        {/* <!-- P3: Story Bar section --> */}
                        <Stories />

                        {/* P4: Card Section Starts Here */}
                        <Posts />
                    </section>

                    {/* <!-- P2: Recommendation Bar Section --> */}
                    {/* <!-- Make recbar tighter and neater --> */}
                    <section className="recbar">
                        <Profile
                            username={this.state.user.username}
                            user_img={this.state.user.image_url}
                        />
                        <Suggestions
                            userId = {this.state.user.id}
                        />
                    </section>

                </main>
            </div>
        );
    }
}



export default App;