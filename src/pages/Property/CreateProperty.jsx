import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function CreateProperty() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        sqft: "",
        bed_room: "",
        bath_room: "",
        category_id: "",
        project_id: "",
        price: "",
        status: "",
        location: "",
        photo: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "photo") {
            setFormData({ ...formData, photo: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();

        // Convert numeric string fields to real numbers
        Object.keys(formData).forEach((key) => {
            if (formData[key] !== null && formData[key] !== "") {
                let value = formData[key];
                if (["sqft", "bed_room", "bath_room", "category_id", "project_id", "price"].includes(key)) {
                    value = parseFloat(value);
                }
                data.append(key, value);
            }
        });

        try {
            const res = await fetch("http://hamid.intelsofts.com/MyLaravelProject/RealEstate/public/api/properties", {
                method: "POST",
                body: data,
                headers: {
                    Accept: "application/json", // Laravel expects this
                },
            });

            if (!res.ok) {
                const errorData = await res.json();

                // Extract and display Laravel validation errors if available
                if (errorData.errors) {
                    const messages = Object.entries(errorData.errors)
                        .map(([field, msgs]) => `${field}: ${msgs.join(", ")}`)
                        .join("\n");
                    throw new Error(messages);
                }

                throw new Error(errorData.message || "Failed to create property");
            }

            const result = await res.json();
            Swal.fire("Success", "Property created successfully", "success");
            navigate("/all-property"); // Redirect to property list
        } catch (err) {
            Swal.fire("Validation Error", err.message, "error");
        }
    };


    return (
        <div className="container my-4">
            <h2>Create New Property</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input type="text" name="title" className="form-control" onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea name="description" className="form-control" onChange={handleChange}></textarea>
                </div>

                <div className="row">
                    <div className="col-md-4 mb-3">
                        <label className="form-label">SQFT</label>
                        <input type="number" name="sqft" className="form-control" onChange={handleChange} required />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label className="form-label">Bed Room</label>
                        <input type="number" name="bed_room" className="form-control" onChange={handleChange} required />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label className="form-label">Bath Room</label>
                        <input type="number" name="bath_room" className="form-control" onChange={handleChange} required />
                    </div>
                </div>

                <div className="mb-3">
                    <label className="form-label">Category ID</label>
                    <input type="number" name="category_id" className="form-control" onChange={handleChange} />
                </div>

                <div className="mb-3">
                    <label className="form-label">Project ID</label>
                    <input type="number" name="project_id" className="form-control" onChange={handleChange} />
                </div>

                <div className="mb-3">
                    <label className="form-label">Price</label>
                    <input type="number" name="price" className="form-control" onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Status</label>
                    <input type="text" name="status" className="form-control" onChange={handleChange} />
                </div>

                <div className="mb-3">
                    <label className="form-label">Location</label>
                    <input type="text" name="location" className="form-control" onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Photo</label>
                    <input type="file" name="photo" accept="image/*" className="form-control" onChange={handleChange} />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default CreateProperty;
