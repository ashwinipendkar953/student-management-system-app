import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "../features/studentsSlice";
import StudentList from "../components/students/StudentList";
import { Link } from "react-router-dom";

const StudentView = () => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.students);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  return (
    <main className="container my-3">
      <h1>Student View</h1>
      <Link
        to="add"
        className="btn btn-link bg-warning fw-semibold my-2"
      >
        Add Student
      </Link>
      {status === "loading" && <p>Loading....</p>}
      {error && <p className="text-danger">{error}</p>}
      <StudentList />
    </main>
  );
};

export default StudentView;
