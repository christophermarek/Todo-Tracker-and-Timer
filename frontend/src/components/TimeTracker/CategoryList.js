import React, { useState } from 'react';
import { connect } from 'react-redux';
import './styles.css';
import CategoryCard from './CategoryCard';
import Loader from '../Loader/Loader';

const CategoryList = ({ categories }) => {

    function renderCategoryCards(){
        return(
          categories === undefined ? (
            <Loader />
          ) : (
            categories.map((category, index) => {
              return <>
                        <CategoryCard key={index} category={category} /> 
                      </>;
            })
          )
        )
    }

    return (
        <div className="Category-List">
            {renderCategoryCards()}
        </div>
    );
};

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps)(CategoryList);