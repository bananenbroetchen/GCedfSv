function main() {
  var schoolCalendarId = 'YOUR_LINK_BELONGS_HERE@group.calendar.google.com';
  
  var startDate = new Date("12.23.2024");
  var endDate = new Date("12.25.2024");
  var iDate = new Date(startDate);
  
  var StartValid = false;
  var EndValid = false;
  var deletedEvents = 0;
  var deletedEventsDict = [];
  

  console.log(startDate);
  
  while (iDate <= endDate) {
    let eventsToday = CalendarApp.getCalendarById(schoolCalendarId).getEventsForDay(iDate);
    console.log("Events for " + iDate.getDate() + "/" + iDate.getMonth() + "/" + iDate.getFullYear() + ": " + eventsToday.length);

    // iterate through all events and delete them
    for (let i = 0; i < eventsToday.length; i++) {
      let event = eventsToday[i];
      if (iDate.getDate() === startDate.getDate()) {
        console.log("SD, Title: " + event.getTitle())
        if (event.getTitle().toString().includes("Start")) {
          StartValid = true;
          console.log("Start valid");
        };
      };
      if (iDate.getDate() === endDate.getDate()) {
        console.log("ED, Title: " + event.getTitle())
        if (event.getTitle().toString().includes("End")) {
          EndValid = true;
          console.log("End valid");
        }
      }
      console.log("This event is on the Start/End date: " + event.getTitle());
    }
    iDate.setDate(iDate.getDate() + 1);
  }

  if (StartValid && EndValid) {
      console.log("All requirements met! Beginning deleting events...")

      // Reset Date:
      var iDate = new Date(startDate);

      while (iDate <= endDate) {
        console.log(iDate);

        let eventsToday = CalendarApp.getCalendarById(schoolCalendarId).getEventsForDay(iDate);
        //console.log(eventsToday)

        console.log("Events für " + iDate + ": " + eventsToday.length);

    // iterate through all events and delete them
        for (let i = 0; i < eventsToday.length; i++) {
          let event = eventsToday[i];
          
          console.log("Deleting following Event: " + event.getTitle());
          add_event_to_list(event.getTitle(), deletedEventsDict)
          event.deleteEvent();  // Event is being deleted
        }
        iDate.setDate(iDate.getDate() + 1);
    }
    console.log("Script finished!")
    print_deleted_stats(deletedEventsDict)
  } else {
    console.log("This does not seem right! Aborting...")
    console.log("States: StartValid: " + StartValid + " EndValid: " + EndValid)
    console.log("TUTORIAL: Du musst an den Ersten Tag, an dem gelöscht werden soll, einen \"Start\"-Termin und an den letzten Tag einen \"End\"-Termin hängen!")
  }
}


function add_event_to_list(event_name, deletedEventsDict) {
  for (let element of deletedEventsDict) {
    if (element.key == event_name) {
      console.log("Element before change:" + element.value)
      element.value += 1
      console.log("Element after change:" + element.value + " element that was changed: "+ element.key)
      return;
    }
  }
  // if the element name is not found, it will be created
  deletedEventsDict.push({
    key: event_name,
    value: 1
  });
}

function print_deleted_stats(deletedEventsDict) {
  let end_string = "Stats:\nName | Times deleted"
  for (let element of deletedEventsDict) {
    end_string += element.key + " | " + element.value + "\n";
  }

  console.log(end_string)
}