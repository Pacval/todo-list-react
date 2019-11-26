import React, { useState } from "react";

import Layout from "../../components/Layout";
import ListItem from "./ListItem";

const ALL = "ALL";
const CHECK = "CHECK";
const UNCHECK = "UNCHECK";

export default () => {
  const [filter, setFilter] = useState(ALL);
  const [tasks, setTasks] = useState([
    { id: 1, checked: true, label: "tache 1" },
    { id: 2, checked: false, label: "tache 2" }
  ]);

  const filteredTasks =
    filter === ALL
      ? tasks
      : tasks.filter(
          item => item.checked === (filter === CHECK ? true : false)
        );

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
      </footer>
    </Layout>
  );
};
