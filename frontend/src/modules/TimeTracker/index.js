import React from 'react';

function Start(props) {
    return (
      <button className="start-button" onClick={props.onClick}>
        {props.value}
      </button>
    );
  }

function Countdown(props){
    return (
        <div className="countdown-container">
            <div className="minutes">{props.minutes}</div>
            <div className="seconds">{props.seconds}</div>
        </div>
    );
}

function CountdownInput(props){
    return (
        <div className="counter-input">
            <p>Enter time in minutes</p>
            
            <input 
            type="number" 
            onChange={props.onChange}
            />
        </div>

    )
}


class TimeTracker extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
          isStart: true,
          minutes: '00',
          seconds: '00',
          timerTime: '',
        };

        this.handleCountdownInputChange = this.handleCountdownInputChange.bind(this);
    }
    startTimer = () => {
        this.timer = setInterval(() => {
            let min = this.state.minutes;
            let sec = this.state.seconds;
            sec = sec - 1;

            if(sec <= 0){
                sec = 59;
                min = min - 1;
            }            
            this.setState({
                minutes: min,
                seconds: sec,
            });

            if(sec === 0){
                this.stopTimer();
            }
        }, 1000);
      };

    
    handleCountdownInputChange(event) {
        this.setState({
          minutes: event.target.value
        });
     }

     stopTimer(){
        clearInterval(this.timer);
     }

    //Start/stop button handler
    handleClick(){
        this.state.isStart ? this.startTimer(): this.stopTimer();
        
        this.setState({
            //set minutes to miliseconds
            isStart: !this.state.isStart,
        });


        
    }

    //render input for countdown
    renderCountdownInput(){
        return (
            <CountdownInput 
                minutes={this.state.minutes}
                onChange={(event) => this.handleCountdownInputChange(event)}
                //onChange={() => this.handleCountdownInputChange(this)}
            />
        );
    }

    //input countdown timer
    renderCountdown(){
        return (
            <Countdown
                minutes={this.state.minutes}
                seconds={this.state.seconds}
            />
        );
    }

    
    //Start button render
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
                    {this.renderCountdown()}
                    {this.renderCountdownInput()}
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
