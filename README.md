# WayFarer

[![Build Status](https://travis-ci.org/MajemiteJames/WayFarer.svg?branch=develop)](https://travis-ci.org/MajemiteJames/WayFarer)
[![Maintainability](https://api.codeclimate.com/v1/badges/888775d79318b5fb644e/maintainability)](https://codeclimate.com/github/MajemiteJames/WayFarer/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/888775d79318b5fb644e/test_coverage)](https://codeclimate.com/github/MajemiteJames/WayFarer/test_coverage)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

# WayFarer is a public bus transportation booking server. You are required to develop the back-end API.

# Installing / Getting started
You need to have the following tools installed on your computer before you install and run this project:

Git
Node.js
To run:

git clone https://github.com/MajemiteJames/WayFarer.git
cd WayFarer
npm install
npm start
The code above gets your server running

# Initial Configuration
Create a .env file with key SECRET set to a string value like so: SECRET=YOUR_SECRET

# Features
1.User can sign up.

2. User can sign in.

3. Admin can create a trip.

4. Admin can cancel a trip.

5. Both Admin and Users can see all trips.

6. Users can book a seat on a trip.

7. View all bookings. An Admin can see all bookings, while user can see all of his/her bookings.

8. Users can delete their booking.

# API Endpoints
POST /api/v1/auth/signup Create user 

POST /api/v1/auth/signin Login a user

POST /api/v1/trips Create a trip

GET /trips/ view all trips

GET /trips/:id> View specific trip

GET /bookings/ View all bookings

Post /api/v1/bookings Create booking

GET /booking/:id get booking by id

DELETE /api/v1/bookings/:id Delete a specific booking

# Contributing
Any contribution is welcome, please fork the repository and use a feature branch. Please follow the guide of the Pull Request Template provided.

# Links
Repository: https://github.com/MajemiteJames/WayFarer

Hosted Heroku App: https://wayfarerurl.herokuapp.com/

Pivotal Tracker: https://www.pivotaltracker.com/n/projects/2360685

# Author
This ADC project belongs to Okoro Majemite James
