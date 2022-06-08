import React from 'react';

class NavBar extends React.Component {  

    constructor(props) {
        super(props); // <--- where the components in the are coming in to
        // constructor logic
        console.log('NavBar props:', props);
    }

    componentDidMount() {
        // fetch posts
        console.log('NavBar component mounted');
    }

    render () {
        return (
            <header>
                <div class="nav_left">
                    <img class="website_logo" src="https://cdn-icons-png.flaticon.com/512/174/174855.png" alt="Instagram Logo" />
                    <h1>{this.props.title}</h1>
                </div>
                <nav>
                    <li><a href="/api">API Docs</a></li>
                    <p>{this.props.username}</p>
                    <button href="/logout">Sign Out</button>
                </nav>
            </header>

        );
    }
}

export default NavBar;