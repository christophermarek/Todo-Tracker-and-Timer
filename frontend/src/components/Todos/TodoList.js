import React, { useState } from 'react';
import { connect } from 'react-redux';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import DeleteIcon from '@material-ui/icons/Delete';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { addTodoListItem, deleteTodoList } from '../../store/actions/todoActions';
import { addLinkedCategory } from '../../store/actions/categoryActions';
import TodoItem from './TodoItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';

import './styles.css';

const TodoList = ({todolist, auth, addTodoListItem, deleteTodoList, addLinkedCategory}) => {
  const [itemTitle, setTitle] = useState('');
  const [addOpen, setAddOpen] = React.useState(false);

  const [addTimedOpen, setTimedOpen] = React.useState(false);
  const [categoryTitle, setCategoryTitle] = useState('');
  const [categoryDuration, setCategoryDuration] = useState(0);

  //add list item functions
  const handleAddItem = () => {
    setAddOpen(true);
  };

  const handleItemClose = () => {
    setTitle('');
    setAddOpen(false);
  };

  const submitTodoItem = () => {
    addTodoListItem({title: itemTitle, todolistid: todolist._id});
    handleItemClose();
  };

  //delete button
  const handleDeleteList = () => {
    deleteTodoList(todolist._id);
    alert("deleted");
  };

  //add timed list item functions
  const handleAddTimedItem = () => {
    setTimedOpen(true);
  };

  const submitTimedItem = () => {
    let formatTitle = categoryTitle + " for " + categoryDuration + " minutes.";
    addTodoListItem({title: formatTitle, todolistid: todolist._id});
    addLinkedCategory({title: categoryTitle, duration: categoryDuration});
    handleTimedClosed();
  };

  const handleTimedClosed = () => {
    setCategoryTitle('');
    setCategoryDuration(0);
    setTimedOpen(false);
  };

  return (
    <div className="TodoList">
      <Grid container justify="space-between" spacing={3}>
        <Grid item xs={10}>
        <List
              component="TodoList"
              aria-labelledby="list-subheader"
              subheader={
                <ListSubheader component="div" id="list-subheader">
                  {todolist.title}
                </ListSubheader>
              }
        >
          {todolist.todoitems.map((todoitem, index) => {
      
              return( 
                    <>
                      <TodoItem key={index} todolistid={todolist._id} todoitem={todoitem} /> 
                    </>
              )
            })
          }

        </List>
        </Grid>
        <Grid item xs={1.5}>
          <ButtonGroup color="primary" aria-label="outlined primary button group">
            <IconButton aria-label="add" className="btnAddListItem" onClick={handleAddItem}>
                      <AddIcon />
            </IconButton>
            <IconButton aria-label="add-timed" className="btnAddTimedListItem" onClick={handleAddTimedItem}>
                      <AccessTimeIcon />
            </IconButton>
            <IconButton aria-label="delete" className="btnDelete" onClick={handleDeleteList}>
                      <DeleteIcon />
            </IconButton>
          </ButtonGroup>       
        </Grid>
      </Grid>

      <Dialog open={addOpen} onClose={handleItemClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New Todo Item</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Todo item title"
            type="text"
            value={itemTitle}
            onChange={e => setTitle(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={submitTodoItem} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
      
      <Dialog open={addTimedOpen} onClose={handleTimedClosed} aria-labelledby="form-timed-dialog-title">
        <DialogTitle id="form-timed-dialog-title">New Timed Todo Item</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Category Title"
            type="text"
            value={categoryTitle}
            onChange={e => setCategoryTitle(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Duration in minutes"
            type="number"
            value={categoryDuration}
            onChange={e => setCategoryDuration(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={submitTimedItem} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
      
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {addTodoListItem, deleteTodoList, addLinkedCategory})(TodoList);