# Airbnb Listings Analysis

This project is a Node.js application that connects to a MongoDB database containing Airbnb listings and reviews. It provides various queries and aggregations to analyze the data using Mongoose.

## Features

- Connect to MongoDB and perform CRUD operations using Mongoose.
- Various aggregation queries to analyze Airbnb listings data.
- Sample queries to fetch listings based on different criteria.

## Prerequisites

- Node.js (>= 12.x)
- MongoDB database (you can use MongoDB Atlas or a local instance)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/airbnb-listings-analysis.git
   cd airbnb-listings-analysis
Install dependencies:

bash
Copy code
npm install
Create a .env file in the root directory and add your MongoDB connection string:

env
Copy code
MONGODB_URI=your_mongodb_connection_string
Usage
Start the application:

bash
Copy code
npm start
The application will connect to the MongoDB database and perform the defined queries. Check the console for the output of each query.

Example Queries
Here are some example queries that you can run:

Find all listings with a specific room type:

javascript
Copy code
Listing.find({ "room_type": 'Entire home/apt' })
  .then(listings => console.log(listings))
  .catch(err => console.error(err));
Find the top 5 listings sorted by price (name and price only):

javascript
Copy code
Listing.find({})
  .sort({ price: -1 })
  .limit(5)
  .select('name price')
  .then(listings => console.log(listings))
  .catch(err => console.error(err));
Find listings with superhost and their location:

javascript
Copy code
Listing.find({ 'host.host_is_superhost': true })
  .select('name host_location')
  .then(listings => console.log(listings))
  .catch(err => console.error(err));
Aggregation query to find average number of reviews per host:

javascript
Copy code
Listing.aggregate([
  { $group: { _id: '$host.host_id', averageReviews: { $avg: '$number_of_reviews' } } }
])
  .then(result => console.log(result))
  .catch(err => console.error(err));
Project Structure
go
Copy code
airbnb-listings-analysis/
├── .gitignore
├── README.md
├── package.json
├── index.js
└── models/
    └── listing.js
Dependencies
mongoose: Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment.
License
This project is licensed under the MIT License. See the LICENSE file for details.

vbnet
Copy code

This `README.md` provides an overview of the project, installation instructions, usag