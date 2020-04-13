
# Design planning

Single page application

Personal dashboard application.
Your dashboard page should be made up of user selected modules.
ie a user selects what module goes onto their own dashboard
-a todo list module. This module hold a personal todo list 
-timer module, pomodoro timer or normal clock timer that you can set. Saves amount of time worked
-time tracker module. Maybe this should be built in to the timer module, or this could be a graphing module
-milestone module. This will display user defined milestones, and the users progress on those modules.

User can switch to individual pages for each module

## Front End

### Nav bar
NAVBAR should be logout and links to different parts of the dashboard

### Time Tracker Module
This module will be a clock you start and will track the amount of time on a task.
It will be a button with a timer, and on button press the numbers in the timer div will go up incrememnting with time.
When you press stop, the program will ask if you want to record the amount of time you have worked
update to backend no matter what, it will be put in 'other' category if nothing selected 
*Later I want to be able to select from my own generated list of tasks to allocate this time to, ie spent this time coding or studying
*if left blank, then it will be just other.


Container
-Dropdown to select time to count to. 15, 30, 45, 1 hr, 2hr
-start button (this will switch to stop onclick)
-push and save

Under
-count of the amount of time youve worked today.
-amount of time separated by category

## Back End

Time Schema
-userId
-date
-time
-category