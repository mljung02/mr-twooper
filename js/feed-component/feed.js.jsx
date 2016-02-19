const React                 = require('react');
const ReactDOM              = require('react-dom');
const FeedItem              = require('./components/feed-item.js.jsx');
const TIMEOUT_IN_SECONDS    = 30;
const msg = {
    start: 'Start feed',
    running: 'Running..',
    completed: 'Completed'
};
const Feed = React.createClass({

    establishConnection(){
        if(this.state.started === false){
            this.state.started = true;
            var self = this;
            socket.emit('startTracking');
            setTimeout(this.disconnectFromSocket, TIMEOUT_IN_SECONDS*1000);
            socket.on('tweet', function(tweet){
                console.log('tweet', tweet);
                var newFeeds = self.state.feeds;
                newFeeds.unshift(tweet);
                self.setState({ feeds: newFeeds });
            });
            socket.on('wired', function (str) {
                console.log(str, '!')
            });
            this.setMessage(msg.running);
        }
    },

    disconnectFromSocket(){
        var self = this;
        console.log('disconnecting');
        socket.emit('disconnect');
        socket.disconnect();
        this.setMessage(msg.completed);
        setTimeout(function(){ self.setMessage(msg.start)}, 1000);
        this.state.started = false;
    },

    setMessage(msg){
        this.state.btn_message = msg;
        this.setState(this.state);
    },

    getFeeds(){
        return this.state.feeds.map( (t, i) => {
            return (
                <FeedItem
                    tweet={t}
                    key={i}
                />);
        });
    },

    render(){
        this.state = this.state == null ? {
            feeds: [],
            btn_message: msg.start,
            started: false
        } : this.state;

        return (<div className="col-md-9 feed-container">
            <div className='feed-tool-bar'>
            <div className='start-btn' onClick={this.establishConnection}>{this.state.btn_message}</div>
                </div>
            {this.getFeeds()}
        </div>);
    }

});

module.exports = Feed;
