var React = require("react");
var Center = require("react-center");

var Hours = React.createClass({
  render: function() {
    console.log('render Hours');
    var hoursInMinutes = []
    hoursInMinutes.push(540); // 9:00AM
    for (i = 1; i < 24; i++){
      hoursInMinutes.push(hoursInMinutes[i-1] + 30);
    }
   	return (
      <div className="hours">
        {hoursInMinutes.map(function(listValue){
        	var amPm = listValue < 720 ? 'AM' : 'PM';
        	var hours = Math.floor(listValue / 60);
          var minutes = listValue % 60;
        	var minutesFormatted = minutes == 0 ? '00' : minutes;
          var showtime; 
        	if (minutes == 0){
            showTime = <div className="time">
                        <div className="big">{hours}:{minutesFormatted}</div>
                         <div className="amPm">{amPm}</div>
                         </div>
          } else {
            showTime = <div className="time">
                          <div className="small">{hours}:{minutesFormatted}</div>
                        </div>
          }
          return (showTime);
        })}
      </div>
    );
  }
});

module.exports = Hours;