# Google Calendar event deleter for School Vacations

I use Google Calendar for my school timetable. It is works perfectly for me, but one thing in it has really annoyed me so far: I had to delete every recurring calendar event during my holidays.
This is my solution to the problem: A calendar deleter, written in Google Apps Script, where you can enter dates, and it will delete all the events in the time range between the inputted dates you enter.

# Warning:
Some security measures have been implemented in the script to avoid deleting too many events, but you still need to be careful and use it wisely.
Please double-check that everything is correct before running the script!

## How to use it
This is what you need to do to make it work:
1. You need to sign in to your Google account and go to this website: https://script.google.com/home/
2. You need to create a new project with the button at the Top left
3. You have to click on “Services” and select that you want to use the “Google Calendar API”, (i used “v3”) and you have to call it “Calendar” (that should be the Default).
4. In the Text field, you have to paste the code from the code.gs file
5. Now, you have to modify the “schoolCalendarId”-Variable at the top of the Script with the following steps:
	- Go to https://calendar.google.com/
	- Click on ⚙ → Settings → Settings for my calendars → Your personal school calendar
	- Scroll down to “Integrate calendar” and copy your calendar ID, which should look something like this: `random_letters@group.calendar.google.com`
	- Paste this into your script
6. Change the `startDate` and `endDate` variables to the time range you want to delete events. Unfortunately, the time range is American, so you have to use the `month.day.year` format, e.g. `09.18.2024`.
7. Go to your calendar and add two events to the same calendar that you want to delete events from: One event with `Start` in the title that is on the day of the `startDate` Variable, and one event with `End` in the title that is on the date of the `endDate` Variable. This is a security measure of the script to avoid accidentally deleting too much. If these two events aren't there, the script will not run.
8. Click on 'Run' at the top and give the script access to your Google Account calendar. The script should now run and delete all calendar events between the dates you have specified.