import React, { useState } from 'react';
import { connect } from 'react-redux';
import './styles.css';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { updateCategoryChecked } from '../../store/actions/categoryActions';

const CategoryCard = ({ categoryItem, category, updateCategoryChecked }) => {
    
    function millisToMinutesAndSeconds(millis) {
        if(millis === '00:00'){
            return '00:00';
        }
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return (seconds == 60 ? (minutes+1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
    }

    function checkIfCategorySelected(){
        let short = category.categoryObj.categories;
        for(let i = 0; i < short.length; i++){
            if(short[i].active === true && short._id === categoryItem._id){
              alert("There is a category already selected");
            }
        }
    }

    function updateCategorySelected(){
        checkIfCategorySelected();
        updateCategoryChecked(categoryItem._id);
    }
    return (
        <Card className="Category-Card" variant="outlined">
            <CardContent>
                <Typography variant="body" component="p">
                    {categoryItem.title}
                </Typography>
                <Typography variant="body" component="p">
                    {millisToMinutesAndSeconds(categoryItem.duration)}
                </Typography>
                <Typography variant="body" component="p">
                    {categoryItem.active ? 'Active' : ''}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={updateCategorySelected}>Select</Button>
            </CardActions>
        </Card>
    );
};

const mapStateToProps = (state) => ({
    category: state.category,
});

export default connect(mapStateToProps, {updateCategoryChecked})(CategoryCard);