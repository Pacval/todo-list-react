import React, { createContext, useState, useContext, useEffect } from "react";

import { NOT_REQUESTED, LOADING, SUCCESS, FAILURE } from "../constants/api";

const tasksContext = createContext();
const { Provider, Consumer } = tasksContext;

const initialTasks = [];

export const TasksProvider = ({ children }) => {
  const [status, setStatus] = useState(NOT_REQUESTED);
  const [tasks, setTasks] = useState(initialTasks);

  useEffect(() => {
    (async () => {
      setStatus(LOADING);
      const response = await fetch("http://localhost:8000/tasks")
        .then(r => {
          if (r.status === 200) {
            return r.json().then(d => ({ ...d, ok: true }));
          }
          return { ok: false };
        })
        .catch(() => ({ ok: false }));

      if (response.ok) {
        setStatus(SUCCESS);
        setTasks(response.payload);
      } else {
        setStatus(FAILURE);
      }
    })();
  }, []);

  return <Provider value={{ tasks, setTasks, status }}>{children}</Provider>;
};

export const TasksConsumer = Consumer; // consumer = récupération des values du provider

const useTasks = () => useContext(tasksContext); // ici on utilise un hooks pour le consumer -> on récupère lels les values en appelant le hooks
export default useTasks;
