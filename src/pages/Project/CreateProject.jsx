import React, { useState, useEffect } from 'react';
<link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
    rel="stylesheet"
/>


const CreateProject = () => {
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

    // Fetch dropdown data on mount
    useEffect(() => {
        fetch('http://hamid.intelsofts.com/MyLaravelProject/RealEstate/public/api/projecttypes').then(res => res.json()).then(data => setTypes(data.data));
        fetch('http://hamid.intelsofts.com/MyLaravelProject/RealEstate/public/api/projectstatuses').then(res => res.json()).then(data => setStatusList(data.data));
        fetch('http://hamid.intelsofts.com/MyLaravelProject/RealEstate/public/api/contractors').then(res => res.json()).then(data => setContractors(data.data));
    }, []);

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
        for (const key in formData) {
            if (formData[key] !== null) {
                payload.append(key, formData[key]);
            }
        }

        try {
            const response = await fetch('http://hamid.intelsofts.com/MyLaravelProject/RealEstate/public/api/projects', {
                method: 'POST',
                body: payload,
            });

            const contentType = response.headers.get('content-type');

            if (!response.ok) {
                if (contentType && contentType.includes('application/json')) {
                    const errorData = await response.json();
                    setErrors(errorData.errors || {});
                    alert(errorData.message || 'Error creating project');
                } else {
                    const text = await response.text();
                    console.error('Server error:', text);
                    alert('Server error, see console for details');
                }
                return;
            }

            const result = await response.json();
            alert('Project created successfully!');
            setFormData({
                photo: null,
                name: '',
                type_id: '',
                status_id: '',
                start_date: '',
                end_date: '',
                contractor_id: '',
            });
            setErrors({});
        } catch (error) {
            alert('Network error');
            console.error(error);
        }
    };
    return (
        <div className="container mt-5">
            <div className="card shadow-lg">
                <div className="card-header bg-primary text-white">
                    <h4 className="mb-0">Create New Project</h4>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        {/* Photo */}
                        <div className="mb-3">
                            <label className="form-label">Photo</label>
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

                        {/* Start Date */}
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

                        {/* End Date */}
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

                        {/* Submit Button */}
                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary">
                                Save Project
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );

};

export default CreateProject;
