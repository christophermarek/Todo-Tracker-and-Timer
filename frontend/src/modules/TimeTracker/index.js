import React from 'react';

function Start(props) {
    return (
      <button className="startButton" onClick={props.onClick}>
        {props.value}
      </button>
    );
  }

  
class TimeTracker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          isStart: true,
        };
    }

    handleClick(){
        this.setState({
            isStart: !this.state.isStart,
        })
    }
    
    renderStart(){
        return (
            <Start
                value={this.state.isStart ? 'Start' : "Stop"}
                onClick={() => this.handleClick(this)}
            />
        );
    }

    render(){

        return(
            <div className="Time-tracker">
                <div className="Clock-container">
                    {this.renderStart()}
                </div>
            </div>
        );
    }
    

    
}

export default {
    routeProps: {
        path: '/timetracker',
        component: TimeTracker
    },
    name: 'TimeTracker',
}
