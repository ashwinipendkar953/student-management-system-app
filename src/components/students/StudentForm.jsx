import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addStudentAsync, updateStudentAsync } from "../../features/studentsSlice";
import { useLocation } from "react-router-dom";

const StudentForm = () => {
  const { error } = useSelector((state) => state.students);

  const dispatch = useDispatch();
  const [successMsg, setSuccessMsg] = useState("");

  const { state: existingStudent } = useLocation();

  const initialFormData = {
    name: "",
    age: "",
    grade: "",
    gender: "Male",
    attendance: "",
    marks: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (existingStudent) {
      setFormData(existingStudent);
    }
  }, [existingStudent]);

  const changeHandler = (event) => {
    const { name, value, checked, type } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]:
        type === "radio" && checked
          ? value
          : name === "age"
            ? parseInt(value)
            : value,
    }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const newStudent = {
      ...formData,
      _id: existingStudent && existingStudent._id,
    };
    // console.log(newStudent);

    if (existingStudent) {
      dispatch(updateStudentAsync(newStudent));
      setSuccessMsg("Student information updated successfully.");
    } else {
      dispatch(addStudentAsync(newStudent));
      setSuccessMsg("New student added successfully.");
    }
    setFormData(initialFormData);
  };

  return (
    <main className="container my-3">
      <h1>{existingStudent ? "Edit" : "Add"} Student</h1>
      {successMsg && <p className="text-success fw-semibold">{successMsg}</p>}
      {error && <div className="text-danger fw-semibold mb-3">{error}</div>}
      <form onSubmit={submitHandler}>
        <input
          name="name"
          placeholder="Name"
          value={formData.name || ""}
          onChange={changeHandler}
          required
        />
        <br />
        <br />

        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age || ""}
          onChange={changeHandler}
          required
        />
        <br />
        <br />

        <input
          name="grade"
          placeholder="Grade"
          value={formData.grade || ""}
          onChange={changeHandler}
          required
        />
        <br />
        <br />

        <label>Gender:</label>
        <label className="mx-1">
          <input
            type="radio"
            name="gender"
            value="Male"
            className="mx-1"
            onChange={changeHandler}
            checked={formData.gender === "Male"}
          />
          Male
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="Female"
            onChange={changeHandler}
            className="mx-1"
            checked={formData.gender === "Female"}
          />
          Female
        </label>
        <br />
        <br />

        {existingStudent && (
          <>
            <input
              name="attendance"
              value={formData.attendance || ""}
              placeholder="Attendance"
              onChange={changeHandler}
            />

            <br />
            <br />

            <input
              name="marks"
              value={formData.marks || ""}
              placeholder="Marks"
              onChange={changeHandler}
            />
            <br />
            <br />
          </>
        )}

        {existingStudent ? (
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        ) : (
          <button type="submit">Add</button>
        )}
      </form>
    </main>
  );
};

export default StudentForm;
