
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

HomePage
homepage should check if useris logged in.
-if login then-> render normal nav bar and everything
-if not login then -> popup (login/signup form)

Navbar
check if there is a token, if there is then display logout, otherwise login



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
(complete)-start button (this will switch to stop onclick)
-push and save (should auto push when time hits 0, but if you stop I want a button to optionally push this time worked.)

Clock Button logic:
-Start and Stop (stop is greyed out)
-when start is clicked, clock counts down 
-then it is resume and done (resume unpauses and done submits this time as completed)
-if you resume then the options are pause and stop(stop is reset)

Countdown logic
-countdown from num to 0
when sec - 1 < 0 then either we decrement a minute then set seconds to 59.
    when min = 0 then end



Under
-count of the amount of time youve worked in this session.
-amount of time separated by category

It will be square divs, and a add new category, which is a dropdown of categories or you can add a new one.
-This will add a new square to the row of divs. 
-This square will contain the category name and the amount of time spent this session.
-The clock will only countdown when a task is selected.
-When the clock is done the countdown will go to the category.

UI-
-div container holding the divs
-The container always has an empty div that when you hit plus it turns into editable. When it is clicked, add another div beside it empty.
Order of implementation.
-UI
-UI interactions code
-Link to countdown

## Back End

Time Schema
-userId
-date
-time
-category

passport
User
-username
-password

Routes
'/'
'/login'
