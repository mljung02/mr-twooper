const React = require('react');
const ReactDOM = require('react-dom');
const _ = require('lodash');

const FeedItem = React.createClass({

    render(){
        var tweet = this.props.tweet;
        var profileImg = _.get(tweet, ['user', 'profile_image_url']);
        var location = _.get(tweet, ['user', 'location']);
        var language = _.get(tweet, ['user', 'lang']);
        var handle = (_.get(tweet, ['user', 'screen_name']) || '').toLowerCase();
        var name = _.get(tweet, ['user', 'name']);


        this.state = this.state == null ? {} : this.state;
        return (<div className="tweet">
            <div className='feed-prof-img-div'>
                <img src={profileImg} className='feed-prof-img'/>
            </div>
            <div className='user-desc'>
                <div className='desc name'>{name}</div>
                <div className='desc handle'>{'@' + handle}</div>
                <div className='desc location'>{location}</div>
                <div className='desc lang'>{language}</div>
            </div>
            <div className='feed-text-div'>
            {(this.props.tweet.text)}
            </div>
        </div>);
    }

});

module.exports = FeedItem;
