import React, { useState, useEffect } from "react";
import CourseInput from "./CourseInput";
import "./createCourseStyle.css";
import { CREATE, EDIT } from "../redux/actionTypes";
import { useDispatch } from "react-redux";
import "react-redux-toastr/lib/css/react-redux-toastr.min.css";
import { toastr } from "react-redux-toastr";
import {FiSend} from 'react-icons/fi'

const CreateCourse = ({ addNewCourse, courseData }) => {
  const dispatch = useDispatch();
  const [task, setTask] = useState({
    title: "",
    author: "",
    category: "",
    length: "",
  });
  useEffect(() => {
    setTask(courseData);
  }, [courseData]);

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const cancel = () => {
    addNewCourse();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !task.title == "" &&
      !task.author == "" &&
      !task.category == "" &&
      !task.length == ""
    ) {

      if (courseData) {
        dispatch({ type: EDIT, payload: task });
        addNewCourse();
        toastr.success('Success', 'course has been editted')
      } else {
        let pattern = /[0-9]:/
        if(pattern.exec(task.length) === null) {
          toastr.warning("Not valid", "plese provide correct length of the course ex: ( 05:32)")
          return
        }
        addNewCourse();
        dispatch({
          type: CREATE,
          payload: {  id: Math.floor(Math.random() * 1000 + 1), ...task },
        });
        toastr.success("Success", "course is added");
      }
    } else {
      toastr.error("Incomplete Information");
    }
  };

  const clearValues = () => {
    setTask({
      title: "",
      author: "",
      category: "",
      length: "",
    });
  };
  return (
    <div className="createCourse" onSubmit={handleSubmit}>
      <h1 style={{marginBottom: '20px'}}>Add</h1>

      <CourseInput
        name="title"
        placeholder="Title of the course"
        task={task.title}
        handleChange={(e) => handleChange(e)}
        title="Title"
      />
      <CourseInput
        name="author"
        placeholder=""
        task={task.author}
        handleChange={(e) => handleChange(e)}
        title="Author"
      />
      <CourseInput
        name="category"
        placeholder="Category of the course"
        task={task.category}
        handleChange={(e) => handleChange(e)}
        title="Category"
      />
      <CourseInput
        name="length"
        placeholder="Length of the course in minutes and hours (05:43)"
        task={task.length}
        handleChange={(e) => handleChange(e)}
        title="Length"
      />

      <div className="btns">
        <div>
          <FiSend />
        <p onClick={handleSubmit}>Submit</p>
        </div>
        <button onClick={clearValues}>Clear Values</button>
        <button onClick={cancel}>Cancel</button>
      </div>
    </div>
  );
};

export default CreateCourse;
