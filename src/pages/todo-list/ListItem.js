import React from "react";

const ListItem = ({ id, checked, label, onChange, onDelete }) => {
  return (
    <li>
      <input
        id={id}
        type="checkbox"
        value={true}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id}>{label}</label>
      <button onClick={onDelete}></button>
    </li>
  );
};

export default ListItem;
