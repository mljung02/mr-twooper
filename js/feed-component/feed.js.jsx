const React                 = require('react');
const ReactDOM              = require('react-dom');
//const tconn                 = require('.tconn');
const TIMEOUT_IN_SECONDS    = 30;

const Feed = React.createClass({

    establishConnection(){
        var self = this;
        socket.emit('startTracking');
        setTimeout(this.disconnectFromSocket, TIMEOUT_IN_SECONDS*1000);
        socket.on('tweet', function(tweet){
            console.log('tweet', tweet);
            var newFeeds = self.state.feeds;
            newFeeds.push(tweet);
            self.setState({ feeds: newFeeds });
        });
        socket.on('wired', function (str) {
            console.log(str, '!')
        });
    },

    disconnectFromSocket(){
        console.log('disconnecting');
        socket.emit('disconnect');
        socket.disconnect();
    },

    getFeeds(){
        return this.state.feeds.map( (m) => {
            return (<div>{m.text}</div>);
        });
    },

    render(){
        this.state = this.state == null ? { feeds: [] } : this.state;
        return (<div className="col-md-9 feed-container">
            <input type="button" onClick={this.establishConnection} value="Click to Start" />
            {this.getFeeds()}
        </div>);
    }

});

module.exports = Feed;
