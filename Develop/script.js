dayjs.extend(window.dayjs_plugin_advancedFormat);

var contentEL = $(".container");
var dateEl = $("#currentDay");
var today = dayjs().format('dddd, MMMM Do');
var schedObj = [];

/*
    sample schedule object = [
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
    console.log("Schedule is being saved")
    localStorage.setItem(today, JSON.stringify(schedObj));
};

var setSchedule = function () {
    //when creating give the row a data-pos-id of its position in the array, this will make it easier to lookup later

    //sample html
    /*<div class="time-block row">

            <div class="hour col-2">9 AM</div>
            <div class="description col-8 present">Content</div>
            <div class="saveBtn col-2">button</div>
         
        </div>

        <div class="time-block row">

          <div class="hour col-2">10AM</div>
          <div class="description col-8 past" data-pos-id="1">Content</div>
          <div class="saveBtn col-2"><span class="oi oi-book"></span></div>
       
      </div>*/
    getSchedule();
    
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
            .attr("data-pos-id", index);//may not be needed since I am replicating the screen into the Obj
        timeBlockEl.append(toDoEl);

        var btnEl = $("<div>")
            .addClass("saveBtn col-2");
        var spanEl = $("<span>")
            .addClass("oi oi-book");
        btnEl.append(spanEl);
        timeBlockEl.append(btnEl);

        contentEL.append(timeBlockEl);
    });

    setToDoColors();
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
    var hour = dayjs().hour();
    schedObj.forEach(function (element,index) {
        var toDoEl = $("div[data-pos-id='" + index + "']");
        //console.log(toDoEl);
        if (index + 9 === hour) {
            toDoEl.addClass("present");
        }
        else if (index + 9 < hour) {
            toDoEl.addClass("past");
        }
        else {
            toDoEl.addClass("future");
        }
    });
};

var toDoHandler = function (event) {
    console.log(event.target);
    console.log($(event.target).siblings());
    
}

///Main code/////
setToday();
setSchedule();
//listen for double click event to update text
contentEL.on("dblclick", ".description", toDoHandler);
//listn for click even on save button
contentEL.on("click", ".saveBtn", saveSchedule);

setInterval(setToDoColors, (1000 * 60) * 30);

















//**BONUS add option to choose previous days from the storage.

