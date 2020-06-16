import React, { useState } from 'react';
import { connect } from 'react-redux';
import './styles.css';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const CategoryCard = ({ category }) => {
    return (
        <Card className="Category-Card" variant="outlined">
            <CardContent>
                <Typography variant="body" component="p">
                    {category.title}
                </Typography>
                <Typography variant="body" component="p">
                    {category.duration} minutes
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Start</Button>
            </CardActions>
        </Card>
    );
};

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps)(CategoryCard);