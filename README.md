# Todo-Tracker-and-Timer
This website is a MERN stack application with user authentication

The front end is written in react/redux and the backend is written in express

The front and backend are separate and run independently. 

The goal of this website is that I wanted to be able to block a time in minutes for certain tasks,
and to have these time blocks as part of my todo list. This will let me keep track of the amount of 
work I have in minutes left, and to make sure I commit the full time to that task

## Todo List Module

(TodoImage)

In this image the plus button at the top creates a new Todo List

The plus button in a list creates a new list item and the clock icon creates a timed list item.

## Time Tracker Module

(TimeTrackerpre)

In this image the clock is at time 00:00 because no category is selected.

A category is a timed list item that was created in the Todo List Module. The two are linked, so when a category is completed 
in the Time tracker, the timed list item will be checked.

When you select a category the timer will populate with the duration of that category.

(TimeTrackerinprogress)

When you click a category and hit start, the clock will begin counting down, keeping track of your time.

The progress bar also fills up dynamically.

(TimeTrackerinprogress2)
