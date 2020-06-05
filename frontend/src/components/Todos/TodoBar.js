import React, { useState } from 'react';
import { connect } from 'react-redux';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import { addTodoList } from '../../store/actions/todoActions';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import './styles.css';

const TodoBar = ({addTodoList}) => {

  const [listTitle, setTitle] = useState('');

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setTitle('');
    setOpen(false);
  };

  const submitTodoList = () => {
    addTodoList({title: listTitle});
    handleClose();
  }

  return (
    <div className="Todo-Bar">
      <IconButton aria-label="add" className="btnAdd" onClick={handleClickOpen}>
                <AddIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New Todo list</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Todo list title"
            type="text"
            value={listTitle}
            onChange={e => setTitle(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={submitTodoList} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps, {addTodoList})(TodoBar);