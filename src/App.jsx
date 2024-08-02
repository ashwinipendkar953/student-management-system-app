import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import StudentView from "./pages/StudentView";
import ClassView from "./pages/ClassView";
import SchoolView from "./pages/SchoolView";
import Header from "./components/Header";
import StudentForm from "./components/students/StudentForm";
import StudentDetail from "./components/students/StudentDetail";
import TeacherView from "./pages/TeacherView";
import TeacherForm from "./components/teachers/TeacherForm";
import TeacherDetail from "./components/teachers/TeacherDetail";

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/students" />} />
        <Route path="/students">
          <Route index element={<StudentView />} />
          <Route path="add" element={<StudentForm />} />
          <Route path="edit" element={<StudentForm />} />
          <Route path="details/:studentId" element={<StudentDetail />} />
        </Route>

        <Route path="/teachers" element={<TeacherView />} />
        <Route path="/teachers">
          <Route path="add" element={<TeacherForm />} />
          <Route path="edit" element={<TeacherForm />} />
          <Route path="details/:teacherId" element={<TeacherDetail />} />
        </Route>
        <Route path="/classes" element={<ClassView />} />
        <Route path="/school" element={<SchoolView />} />
      </Routes>
    </Router>
  );
}
