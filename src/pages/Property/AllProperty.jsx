import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function AllProperty() {
    const [properties, setProperties] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    useEffect(() => {
        fetchProperties(currentPage);
    }, [currentPage]);

    const fetchProperties = async (page = 1) => {
        setLoading(true);
        try {
            const res = await fetch(
                `http://hamid.intelsofts.com/MyLaravelProject/RealEstate/public/api/properties?page=${page}`
            );
            const json = await res.json();

            setProperties(json.data);
            setCurrentPage(json.current_page);
            setLastPage(json.last_page);
        } catch (err) {
            console.error("Failed to fetch properties", err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "This action can't be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed) {
            try {
                const res = await fetch(
                    `http://hamid.intelsofts.com/MyLaravelProject/RealEstate/public/api/properties/${id}`,
                    {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (!res.ok) throw new Error("Failed to delete");

                Swal.fire("Deleted!", "The property has been deleted.", "success");
                fetchProperties(currentPage);
            } catch (err) {
                Swal.fire("Error!", "Failed to delete the property.", "error");
            }
        }
    };

    const filteredProperties = properties.filter(
        (property) =>
            property.title?.toLowerCase().includes(search.toLowerCase()) ||
            property.location?.toLowerCase().includes(search.toLowerCase())
    );

    const goToPage = (page) => {
        if (page >= 1 && page <= lastPage) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="container my-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h1 className="mb-0">All Property List</h1>
            </div>

            <form className="mb-4" onSubmit={(e) => e.preventDefault()}>
                <div className="row g-2 align-items-center">
                    <div className="col-md-8">
                        <div className="input-group shadow-sm">
                            <input
                                type="text"
                                className="form-control rounded-start"
                                placeholder="Search by title, location, or category..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <button type="button" className="btn btn-dark rounded-end">
                                <i className="fas fa-search"></i> Search
                            </button>
                        </div>
                    </div>
                    <div className="col-md-4 text-end">
                       <Link to="/create-property" className="btn btn-success">

                            <i className="fas fa-plus"></i> Add Property
                        </Link>
                    </div>
                </div>
            </form>

            {loading ? (
                <p className="text-center text-muted">Loading...</p>
            ) : filteredProperties.length > 0 ? (
                <>
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        {filteredProperties.map((property) => (
                            <div className="col" key={property.id}>
                                <div className="card h-100 shadow-sm">
                                    <img
                                        src={
                                            property.photo
                                                ? `http://hamid.intelsofts.com/MyLaravelProject/RealEstate/public/img/properties/${property.photo}`
                                                : "/img/placeholder.png"
                                        }
                                        className="card-img-top"
                                        alt="Property"
                                        style={{ height: "200px", objectFit: "cover" }}
                                    />
                                    <div className="card-body">
                                        <h2 className="card-title">{property.title}</h2>
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item">
                                                <strong>SQFT:</strong> {property.sqft}
                                            </li>
                                            <li className="list-group-item">
                                                <strong>Bed Room:</strong> {property.bed_room}
                                            </li>
                                            <li className="list-group-item">
                                                <strong>Bath Room:</strong> {property.bath_room}
                                            </li>
                                            <li className="list-group-item">
                                                <strong>Price:</strong> {property.price}
                                            </li>
                                            <li className="list-group-item">
                                                <strong>Location:</strong> {property.location}
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="card-footer d-flex justify-content-between">
                                        <Link
                                            to={`/propertys/${property.id}`}
                                            className="btn btn-sm btn-primary"
                                            title="View"
                                        >
                                            <i className="fas fa-eye"></i>
                                        </Link>
                                        <Link
                                            to={`/propertys/${property.id}/edit`}
                                            className="btn btn-sm btn-success"
                                            title="Edit"
                                        >
                                            <i className="fas fa-edit"></i>
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(property.id)}
                                            className="btn btn-sm btn-danger"
                                            title="Delete"
                                        >
                                            <i className="fas fa-trash-alt"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <nav aria-label="Page navigation" className="mt-4">
                        <ul className="pagination justify-content-center">
                            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                                <button className="page-link" onClick={() => goToPage(1)}>First</button>
                            </li>
                            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                                <button className="page-link" onClick={() => goToPage(currentPage - 1)}>Previous</button>
                            </li>

                            {Array.from({ length: lastPage }, (_, i) => i + 1).map((pageNum) => (
                                <li key={pageNum} className={`page-item ${pageNum === currentPage ? "active" : ""}`}>
                                    <button className="page-link" onClick={() => goToPage(pageNum)}>
                                        {pageNum}
                                    </button>
                                </li>
                            ))}

                            <li className={`page-item ${currentPage === lastPage ? "disabled" : ""}`}>
                                <button className="page-link" onClick={() => goToPage(currentPage + 1)}>Next</button>
                            </li>
                            <li className={`page-item ${currentPage === lastPage ? "disabled" : ""}`}>
                                <button className="page-link" onClick={() => goToPage(lastPage)}>Last</button>
                            </li>
                        </ul>
                    </nav>
                </>
            ) : (
                <div className="alert alert-warning text-center mt-4">
                    No properties found matching your search.
                </div>
            )}
        </div>
    );
}

export default AllProperty;
