# Expense Tracker Application

## Overview
The expense tracker application is developed using React.js for the frontend and Node.js for the backend. It aims to provide users with a platform to manage their expenses effectively. Hosted on an Amazon EC2 instance and utilizing Amazon Aurora MySQL, the application ensures scalability, reliability, and high-performance data storage. Additionally, Amazon SNS, Amazon EventBridge, Lambda, and AWS Gateway are integrated to showcase project requirements.

## Objective
The primary goal is to offer users a seamless and intuitive experience for tracking expenses. Upon logging in, users can access a dashboard to add new expenses, edit existing ones, and perform other necessary actions related to expense management. The application sends events through Amazon EventBridge, triggers Lambda functions, and sends email notifications using Amazon SNS. The project also incorporates a subscription feature using AWS Lambda during the signup process, allowing users to subscribe to specific topics or categories of interest for personalized notifications and updates.

## Target Users
The target audience includes individuals, freelancers, small businesses, and organizations of varying sizes. The user interface is designed to be intuitive and user-friendly, catering to users with varying levels of technical expertise, whether for personal finance management or business expense tracking.

## Functionality
- **User Authentication:** Secure sign-in, login functionality, and logout option to protect user data and privacy.
- **Expense Management:**
    - Add New Expense: Enter details such as expense amount, category, date, and description for each transaction.
    - Edit Existing Expense: Modify and update previously recorded expenses.
    - Delete Expense: Remove irrelevant or inaccurate expenses.
    - View Expense History: Comprehensive overview of past expenses for better financial tracking and analysis.
- **Subscription Services:**
    - Topic Subscription: Opt-in to receive updates and notifications related to specific topics or categories of interest.

## AWS Services Integration
- **Amazon SNS:** Sends email notifications for expense-related events and updates.
- **Amazon EventBridge:** Triggers Lambda functions based on expense events for automation and processing.
- **AWS Lambda:** Handles backend logic and event-driven processing for expense-related actions.
- **AWS Gateway:** Manages API endpoints for frontend-backend communication and data transfer.

## Scalability and Performance
- **Hosted on Amazon EC2:** Scalable hosting infrastructure to handle varying levels of user traffic and data processing.
- **Aurora MySQL Database:** High-performance database backend for efficient data storage, retrieval, and management.

## Performance Targets
- **Response Time:** Aim for fast and responsive user interface interactions, minimizing loading times and delays.
- **Data Integrity:** Ensure accurate and reliable storage and retrieval of expense data without discrepancies or errors.
- **Scalability:** Design the application to handle a growing user base and increasing data volumes efficiently.

## Deployment
To deploy the application:
1. Clone the repository.
2. Install dependencies for frontend and backend.
3. Configure environment variables for AWS services.
4. Run the application locally or deploy to an AWS environment.

