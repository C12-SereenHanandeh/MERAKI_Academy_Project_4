import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Slider from "react-slick";
import "../assests/home.css";
import ambulatoryImg from "../assests/images/ambulatory.jpg";
import vaccinationImg from "../assests/images/vaccination.jpg";
import surgeryImg from "../assests/images/surgery.jpg";
import physiciansImg from "../assests/images/physicians.jpg";
import medicalFacilityImg from "../assests/images/MedicalFacility.jpg";
import medicalTeamImg from "../assests/images/MedicalTeam.jpg";
import hospitalRoomImg from "../assests/images/HospitalRoom.jpg";

const Home = () => {
  // Static reviews
  const [reviews, setReviews] = useState([
    {
      _id: "1",
      patientName: "John Doe",
      reviewText: "The service was excellent and the staff was very kind.",
      rating: 5,
    },
    {
      _id: "2",
      patientName: "Jane Smith",
      reviewText: "The doctors were knowledgeable and I felt well cared for.",
      rating: 4,
    },
    {
      _id: "3",
      patientName: "Michael Brown",
      reviewText: "A great experience overall, but waiting times could improve.",
      rating: 3,
    },
  ]);

  const [selectedService, setSelectedService] = useState(null);
  const [newReview, setNewReview] = useState({
    patientName: "",
    reviewText: "",
    rating: 1,
  });

  const servicesData = [
    {
      id: 1,
      title: "Ambulatory",
      description: "Ambulatory services include emergency treatment, urgent care, and regular checkups.",
      image: ambulatoryImg,
    },
    {
      id: 2,
      title: "Vaccination",
      description: "We provide vaccines for all ages to prevent various illnesses.",
      image: vaccinationImg,
    },
    {
      id: 3,
      title: "General Surgery",
      description: "We perform various general surgeries including appendectomy, gallbladder removal, etc.",
      image: surgeryImg,
    },
    {
      id: 4,
      title: "Physicians",
      description: "Our experienced physicians provide specialized consultations and treatments.",
      image: physiciansImg,
    },
  ];

  const handleServiceClick = (service) => {
    setSelectedService(service);
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setNewReview((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const newReviewData = {
      ...newReview,
      _id: Date.now().toString(),
    };
    setReviews([...reviews, newReviewData]);
    setNewReview({ patientName: "", reviewText: "", rating: 1 });
  };

  return (
    <div className="home-container">
      <Navbar />

      <section className="image-slider">
        <Slider {...sliderSettings}>
          <div>
            <img src={medicalFacilityImg} alt="Medical Facility" className="slider-image" />
          </div>
          <div>
            <img src={medicalTeamImg} alt="Medical Team" className="slider-image" />
          </div>
          <div>
            <img src={hospitalRoomImg} alt="Hospital Room" className="slider-image" />
          </div>
        </Slider>
      </section>

      {/* Services Section */}
      <section className="services">
        {servicesData.map((service) => (
          <div
            key={service.id}
            className="service-box"
            onClick={() => handleServiceClick(service)}
            style={{ cursor: "pointer" }}
          >
            <img src={service.image} alt={service.title} className="service-image" />
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </section>

      {/* Service Details */}
      {selectedService && (
        <section className="service-details">
          <h2>{selectedService.title}</h2>
          <p>{selectedService.description}</p>
        </section>
      )}

      {/* Reviews Section */}
      <section>
        <h2>Patient Reviews</h2>
        <div className="reviews-section">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review._id} className="review-card">
                <h3>{review.patientName}</h3>
                <p>{review.reviewText}</p>
                <span>Rating: {review.rating}/5</span>
              </div>
            ))
          ) : (
            <p>No reviews available at the moment.</p>
          )}
        </div>

        {/* Review Submission Form */}
        <form onSubmit={handleReviewSubmit} className="review-form">
          <h2>Leave a Review</h2>
          <div>
            <input
              type="text"
              name="patientName"
              placeholder="Your Name"
              value={newReview.patientName}
              onChange={handleReviewChange}
              required
            />
          </div>
          <div>
            <textarea
              name="reviewText"
              placeholder="Your Review"
              value={newReview.reviewText}
              onChange={handleReviewChange}
              required
            />
          </div>
          <div>
            <label htmlFor="rating">Rating:</label>
            <select
              name="rating"
              value={newReview.rating}
              onChange={handleReviewChange}
              required
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <button type="submit">Submit Review</button>
        </form>
      </section>
    </div>
  );
};

export default Home;
