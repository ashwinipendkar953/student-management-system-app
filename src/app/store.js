import { configureStore } from "@reduxjs/toolkit";
import { schoolReducer } from "../features/schoolSlice";
import { studentReducer } from "../features/studentsSlice";
import {teacherReducer} from "../features/teachersSlice";


const store = configureStore({
  reducer: {
    students: studentReducer,
    teachers: teacherReducer,
    school: schoolReducer,
  },
});

export default store;
