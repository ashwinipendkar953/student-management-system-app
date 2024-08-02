import { Link } from "react-router-dom";
import TeacherList from "../components/teachers/TeacherList";
import { useSelector } from "react-redux";

const TeacherView = () => {
  const { status, error } = useSelector((state) => state.teachers);

  return (
    <main className="container my-3">
      <h1>Teacher View</h1>
      <Link to={`/teachers/add`} className="btn btn-link bg-warning my-2">
        Add Teacher
      </Link>
      {status === "loading" && <p>Loading...</p>}
      {error && <p className="text-danger fw-semibold">{error}</p>}
      <TeacherList />
    </main>
  );
};

export default TeacherView;
