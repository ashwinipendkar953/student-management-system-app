import { useDispatch, useSelector } from "react-redux";
import { fetchStudents, setFilter, setSortBy } from "../features/studentsSlice";
import { useEffect } from "react";

const ClassView = () => {
  const { filter, sortBy, students } = useSelector((state) => state.students);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStudents());
  }, []);

  const filteredStudents = students.filter((student) => {
    if (filter === "All") return true;
    if (filter === "Boys") return student.gender === "Male";
    if (filter === "Girls") return student.gender === "Female";
  });

  const sortedStudents = filteredStudents.sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "marks") return b.marks - a.marks;
    if (sortBy === "attendance") return b.attendance - a.attendance;
  });

  const handleFilterChange = (event) => {
    dispatch(setFilter(event.target.value));
  };

  const handleSortChange = (event) => {
    dispatch(setSortBy(event.target.value));
  };

  return (
    <main className="container my-3">
      <h1>Class View</h1>
      <label>Filter by Gender:</label>{" "}
      <select value={filter} onChange={handleFilterChange}>
        <option value="All" >
          All
        </option>
        <option value="Boys">Boys</option>
        <option value="Girls">Girls</option>
      </select>
      <br />
      <br />
      <label>Sort by: </label>{" "}
      <select value={sortBy} onChange={handleSortChange}>
        <option value="name" >
          Name
        </option>
        <option value="marks">Marks</option>
        <option value="attendance">Attendance</option>
      </select>
      <br />
      <br />
      <ul>
        {sortedStudents.map((student) => (
        <li key={student._id}>
          {`${student.name} - ${student.gender} - Marks: ${student.marks} - Attendance: ${student.attendance}`}
        </li>
        ))}
      </ul>
    </main>
  );
};

export default ClassView;
