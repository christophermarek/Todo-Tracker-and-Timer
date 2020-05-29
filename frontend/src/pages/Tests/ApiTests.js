import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import { attachTokenToHeaders } from '../../store/actions/authActions';
import './styles.css';

const ApiTests = ({ auth }) => {

    const attachToken = () => {
        const token = auth.token;

        const config = {
            headers: {
            'Content-type': 'application/json',
            },
        };

        if (token) {
            config.headers['x-auth-token'] = token;
        }

        return config;
    }
    
    const submitTodo = (event) => {
        event.preventDefault();        
        const data = new FormData(event.target);
        const config = attachToken();
        //const options = attachTokenToHeaders(());
        axios.post('/api/todos/', data, config);
        //use bottom one
        alert("Submitted");
    }    

    const submitTodoList = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        const config = attachToken();
        axios.post('/api/todos/todo', data, config);
        alert("Submitted");
    }

    const submitTodoItem = (event) => {
      event.preventDefault();
      const data = new FormData(event.target);
      const config = attachToken();
      axios.post('/api/todos/todo/todolist/', data, config);
      alert("Submitted");
    }

    return(
        <div>
            {auth.isAuthenticated ? (
          <div>
            <div>
              <p>Create TODO object for user</p>
              <form onSubmit={submitTodo}>
                  <input type="text"/>
                  <input type="submit" value="Submit" />
              </form>
            </div>
            <div>
              <p>Create TODO List object for user</p>
              <form onSubmit={submitTodoList}>
                  <input type="text"  name="title"/>
                  <input type="submit" value="Submit" />
              </form>
            </div>
            <div>
              <p>Create TODO List object for user</p>
              <form onSubmit={submitTodoItem}>
                  <p>todolistid</p>
                  <input type="text" name="todolistid"/>
                  <p>title</p>
                  <input type="text" name="title"/>
                  <p>duration</p>
                  <input type="text" name="duration"/>
                  <input type="submit" value="Submit" />
              </form>
            </div>
          </div>
        ) : (
          <>
            <p>
              Unauthenticated
            </p>
          </>
        )}
        </div>
    );  
}


const mapStateToProps = (state) => ({
    auth: state.auth,
  });

export default compose(connect(mapStateToProps))(ApiTests);