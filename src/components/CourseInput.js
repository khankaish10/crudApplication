import React from "react";
import './courseInput.css'

const CourseInput = ({ handleChange, name, placeholder, task, title}) => {
  return (
    <div className="addTitle">
      <h4>{title}</h4>
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        value={task}
        onChange={handleChange}
      />
    </div>
  );
};

export default CourseInput;
