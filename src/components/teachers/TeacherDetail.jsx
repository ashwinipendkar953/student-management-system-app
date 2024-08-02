import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteTeacherAsync } from "../../features/teachersSlice";

const TeacherDetail = () => {
  const { teacherId } = useParams();
  const { teachers } = useSelector((state) => state.teachers);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const teacher = teachers.find((teacher) => teacher._id == teacherId);

  const deleteHandler = (event) => {
    event.preventDefault();
    dispatch(deleteTeacherAsync(teacherId));
    navigate("/teachers");
  };

  return (
    <main className="container my-3">
      <h1>Teacher Detail</h1>
      <div>
        <p>Name: {teacher.name}</p>
        <p>Age: {teacher.age}</p>
        <p>Gender: {teacher.gender}</p>
        <p>Subject: {teacher.subject}</p>
        <p>Years Of Experience: {teacher.yearsOfExperience}</p>
        <Link
          className="btn btn-link bg-warning"
          to={{ pathname: "/teachers/edit" }}
          state={teacher}
        >
          Edit Details
        </Link>
        <Link onClick={deleteHandler} className="btn btn-danger mx-2">
          Delete
        </Link>
      </div>
    </main>
  );
};

export default TeacherDetail;
