# TaskManagerApp devplan:
This is a simple application using React Native with at least two screens implementing data persistence using a SQL database. 

THIS IS THE PLAN:

Description: A simple task manager app. Users can add, view, and delete tasks.

Screens:
- Home Screen: Displays a list of tasks
- Create Task Screen: Allows users to create a new task

Data Structure: Each task will have an ID, title, and description.

Database: Use SQLite, as it's a lightweight SQL database perfect for mobile apps.

React Native Setup: Set up the basic React Native environment.

Front-End:

__Design the UI for:
- listing tasks (list item, list layout)
- adding a new task (imput fields, button)
  
__Navigation:
- implement navigation between Home  and Add Task.


Back-End:

- set up SQLite database
- implement functions to add, retrieve, and delete tasks

Integration:

- connect the front-end views with the back-end database operations
- testing: Ensure the app works on both Android and iOS


# TaskManagerApp 

- node version v20.11.1
- npm version 10.2.4

Creating a new application: 

- install EXPO : npx create-expo-app

# How to run the project:

- npx expo start