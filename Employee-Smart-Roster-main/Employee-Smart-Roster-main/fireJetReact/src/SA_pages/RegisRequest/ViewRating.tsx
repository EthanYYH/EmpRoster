import { useState, useEffect } from "react";
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

  useEffect(() => {
    const fetchData = async () => {
      const result = await ViewRatingController();
      setRatingList(result);
    };

    fetchData();
  }, []);

  return (
    <div className="viewRatingContainer">
      <SASide />
      <div>
        <h2>Ratings and Reviews</h2>
        <table className="ratingTable">
          <thead>
            <tr>
              <th>Review ID</th>
              <th>User ID</th>
              <th>Rating</th>
              <th>Review</th>
              <th>Created On</th>
            </tr>
          </thead>
          <tbody>
            {ratingList.map((r) => (
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
