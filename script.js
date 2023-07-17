$(document).ready(function() {
  // Add a listener for click events on the save button
  $(".saveBtn").on("click", function() {
    // Get the user input from the textarea
    var userInput = $(this).siblings(".description").val().trim();

    // Get the id of the time-block containing the button that was clicked
    var timeBlockId = $(this).parent().attr("id");
    
    // Save the user input in local storage using the id as a key
    localStorage.setItem(timeBlockId, userInput);
  });

  // Get the current hour using Day.js in 24-hour format
  var currentHour = dayjs().format("H");
  console.log(currentHour)
  // Loop through each time-block and compare the id to the current hour
  $(".time-block").each(function() {
    var timeBlockId = parseInt($(this).attr("id").split("-")[1]);

    // Remove any existing classes
    $(this).removeClass("past present future");

    // Add or remove classes based on the comparison result
    if (timeBlockId < currentHour) {
      $(this).addClass("past");
    } else if (timeBlockId == currentHour) {
      $(this).addClass("present");
    } else {
      $(this).addClass("future");
    }
  });

  // Loop through each time-block and set the textarea value from local storage
  $(".time-block").each(function() {
    var timeBlockId = $(this).attr("id");

    // Get the user input from local storage using the id as the key
    var userInput = localStorage.getItem(timeBlockId);

    // Set the textarea value if there is any user input saved
    if (userInput) {
      $(this).find(".description").val(userInput);
    }
  });

  // Display the current date in the header
  var currentDate = dayjs().format("dddd, MMMM D, YYYY");
  $("#currentDay").text(currentDate);
});

