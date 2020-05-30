import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
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

    const getTodoCollection = (event) => {
      event.preventDefault();
      const config = attachToken();

      axios.get('/api/todos/', config)
      .then(function (response) {
        console.log(JSON.parse(response.data.message));
      })
      .catch(function (error) {
        console.log(error);
      })

    }

    const getTodoItemById = (event) => {
      event.preventDefault();
      const data = new FormData(event.target);
      const todoitemid = data.get('todoitemid');
      const todosid = data.get('todoid');
      let config = attachToken();
      config.params = {
        itemid: todoitemid,
        todosid: todosid
      }
      axios.get('/api/todos/todoitem/id', config)
      .then(function (response) {
        console.log(JSON.parse(response.data.message));
      })
      .catch(function (error) {
        console.log(error);
      })

    }

    const updateTodoListTitle = (event) => {
      event.preventDefault();
      const data = new FormData(event.target);
      const todoListId = data.get('todoListId');
      const title = data.get('title');
      let config = attachToken();
      config.params = {
        todoListId: todoListId,
        title: title
      }
        

      axios.put('/api/todos/todos/id', {}, config)
      .then(function (response) {
        console.log(JSON.parse(response.data.message));
      })
      .catch(function (error) {
        console.log(error);
      })
    }
      
    const updateTodoListItem = (event) => {
      event.preventDefault();
      const data = new FormData(event.target);
      const todolistid = data.get('todolistid');
      const todoitemid = data.get('todoitemid');
      let checked = false;
      if(data.get('checked') == "on"){
        checked = true;
      }
      console.log(checked);
      let update = {
        title: data.get('title'),
        duration: data.get('duration'),
        checked: checked
      }
      let config = attachToken();
      config.params = {
        todoListId: todolistid,
        todoItemId: todoitemid
      }
      axios.put('/api/todos/todos/todo/todoitem/:id', update, config)
      .then(function (response) {
        console.log(JSON.parse(response.data.message));
      })
      .catch(function (error) {
        console.log(error);
      })

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
            <div>
              <p>Fetch todo collection</p>
              <form onSubmit={getTodoCollection}>
                <input type="submit" value="Submit" />
              </form>
            </div>
            <div>
              <p>Fetch todoitem by id</p>
              <form onSubmit={getTodoItemById}>
                <p>itemid</p>
                <input type="text" name="todoitemid" />
                <p>todoid</p>
                <input type="text" name="todoid" />
                <input type="submit" value="Submit" />
              </form>
            </div>
            <div>
              <p>Update todoList title</p>
              <form onSubmit={updateTodoListTitle}>
                <p>todoListId</p>
                <input type="text" name="todoListId" />
                <p>todolist new title</p>
                <input type="text" name="title" />
                <input type="submit" value="Submit" />
              </form>
            </div>
            <div>
              <p>Update todoList item</p>
              <form onSubmit={updateTodoListItem}>
                <p>todolistid</p>
                <input type="text" name="todolistid" />
                <p>item id</p>
                <input type="text" name="todoitemid" />
                <p>item title</p>
                <input type="text" name="title" />
                <p>item duration</p>
                <input type="number" name="duration" />
                <p>item checked</p>
                <input type="checkbox" name="checked" />
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