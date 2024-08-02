import { createSlice } from "@reduxjs/toolkit";

const schoolSlice = createSlice({
  name: "school",
  initialState: {
    students: {
      totalStudents: 0,
      averageAttendance: 0,
      averageMarks: 0,
      topStudent: null,
    },
    teachers: {
      totalTeachers: 0,
      averageExperience: 0,
    },
  },
  reducers: {
    updateSchoolStats: (state, action) => {
      state.students.totalStudents = action.payload.totalStudents;
      state.students.averageAttendance = action.payload.averageAttendance;
      state.students.averageMarks = action.payload.averageMarks;
    },
    setTopStudent: (state, action) => {
      state.students.topStudent = action.payload;
    },
    updateTeacherStats: (state, action) => {
      state.teachers.totalTeachers = action.payload.totalTeachers;
      state.teachers.averageExperience = action.payload.averageExperience;
      
    },
  },
});

export const { updateSchoolStats, setTopStudent, updateTeacherStats } = schoolSlice.actions;

export const schoolReducer = schoolSlice.reducer;
