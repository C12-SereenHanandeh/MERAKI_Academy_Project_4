const Review = require("../models/ReviewSchema");

const createReviwe = async (req, res) => {
  const { title, content, rating } = req.body;
  try {
    const newReview = new Review({ title, content, rating });
    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ error: "Failed to add review" });
  }
}

const getReviwe= async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
};

module.exports = {createReviwe,getReviwe};
