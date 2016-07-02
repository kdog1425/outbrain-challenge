var React = require("react");
var Center = require("react-center");
var EventCollection = require("./EventCollection.jsx");
var Hours = require("./Hours.jsx");
Object.assign = Object.assign || require('object-assign');

var eventList =  
[
	{title : "sample event", location : "sample location", id : 1, start : 30, end : 150}, 
	{title : "sample event", location : "sample location", id : 2, start : 540, end : 600},
	{title : "sample event", location : "sample location", id : 3, start : 560, end : 620}, 
	{title : "sample event", location : "sample location", id : 4, start : 610, end : 670},
] 
var OneDayCalendar = React.createClass({
  render: function() {
    console.log('render OneDayCalendar');
   	return (
   	  <div>	
   	  <Hours />
      <div className="one-day-calendar" style={Object.assign({},{'width': 620,
      											  'height': 720,
      											  'paddingRight': 10,
      											  'paddingLeft': 10})}>
      	<EventCollection width={620} height={720} paddingLeft={10} paddingRight={10} 
      	list={eventList} />
      </div>
      </div>
    );
  },
});

module.exports = OneDayCalendar;