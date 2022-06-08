import React from 'react';
import { getHeaders } from './utils';

class Suggestion extends React.Component {  

    constructor(props) {
        super(props);

        this.state = {
            sugg: this.props.model,
            followed: false,
            followingId: null
        }

        this.toggleFollow = this.toggleFollow.bind(this);
        this.unfollow = this.unfollow.bind(this);
        this.follow = this.follow.bind(this);
    }

    toggleFollow(){
        
        const userId = this.state.sugg.id;
        const followingId = this.state.followingId;

        if (this.state.followed === false){
            this.follow(userId)
            this.setState({
                followed: true
            })
            console.log(this.state.followed)
        }
        else{
            this.unfollow(followingId, userId)
            this.setState({
                followed: false
            })
            console.log(this.state.followed)
        }

    }


    follow(userId){
        const postData = {
            "user_id": parseInt(userId,10)
        };
        
        fetch("/api/following", {
                method: "POST",
                headers: getHeaders(),
                body: JSON.stringify(postData)
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);

                this.setState({
                    followingId: data.id
                })

                const elem = document.getElementById(`sugg_${userId}`);
                // UI Change: Flip unfollow switch after success
                elem.innerHTML = 'unfollow';
                elem.classList.add('unfollow');
                elem.classList.remove('follow');
    
                // The id we need to unfollow any followed users
                elem.setAttribute('data-following-id', data.id);
    
                // update accessibility items
                elem.setAttribute("aria-checked", true)
            });
    }

    unfollow(followingID, userId){
        // must use the smart quotes ``
        fetch(`/api/following/${followingID}`, {
            method: "DELETE",
            headers: getHeaders()
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);

                const elem = document.getElementById(`sugg_${userId}`);

                this.setState({
                    followingId: null
                })

                // UI Change after sucess
                elem.innerHTML = 'follow';
                elem.classList.add('follow');
                elem.classList.remove('unfollow');
                elem.removeAttribute("data-following-id");
                // update accessibility items
                elem.setAttribute("aria-checked", false)
            });
    }


    render () {

        const sugg = this.state.sugg;
        const sugg_id = "sugg_" + sugg.id;

        return (
            <section className="rec_list_item">
                {/* Profile Url to Thumb Url */}
                <img className="rec_list_img" src={sugg.image_url} alt= {"Recommends" + sugg.username}></img>

                <section className="rec_item_name">
                    <h2 className="rec_h2">{sugg.username.length > 8 ? sugg.username.substring(0,8) + "..." : sugg.username} </h2>
                    <p className="rec_h2_sub">suggested for you</p>
                </section>

                <button
                    role="switch"
                    className="follow"
                    aria-label="Follow"
                    aria-checked={this.followed}
                    data-user-id = {sugg.id}
                    id={sugg_id}
                    onClick={() => {this.toggleFollow()}}>follow</button>
            </section>
        ) 
    }
}

export default Suggestion;
