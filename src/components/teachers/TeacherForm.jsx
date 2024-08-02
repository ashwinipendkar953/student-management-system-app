import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  addTeacherAsync,
  updateTeacherAsync,
} from "../../features/teachersSlice";
import { useLocation } from "react-router-dom";

const TeacherForm = () => {
  const { state: existingTeacher } = useLocation();

  const initialFormData = {
    name: "",
    age: "",
    gender: "",
    yearsOfExperience: "",
    subject: "",
  };

  const subjectsList = [
    "Mathematics",
    "English",
    "Science",
    "Biology",
    "Physics",
    "History",
    "Civics",
    "Geography",
    "Environmental Science",
    "Computer Science",
    "Physical Education",
    "Art",
    "Music",
    "Chemistry",
  ];

  const [formData, setFormData] = useState(initialFormData);
  const [successMsg, setSuccessMsg] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (existingTeacher) {
      setFormData(existingTeacher);
    }
  }, [existingTeacher]);

  const changeHandler = (event) => {
    const { name, value, checked, type } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]:
        type === "radio" && checked
          ? value
          : name === "age" || name === "yearsOfExperience"
            ? parseInt(value)
            : value,
    }));
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const newTeacher = {
      ...formData,
      _id: existingTeacher && existingTeacher._id,
    };
    if (existingTeacher) {
      dispatch(updateTeacherAsync(newTeacher));
      setSuccessMsg("Teacher information updated successfully.");
    } else {
      dispatch(addTeacherAsync(newTeacher));
      setSuccessMsg("Teacher added successfully.");
    }

    setFormData(initialFormData);
  };

  return (
    <main className="container my-3">
      <h1>{existingTeacher ? "Edit" : "Add"} Teacher</h1>
      {successMsg && (
        <p className="text-success fw-semibold my-2">{successMsg}</p>
      )}
      <form onSubmit={submitHandler}>
        <input
          name="name"
          value={formData.name || ""}
          onChange={changeHandler}
          placeholder="Name"
          required
        />
        <br />
        <br />
        <input
          type="number"
          name="age"
          value={formData.age || ""}
          onChange={changeHandler}
          placeholder="Age"
          required
        />
        <br />
        <br />
        <input
          type="number"
          name="yearsOfExperience"
          value={formData.yearsOfExperience || ""}
          onChange={changeHandler}
          placeholder="Years of Experience"
          required
        />
        <br />
        <br />
        <label>Gender:</label>
        <label className="mx-2">
          <input
            type="radio"
            name="gender"
            value="Male"
            onChange={changeHandler}
            checked={formData.gender === "Male"}
          />{" "}
          Male
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="Female"
            onChange={changeHandler}
            checked={formData.gender === "Female"}
          />{" "}
          Female
        </label>
        <br />
        <br />
        <label>Select Subject: </label>{" "}
        <select
          name="subject"
          onChange={changeHandler}
          value={formData.subject}
          required
        >
          <option value="">select subject</option>
          {subjectsList.map((subjectOption, index) => (
            <option key={index} value={subjectOption}>
              {subjectOption}
            </option>
          ))}
        </select>
        <br />
        <br />
        {existingTeacher ? (
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

export default TeacherForm;
