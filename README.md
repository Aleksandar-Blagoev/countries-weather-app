# Countries-Weather-App


## Overview
This Weather Forecast Application is a comprehensive web application that allows users to view weather forecasts, manage their favorite countries, and handle user authentication. The application is structured around several key classes, each responsible for a specific aspect of the application's functionality.

# Classes and Their Functionalities
## ViewController

1. Central manager for application views.
2. Handles navigation and rendering based on URL hash changes.
3. Manages user authentication for access control.

## HomepageController
1. Manages the homepage, displaying country information and forecasts.
2. Implements dynamic search functionality for countries.
3. Integrates with UserManager and ForecastManager for additional features.

## ForecastController
1. Displays weather forecasts for different countries.
2. Allows users to search for a country and view its short-term weather forecast.
3. Utilizes helper functions for visual and textual representation of weather conditions.

## User and UserManager
User: Represents a user with username and password.
UserManager: Handles user operations like login, registration, logout, and managing followed countries.
Utilizes localStorage for data persistence.

## FollowedController
1. Manages the display of user's followed countries.
2. Allows users to unfollow countries from their favorites list.
3. Dynamically updates the favorites list in real-time.

## RegisterController
1. Manages user registration process.
2. Ensures input validation and user feedback.

## LoginController
1. Handles user login functionality.
2. Manages user session and authentication state.

## Features
Dynamic, real-time search for countries and weather data.
User authentication system with login, registration, and logout capabilities.
Personalization through the ability to follow and unfollow countries.
Responsive and interactive UI for an enhanced user experience.
## Usage
To use this application, simply navigate through the different views:
Login or register to access personalized features.
Search for countries to view their weather forecasts.
Manage your list of followed countries for quick access to your favorites.
## Installation and Setup
Clone the repository.
Ensure you have a modern web browser installed.
Open the index.html file in your browser to start the application.
## Contributions
Contributions to this project are welcome. Please ensure to follow the project's coding standards and submit a pull request for review.
