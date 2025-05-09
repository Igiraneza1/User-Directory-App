🧠 What the App Does (Overview)
You're building a React + TypeScript app with 3 main features:

View a list of users — pulled from an API.

View details of a specific user — using routing and dynamic URLs.

Add a new user — using a form with validation.

🔧 Tools and Concepts You'll Use
Feature	Tool/Concept
Routing	React Router v6
Forms	Controlled forms + React Hook Form
Validation	Zod + React Hook Form
State	useState, Context API, optionally useReducer
Type Safety	TypeScript (interfaces, enums, types)

📍 Step-by-Step Breakdown
Step 1: Set Up the Project
Use create-react-app with TypeScript template.

Install react-router-dom, react-hook-form, and zod.

Structure your project with folders like pages, components, context, and types.

Step 2: Create Routes and Pages
Use React Router to define these routes:

/: Home page – shows list of users

/users/:id: Profile page – shows details for one user

/add-user: Form to add a new user

Each of these pages will be a separate React component.

Step 3: Build the Home Page
Use fetch() to get user data from https://jsonplaceholder.typicode.com/users.

Store this in state using useState.

Display each user's name and email, plus a button or link to view more.

Use Link from React Router to navigate to /users/:id.

Step 4: Build the User Profile Page
Use useParams to extract the id from the URL.

Fetch that user's details from the API using that id.

Show basic info like name, email, address, company, etc.

Add a loading state while data is being fetched.

Step 5: Build the Add User Page
Create a form with fields: name, email, age.

Use react-hook-form for managing form state easily.

Use zod for validation:

Name: required

Email: must be valid

Age: must be 18 or older

On submit, add the new user to your local state or context.

Step 6: Manage Global State (Optional)
If you want the added user to appear on the home page:

Use Context API to store a global list of users (from API + new ones).

Or use useReducer to manage user state and actions like "ADD_USER".

Step 7: Add TypeScript Types
Create an interface for User (id, name, email, age).

Use these types for props, state, form data, etc.

You can also define enums for user roles like Admin, Editor, Viewer.

🔥 Bonus (Optional)
Search Filter: Let users search for a name in the list.

Dark/Light Theme: Use Context to manage a toggle between themes.

Custom Hook: Write useUserForm to isolate form logic and reuse it.