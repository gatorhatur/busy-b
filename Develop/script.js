dayjs.extend(window.dayjs_plugin_advancedFormat);

var contentEL = $(".container");
var dateEl = $("#currentDay");
var today = dayjs().format('dddd, MMMM Do');
var schedObj = [];

/*
    sample schedule = [
    {
    "time":  "9AM",
    "toDo": "Pay the bills"
},
{
    "time": "10AM",
    "toDo": "Meet with groomer"
}
    ]
*/

console.log(dateEl);
////////Functions///////////
//Set date of page on load
var setToday = function () {
    dateEl.text(today);  
};


//build emptt and/or build from memory - name for the current date - 9a - 6p
//smaller function w/ 2 parameters, time and content
var getSchedule = function () {
    schedObj = localStorage.getItem(today);

    if (!schedObj) {
        console.log("Nothing is currently stored for today!");
        schedObj = [];
        initializeScheduleObject();
    }
    else {
        schedObj = JSON.parse(schedObj);
    }

};

var saveSchedule = function (element, content) {
    // sched[element time].to-do = content
    localStorage.setItem(today, JSON.stringify(schedObj));
};

var setSchedule = function () {
    //when creating give the row a data-pos-id of its position in the array, this will make it easier to lookup later
    schedObj.forEach(function (hourObj, index) {

        var timeBlockEl = $("<div>")
            .addClass("time-block row");

        var hourEl = $("<div>")
            .addClass("hour col-2")
            .text(hourObj.time);
        timeBlockEl.append(hourEl);

        var toDoEl = $("<div>")
            .addClass("description col-8")
            .text(hourObj.toDo)
            .attr("data-pos-id", index);
        timeBlockEl.append(toDoEl);

        var btnEl = $("<div>")
            .addClass("saveBtn col-2");
        var spanEl = $("<span>")
            .addClass("oi oi-book");
        btnEl.append(spanEl);
        timeBlockEl.append(btnEl);

        contentEL.append(timeBlockEl);
    });
};

var initializeScheduleObject = function () {
    for (var i = 9; i < 18; i++){

        if (i > 12) {
            var hour = (i - 12).toString() + "PM";
        }
        else {
            var hour = i.toString() + "AM";
        }

        console.log(hour);

        var tempObj = {
            "time": hour,
            "toDo": ""
        };

        schedObj.push(tempObj);
    }
}


//update colors of content area - this will also need to be done on an interval
var setToDoColors = function () {
    
};


///Main code/////
setToday();
//handler for interaction, will need to determine what actions to take on click
















//**BONUS add option to choose previous days from the storage.

