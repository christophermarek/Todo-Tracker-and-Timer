const express = require('express');
const router = express.Router();

const requireJwtAuth = require('../../middleware/requireJwtAuth');
const {Category} = require('../../models/Category');

function createCategoryObject(collection){

    //parent object
    let categoryObj = {
      user: collection.user,
      categories: [],
    }

    for(let i = 0; i < collection.categories.length; i++){
      let category = {
        _id: collection.categories[i]._id,
        title: collection.categories[i].title,
        duration: collection.categories[i].duration,
        active: collection.categories[i].active,
        todoitem: collection.categories[i].todoitem,
      }
      categoryObj.categories.push(category);
    }

    return categoryObj;
  }

//Create new Category obj for user
//returns Category object
router.post('/', requireJwtAuth, async (req, res) => {
    try {
        Category.create({ user: req.user.id }, function (err, category) {
            if (err) return handleError(err);
            res.status(200).json({ message: category });
        });
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong.' });
    }
});

//creates category for users category obj
//takes title paramater from request
//returns category object, with list of categories
router.post('/categories', requireJwtAuth, async (req, res) => {
    try{
      const category = {
        title: req.body.title,
        duration: req.body.duration,
        todoitem: req.body.todoitemid,
      }
      
      Category.findOneAndUpdate(
        { user: req.user.id },
        { $push: { categories: category } },
        function(err, collection) {
          if (err) {
            res.send(err);
          } else {
            //sends whole collection
            //for some reason newest category isnt added. Might have to change to return just single category and append it to state 
            //in the client
            res.send(createCategoryObject(collection));
          }
        }
      );
  
    } catch (err) {
      res.status(500).json({ message: 'Something went wrong.' });
    }
    
});

//delete a category from users categories list
router.delete('/categories/:id', requireJwtAuth, async (req, res) => {
  try{
    categoryId = req.query.categoryid;
    let categoryColl = await Category.findOne({ user: req.user.id, 'categories._id': categoryId });
    for(let i = 0; i < categoryColl.categories.length; i++){
      if(categoryColl.categories[i]._id == categoryId ){
        categoryColl.categories.splice(i, 1);
      }
    }
    await categoryColl.save();
    res.status(200).json({message: 'Delete successful'});
    
  }catch(err){
    res.status(500).json({message: 'Something went wrong'});
  }
});

//gets user id and returns users full todoObj
router.get('/', requireJwtAuth, async(req, res) => {
  try{
    const categoryColl = await Category.findOne({user: req.user.id});
    let response = createCategoryObject(categoryColl);
    res.send(response);

  } catch (err){
    res.status(500).json({message: 'Something went wrong'});
  }

});



module.exports = router;