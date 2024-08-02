import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async () => {
    const response = await axios.get(
      "https://student-management-api-two.vercel.app/api/students",
    );
    return response.data;
  },
);

export const addStudentAsync = createAsyncThunk(
  "students/add",
  async (newStudent) => {
    const response = await axios.post(
      "https://student-management-api-two.vercel.app/api/students",
      newStudent,
    );
    return response.data;
  },
);

export const updateStudentAsync = createAsyncThunk(
  "students/update",
  async (updateStudent) => {
    const response = await axios.put(
      `https://student-management-api-two.vercel.app/api/students/${updateStudent._id}`,
      updateStudent,
    );
    return response.data;
  },
);

export const deleteStudentAsync = createAsyncThunk(
  "students/delete",
  async (studentId) => {
    const response = await axios.delete(
      `https://student-management-api-two.vercel.app/api/students/${studentId}`,
    );
    return response.data;
  },
);

const studentSlice = createSlice({
  name: "students",
  initialState: {
    students: [],
    status: "idle",
    error: null,
    filter: "All",
    sortBy: "name",
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.status = "success";
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(addStudentAsync.fulfilled, (state, action) => {
        state.students.push(action.payload);
      })
      .addCase(addStudentAsync.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(updateStudentAsync.fulfilled, (state, action) => {
        const findIndex = state.students.findIndex(
          (student) => student._id == action.payload._id,
        );

        if (findIndex !== -1) {
          state.status = "success";
          state.students[findIndex] = action.payload;
        }
      })
      .addCase(updateStudentAsync.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(deleteStudentAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.students = state.students.filter(
          (student) => student._id !== action.payload.student._id,
        );
      });
  },
});

export const { setFilter, setSortBy } = studentSlice.actions;

export const studentReducer = studentSlice.reducer;
