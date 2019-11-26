import React from "react";
import ReactDOM from "react-dom";
import { Router, Redirect, Link } from "@reach/router";

import "./styles/main.css";
import * as serviceWorker from "./utils/serviceWorker";

import TodoListPage from "./pages/todo-list";
import useTasks, { TasksProvider } from "./utils/useTasks";
import { LOADING, SUCCESS, FAILURE } from "./constants/api";

const HomePage = () => {
  const { tasks, status } = useTasks();

  return (
    <div>
      <h1>Home Page</h1>
      <Link to="/todos">Todos</Link>

      {status === LOADING && <span>Chargement...</span>}
      {status === SUCCESS && (
        <ul>
          {tasks.map(item => (
            <li key={item.id}>{item.label}</li>
          ))}
        </ul>
      )}
      {status === FAILURE && <span>Erreur</span>}
    </div>
  );
};

const App = () => (
  <TasksProvider>
    <Router>
      <HomePage path="/" />
      <TodoListPage path="/todos" />
      <Redirection default />
    </Router>
  </TasksProvider>
);

const Redirection = () => <Redirect to="/todos" noThrow />;

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
