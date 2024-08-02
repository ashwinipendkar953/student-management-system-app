import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "../features/studentsSlice";

import {
  updateSchoolStats,
  setTopStudent,
  updateTeacherStats,
} from "../features/schoolSlice";
import { fetchTeachers } from "../features/teachersSlice";

const SchoolView = () => {
  const { students } = useSelector((state) => state.students);
  const { teachers } = useSelector((state) => state.teachers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStudents());
    dispatch(fetchTeachers());
  }, [dispatch]);

  useEffect(() => {
    if (students.length > 0) {
      const totalStudents = students.length;

      const totalAttendance = students.reduce(
        (acc, curr) => acc + (curr.attendance || 0),
        0,
      );
      const averageAttendance = (totalAttendance / totalStudents).toFixed(2);

      const totalMarks = students.reduce(
        (acc, curr) => acc + (curr.marks || 0),
        0,
      );
      const averageMarks = (totalMarks / totalStudents).toFixed(2);

      const topStudent = students.reduce(
        (acc, curr) => (curr.marks > acc.marks ? curr : acc),
        students[0],
      );

      dispatch(
        updateSchoolStats({
          totalStudents,
          averageAttendance,
          averageMarks,
        }),
      );

      dispatch(setTopStudent(topStudent));
    }
  }, [students, dispatch]);

  useEffect(() => {
    const totalTeachers = teachers.length;
    const totalExperience = teachers.reduce(
      (acc, curr) => acc + curr.yearsOfExperience,
      0,
    );
    const averageExperience = (totalExperience / totalTeachers).toFixed(2);

    dispatch(updateTeacherStats({ totalTeachers, averageExperience }));
  }, [teachers, dispatch]);

  const { totalStudents, averageAttendance, averageMarks, topStudent } =
    useSelector((state) => state.school.students);
  const { totalTeachers, averageExperience } = useSelector(
    (state) => state.school.teachers,
  );

  return (
    <main className="container my-3">
      <h1>School View</h1>
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3>Students </h3>
            </div>
            <div className="card-body">
              <p>Total Students: {totalStudents}</p>
              <p>Average Attendance: {averageAttendance}</p>
              <p>Average Marks: {averageMarks}</p>
              <p>Top Student: {topStudent ? topStudent.name : "-"}</p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3>Teachers</h3>
            </div>
            <div className="card-body">
              <p>Total Teachers: {totalTeachers}</p>
              <p>Average Experience: {averageExperience}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SchoolView;
