import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const StudentList = () => {
  const { students } = useSelector((state) => state.students);

  return (
    <section className="my-3">
      <h2>Student List</h2>
      <ul>
        {students.map((student) => (
          <li key={student._id}>
            <Link
              to={`details/${student._id}`}
            >{`${student.name} (Age: ${student.age})`}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default StudentList;
