const React             = require('react');
const ReactDOM          = require('react-dom');

const Filter = React.createClass({
  
    addPill(){
      value = this.state.category
      console.log('value: ', value)
      var newPills = this.state.pills;
      newPills.push({category: value});
      this.setState({pills: newPills});
      socket.emit('addCategory', value);
      this.state.category = ''
      setTimeout(function () {
        socket.emit('startTracking')
      }, 2000)
    },
    
    deletePill(event){
      var category = event.target.parentNode.innerText.slice(0,-1)
      var newPills = this.state.pills;
      newPills = newPills.filter((pill) => { console.log(pill, category, pill.category, pill.category !== category); return pill.category !== category})
      console.log(newPills)
      this.state.pills = newPills
      this.setState(this.state);
      socket.emit('deleteCategory', category)
      setTimeout(function () {
        socket.emit('startTracking')
      }, 2000)
    },

    pills(){
        return this.state.pills.map((pill,i) => (
            <div className="pill" key={i}>{pill.category}<span className='close-pill' onClick={this.deletePill}>X</span></div>
        ))
    },
    
    storeCategory(event){
      this.state.category = event.target.value
      this.setState(this.state)
    },

    render(){
        this.state = this.state == null ? { pills: [] } : this.state;
        return (<div className="col-md-3">
          <div>
            <input type="text" className='text-input' value={this.state.category} onChange={this.storeCategory}/><button type="button" onClick={this.addPill}>Add Category</button>
          </div>
            {this.pills()}
        </div>);
    }
    
});

module.exports = Filter;