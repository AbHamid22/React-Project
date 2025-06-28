import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function ViewProperty() {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProperty();
    }, []);

  const fetchProperty = async () => {
    try {
        const res = await fetch(`http://hamid.intelsofts.com/MyLaravelProject/RealEstate/public/api/properties/${id}`);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const json = await res.json();
        console.log("API response:", json);
        setProperty(json.data); // or setProperty(json) based on API
    } catch (err) {
        console.error("Failed to fetch property", err);
        setProperty(null); // ensure state is reset
    } finally {
        setLoading(false);
    }
};


    if (loading) {
        return <div className="container text-center my-5">Loading...</div>;
    }

    if (!property) {
        return <div className="container text-center my-5 text-danger">Property not found.</div>;
    }

    return (
        <div className="container my-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>{property.title}</h1>
                <Link to="/all-property" className="btn btn-secondary">← Back to List</Link>
            </div>
            <div className="row g-4">
                <div className="col-md-6">
                    <img
                        src={
                            property.photo
                                ? `http://hamid.intelsofts.com/MyLaravelProject/RealEstate/public/img/properties/${property.photo}`
                                : "/img/placeholder.png"
                        }
                        className="img-fluid rounded shadow"
                        alt="Property"
                    />
                </div>
                <div className="col-md-6">
                    <ul className="list-group shadow">
                        <li className="list-group-item"><strong>Square Feet:</strong> {property.sqft}</li>
                        <li className="list-group-item"><strong>Bedrooms:</strong> {property.bed_room}</li>
                        <li className="list-group-item"><strong>Bathrooms:</strong> {property.bath_room}</li>
                        <li className="list-group-item"><strong>Price:</strong> {property.price}</li>
                        <li className="list-group-item"><strong>Location:</strong> {property.location}</li>
                        <li className="list-group-item"><strong>Description:</strong> {property.description || "No description provided."}</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default ViewProperty;
