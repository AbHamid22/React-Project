import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateCustomer = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        type: 'individual',
        photo: null
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
        payload.append('email', formData.email);
        payload.append('phone', formData.phone);
        payload.append('type', formData.type);
        if (formData.photo) {
            payload.append('photo', formData.photo);
        }

        try {
            const response = await fetch('http://hamid.intelsofts.com/MyLaravelProject/RealEstate/public/api/customers', {
                method: 'POST',
                body: payload,
            });

            if (response.ok) {
                alert('Customer created successfully');
                navigate('/customers');
            } else {
                const errorData = await response.json();
                setErrors(errorData.errors || {});
            }
        } catch (err) {
            console.error('Error creating customer:', err);
        }
    };

    return (
        <div className="container my-4">
            <h4>Create New Customer</h4>
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
                            <label>Phone</label>
                            <input
                                type="text"
                                className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                            {errors.phone && <div className="invalid-feedback">{errors.phone[0]}</div>}
                        </div>

                        <div className="mb-3">
                            <label>Type</label>
                            <select
                                className={`form-select ${errors.type ? 'is-invalid' : ''}`}
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                            >
                                <option value="individual">Individual</option>
                                <option value="corporate">Corporate</option>
                            </select>
                            {errors.type && <div className="invalid-feedback">{errors.type[0]}</div>}
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

                        <div className="d-flex justify-content-end">
                            <button type="submit" className="btn btn-success">
                                <i className="fa fa-save me-1"></i> Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateCustomer;
