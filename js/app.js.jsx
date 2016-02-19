const React             = require('react');
const ReactDOM          = require('react-dom');
const Filter            = require('./filter-component/filter.js.jsx');
const Feed              = require('./feed-component/feed.js.jsx');

const App = React.createClass({
    render(){
        return (<div className="container">
            <div className="row">
                <Feed />
                <Filter />
                </div>
        </div>);
    }

});

ReactDOM.render(<App/>, document.getElementById('main'));
