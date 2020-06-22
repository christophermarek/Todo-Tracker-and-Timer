import React, { useState } from 'react';
import { connect } from 'react-redux';
import './styles.css';
import CategoryCard from './CategoryCard';
import Loader from '../Loader/Loader';

const CategoryList = ({ categories, category }) => {

    function renderCategoryCards(){
        return(
          categories === undefined ? (
            <Loader />
          ) : (
            categories.map((categoryItem, index) => {
              return <>
                        <CategoryCard key={index} categoryItem={categoryItem} /> 
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
  category: state.category,
});

export default connect(mapStateToProps)(CategoryList);