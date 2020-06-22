import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import './styles.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import { getCheckedCategory, updateCategoryChecked, updateCategoryDuration, updateCategoryDurationLocal, deleteCategory } from '../../store/actions/categoryActions';
import { ListItemText } from '@material-ui/core';

const Countdown = ({ category, categories, updateCategoryChecked, getCheckedCategory, updateCategoryDurationLocal, deleteCategory }) => {

    const [isStart, setStart] = useState(false);
    const [isStop, setStop] = useState(false);
    const [durationPercent, setPercent] = useState(0);

    useEffect(() => {
        let interval = null;
        if (isStart) {
          interval = setInterval(() => {
            let updatedTime = parseInt(selectedCategory.duration) - 1000;
            selectedCategory.duration = updatedTime;
            updateCategoryDurationLocal(updatedTime);
            setPercent(calculatePercentage());
            if(updatedTime <= 0){
                stopClicked();
                //categoryCompleted();
            }
          }, 1000);
        } else if (isStop) {
          clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isStart]);
    
    function calculatePercentage(){
        let percent = 100 * (selectedCategory.duration / selectedCategory.initialDuration);
        //percent is now how close the current duration is to initial.
        //I want it to be opposite
        percent = 100 - percent
        return percent;
    }

    function getCategoryInfo(){
        let found = {
            duration: '00:00',
            title: 'No Category Selected',
            active: false
        };
        if(categories === undefined){
            return found;
        }

        for(let i = 0; i < categories.length; i++){
            if(categories[i].active === true){
              found = categories[i];
            }
        }
        return found;
    }

    function millisToMinutesAndSeconds(millis) {
        if(millis === '00:00'){
            return '00:00';
        }
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return (seconds == 60 ? (minutes+1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
    }

    function categoryCompleted(){
        deleteCategory(selectedCategory._id);
    }

    function startTimer(){
        setStop(false);
        setStart(true);
    }
    
    function stopTimer(){
        setStop(true);
        setStart(false);
        setPercent(0);
    }

    function updateBackendDuration(){
        updateCategoryDuration(selectedCategory._id, selectedCategory.duration);
    }

    function startClicked(){
        if(!selectedCategory.active){
            alert("You must select a category to begin");
            return;
        }
        if(!isStart){
            startTimer();
        }else{
            stopTimer();
        }
    }

    function deselectCategory(){
        updateCategoryChecked(selectedCategory._id);
    }
    function stopClicked(){
        deselectCategory();
        updateBackendDuration();
        stopTimer();
    }

    let selectedCategory = getCategoryInfo();
    return (
        <div className="Countdown">
            <Box position="relative" display="inline-flex">
                <CircularProgress variant="static" value={durationPercent} size={400} />
                <Box
                    top={0}
                    left={0}
                    bottom={0}
                    right={0}
                    position="absolute"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Typography variant="h1" component="div" color="textSecondary">
                        {millisToMinutesAndSeconds(selectedCategory.duration)}
                    </Typography>

                </Box>
            </Box>
            <ButtonGroup size="large" color="primary" aria-label="large outlined primary button group">
                <Button onClick={startClicked}>{isStart ? 'Pause' : 'Start'}</Button>
                <Button onClick={stopClicked}>Stop</Button>
            </ButtonGroup>
            
        </div>
    );
};

const mapStateToProps = (state) => ({
    category: state.category,
});

export default connect(mapStateToProps, {getCheckedCategory, updateCategoryChecked, updateCategoryDuration, updateCategoryDurationLocal, deleteCategory})(Countdown);