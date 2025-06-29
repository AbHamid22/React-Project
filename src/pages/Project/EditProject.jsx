import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditProject = () => {
    const { id } = useParams(); // get project ID from URL
    const navigate = useNavigate();

    const [types, setTypes] = useState([]);
    const [statusList, setStatusList] = useState([]);
    const [contractors, setContractors] = useState([]);

    const [formData, setFormData] = useState({
        photo: null,
        name: '',
        type_id: '',
        status_id: '',
        start_date: '',
        end_date: '',
        contractor_id: '',
    });

    const [errors, setErrors] = useState({});

    // Fetch dropdown options + project data
    useEffect(() => {
        fetch('http://hamid.intelsofts.com/MyLaravelProject/RealEstate/public/api/projecttypes')
            .then(res => res.json())
            .then(data => setTypes(data.data));

        fetch('http://hamid.intelsofts.com/MyLaravelProject/RealEstate/public/api/projectstatuses')
            .then(res => res.json())
            .then(data => setStatusList(data.data));

        fetch('http://hamid.intelsofts.com/MyLaravelProject/RealEstate/public/api/contractors')
            .then(res => res.json())
            .then(data => setContractors(data.data));

        fetch(`http://hamid.intelsofts.com/MyLaravelProject/RealEstate/public/api/projects/${id}`)
            .then(res => res.json())
            .then(project => {
                setFormData({
                    photo: null,
                    name: project.name,
                    type_id: project.type_id,
                    status_id: project.status_id,
                    start_date: project.start_date,
                    end_date: project.end_date,
                    contractor_id: project.contractor_id,
                });
            });
    }, [id]);

    const handleChange = e => {
        const { name, value, files } = e.target;
        if (name === 'photo') {
            setFormData(prev => ({ ...prev, photo: files[0] }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async e => {
        e.preventDefault();

        const payload = new FormData();
        payload.append('_method', 'PUT'); // Important line

        for (const key in formData) {
            if (formData[key] !== null) {
                payload.append(key, formData[key]);
            }
        }

        try {
            const response = await fetch(`http://hamid.intelsofts.com/MyLaravelProject/RealEstate/public/api/projects/${id}`, {
                method: 'POST', // still POST, but with _method = PUT
                body: payload,
            });

            const contentType = response.headers.get('content-type');

            if (!response.ok) {
                if (contentType && contentType.includes('application/json')) {
                    const errorData = await response.json();
                    setErrors(errorData.errors || {});
                    alert(errorData.message || 'Error updating project');
                } else {
                    const text = await response.text();
                    console.error('Server error:', text);
                    alert('Server error, see console for details');
                }
                return;
            }

            alert('Project updated successfully!');
            navigate('/all-project'); // Redirect if needed
        } catch (error) {
            alert('Network error');
            console.error(error);
        }
    };


    return (
        <div className="container mt-5">
            <div className="card shadow-lg">
                <div className="card-header bg-warning text-dark">
                    <h4 className="mb-0">Edit Project</h4>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        {/* Same form fields as CreateProject */}
                        {/* Photo upload */}
                        <div className="mb-3">
                            <label className="form-label">Photo (Optional)</label>
                            <input
                                type="file"
                                name="photo"
                                accept="image/*"
                                className="form-control"
                                onChange={handleChange}
                            />
                            {errors.photo && <div className="text-danger">{errors.photo}</div>}
                        </div>

                        {/* Name */}
                        <div className="mb-3">
                            <label className="form-label">Project Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                className="form-control"
                                onChange={handleChange}
                            />
                            {errors.name && <div className="text-danger">{errors.name}</div>}
                        </div>

                        {/* Type */}
                        <div className="mb-3">
                            <label className="form-label">Type</label>
                            <select
                                name="type_id"
                                value={formData.type_id}
                                className="form-select"
                                onChange={handleChange}
                            >
                                <option value="">Select type</option>
                                {types.map(type => (
                                    <option key={type.id} value={type.id}>
                                        {type.name}
                                    </option>
                                ))}
                            </select>
                            {errors.type_id && <div className="text-danger">{errors.type_id}</div>}
                        </div>

                        {/* Status */}
                        <div className="mb-3">
                            <label className="form-label">Status</label>
                            <select
                                name="status_id"
                                value={formData.status_id}
                                className="form-select"
                                onChange={handleChange}
                            >
                                <option value="">Select status</option>
                                {statusList.map(status => (
                                    <option key={status.id} value={status.id}>
                                        {status.name}
                                    </option>
                                ))}
                            </select>
                            {errors.status_id && <div className="text-danger">{errors.status_id}</div>}
                        </div>

                        {/* Dates */}
                        <div className="mb-3">
                            <label className="form-label">Start Date</label>
                            <input
                                type="date"
                                name="start_date"
                                value={formData.start_date}
                                className="form-control"
                                onChange={handleChange}
                            />
                            {errors.start_date && <div className="text-danger">{errors.start_date}</div>}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">End Date</label>
                            <input
                                type="date"
                                name="end_date"
                                value={formData.end_date}
                                className="form-control"
                                onChange={handleChange}
                            />
                            {errors.end_date && <div className="text-danger">{errors.end_date}</div>}
                        </div>

                        {/* Contractor */}
                        <div className="mb-3">
                            <label className="form-label">Contractor</label>
                            <select
                                name="contractor_id"
                                value={formData.contractor_id}
                                className="form-select"
                                onChange={handleChange}
                            >
                                <option value="">Select contractor</option>
                                {contractors.map(contractor => (
                                    <option key={contractor.id} value={contractor.id}>
                                        {contractor.name}
                                    </option>
                                ))}
                            </select>
                            {errors.contractor_id && <div className="text-danger">{errors.contractor_id}</div>}
                        </div>

                        {/* Submit */}
                        <div className="d-grid">
                            <button type="submit" className="btn btn-warning">
                                Update Project
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProject;
