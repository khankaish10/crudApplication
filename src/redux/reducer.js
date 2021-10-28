import { CREATE, DELETE, EDIT } from "./actionTypes";

const initialState = [
  {
    id: 1,
    title: "Reactjs",
    length: "1:08",
    category: "javascript",
    author: "cory-house",
  },
  {
    id: 2,
    title: "Nodejs",
    length: "5:08",
    category: "javascript",
    author: "cory-house",
  },
  {
    id: 3,
    title: "html",
    length: "4:06",
    category: "markup",
    author: "cory-house",
  },
  {
    id: 4,
    title: "css",
    length: "7:90",
    category: "javascript",
    author: "cory-house",
  },
  {
    id: 5,
    title: "django",
    length: "3:08",
    category: "javascript",
    author: "cory-house",
  },
];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE:
      return [...state, action.payload];
      break;
    case DELETE:
      const tempCourses = [...state];
      const deletedCourses = tempCourses.filter(
        (item) => item.id !== action.payload
      );
      return deletedCourses;

    case EDIT:
      const editTempCourse = [...state];
      const EdittedCourse = editTempCourse.map((item) => {
        if (item.id === action.payload.id) {
          return { ...action?.payload };
        }
        return item;
      });
      return EdittedCourse;
      break;
    default:
      return state;
      break;
  }
};

export default reducer;
