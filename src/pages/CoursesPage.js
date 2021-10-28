import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import CoursesHeader from "../components/CoursesHeader";
import "./CoursesStyle.css";
import CreateCourse from "../components/CreateCourse";
import { DELETE, SEARCHTITLE } from "../redux/actionTypes";
import { useDispatch } from "react-redux";
import { toastr } from "react-redux-toastr";

const CoursesPage = () => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.reducer);
  const [isNewCourseOpen, setIsNewCourseOpen] = useState(false);
  const [toggleDelete, setToggleDelete] = useState(false);
  const [toggleEdit, setToggleEdit] = useState(false);
  const [courseData, setCourseData] = useState(null);
  const [searchValue, setSearchValue] = useState({
    title: "",
    category: "",
    author: "",
  })

  const handleSearchChange = (e) => {
    setSearchValue({...searchValue, [e.target.name]: e.target.value})
    if(e.target.name === "title") {
      dispatch({type: SEARCHTITLE, payload: searchValue?.title});
    } else {
      console.log("ready for others")
    }
  }




  useEffect(() => {
      setCourseData(null)
  },[])
  const addNewCourse = () => {
    setIsNewCourseOpen(!isNewCourseOpen);
  };

  const deleteCourse = (e, id) => {
    e.preventDefault();
    dispatch({ type: DELETE, payload: id });
  };

  const editCourse = (course) => {
     setIsNewCourseOpen(true);
     setCourseData(course)
  };

  const handleEditAndDelete = (e,course) => {
    if (toggleDelete) {
      deleteCourse(e,course.id);
    } 
    
    if (toggleEdit) {
        editCourse(course)
    }


    if(!toggleEdit) {
        setCourseData(null)
    }
  };

  const handleDeleteToggle =() => {
      setToggleDelete(!toggleDelete)

      if(!toggleDelete) {
          toastr.info("click course to delete")
        } else  {
          toastr.info("delete operation lifted")
      }
  }
  const handleEditToggle = () => {
       setToggleEdit(!toggleEdit)

      if(!toggleEdit) {
          toastr.info("click course to Edit")
        } else {
          toastr.info("Edit operation lifted")
           setCourseData(null)
      }
  }

  return (
    <div className="coursesContainer">
      {isNewCourseOpen ? (
        <CreateCourse courseData={courseData !== null && courseData} addNewCourse={() => addNewCourse()} />
      ) : (
        <>
          <h1>Courses</h1>
          <div className="coursesBtnGroup">
            <button id="btnNew" disabled={(toggleEdit || toggleDelete) && true} onClick={addNewCourse}>
              New
            </button>
            <button id="btnEdit" disabled={(toggleDelete) && true} onClick={handleEditToggle}>
              {toggleEdit ? "Done" : "Edit"}
            </button>
            <button
              disabled={(toggleEdit) && true}
              id="btnDelete"
              onClick={ handleDeleteToggle  }
            >
              {toggleDelete ? "Done" : "Delete"}
            </button>
          </div>

          <div className="coursesListContainer">
            <div className="coursesList">
              <table>
                <tbody>
                <th>
                  {" "}
                  <td>
                    <CoursesHeader isInput heading="Title" handleSearchChange={handleSearchChange} searchValue={searchValue} name="title" />
                  </td>
                </th>
                <th>
                  {" "}
                  <td>
                    <CoursesHeader isInput heading="Length" handleSearchChange={handleSearchChange} searchValue={searchValue}  name="length" />
                  </td>
                </th>
                <th>
                  {" "}
                  <td>
                    <CoursesHeader isInput heading="Category" handleSearchChange={handleSearchChange} searchValue={searchValue} name="category" />
                  </td>
                </th>
                <th>
                  {" "}
                  <td>
                    <CoursesHeader isInput heading="Author" handleSearchChange={handleSearchChange} searchValue={searchValue} name="author" />
                  </td>
                </th>
                {courses.length > 0 ? (
                  courses.map((course) => {
                    return (
                      <tr onClick={(e) => handleEditAndDelete(e, course)} key={course.id} className={toggleEdit ? "isEditActive" : toggleDelete && "isDeleteActive"}>
                        <td style={{color: "rgb(67 36 142)", textDecoration: 'underline'}}>{course.title}</td>
                        <td >{course.length}</td>
                        <td  >{course.category}</td>
                        <td >{course.author}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <p>No Courses at the moment</p>
                  </tr>
                )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CoursesPage;
