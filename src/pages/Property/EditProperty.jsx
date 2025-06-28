import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

function EditProperty() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

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

    const [existingPhoto, setExistingPhoto] = useState("");

    useEffect(() => {
        const fetchProperty = async () => {
            setLoading(true);
            try {
                console.log("Fetching property with ID:", id);
                const res = await fetch(`http://hamid.intelsofts.com/MyLaravelProject/RealEstate/public/api/properties/${id}`);
                
                console.log("Response status:", res.status);
                
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                
                const responseText = await res.text();
                console.log("Raw response:", responseText);
                
                let json;
                try {
                    json = responseText ? JSON.parse(responseText) : {};
                } catch (parseError) {
                    console.error("JSON parse error:", parseError);
                    throw new Error("Invalid JSON response from server");
                }
                
                console.log("Parsed response:", json);
                
                // Handle different API response structures
                const data = json.data || json;
                
                if (!data) {
                    throw new Error("No property data found");
                }

                setFormData({
                    title: data.title || "",
                    description: data.description || "",
                    sqft: data.sqft || "",
                    bed_room: data.bed_room || "",
                    bath_room: data.bath_room || "",
                    category_id: data.category_id || "",
                    project_id: data.project_id || "",
                    price: data.price || "",
                    status: data.status || "",
                    location: data.location || "",
                    photo: null,
                });

                setExistingPhoto(data.photo || "");
            } catch (error) {
                console.error("Fetch error:", error);
                Swal.fire("Error", `Failed to fetch property: ${error.message}`, "error");
            } finally {
                setLoading(false);
            }
        };

        fetchProperty();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "photo") {
            setFormData((prev) => ({ ...prev, photo: files[0] }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const data = new FormData();

            // Log the form data being sent
            console.log("Form data before sending:", formData);

            Object.entries(formData).forEach(([key, value]) => {
                if (value !== null && value !== "") {
                    let processedValue = value;
                    
                    // Convert numeric fields to proper types
                    if (["sqft", "bed_room", "bath_room", "category_id", "project_id", "price"].includes(key)) {
                        processedValue = parseFloat(value);
                        if (isNaN(processedValue)) {
                            // For nullable fields, don't send if invalid
                            if (["category_id", "project_id"].includes(key)) {
                                console.log(`Skipping invalid ${key}: ${value}`);
                                return; // Skip this field
                            }
                            processedValue = 0;
                        }
                    }
                    
                    data.append(key, processedValue);
                    console.log(`Adding to FormData: ${key} = ${processedValue} (type: ${typeof processedValue})`);
                }
            });

            data.append("_method", "PUT");

            // Log the complete FormData contents
            console.log("Complete FormData contents:");
            for (let [key, value] of data.entries()) {
                console.log(`${key}: ${value} (type: ${typeof value})`);
            }

            console.log("Submitting form data for property ID:", id);

            const res = await fetch(`http://hamid.intelsofts.com/MyLaravelProject/RealEstate/public/api/properties/${id}`, {
                method: "POST",
                body: data,
                headers: {
                    Accept: "application/json",
                },
            });

            console.log("Update response status:", res.status);
            console.log("Update response headers:", res.headers);

            const responseText = await res.text();
            console.log("Update response text:", responseText);
            console.log("Response text length:", responseText.length);

            let json = {};
            try {
                json = responseText ? JSON.parse(responseText) : {};
                console.log("Parsed JSON response:", json);
            } catch (err) {
                console.error("Invalid JSON in update response:", responseText);
                // If response is empty but status is ok, consider it success
                if (res.ok && (!responseText || responseText.trim() === '')) {
                    console.log("Empty response but status OK, considering success");
                    Swal.fire("Success", "Property updated successfully", "success");
                    navigate("/all-property");
                    return;
                }
                throw new Error("Server returned invalid JSON.");
            }

            // Check if the request was successful (HTTP 200-299)
            if (res.ok) {
                console.log("Request was successful, checking response data");
                
                // Verify the response indicates success
                if (json.success === false) {
                    throw new Error(json.message || "Update failed according to server");
                }
                
                console.log("Update completed successfully");
                
                // Verify the update by fetching the property again
                try {
                    console.log("Verifying update by fetching property again...");
                    const verifyRes = await fetch(`http://hamid.intelsofts.com/MyLaravelProject/RealEstate/public/api/properties/${id}`);
                    if (verifyRes.ok) {
                        const verifyText = await verifyRes.text();
                        const verifyData = verifyText ? JSON.parse(verifyText) : {};
                        const propertyData = verifyData.data || verifyData;
                        
                        console.log("Verification - Updated property data:", propertyData);
                        console.log("Verification - Original form data:", formData);
                        
                        // Check if key fields were updated
                        const titleUpdated = propertyData.title === formData.title;
                        const priceUpdated = propertyData.price == formData.price; // Use == for type comparison
                        
                        console.log("Title updated:", titleUpdated, "Price updated:", priceUpdated);
                        console.log("Sent title:", formData.title, "Received title:", propertyData.title);
                        console.log("Sent price:", formData.price, "Received price:", propertyData.price);
                        console.log("Sent price type:", typeof formData.price, "Received price type:", typeof propertyData.price);
                        
                        if (!titleUpdated || !priceUpdated) {
                            console.warn("Warning: Some data may not have been saved properly");
                            console.warn("This suggests an issue with the Laravel backend update method");
                        }
                    }
                } catch (verifyError) {
                    console.error("Verification failed:", verifyError);
                }
                
                Swal.fire("Success", json.message || "Property updated successfully", "success");
                navigate("/all-property");
            } else {
                console.log("Request failed with status:", res.status);
                // Handle validation errors
                if (json.errors) {
                    const errorDetails = Object.entries(json.errors)
                        .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
                        .join("\n");
                    throw new Error(errorDetails);
                }
                throw new Error(json.message || `Update failed with status ${res.status}`);
            }
        } catch (error) {
            console.error("Submit error:", error);
            Swal.fire("Error", error.message, "error");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="container my-4">
            <h2>Edit Property</h2>
            
            {loading ? (
                <div className="text-center my-5">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-2">Loading property data...</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="mb-3">
                        <label className="form-label">Title</label>
                        <input type="text" name="title" className="form-control" value={formData.title} onChange={handleChange} required />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Description</label>
                        <textarea name="description" className="form-control" value={formData.description} onChange={handleChange} />
                    </div>

                    <div className="row">
                        <div className="col-md-4 mb-3">
                            <label className="form-label">SQFT</label>
                            <input type="number" name="sqft" className="form-control" value={formData.sqft} onChange={handleChange} required />
                        </div>
                        <div className="col-md-4 mb-3">
                            <label className="form-label">Bed Room</label>
                            <input type="number" name="bed_room" className="form-control" value={formData.bed_room} onChange={handleChange} required />
                        </div>
                        <div className="col-md-4 mb-3">
                            <label className="form-label">Bath Room</label>
                            <input type="number" name="bath_room" className="form-control" value={formData.bath_room} onChange={handleChange} required />
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Category ID</label>
                        <input type="number" name="category_id" className="form-control" value={formData.category_id} onChange={handleChange} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Project ID</label>
                        <input type="number" name="project_id" className="form-control" value={formData.project_id} onChange={handleChange} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Price</label>
                        <input type="number" name="price" className="form-control" value={formData.price} onChange={handleChange} required />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Status</label>
                        <input type="text" name="status" className="form-control" value={formData.status} onChange={handleChange} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Location</label>
                        <input type="text" name="location" className="form-control" value={formData.location} onChange={handleChange} required />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Photo</label>
                        <input type="file" name="photo" accept="image/*" className="form-control" onChange={handleChange} />
                        {existingPhoto && (
                            <img
                                src={`http://hamid.intelsofts.com/MyLaravelProject/RealEstate/public/img/properties/${existingPhoto}?t=${Date.now()}`}
                                alt="Current"
                                width="100"
                                className="mt-2"
                            />
                        )}
                    </div>

                    <div className="d-flex gap-2">
                        <button 
                            type="submit" 
                            className="btn btn-success" 
                            disabled={submitting}
                        >
                            {submitting ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Updating...
                                </>
                            ) : (
                                'Update'
                            )}
                        </button>
                        <button 
                            type="button" 
                            className="btn btn-secondary" 
                            onClick={() => navigate("/all-property")}
                            disabled={submitting}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}

export default EditProperty;
