import React, { useState } from 'react';
import { connect } from 'react-redux';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { addTodoListItem, deleteTodoList } from '../../store/actions/todoActions';
import TodoItems from './TodoItems';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import './styles.css';
import Checkbox from '@material-ui/core/Checkbox';

const TodoList = ({todolist, auth, addTodoListItem, deleteTodoList}) => {
  console.log(todolist);
  const [itemTitle, setTitle] = useState('');

  const [addOpen, setAddOpen] = React.useState(false);

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

  const handleDeleteList = () => {
    deleteTodoList(todolist._id);
    alert("deleted");
  };


  function renderList(){
    return (
      <List
              component="todolist"
              aria-labelledby="list-subheader"
              subheader={
                <ListSubheader component="div" id="list-subheader">
                  {todolist.title}
                </ListSubheader>
              }
      >      
            {todolist.todoitems.map((item, index) => {
              return (
                <>
                  <ListItemText id={item.id} primary={item.title} />
                </>
              )
            })}
      </List>
    );
  }

  return (
    <div className="TodoList">
      <Grid container justify="space-between" alignItems="center" spacing={3}>
        <Grid item xs={8}>
          {renderList()}
        </Grid>
        <Grid item xs={4}>
          <ButtonGroup color="primary" aria-label="outlined primary button group">
          <IconButton aria-label="add" className="btnAddListItem" onClick={handleAddItem}>
                    <AddIcon />
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
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleItemClose} color="primary">
            Cancel
          </Button>
          <Button onClick={submitTodoItem} color="primary">
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

export default connect(mapStateToProps, {addTodoListItem, deleteTodoList})(TodoList);