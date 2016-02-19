const React             = require('react');
const ReactDOM          = require('react-dom');

const Filter = React.createClass({

    addPill(){
        var newPills = this.state.pills;
        newPills.push({name:'I am a new pill'});
        this.setState({pills: newPills});
    },

    pills(){
        return this.state.pills.map(pill => (
            <div className="pill">{pill.name}</div>
        ))
    },

    render(){
        this.state = this.state == null ? { pills: [] } : this.state;
        return (<div className="col-md-3 filter-container" onClick={this.addPill}>
            filters, click me
            {this.pills()}
        </div>);
    }

});

module.exports = Filter;