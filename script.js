$(document).ready(function () {
    // Display the current date at the top of the calendar
    function displayCurrentDate() {
        var currentDate = moment().format("dddd, MMMM Do, YYYY");
        $("#current-day").text(currentDate);
    }

    // Function to set time block color based on current time
    function updateTimeBlockColors() {
        var currentHour = moment().hour();
        $(".row").each(function () {
            var rowHour = parseInt($(this).find("textarea").data("hour"));
            if (rowHour < currentHour) {
                $(this).addClass("past");
                $(this).removeClass("present future");
            } else if (rowHour === currentHour) {
                $(this).addClass("present");
                $(this).removeClass("past future");
            } else {
                $(this).addClass("future");
                $(this).removeClass("past present");
            }
        });
    }

    // Load saved events from local storage
    function loadEvents() {
        $(".row").each(function () {
            var rowHour = $(this).find("textarea").data("hour");
            var eventText = localStorage.getItem("event_" + rowHour);
            if (eventText) {
                $(this).find("textarea").val(eventText);
            }
        });
    }

    // Update the current date initially, update time block colors, and load saved events
    displayCurrentDate();
    updateTimeBlockColors();
    loadEvents();

    // Save button click event to save events in local storage
    $(".saveBtn").on("click", function () {
        var rowHour = $(this).siblings("textarea").data("hour");
        var eventText = $(this).siblings("textarea").val();
        localStorage.setItem("event_" + rowHour, eventText);
    });

    // Add Row button click event to add a new row
    $("#addRowBtn").on("click", function () {
        var newRowHour = $(".row").length + 9; // Calculate the hour for the new row
        var newRow = `
        <div class="row">
            <div class="hour">${newRowHour} AM</div>
            <textarea class="description" data-hour="${newRowHour}"></textarea>
            <button class="saveBtn">Save</button>
        </div>`;
        $(".container").append(newRow);
    });
});
