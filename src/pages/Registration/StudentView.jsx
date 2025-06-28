
import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import Card from "../UI/Card";
import './StudentView.css'; // (we will create this CSS file)

function StudentView() {
    const location = useLocation();
    const navigate = useNavigate();
    const student = location.state;

    if (!student) {
        navigate('/manageregi');
        return null;
    }

    return (
        <>
            <Card title="Student Details">
                <NavLink className="btn btn-success" to="/manageregi">Back</NavLink>

                <div className="student-info">
                    <div className="info-box">
                        <h4><b>ID:</b> {student.id}</h4>
                    </div>
                    <div className="info-box">
                        <h5><b>Name:</b> {student.name}</h5>
                    </div>
                    <div className="info-box">
                        <h5><b>Father's Name: </b>{student.fathers_name}</h5>
                    </div>
                </div>

                <div className="student-photo">
                    <img 
                        src={`http://hamid.intelsofts.com/School_Project/img/${student.photo}`} 
                        width="300" 
                        alt={`${student.name}'s photo`} 
                    />
                </div>
            </Card>
        </>
    )
};

export default StudentView;
