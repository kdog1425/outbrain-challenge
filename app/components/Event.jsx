var React = require("react");
 
var Event = React.createClass({
  render: function() {
    console.log('render Event');
    return (
      <div className="event" style={Object.assign({},{
      								'top':this.props.start, 
      								'width':this.props.width, 
      								'height':this.props.height,
      								'left':this.props.leftOffset})}>
      	<div className="title">
      	{this.props.title}
      	</div>
      	<div className="location">
      	{this.props.location}
      	</div>
      </div>
    );
  },
});

module.exports = Event;