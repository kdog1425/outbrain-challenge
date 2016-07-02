var React = require("react");
var ReactDOM = require("react-dom");
var Center = require("react-center");
var OneDayCalendar = require("./components/OneDayCalendar.jsx");

var Layout = React.createClass({
   render:function(){
     console.log('render layout');
       return (
          <div id="layout">
            <Center> 
              <OneDayCalendar />
            </Center>
          </div>
       );
   } 
});

function render(){
    ReactDOM.render(
    	<Layout />, document.getElementById('container')
    );
}

render();



