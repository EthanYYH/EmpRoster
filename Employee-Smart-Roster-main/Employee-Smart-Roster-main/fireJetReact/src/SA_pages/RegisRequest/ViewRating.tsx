import { useState, useEffect } from "react";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import SASide from "../../components/SideMenu/SASide";
import "./ViewRating.css";
import "../../../public/styles/common.css";
import ViewRatingController from "../../controller/ViewRatingController";

type ReviewRating = {
  reviewID: number;
  user_id: number;
  rating: number;
  review: string;
  createdOn: string;
};

const ViewRating = () => {
  const [ratingList, setRatingList] = useState<ReviewRating[]>([]);
  const [filters, setFilters] = useState({
    reviewID: "",
    user_id: "",
    rating: "",
    review: "",
    createdOn: "",
  });
  const [showFilters, setShowFilters] = useState(false);
  const [sortField, setSortField] = useState<keyof ReviewRating | "">("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    const fetchData = async () => {
      const result = await ViewRatingController();
      setRatingList(result);
    };

    fetchData();
  }, []);

  const handleFilterChange = (field: keyof typeof filters, value: string) => {
    setFilters({ ...filters, [field]: value });
  };

  const handleSort = (field: keyof ReviewRating) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const sortedList = [...ratingList].sort((a, b) => {
    if (!sortField) return 0;

    const aValue = a[sortField];
    const bValue = b[sortField];

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
    }

    const aStr = aValue.toString().toLowerCase();
    const bStr = bValue.toString().toLowerCase();

    return sortOrder === "asc" ? aStr.localeCompare(bStr) : bStr.localeCompare(aStr);
  });

  const filteredList = sortedList.filter((item) => {
    return (
      item.reviewID.toString().includes(filters.reviewID) &&
      item.user_id.toString().includes(filters.user_id) &&
      item.rating.toString().includes(filters.rating) &&
      item.review.toLowerCase().includes(filters.review.toLowerCase()) &&
      new Date(item.createdOn).toLocaleString().includes(filters.createdOn)
    );
  });

  const renderSortIcon = (field: keyof ReviewRating) => {
    if (sortField !== field) return <FaSort />;
    return sortOrder === "asc" ? <FaSortUp /> : <FaSortDown />;
  };

  return (
    <div className="viewRatingContainer">
      <SASide />
      <div>
        <h2>Ratings and Reviews</h2>

        <button
          className="filterToggleButton"
          onClick={() => setShowFilters((prev) => !prev)}
        >
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>

        <table className="ratingTable">
          <thead>
            <tr>
              {[
                { label: "Review ID", key: "reviewID" },
                { label: "User ID", key: "user_id" },
                { label: "Rating", key: "rating" },
                { label: "Review", key: "review" },
                { label: "Created On", key: "createdOn" },
              ].map(({ label, key }) => (
                <th key={key as string} onClick={() => handleSort(key as keyof ReviewRating)}>
                  <div className="headerWithSort">
                    {label} {renderSortIcon(key as keyof ReviewRating)}
                  </div>
                  {showFilters && (
                    <input
                      type="text"
                      value={filters[key as keyof typeof filters]}
                      onChange={(e) => handleFilterChange(key as keyof typeof filters, e.target.value)}
                      placeholder="Filter"
                      className="filterInput"
                    />
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredList.map((r) => (
              <tr key={r.reviewID}>
                <td>{r.reviewID}</td>
                <td>{r.user_id}</td>
                <td>{r.rating}</td>
                <td>{r.review}</td>
                <td>{new Date(r.createdOn).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewRating;
