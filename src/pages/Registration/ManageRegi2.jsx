import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Card from "../UI/Card";

function ManageRegi() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        "http://localhost/My_School_Project/School_Management_Project/api/academystudent",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch students");
      }

      const data = await res.json();
      setStudents(data.academy_students);
    } catch (err) {
      setError(err.message);
      console.error("Error in fetchStudents:", err.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete student - using URL param for ID instead of sending body in DELETE request
  const deleteStudent = async (id) => {
    try {
      const res = await fetch(
        `http://localhost/My_School_Project/School_Management_Project/api/academystudent/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to delete student");
      }

      const data = await res.json();
      console.log("Delete response:", data);
    } catch (err) {
      setError(err.message);
      console.error("Error deleting student:", err.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      await deleteStudent(id);
      fetchStudents(); // Refresh list after deletion
    }
  };

  return (
    <Card title="Student Details">
      <NavLink className="btn btn-primary mb-3" to="/create-regi">
        Create Student
      </NavLink>

      {loading && <p>Loading students...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Photo</th>
              <th>Name</th>
              <th>Father's Name</th>
              <th>Mother's Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No students found.
                </td>
              </tr>
            )}
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>
                  <img
                    src={`http://localhost/My_School_Project/School_Management_Project/img/${student.photo}`}
                    width="100"
                    alt={student.name}
                  />
                </td>
                <td>{student.name}</td>
                <td>{student.fathers_name}</td>
                <td>{student.mothers_name}</td>
                <td className="btn-group">
                  <button
                    onClick={() => navigate("/student-view", { state: student })}
                    className="btn btn-success"
                  >
                    View
                  </button>
                  <button
                    onClick={() => navigate("/student-edit", { state: student })}
                    className="btn btn-primary"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(student.id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Card>
  );
}

export default ManageRegi;
