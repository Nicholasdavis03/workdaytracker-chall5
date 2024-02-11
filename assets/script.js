$(function () {
  // Display current day at the top of the calendar
  var currentDate = dayjs().format('dddd, MMMM D');
  $('#currentDay').text(currentDate);

  // Generate time blocks for standard business hours of 9am to 5pm
  function generateTimeBlocks() {
    var container = $('.container-fluid');

    for (var hour = 9; hour <= 17; hour++) {
      var ampm = hour < 12 ? 'AM' : 'PM';
      var displayHour = hour % 12 || 12; // Convert 0 to 12 for 12-hour clock

      var timeBlock = $('<div>').addClass('row time-block').attr('id', 'hour-' + hour);
      var hourColumn = $('<div>').addClass('col-2 col-md-1 hour text-center py-3').text(displayHour + ampm);
      var descriptionColumn = $('<textarea>').addClass('col-8 col-md-10 description').attr('rows', 3);
      var saveBtn = $('<button>').addClass('btn saveBtn col-2 col-md-1').attr('aria-label', 'save')
                                  .append($('<i>').addClass('fas fa-save').attr('aria-hidden', 'true'));

      timeBlock.append(hourColumn, descriptionColumn, saveBtn);
      container.append(timeBlock);
    }
  }

  generateTimeBlocks();

  // Function to update time block styles based on current time

function updateTimeBlocks() {
  var currentHour = dayjs().hour();

  $('.time-block').each(function() {
    var blockHour = parseInt($(this).attr('id').split('-')[1]);

    if (blockHour < currentHour) {
      $(this).removeClass('present future').addClass('past');
    } else if (blockHour === currentHour) {
      $(this).removeClass('past future').addClass('present');
    } else {
      $(this).removeClass('past present').addClass('future');
    }
  });
}

// Call updateTimeBlocks to initially set the time block styles
updateTimeBlocks();

  // Function to save user input to local storage
  $('.saveBtn').on('click', function() {
    var hourId = $(this).parent().attr('id');
    var userInput = $(this).siblings('.description').val().trim();

    localStorage.setItem(hourId, userInput);
  });

  // Function to load saved tasks from local storage
  function loadTasks() {
    $('.time-block').each(function() {
      var hourId = $(this).attr('id');
      var savedInput = localStorage.getItem(hourId);

      if (savedInput !== null) {
        $(this).children('.description').val(savedInput);
      }
    });
  }

  // Call loadTasks to initially load saved tasks
  loadTasks();
});

