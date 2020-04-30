import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Layout from '../../layout/Layout';

function Categories(props){
    //console.log(props);
    return (
        <>
            {props.categories.map(category => (
                <div className = "category-box"
                    onClick={props.categoryBoxClicked}
                >
                    <Category 
                    key={category} 
                    categoryName={category.name}
                    sessionTotal={category.sessionTotal}
                    onClick={props.onClick}
                    onSubmit={props.onSubmit} 
                    onChange={props.onChange}
                     ></Category>
                </div>
            ))}
        </>
    );
}

function Category(props){
    if(props.categoryName === "empty"){
        return(
            <button className="empty-category" onClick={props.onClick}>+</button>
        );
    }
    if(props.categoryName === "blank"){
        return(
            <form onSubmit={props.onSubmit}>
                <input type="text" value={props.newCategoryName} onChange={props.onChange}/>
                <input type="submit" value="Submit" />
            </form>
        )
    }
    return(
        <>
            <p className="title">{props.categoryName}</p>
            <p>{props.sessionTotal} minutes today</p>
        </>
    );
}

function SessionTotal(props){
    return (
        <p>You have logged a total of {props.totalTime} this session</p>
    );
}

function Start(props) {
    return (
      <button className="start-button" onClick={props.onClick}>
        {props.value}
      </button>
    );
  }

function Stop(props){
    return (
        <button className="stop-button" onClick={props.onClick}>
            {props.value}
        </button>
    )
}

function Countdown(props){
    return (
        <div className="countdown-container">
            {props.minutes + ":" + props.seconds}
        </div>
    );
}

function CountdownInput(props){
    return (
        <div className="counter-input">
            
            <input 
            value={props.minutes}
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
          isStop: true,
          //initial time inputted
          inMinutes: '00',
          //checks if there is a timer running at all,
          //if there is one currently then inMinutes will not change
          //Should only be set false if timer hits 0, or is reset
          timerStarted: false,
          totalTime: 0,
          minutes: '00',
          seconds: '00',
          timerTime: '',
          categories: [{name: 'empty', sessionTotal: 0, clicked: false}],
          newCategoryName: '',
        };

        this.categoryChanged = this.categoryChanged.bind(this);
        this.handleCountdownInputChange = this.handleCountdownInputChange.bind(this);
        this.submitCategory = this.submitCategory.bind(this);
        this.categoryBoxClicked = this.categoryBoxClicked.bind(this);
    }

    updateSessionTotal(minutes){
        let categoryObj = this.state.categories.find(x => x.clicked === true);
        let categoryInd = this.state.categories.findIndex(x => x.name === true);
        
        //update minutes
        categoryObj.sessionTotal = parseInt(categoryObj.sessionTotal) + parseInt(minutes)

        let clone = [...this.state.categories];
        clone[categoryInd] = categoryObj;
        this.setState({
            categories: clone,
        });

    }

    categoryBoxClicked(event){
        //check if clicked on child elements or parent div
        let box;
        if(event.target.className === "category-box"){
            box = event.target;
        }else{
            box = event.target.parentNode;
        }
        if(box.className !== 'category-box'){
            return;
        }
        //find child title tag so we can get the category
        let child = box.querySelector('.title');
        //catch null error, happens sometimes
        if(child === null){return}
        let category = child.textContent;

        for(let i = 0; i < this.state.categories.length; i++){
            if(this.state.categories[i].name !== category && this.state.categories[i].clicked === true){
                alert("cannot click on two categories at once");
                return;
            }
        }

        //find category object and set to true or false
        let categoryObj = this.state.categories.find(x => x.name === category);
        let categoryInd = this.state.categories.findIndex(x => x.name === category);
        
        //reverse clicked property
        categoryObj.clicked = !categoryObj.clicked;
        let clone = [...this.state.categories];
        clone[categoryInd] = categoryObj;
        this.setState({
            categories: clone,
        });

        //check if clicked already
        //then
        //set div color so we know its clicked
        if(box.style.backgroundColor === "red"){
            //already clicked so undo
            box.style.backgroundColor = "white";
        }else{
            box.style.backgroundColor = "red";

        }
        
        
    }

    categoryChanged(event){
        this.setState({newCategoryName: event.target.value});
    }
    submitCategory(event){
        event.preventDefault();        
        if(typeof(this.state.categories.find(x => x.name === this.state.newCategoryName)) !== 'undefined'){
            alert("Category with this name already created");
        }else{
            let category = {name: this.state.newCategoryName, sessionTotal: 0, clicked: false};
            //add new category to list
            const list = [...this.state.categories, category];
            //find index of blank category
            let index = list.findIndex(x => x.name === 'blank');
            //remove blank category
            list.splice(index, 1);
            this.setState({
                newCategoryName: '',
                categories: list,
            });
        }
    }

    startTimer = () => {
        this.timer = setInterval(() => {
            let min = this.state.minutes;
            let sec = this.state.seconds;
            sec = sec - 1;

            //logic error in timer
            if(sec <= 0){
                if(min === 0){
                    this.timerFinished();
                    this.stopTimer();
                }else{
                    sec = 59;
                    min = min - 1;
                }
            }       
            
            this.setState({
                minutes: min,
                seconds: sec,
            });

        //testing time, 1000 is the correct interval
        }, 10);
      };

    timerFinished(){
        this.updateSessionTotal(this.state.inMinutes);
        this.setState({
            totalTime: this.state.totalTime + parseInt(this.state.inMinutes),
            timerStarted: false,
            isStart: false,
        })
    }  
    
    handleCountdownInputChange(event) {
        this.setState({
          minutes: event.target.value
        });
     }

     //actually only stops timer, refractor name
     stopTimer(){
        
        clearInterval(this.timer);
     }


     stopClicked(){
         this.stopTimer();
        //true = done
        //append time and reset
        if(this.state.isStop){
            this.updateSessionTotal(this.state.minutes);
            this.setState({
                    totalTime: this.state.totalTime + parseInt(this.state.inMinutes),
            });
        }
        this.setState({
                timerStarted: false,
                isStart: true,
                minutes: '00',
                seconds: '00',
                isStop: true,
        });
        
        
     }

    newCategory(event){
        event.stopPropagation();
        if(typeof(this.state.categories.find(x => x.name === 'blank')) !== 'undefined'){
            alert("Populate the blank category first");
        }else{
            let category = {name: 'blank', sessionTotal: 0, clicked: false};
            const list = [...this.state.categories, category];
            this.setState({
                categories: list,
            });
        }
    } 

    //Start/stop button handler
    handleClick(){
        //continue
        let cont = false;
        //check if a category is clicked on.
        for(let i = 0; i < this.state.categories.length; i++){
            if(this.state.categories[i].clicked === true){
                cont = true;
            }
        }
        //dont start timer if no category is clicked
        if(!cont){
            alert("must click on a category to start");
            return;
        }

        //if(this.state.minutes <= 0) return;
        if(this.state.isStart){
            if(parseInt(this.state.minutes) <= 0){
                if(parseInt(this.state.seconds) <= 0){
                    alert("Enter a valid time");
                    return;
                }
            }
        }

        this.state.isStart ? this.startTimer(): this.stopTimer();
        
        if(!this.state.timerStarted){
            this.setState({
                inMinutes: this.state.minutes,
            })
        }

        this.setState({
            timerStarted: true,
            isStart: !this.state.isStart,
            isStop: !this.state.isStop,
        });
        

        
    }

    //render input for countdown
    renderCountdownInput(){
        return (
            <CountdownInput 
                minutes={this.state.minutes}
                seconds={this.state.seconds}
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

    renderStop(){
        return (
            <Stop
                value={this.state.isStop ? 'Done' : "Stop"}
                onClick={() => this.stopClicked(this)}
            />
        )
    }

    
    //Start button render
    renderStart(){
        return (
            <Start
                value={this.state.isStart ? 'Start' : "Pause"}
                onClick={() => this.handleClick(this)}
            />
        );
    }

    renderTotal(){
        return (
            <SessionTotal
                totalTime={this.state.totalTime}
            />
        )
    }

    renderCategories(){
        return (
            <Categories
                categoryBoxClicked={(event) => this.categoryBoxClicked(event)}
                categories={this.state.categories}
                newCategoryName={this.state.newCategoryName}
                sessionTotal={this.state.sessionTotal}
                onClick={(event) => this.newCategory(event)}
                onSubmit={(event) => this.submitCategory(event)}
                onChange={(event) => this.categoryChanged(event)}
            />
        )
    }

    render(){

        return(
            <Layout>
                <div className="Time-tracker">
                <div className="Clock-container">
                    {this.renderCountdown()}
                    {this.renderCountdownInput()}
                    <div className="control">
                        {this.renderStart()}
                        {this.renderStop()}
                    </div>
                </div>
                {this.renderTotal()}
                <div className="categories">
                    {this.renderCategories()}
                </div>

            </div>
            </Layout>
        );
    }
    

    
}


const mapStateToProps = (state) => ({
    auth: state.auth,
  });

export default compose(connect(mapStateToProps))(TimeTracker);