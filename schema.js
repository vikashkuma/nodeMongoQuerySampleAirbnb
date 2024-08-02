const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listingsAndReviews = new Schema({
    _id: Schema.Types.ObjectId,
    listing_url: String,
    name: String,
    summary: String,
    space: String,
    description: String,
    neighborhood_overview: String,
    notes: String,
    transit: String,
    access: String,
    interaction: String,
    house_rules: String,
    property_type: String,
    room_type: String,
    accommodates: Number,
    bathrooms: Number,
    bedrooms: Number,
    beds: Number,
    bed_type: String,
    amenities: [String],
    price: Number,
    minimum_nights: String,
    maximum_nights: String,
    availability: {
        availability_30: Number,
        availability_60: Number,
        availability_90: Number,
        availability_365: Number
    },
    number_of_reviews: Number,
    review_scores: {
      review_scores_rating: Number,
      review_scores_accuracy: Number,
      review_scores_cleanliness: Number,
      review_scores_checkin: Number,
      review_scores_communication: Number,
      review_scores_location: Number,
      review_scores_value: Number
    },
    reviews: [{
      _id: Schema.Types.ObjectId,
      date: Date,
      reviewer_name: String,
      comments: String
    }],
    host: {
      _id: Schema.Types.ObjectId,
      host_name: String,
      host_since: Date,
      host_location: String,
      host_about: String,
      host_response_time: String,
      host_response_rate: Number,
      host_acceptance_rate: String,
      host_is_superhost: Boolean,
      host_thumbnail_url: String,
      host_picture_url: String
    }
  });

  module.exports = listingsAndReviews;