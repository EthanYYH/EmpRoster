import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ReviewRatingController from "../../controller/Review_Rating/ReviewRatingController";
import "./RatingChart.css";
import "../../../public/styles/common.css";

// Access the function from the default export
const { GetRating } = ReviewRatingController;

const COLORS = ['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#845EC2', '#FF9671'];

const RatingChart = () => {
    
    function getRating() {
      return GetRating();
    }

    const rawData = getRating();
    // console.log(rawData)
  
    // Process data into pie chart format
    const ratingCounts = rawData.reduce((acc, curr) => {
        const rating = curr.rating;
        acc[rating] = (acc[rating] || 0) + 1;
        return acc;
    }, {} as Record<number, number>);

    // Create chart data array for 0-5 stars
    const ratingData = [0, 1, 2, 3, 4, 5].map(rating => ({
        name: `${rating} Star${rating !== 1 ? 's' : ''}`,
        value: ratingCounts[rating] || 0
    }));

  return (
    <div className='chartContent' style={{ width: '100%', height: 400, maxWidth: 600, margin: '0 auto' }}>
      <h1>Rating Distribution (Total: {ratingData.length})</h1>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={ratingData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
            label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
          >
            {ratingData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend 
            layout="vertical"
            align="right"
            verticalAlign="middle"
            formatter={(value, entry) => (
              <span style={{ color: '#333' }}>{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RatingChart;