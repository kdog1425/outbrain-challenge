var React = require("react");
var Event = require("./Event.jsx");
var _ = require('lodash-node');

var EventCollection = React.createClass({
    getInitialState: function(){
      return {
        parentHeight: this.props.height,
        parentWidth: this.props.width,
        paddingLeft: this.props.paddingLeft,
        paddingRight: this.props.paddingRight,
        paddingSum: this.props.paddingLeft + this.props.paddingRight,
        events: this.props.list,
        collisionGroups: [],
      }
    },

    findById: function(eventList, id) {
      var i = eventList.length;
      while (i--) {
        if (eventList[i].id == id) {
          return eventList[i];
        }
      }
      return false;
    },

    render: function() {
      console.log('render all Events');
      this.calculateCollisionGroups();
      this.calculatePositions();
      var events = this.state.events;

      return (     
        <div>
          {events.map(function(event){
            return (<Event title={event.title}
                           location={event.location}
                           start={event.start}
                           end={event.end}
                           width={event.width}
                           height={event.height}
                           leftOffset={event.left}
                           key={event.id}
                           >
                   </Event>);
          })}
        </div>
      )
    },

    calculateCollisionGroups: function() {
        var events = this.state.events;
        var collisionGroups = [];
        collisionGroups[0] = [];

        collisionGroups[0].push(events[0]);

        // Each event starting from second event
        for (var i = 1, l = events.length; i < l; ++i) {
          var event = events[i];

          // Collides with at least one existing collision group
          var foundCollision = false;

          // Each previous event or until found
          var j = i - 1;
          do {
            var previousEvent = events[j];

            if (this.collidesWith(event, previousEvent)) {
              // Find the collision group that previous event belongs to
              // and add current event's id to that collision group

              // Whether the previous event id has been found in a collision group
              var foundPrevious = false;

              // Count backwards since it is probably more likely that
              // latest found collider is further on in the collision
              // groups structure
              var k = collisionGroups.length;
              while (!foundPrevious && k--) {
                if (this.findById(collisionGroups[k], previousEvent.id) != false) {
                  // Add current event's id to this collision group
                  collisionGroups[k].push(event);
                  foundPrevious = true;
                }
              }

              foundCollision = true;
            }
          } while (!foundCollision && j--);

          // Did not collide with any other events so give it its own
          // collision group
          if (!foundCollision) {
            collisionGroups.push([event]);
          }
        }
        this.state.collisionGroups = collisionGroups;
      },

      collidesWith: function(event, otherEvent) {
        if ( (event.start <= otherEvent.start && otherEvent.start <= event.end) ||
             (event.start <= otherEvent.end && otherEvent.end <= event.end) ||
             (otherEvent.start <= event.start && event.start <= otherEvent.end) ||
             (otherEvent.start <= event.end && event.end <= otherEvent.end) ) {
          return true;
        }
        return false;
      },

      calculatePositions: function() {
        var events = this.state.events;
        var collisionGroups = this.state.collisionGroups;

        // Set tops and heights
        for (var i = 0, l = events.length; i < l; ++i) {
          events[i].top = events[i].start;
          events[i].height = events[i].end - events[i].start;
        }
        events = _.sortBy(events, 'start');

        // Each collision group
        for (var i = 0, l = collisionGroups.length; i < l; ++i) {
          var group = collisionGroups[i];
          
          // init 2d matrix
          var matrix = [];
          matrix[0] = [];

          // Each event in the collision group
          for (var j = 0, l2 = group.length; j < l2; ++j) {
            // Increment columns until spot found
            var event = this.findById(group, group[j].id);
            var col = 0;
            var found = false;
            while(!found) {
              var row = this.getMatrixColumnLastRow(matrix, col);
              if (row === false) {
                // No last event in row and no index so create index and place here
                matrix[0].push(event);
                found = true;
              } else {
                var existingevent = matrix[row][col];
                if (!this.collidesWith(event, existingevent)) {
                  // Place the current event in the next row of the current column
                  if (matrix[row + 1] === undefined) {
                    matrix[row + 1] = [];
                  }
                  matrix[row + 1][col] = event;
                  found = true;
                }
              }
              col++;
            }
          } // end loop for event positioning in collision group

          // Find the maximum row length
          var maxRowLength = 1;
          for (var j = 0, l2 = matrix.length; j < l2; ++j) {
            maxRowLength = Math.max(maxRowLength, matrix[j].length);
          }
          var eventWidth = (this.state.parentWidth - this.state.paddingSum) / maxRowLength;
          
          // Predefine all possible left positions for this matrix
          var eventLeftPositions = [];
          for (var j = 0, l2 = maxRowLength; j < l2; ++j) {
            eventLeftPositions[j] = (eventWidth * j) + (this.state.paddingLeft);
          }
          var eventIds = events.map(function(e){return e.id});
          
          // Set the left position and width of all the events in the current matrix
          for (var row = 0, l2 = matrix.length; row < l2; ++row) {
            for (var col = 0, l3 = matrix[row].length; col < l3; ++col) {
              var event = matrix[row][col];
              event.left = eventLeftPositions[col];
              event.width = eventWidth;
            }
          } // end update positioning loop
        } // end collision group loop
      },

      getMatrixColumnLastRow: function(matrix, col) {
        // From the last row in the matrix, search for the column where there
        // is a value or until there are no more rows
        var row = matrix.length;
        while (row--) {
          if (matrix[row][col] !== undefined) return row;
        }

        // No more rows
        return false;
      }
  });
  
module.exports = EventCollection;