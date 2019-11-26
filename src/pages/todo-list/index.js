import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";

import Layout from "../../components/Layout";
import ListItem from "./ListItem";
import useTasks from "../../utils/useTasks";

const ALL = "ALL";
const CHECK = "CHECK";
const UNCHECK = "UNCHECK";

export default () => {
  const [filter, setFilter] = useState(ALL);
  const { tasks, setTasks } = useTasks();
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [count, setCount] = useState(filteredTasks.length);

  useEffect(() => {
    const ft =
      filter === ALL
        ? tasks
        : tasks.filter(
            item => item.checked === (filter === CHECK ? true : false)
          );
    setFilteredTasks(ft);
    setCount(ft.length);
  }, [tasks, filter]);

  const handleChange = id => {
    const newTasks = tasks.map(element =>
      element.id === id ? { ...element, checked: !element.checked } : element
    );
    setTasks(newTasks);
  };

  const handleAdd = event => {
    if (event.key === "Enter" && event.target.value !== "") {
      const newTasks = tasks.concat({
        id: Date.now(),
        checked: false,
        label: event.target.value
      });
      setTasks(newTasks);
      event.target.value = "";
    }
  };

  const handleDelete = id => {
    const newTasks = tasks.filter(item => item.id !== id);
    setTasks(newTasks);
  };

  return (
    <Layout title="To do" author="Valentin">
      <Link to="/">Go home</Link>
      <input type="text" placeholder="Nouvelle tâche" onKeyPress={handleAdd} />
      <ul>
        {filteredTasks.map(element => (
          <ListItem
            {...element}
            key={element.id}
            onChange={() => handleChange(element.id)}
            onDelete={() => handleDelete(element.id)}
          />
        ))}
      </ul>
      <footer>
        <button onClick={() => setFilter(ALL)}>Tous</button>
        {" - "}
        <button onClick={() => setFilter(CHECK)}>Validés</button>
        {" - "}
        <button onClick={() => setFilter(UNCHECK)}>Non validés</button>
        {" - count : "}
        {count}
      </footer>
    </Layout>
  );
};
