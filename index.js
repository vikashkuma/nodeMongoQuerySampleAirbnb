
require('dotenv').config();
const mongoose = require('mongoose');
const listingsAndReviews = require('./schema');

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const Listing = mongoose.model('listingsAndReviews', listingsAndReviews, 'listingsAndReviews');
// Listing.find({}).limit(5).then(listings => console.log(listings)).catch(err => console.error(err));


// Queries

// Query: 
// Find all listings with a specific room type
Listing.find({ room_type: 'Entire home/apt', bedrooms: {$gt : 2}, price: {$lt:100} })
  .then(listings => {
    if (listings.length === 0) {
      console.log('No listings found with room type "Entire home/apt"');
    } else {
      console.log('Listings found:', listings);
    }
  })
  .catch(err => console.error('Error fetching listings:', err));

// 2. Find all listings where the price is less than $100 per night:
Listing.find({ price: { $lt: 100 } })
  .then(listings => console.log(listings))
  .catch(err => console.error(err));

// 3. Find listings with more than 3 bedrooms and sort by number of reviews descending:
Listing.find({ bedrooms: { $gt: 3 } })
  .sort({ number_of_reviews: -1 })
  .then(listings => console.log(listings))
  .catch(err => console.error(err));

// 4. Find the top 5 most expensive listings:
Listing.find({})
  .sort({ price: -1 })
  .limit(5)
  .select('name price')  // Project only 'name' and 'price' fields
  .then(listings => console.log(listings))
  .catch(err => console.error(err));

// 5. Find all listings where the host has been a superhost:
Listing.find({ 'host.host_is_superhost': true })
  .select('name host.host_location')
  .then(listings => console.log(listings))
  .catch(err => console.error(err));

// 6. Find listings where the review score rating is greater than 9:
Listing.find({ 'review_scores.review_scores_rating': { $gt: 9 } })
  .select('name host.host_location')
  .then(listings => console.log(listings))
  .catch(err => console.error(err));

// 7. Find listings that are available for more than 180 days a year:
Listing.find({ 'availability.availability_365': { $gt: 180 } })
.select('name availability.availability_365')
  .then(listings => console.log(listings))
  .catch(err => console.error(err));

// 8. Find listings with at least 5 amenities: 
Listing.find({ amenities: { $size: 5, $all: ["Wifi", "Shampoo"] } })
  .select('name amenities')
  .then(listings => console.log(listings))
  .catch(err => console.error(err));

// 8. Find listings with at least 5 amenities and does not have shampoo and wifi
// nin does not work with find
Listing.aggregate([
    { $match: { amenities: { $size: 5 } } },
    { $match: { amenities: { $nin: ["Wifi", "Shampoo"] } } },
    { $project: { name: 1, amenities: 1 } }
  ])
    .then(listings => console.log(listings))
    .catch(err => console.error(err));
  

// 9. Find the number of listings with each room type:
Listing.aggregate([
  { $group: { _id: '$room_type', count: { $sum: 1 } } }
])
  .then(result => console.log(result))
  .catch(err => console.error(err));

// 10. Find all listings where the description contains the word 'luxury':
Listing.find({ description: /luxury/i })
  .then(listings => console.log(listings))
  .catch(err => console.error(err));

// 11. Find listings with a minimum number of 2 bathrooms and sort by number of bedrooms ascending:
Listing.find({ bathrooms: { $gte: 2 } })
  .sort({ bedrooms: 1 })
  .then(listings => console.log(listings))
  .catch(err => console.error(err));

Listing.aggregate([
  {$match: {bathrooms: {$gte : 2}}},
  {$sort: {bedrooms : 1}},
  { $project: { name: 1, bathrooms: 1, bedrooms: 1 } }
])
.then(result => console.log(result))
.catch(err => console.error(err));

// 12. Find the average number of reviews per listing:
Listing.aggregate([
  { $group: { _id: null, averageReviews: { $avg: '$number_of_reviews' } } }
])
  .then(result => console.log(result))
  .catch(err => console.error(err));

// Aggregation query to group by room_type and calculate average number of reviews
Listing.aggregate([
  { $group: { _id: '$room_type', averageReviews: { $avg: '$number_of_reviews' } } }
])
  .then(result => console.log(result))
  .catch(err => console.error(err));

// 13. Find all listings with more than 3 reviews and where the host response time is 'within an hour':
Listing.find({ number_of_reviews: { $gt: 4 }, 'host.host_response_time': 'within an hour' })
  .then(listings => console.log(listings))
  .catch(err => console.error(err));

// 14. Find all listings where the price is between $50 and $200 per night:
Listing.find({ price: { $gte: 500, $lte: 2000 } })
  .then(listings => console.log(listings))
  .catch(err => console.erßror(err));

// 15. Find the listing with the highest number of reviews:
Listing.findOne({})
  .sort({ number_of_reviews: -1 })
  .select('name number_of_reviews')
  .then(listing => console.log(listing))
  .catch(err => console.error(err));

// 16. Find listings with the most reviews and where the host is located in a specific city:
Listing.find({ 'host.host_location': { $regex: 'new york', $options: 'i' } })
  .sort({ number_of_reviews: -1 })
  .then(listings => console.log(listings))
  .catch(err => console.error(err));

// 17. Find listings that have both WiFi and parking listed as amenities:
//Listing.find({ amenities: { $all: ['WiFi', 'Parking'] } })
Listing.find({ amenities: { $all: ["Wifi", "Parking"] } })
  .then(listings => console.log(listings))
  .catch(err => console.error(err));

// 18. Find listings where the host response rate is greater than 90%:
Listing.find({ 'host.host_response_rate': { $gt: 90 } })
  .then(listings => console.log(listings))
  .catch(err => console.error(err));

// 19. Find the count of listings per host:
Listing.aggregate([
  { $group: { _id: '$host.host_id', listingCount: { $sum: 1 } } },
  {$sort: {listingCount: -1}}
])
  .then(result => console.log(result))
  .catch(err => console.error(err));

// 20. Find all listings where the description or space field is not empty:
Listing.find({
  $or: [
    { description: { $ne: '' } },
    { space: { $ne: '' } }
  ]
})
  .then(listings => console.log(listings))
  .catch(err => console.error(err));

// 21. Find listings where the minimum nights is more than 10 and sort by price ascending:
Listing.find({ minimum_nights: { $gt: "2" } })
  .sort({ price: 1 })
  .then(listings => console.log(listings))
  .catch(err => console.error(err));

// 22. Find the top 3 most recent reviews:
Listing.aggregate([
  { $unwind: '$reviews' },
  { $sort: { 'reviews.date': -1 } },
  {$project:{name: 1,  'reviews.date': 1}},
  { $limit: 3 }
])
  .then(reviews => console.log(reviews))
  .catch(err => console.error(err));

// 23. Find all listings where the host has been hosting for more than 5 years:
Listing.find({ 'host.host_since': { $lt: new Date(Date.now() - 5 * 365 * 24 * 60 * 60 * 1000) } })
  .then(listings => console.log(listings))
  .catch(err => console.error(err));

// 24. Find listings where the price is a string and sort by price numerically:
Listing.aggregate([
  { $addFields: { priceNumeric: { $toDouble: { $substr: ['$price', 1, -1] } } } },
  { $sort: { priceNumeric: 1 } }
])
  .then(listings => console.log(listings))
  .catch(err => console.error(err));

// 25. Find listings with at least 2 bathrooms and sort by review score rating descending:
Listing.find({ bathrooms: { $gte: 2 } })
  .sort({ 'review_scores.review_scores_rating': -1 })
  .then(listings => console.log(listings))
  .catch(err => console.error(err));

// 26. Find listings where the host’s location is either 'Paris' or 'London':
Listing.find({ 'host.host_location': { $in: ['Paris', 'London'] } })
  .then(listings => console.log(listings))
  .catch(err => console.error(err));

// 27. Find listings with more than 2 bedrooms, but less than 5 beds:
Listing.find({ bedrooms: { $gt: 2 }, beds: { $lt: 5 } })
  .then(listings => console.log(listings))
  .catch(err => console.error(err));

// 28. Find listings with a review score accuracy greater than 8 and a review score cleanliness less than 8:
Listing.find({ 'review_scores.review_scores_accuracy': { $gt: 8 }, 'review_scores.review_scores_cleanliness': { $lt: 8 } })
  .then(listings => console.log(listings))
  .catch(err => console.error(err));

// 29. Find listings where the host’s name contains 'John' and sort by number of reviews ascending:
Listing.find({ 'host.host_name': /John/ })
  .sort({ number_of_reviews: 1 })
  .then(listings => console.log(listings))
  .catch(err => console.error(err));

// 30. Find listings that have reviews from 'Alice' and sort by review date descending:
Listing.aggregate([
  { $unwind: '$reviews' },
  { $match: { 'reviews.reviewer_name': 'Alice' } },
  { $sort: { 'reviews.date': -1 } }
])
  .then(reviews => console.log(reviews))
  .catch(err => console.error(err));
