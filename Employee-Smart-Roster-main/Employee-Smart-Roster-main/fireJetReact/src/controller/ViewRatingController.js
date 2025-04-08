const ViewRatingController = async () => {
    try {
      const response = await fetch("https://e27fn45lod.execute-api.ap-southeast-2.amazonaws.com/dev/systemadmin/reviewrating/view", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      return data.ReviewAndRatingList || [];
    } catch (error) {
      console.error("Failed to fetch review and rating list:", error);
      return [];
    }
  };
  
  export default ViewRatingController;
  