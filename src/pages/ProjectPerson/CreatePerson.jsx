import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreatePerson = () => {
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        email: '',
        designation: '',
        photo: null,
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData(prev => ({ ...prev, photo: e.target.files[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = new FormData();
        payload.append('name', formData.name);
        payload.append('mobile', formData.mobile);
        payload.append('email', formData.email);
        payload.append('designation', formData.designation);
        if (formData.photo) {
            payload.append('photo', formData.photo);
        }

        try {
            const response = await fetch('http://hamid.intelsofts.com/MyLaravelProject/RealEstate/public/api/projectpersons', {
                method: 'POST',
                body: payload,
            });

            if (response.ok) {
                alert('Person created successfully');
                navigate('/persons');
            } else {
                const data = await response.json();
                setErrors(data.errors || {});
            }
        } catch (error) {
            console.error('Error creating person:', error);
        }
    };

    return (
        <div className="container my-4">
            <h4>Create New Person</h4>
            <div className="card shadow-sm">
                <div className="card-body">
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="mb-3">
                            <label>Name</label>
                            <input
                                type="text"
                                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                            {errors.name && <div className="invalid-feedback">{errors.name[0]}</div>}
                        </div>

                        <div className="mb-3">
                            <label>Mobile</label>
                            <input
                                type="text"
                                className={`form-control ${errors.mobile ? 'is-invalid' : ''}`}
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                            />
                            {errors.mobile && <div className="invalid-feedback">{errors.mobile[0]}</div>}
                        </div>

                        <div className="mb-3">
                            <label>Email</label>
                            <input
                                type="email"
                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {errors.email && <div className="invalid-feedback">{errors.email[0]}</div>}
                        </div>

                        <div className="mb-3">
                            <label>Designation</label>
                            <input
                                type="text"
                                className={`form-control ${errors.designation ? 'is-invalid' : ''}`}
                                name="designation"
                                value={formData.designation}
                                onChange={handleChange}
                            />
                            {errors.designation && <div className="invalid-feedback">{errors.designation[0]}</div>}
                        </div>

                        <div className="mb-3">
                            <label>Photo</label>
                            <input
                                type="file"
                                className={`form-control ${errors.photo ? 'is-invalid' : ''}`}
                                name="photo"
                                onChange={handleFileChange}
                            />
                            {errors.photo && <div className="invalid-feedback">{errors.photo[0]}</div>}
                        </div>

                        <div className="text-end">
                            <button type="submit" className="btn btn-success">
                                <i className="fa fa-save me-1"></i> Save Person
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreatePerson;
