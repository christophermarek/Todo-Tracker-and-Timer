import React, { useState } from 'react';
import { connect } from 'react-redux';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import { editTodoListChecked } from '../../store/actions/todoActions';

import './styles.css';

const TodoItem = ({todoitem, todolistid, auth, editTodoListChecked}) => {
    const [checked, setChecked] = React.useState(todoitem.checked);

    const handleChange = (event) => {
        setChecked(event.target.checked);
        updateCheckedBackend(event.target.checked);
    };

    const updateCheckedBackend = (checked) => {
        editTodoListChecked(todolistid, todoitem.id, checked);
    }
    
    return (
        <div className="TodoItem">
            <ListItem dense button >
            <ListItemIcon>
              <Checkbox
                edge="start"
                tabIndex={-1}
                disableRipple
                checked={checked}
                onChange={handleChange}
                disabled={checked}
                //inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            </ListItemIcon>
            <ListItemText primary={todoitem.title}  style={{ textDecoration : checked ? 'line-through' : 'none' }}  />
          </ListItem>
        </div>
    );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {editTodoListChecked})(TodoItem);