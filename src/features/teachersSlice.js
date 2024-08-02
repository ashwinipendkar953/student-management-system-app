import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTeachers = createAsyncThunk(
  "teachers/fetchTeachers",
  async () => {
    const response = await axios.get(
      "https://student-management-api-two.vercel.app/api/teachers",
    );
    return response.data;
  },
);

export const addTeacherAsync = createAsyncThunk(
  "teachers/add",
  async (newTeacher) => {
    const response = await axios.post(
      "https://student-management-api-two.vercel.app/api/teachers",
      newTeacher,
    );
    // console.log(response.data);
    return response.data;
  },
);

export const updateTeacherAsync = createAsyncThunk(
  "teachers/update",
  async (updateTeacher) => {
    const response = await axios.put(
      `https://student-management-api-two.vercel.app/api/teachers/${updateTeacher._id}`,
      updateTeacher,
    );
    return response.data;
  },
);

export const deleteTeacherAsync = createAsyncThunk(
  "teachers/delete",
  async (teacherId) => {
    const response = await axios.delete(
      `https://student-management-api-two.vercel.app/api/teachers/${teacherId}`,
    );
    return response.data;
  },
);

const teachersSlice = createSlice({
  name: "teachers",
  initialState: {
    teachers: [],
    status: "idle",
    error: null,
    filter: "All",
    sortBy: "name",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeachers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTeachers.fulfilled, (state, action) => {
        state.status = "success";
        state.teachers = action.payload;
      })
      .addCase(fetchTeachers.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(addTeacherAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.teachers.push(action.payload);
      })
      .addCase(addTeacherAsync.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(updateTeacherAsync.fulfilled, (state, action) => {
        const findIndex = state.teachers.findIndex(
          (teacher) => teacher._id == action.payload._id,
        );
        if (findIndex !== -1) {
          state.status = "success";
          state.teachers[findIndex] = action.payload;
        }
      })
      .addCase(updateTeacherAsync.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(deleteTeacherAsync.fulfilled, (state, action) => {
        state.teachers = state.teachers.filter(
          (teacher) => teacher._id !== action.payload._id,
        );
      });
  },
});

export const teacherReducer = teachersSlice.reducer;
