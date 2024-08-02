import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeachers } from "../../features/teachersSlice";
import { Link } from "react-router-dom";

const TeacherList = () => {
  const { teachers } = useSelector((state) => state.teachers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTeachers());
  }, [dispatch]);

  return (
    <main className="container my-3">
      <h1>Teacher List</h1>
      <ul>
        {teachers.map((teacher) => (
          <li key={teacher._id}>
            <Link
              to={`/teachers/details/${teacher._id}`}
            >{`${teacher.name} (Years of experience: ${teacher.yearsOfExperience})`}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default TeacherList;
