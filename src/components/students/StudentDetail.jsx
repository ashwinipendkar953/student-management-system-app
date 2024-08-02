import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteStudentAsync } from "../../features/studentsSlice";

const StudentDetail = () => {
  const { studentId } = useParams();
  const { students } = useSelector((state) => state.students);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const student = students.find((student) => student._id == studentId);

  const deleteHandler = (event) => {
    event.preventDefault();
    dispatch(deleteStudentAsync(studentId));
    navigate("/students");
  };

  return (
    <main className="container my-3">
      <h1>Student Detail</h1>
      <p>Name: {student.name}</p>
      <p>Age: {student.age}</p>
      <p>Grade: {student.grade}</p>
      <p>Attendance: {student.attendance}</p>
      <p>Marks: {student.marks}</p>
      <Link
        className="btn btn-link bg-warning"
        to={{ pathname: "/students/edit" }}
        state={student}
      >
        Edit Details
      </Link>
      <Link className="btn btn-danger mx-2" onClick={(e) => deleteHandler(e)}>
        Delete
      </Link>
    </main>
  );
};

export default StudentDetail;
