const React             = require('react');
const ReactDOM          = require('react-dom');

const App = React.createClass({
    render(){
        return (<h2>Hello world</h2>);
    }

});

ReactDOM.render(<App/>,
    document.getElementById('world'));
