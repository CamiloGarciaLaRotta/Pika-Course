"use strict"
///////////////// BROWSER FUNCTIONS /////////////////

// function to be ran at page load time
function load(){
    printOnDiv("<center>Welcome to Tijuana</center>","output")
}

// print a given str in a given div
function printOnDiv(str,div){
    document.getElementById(div).innerHTML = str
}

// upon choosing a profession, activate ID prompt, text area and button
function handleClick(radio) {
    var prompt;
    switch(radio.value){
    case "student": 
        prompt = "Student ID [1-80]"
        break;
    case "professor":
        prompt = "Class Num [101-110]"
        break;
    case "dean":
        prompt = "Student ID [1-80] or Class Num [101-110]"  
        break;
    }
    printOnDiv(prompt,"userPrompt")
    document.getElementById("userPrompt").style.display='block';
    document.getElementById("promptID").disabled = false;
    document.getElementById("doIt").disabled = false;
}

function doIt(){
    var out = "";
    var id = document.getElementById("promptID").value;
    if  (document.getElementById("student").checked){
         out = (id >= 1 && id <= 80) ? studentToString(id) : "<center>Invalid Input</center>";
    } else if (document.getElementById("professor").checked){
        out = (id >= 100 && id <= 110) ? ProfToString(id) : "<center>Invalid Input</center>";
    } else {
	if (id <= 80 && id > 0){
		out = studentToString(id);
	}else if (id >= 101 && id <= 110){
		out = ProfToString(id);
	}else {
		out = "<center>Invalid Input</center>";
	}
    }
    printOnDiv(out,"output");
}

// prettyfies student object
function studentToString(id){
	var out = "<pre>" +s[id][0] + "<br>"
	for (var key in s[id][1]){
		out += s[id][1][key]["day"] + "   &#9;Time: " +
	 	s[id][1][key]["start"] + " - " +
		s[id][1][key]["end"] + "<br>"
	}
	return out+"</pre>";
}

// prettyfies professor object
function ProfToString(id){
    var out = "<pre>" + c.classes[id]["name"] + "<br>"
    for (var key in c.classes[id]["times"]){
        out += "Day: "+ c.classes[id]["times"][key]["day"]+ " &#9;Time: " +
        c.classes[id]["times"][key]["start"] + "-" +
        c.classes[id]["times"][key]["end"] + "<br>"
    }
    return out+"</pre>";
}

///////////////// ALGORITHM FUNCTIONS /////////////////

var i = 0;
var j = 0;
var AVAILABLE = -2;
var NOT_AVAILABLE = -1;

var students = require("../JSON/studentsByAvailability.json");
var classes = require("../JSON/classes.json");

var days = ["Monday","Tuesday","Wednesday","Thursday","Friday"]

/*
 * Student class
 * constructor	: takes in JSON student
 * s			: student data as given in the JSON file
 * matrix		: matrix that indicates if available at a given time and day. Columns are days, rows are intervals of 15mins.
 * 					matrix stores AVAILABLE at a given day and time when the student has free time
 * 					matrix stores NOT_AVAILABLE at a given time when the time is not within his availabilities (from JSON)
 * 					otherwise, matrix stores int corresponding to the index of the student's lecture at that time
 * lectures 	: array of Lectures registered for
 * lectureCount	: amount of lectures registered for
 * print()		: prints name (temporary)
 * printHours()	: prints matrix of booleans describing available hours
 */

class Student {
	constructor (s) {
		this.s = s;
		this.matrix = [];
		this.avail = [];
		for(var c = 0; c < 5; c++) {
			var row = [];
			for(var r = 0; r < 37; r++) {
				row[r] = NOT_AVAILABLE;
			}
			this.matrix[c] = row;
		}
		for(var a in s[1]) {
			var daylist = this.matrix[dayAsIndex(s[1][a]["day"])];
			var start = timeAsIndex(s[1][a]["start"]);
			var end = timeAsIndex(s[1][a]["end"]);
			for (var c = start; c <= end; c++) {
				if(c > 36) break;
				daylist[c] = AVAILABLE;
			}
		}
		this.avail = this.matrix.slice();
		this.lectures = [];
		this.lectureCount = 0;
	}

	canTakeLecture(lec) {
		var day = lec["day"];
		var start = timeAsIndex(lec["start"]);
		var end = timeAsIndex(lec["end"]);
		var dayList = this.avail[dayAsIndex(day)];
		for(var c = start; c <= end; c++) {
			if(!(dayList[c] === AVAILABLE)) return false;
		}
		return true;
	}
	
	print() {
		console.log(this.s[0]);
	}

	printHours() {
		for(var j = 0; j <= 36; j++) {
			var timeslot = "";
			for (var c = 0; c < 5; c++) {
				var string = "";
				if(this.matrix[c][j] === AVAILABLE) string = "FREE";
				else if (this.matrix[c][j] === NOT_AVAILABLE) string = "BUSY";
				else string = "LEC" + this.matrix[c][j];
				timeslot += string + " "
			}
			console.log(timeslot);
		}
	}
}

/*
 * Lecture class
 * constructor	: takes in name of course, JSON time1
 * name			: name of course
 * start		: start time as string
 * end			: end time as string
 * day			: day of week as string
 * students		: array of Students registered in lecture
 * studentCount	: amount of Students registered in lecture
 * addStudent(s): adds Student s to student list, and adds lecture to s's lecture list.
 * print()		: prints course name and time range
 */

class Lecture {
	constructor(name,l) {
		this.name = name;
		this.start = l["start"];
		this.end = l["end"];
		this.day = l["day"];
		this.students = [];
		this.studentCount = 0;
	}
	
	addStudent(s) {
		this.students.push(s);
		s.lectures.push(this);
		for(var c = timeAsIndex(this.start); c <= timeAsIndex(this.end); c++) {
			s.matrix[dayAsIndex(this.day)][c] = s.lectures.length -1;
		}
		this.studentCount++;
		s.lectureCount++;
	}
    
    removeStudent(s) {
        // find and remove student from lecture
        for (i = 0; i < this.students.length; i++){
            if(s === this.students[i]) {
                this.students = this.students.slice(0,i).concat(this.students.slice(i + 1));
                break;
            }
        }

        // find and remove lecture from student
        for (i = 0; i < s.lectures.length; i++){
            if(this === s.lectures[i]) {
                s.lectures = s.lectures.slice(0,i).concat(s.lectures.slice(i + 1));
                break;
            }
        }

		this.studentCount--;
		s.lectureCount--;
	}

	print() {
		console.log(this.name + ": " + this.day + " from " + this.start + " to " + this.end);
	}
}

/*
 * Class class
 * constructor	: Takes in course number (i) and JSON class
 * num			: course number
 * name			: course name
 * lec1			: first lecture session
 * lec2			: second lecture session
 */

class Class { 
	constructor(i,c) {
		this.num = i;
		this.name = c["name"];
		this.lec1 = new Lecture(this.name,c["times"]["time1"]);
		this.lec2 = new Lecture(this.name,c["times"]["time2"]);
	}
}


var roster = [];	//list of Students in system
var courses = [];	// list of Classes in system

//initializes all Classes
var i = 101;
for(var c in classes["classes"]) {
	courses.push(new Class(i,classes["classes"][(i++).toString()]));
}

//initializes all Students
for(var s in students) {
	roster.push(new Student(students[s]));
}

/*
 * isAvailable(Student s, Lecture l)
 * returns true if Student is available to register in Lecture
 */

function isAvailable(s,l) {
	var day = l["day"];
	var start = timeAsIndex(l["start"]);
	var end = timeAsIndex(l["end"]);
	var daylist = s.matrix[dayAsIndex(day)];
	for (var c = start; c < end; c++) {
		if(!(daylist[c] === AVAILABLE)) return false;
	}
	return true;
}

/*
 * timeAsNum(String time)
 * returns integer representation of time string.
 * Ex.: "04:30pm" -> 1630
 * Not being used right now
 */

function timeAsNum(time) {
	var timearray = time.split(":");
	var hour = parseInt(timearray[0]);
	if(timearray[1].charAt(2) === 'p') hour += 12;
	var minute = parseInt(timearray[1].substr(0,2));
	return hour * 100 + minute;
}

/*
 * timeAsIndex(String time)
 * returns row number for student matrix that corresponds to a time string
 */

function timeAsIndex(time) {
	if(time == "NA") return 40; //Out of bounds -- will be interpreted as not available for that day altogether
	var timearray = time.split(":");
	var hour = parseInt(timearray[0]);
	if(timearray[1].charAt(2) === 'p' && !(hour === 12)) hour += 12;
	var minute = parseInt(timearray[1].substr(0,2));
	hour -= 8;
	return hour * 4 + Math.floor(minute/15);
}

/*
 * indexAsTimeInt(int index)
 * given a row index, returns an integer describing the time
 * Not used, most likely isn't necessary
 */

function indexAsTimeInt(index) {
	var hour = Math.floor(index/4);
	index -= hour * 4;
	hour += 8;
	var minute = index * 15;
	return hour * 100 + minute;
}

/*
 * dayAsIndex(String day)
 * returns column number for student matrix that corresponds to a day string
 */

function dayAsIndex(day) {
	return days.indexOf(day);
}

/*
//Testing
roster[1].print();
roster[1].printHours();
courses[2].lec1.print();
console.log(isAvailable(roster[1],courses[2].lec1));
*/

// shuffle array
function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}

// set all student's courses and all course's students -> [] 
function resetAll() {
    for (i = 0; i < roster.length ; i++){
        roster[i].lectures.length = 0;
        roster[i].lectureCount = 0;
    }
    for (i = 0; i < courses.length ; i++){
        courses[i].lec1.students.length = 0;
        courses[i].lec1.studentCount = 0;
        courses[i].lec2.students.length = 0;
        courses[i].lec2.studentCount = 0;
    }
}

do{
    resetAll()
    shuffle(roster)
    for(var s in roster) {
        for(var c in courses){
            //check if student is full
            if(roster[s].lectureCount == 5) continue;

            //vanilla(roster[s], courses[c])
            //cuckoo(roster[s], courses[c])
        }
    }

}while(getLazyStudents.length > 0)

// VANILLA ALGORITHM
function vanilla(s, c) {
    // verify if student is available for lecture 1 or 2
    if (c.lec1.studentCount < 20 && isAvailable(s,c.lec1)){
        c.lec1.addStudent(s)      
    }
    else if (c.lec2.studentCount < 20 && isAvailable(s,c.lec2)){
        c.lec2.addStudent(s)
    } 
}

function cuckoo(currS, currC) {
    if (isAvailable(currS, currC.lec1) && currC.lec1.studentCount < 20) currC.lec1.addStudent(currS)
    else if (isAvailable(currS, currC.lec2) && currC.lec2.studentCount < 20) currC.lec2.addStudent(currS)
    else {
        for(var s in roster) {
            if (roster[s].s[0] == currS.s[0]) continue
            for(var c in courses){
                if (courses[c].name == currC.name) continue // how to check if same lecture? lecture times?
                
                if(courses[c].lec1.studentCount < 20 && isAvailable(roster[s], courses[c].lec1)) {
                    // remove student with better availabilities and add him to new course
                    currC.lec1.removeStudent(roster[s])
                    courses[c].lec1.addStudent(roster[s])
                    // add cuckoo student
                    currC.lec1.addStudent(currS)
                    return;
                } else if(courses[c].lec2.studentCount < 20 && isAvailable(roster[s], courses[c].lec2)) {
                    // remove student with better availabilities and add him to new course
                    currC.lec2.removeStudent(roster[s])
                    courses[c].lec2.addStudent(roster[s])
                    // add cuckoo student
                    currC.lec2.addStudent(currS)
                    return;
                }
            }
        }
    }
}

// fill array of students with less than 5 courses
function getLazyStudents(){
    var lazyStudents = []
    for (i = 1; i < 80; i++){
        if(roster[i].lectureCount < 5) lazyStudents.push(roster[i]);
    }
    return lazyStudents
}

function getUglyCourses() {
    var uglyCourses = []
    for (i = 0; i < courses.length; i++) {
        if (courses[i].lec1.studentCount + courses[i].lec2.studentCount < 40) uglyCourses.push(courses[i])
    }
    return uglyCourses
}

//console.log(getLazyStudents())
//console.log(getUglyCourses())


for (i = 1; i < 80; i++){
    console.log(roster[i].s[0] +" : " + roster[i].lectureCount)
    for(j = 0; j< roster[i].lectures.length; j++){
        console.log("\t" + roster[i].lectures[j].name);
    }
}

for(i = 0; i < 10; i++ ){
    console.log(courses[i].name + " : " )
    console.log("Lec1 : \t" + courses[i].lec1.studentCount);
    console.log("Lec2 : \t" + courses[i].lec2.studentCount);
}

///////////////// JSONs /////////////////
var c;
var s;
function loadJSON() {
	c = {"classes": {
    "101": {
    		  "name": "Mathematics",
    		  "times": {
    		  		"time1":{
    		  			"day":"Monday",
    		  			"start":"08:30am",
    		  			"end":"10:30am"
    		  			},
    		  		"time2":{
    		  			"day":"Tuesday",
    		  			"start":"08:00am",
    		  			"end":"10:00am"
    		  			}
    		  }
    },
    "102":  {
    		  "name": "Physics",
    		  "times": {
    		  		"time1":{
    		  			"day":"Tuesday",
    		  			"start":"08:30am",
    		  			"end":"10:30am"
    		  			},
    		  		"time2":{
    		  			"day":"Wednesday",
    		  			"start":"08:00am",
    		  			"end":"10:00am"
    		  			}
    		  }
    },
    "103": {
    		  "name": "Biology",
    		  "times": {
    		  		"time1":{
    		  			"day":"Wednesday",
    		  			"start":"08:30am",
    		  			"end":"10:30am"
    		  			},
    		  		"time2":{
    		  			"day":"Friday",
    		  			"start":"08:00am",
    		  			"end":"10:00am"
    		  			}
    		  }
    },
    "104":  {
    		  "name": "Chemistry",
    		  "times": {
    		  		"time1":{
    		  			"day":"Monday",
    		  			"start":"10:30am",
    		  			"end":"12:00pm"
    		  			},
    		  		"time2":{
    		  			"day":"Tuesday",
    		  			"start":"02:00pm",
    		  			"end":"3:30pm"
    		  			}
    		  }
    },
    "105":  {
    		  "name": "History",
    		  "times": {
    		  		"time1":{
    		  			"day":"Thursday",
    		  			"start":"08:30am",
    		  			"end":"11:00am"
    		  			},
    		  		"time2":{
    		  			"day":"Friday",
    		  			"start":"08:00am",
    		  			"end":"10:30am"
    		  			}
    		  }
    },
    "106":  {
    		  "name": "Sociology",
    		  "times": {
    		  		"time1":{
    		  			"day":"Wednesday",
    		  			"start":"01:00pm",
    		  			"end":"03:00pm"
    		  			},
    		  		"time2":{
    		  			"day":"Friday",
    		  			"start":"01:00pm",
    		  			"end":"03:00pm"
    		  			}
    		  }
    },
    "107":  {
    		  "name": "French",
      		  "times": {
    		  		"time1":{
    		  			"day":"Monday",
    		  			"start":"08:30am",
    		  			"end":"10:30am"
    		  			},
    		  		"time2":{
    		  			"day":"Tuesday",
    		  			"start":"08:00am",
    		  			"end":"10:00am"
    		  			}
    		  }
    },                
    "108":  {
    		  "name": "English",
    		  "times": {
    		  		"time1":{
    		  			"day":"Tuesday",
    		  			"start":"10:30am",
    		  			"end":"12:00pm"
    		  			},
    		  		"time2":{
    		  			"day":"Wednesday",
    		  			"start":"10:00am",
    		  			"end":"11:30am"
    		  			}
    		  }
    },                
    "109":  {
    		  "name": "Programming",
    		  "times": {
    		  		"time1":{
    		  			"day":"Wednesday",
    		  			"start":"03:00pm",
    		  			"end":"05:00pm"
    		  			},
    		  		"time2":{
    		  			"day":"Friday",
    		  			"start":"01:00pm",
    		  			"end":"03:00pm"
    		  			}
    		  }
    },                
    "110":  {
    		  "name": "Music",
    		  "times": {
    		  		"time1":{
    		  			"day":"Thursday",
    		  			"start":"08:30am",
    		  			"end":"11:00am"
    		  			},
    		  		"time2":{
    		  			"day":"Friday",
    		  			"start":"08:00am",
    		  			"end":"10:30am"
    		  			}
    		  }
    }                
}
}    

s = {
    "1": [
        "CANDELARIO, AQUINO",
        {
            "avail1": {
                "day": "Monday",
                "start": "08:00am",
                "end": "07:00pm"
            },
            "avail2": {
                "day": "Tuesday",
                "start": "08:00am",
                "end": "01:00pm"
            },
            "avail3": {
                "day": "Tuesday",
                "start": "02:00pm",
                "end": "07:00pm"
            },
            "avail4": {
                "day": "Wednesday",
                "start": "08:00am",
                "end": "08:00pm"
            },
            "avail5": {
                "day": "Thursday",
                "start": "NA",
                "end": "NA"
            },
            "avail6": {
                "day": "Friday",
                "start": "08:00am",
                "end": "12:30pm"
            },
            "avail7": {
                "day": "Friday",
                "start": "01:00pm",
                "end": "07:00pm"
            }
        }
    ],
    "2": [
        "THERON, AVERETT",
        {
            "avail1": {
                "day": "Monday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail2": {
                "day": "Monday",
                "start": "02:00pm",
                "end": "04:00pm"
            },
            "avail3": {
                "day": "Tuesday",
                "start": "08:00am",
                "end": "12:30pm"
            },
            "avail4": {
                "day": "Tuesday",
                "start": "01:00pm",
                "end": "07:00pm"
            },
            "avail5": {
                "day": "Wednesday",
                "start": "08:00am",
                "end": "12:30pm"
            },
            "avail6": {
                "day": "Wednesday",
                "start": "01:00pm",
                "end": "07:00pm"
            },
            "avail7": {
                "day": "Thursday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail8": {
                "day": "Thursday",
                "start": "12:30pm",
                "end": "04:00pm"
            },
            "avail9": {
                "day": "Friday",
                "start": "08:00am",
                "end": "08:00pm"
            }
        }
    ],
    "3": [
        "ALEX, ANDERSON",
        {
            "avail1": {
                "day": "Monday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail2": {
                "day": "Monday",
                "start": "02:00pm",
                "end": "04:00pm"
            },
            "avail3": {
                "day": "Tuesday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail4": {
                "day": "Tuesday",
                "start": "02:00pm",
                "end": "07:00pm"
            },
            "avail5": {
                "day": "Wednesday",
                "start": "08:00am",
                "end": "08:00pm"
            },
            "avail6": {
                "day": "Thursday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail7": {
                "day": "Thursday",
                "start": "12:30pm",
                "end": "04:00pm"
            },
            "avail8": {
                "day": "Friday",
                "start": "09:00am",
                "end": "09:00pm"
            }
        }
    ],
    "4": [
        "DANIEL, ANDUJAR",
        {
            "avail1": {
                "day": "Monday",
                "start": "09:00am",
                "end": "01:00pm"
            },
            "avail2": {
                "day": "Monday",
                "start": "01:30pm",
                "end": "08:00pm"
            },
            "avail3": {
                "day": "Tuesday",
                "start": "08:00am",
                "end": "08:00pm"
            },
            "avail4": {
                "day": "Wednesday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail5": {
                "day": "Wednesday",
                "start": "02:00pm",
                "end": "04:00pm"
            },
            "avail6": {
                "day": "Thursday",
                "start": "NA",
                "end": "NA"
            },
            "avail7": {
                "day": "Friday",
                "start": "08:00am",
                "end": "12:30pm"
            },
            "avail8": {
                "day": "Friday",
                "start": "01:00pm",
                "end": "07:00pm"
            }
        }
    ],
    "5": [
        "TERRY, ALLEN",
        {
            "avail1": {
                "day": "Monday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail2": {
                "day": "Monday",
                "start": "02:00pm",
                "end": "07:00pm"
            },
            "avail3": {
                "day": "Tuesday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail4": {
                "day": "Tuesday",
                "start": "12:30pm",
                "end": "04:00pm"
            },
            "avail5": {
                "day": "Wednesday",
                "start": "08:00am",
                "end": "12:30pm"
            },
            "avail6": {
                "day": "Wednesday",
                "start": "01:00pm",
                "end": "07:00pm"
            },
            "avail7": {
                "day": "Thursday",
                "start": "08:00am",
                "end": "01:00pm"
            },
            "avail8": {
                "day": "Thursday",
                "start": "02:00pm",
                "end": "07:00pm"
            },
            "avail9": {
                "day": "Friday",
                "start": "08:30am",
                "end": "12:00pm"
            },
            "avail10": {
                "day": "Friday",
                "start": "12:30pm",
                "end": "07:00pm"
            }
        }
    ],
    "6": [
        "J, ALDANA",
        {
            "avail1": {
                "day": "Monday",
                "start": "09:00am",
                "end": "09:00pm"
            },
            "avail2": {
                "day": "Tuesday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail3": {
                "day": "Tuesday",
                "start": "02:00pm",
                "end": "07:00pm"
            },
            "avail4": {
                "day": "Wednesday",
                "start": "NA",
                "end": "NA"
            },
            "avail5": {
                "day": "Thursday",
                "start": "08:00am",
                "end": "07:00pm"
            },
            "avail6": {
                "day": "Friday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail7": {
                "day": "Friday",
                "start": "12:30pm",
                "end": "04:00pm"
            }
        }
    ],
    "7": [
        "TIMOTHY, ALLEN",
        {
            "avail1": {
                "day": "Monday",
                "start": "08:00am",
                "end": "08:00pm"
            },
            "avail2": {
                "day": "Tuesday",
                "start": "08:00am",
                "end": "12:30pm"
            },
            "avail3": {
                "day": "Tuesday",
                "start": "01:00pm",
                "end": "07:00pm"
            },
            "avail4": {
                "day": "Wednesday",
                "start": "08:00am",
                "end": "01:00pm"
            },
            "avail5": {
                "day": "Wednesday",
                "start": "02:00pm",
                "end": "07:00pm"
            },
            "avail6": {
                "day": "Thursday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail7": {
                "day": "Thursday",
                "start": "02:00pm",
                "end": "07:00pm"
            },
            "avail8": {
                "day": "Friday",
                "start": "08:00am",
                "end": "07:00pm"
            }
        }
    ],
    "8": [
        "ROSS, ALEXANDER",
        {
            "avail1": {
                "day": "Monday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail2": {
                "day": "Monday",
                "start": "02:00pm",
                "end": "07:00pm"
            },
            "avail3": {
                "day": "Tuesday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail4": {
                "day": "Tuesday",
                "start": "02:00pm",
                "end": "04:00pm"
            },
            "avail5": {
                "day": "Wednesday",
                "start": "08:30am",
                "end": "12:00pm"
            },
            "avail6": {
                "day": "Wednesday",
                "start": "12:30pm",
                "end": "07:00pm"
            },
            "avail7": {
                "day": "Thursday",
                "start": "NA",
                "end": "NA"
            },
            "avail8": {
                "day": "Friday",
                "start": "08:00am",
                "end": "07:00pm"
            }
        }
    ],
    "9": [
        "MARSHALL, ANDREWS JR",
        {
            "avail1": {
                "day": "Monday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail2": {
                "day": "Monday",
                "start": "02:00pm",
                "end": "04:00pm"
            },
            "avail3": {
                "day": "Tuesday",
                "start": "09:00am",
                "end": "09:00pm"
            },
            "avail4": {
                "day": "Wednesday",
                "start": "08:00am",
                "end": "01:00pm"
            },
            "avail5": {
                "day": "Wednesday",
                "start": "02:00pm",
                "end": "07:00pm"
            },
            "avail6": {
                "day": "Thursday",
                "start": "NA",
                "end": "NA"
            },
            "avail7": {
                "day": "Friday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail8": {
                "day": "Friday",
                "start": "02:00pm",
                "end": "07:00pm"
            }
        }
    ],
    "10": [
        "MARK, ANDERSEN",
        {
            "avail1": {
                "day": "Monday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail2": {
                "day": "Monday",
                "start": "12:30pm",
                "end": "04:00pm"
            },
            "avail3": {
                "day": "Tuesday",
                "start": "08:30am",
                "end": "12:00pm"
            },
            "avail4": {
                "day": "Tuesday",
                "start": "12:30pm",
                "end": "07:00pm"
            },
            "avail5": {
                "day": "Wednesday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail6": {
                "day": "Wednesday",
                "start": "12:30pm",
                "end": "04:00pm"
            },
            "avail7": {
                "day": "Thursday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail8": {
                "day": "Thursday",
                "start": "02:00pm",
                "end": "04:00pm"
            },
            "avail9": {
                "day": "Friday",
                "start": "08:00am",
                "end": "08:00pm"
            }
        }
    ],
    "11": [
        "CHRISTOPHER, AKINES",
        {
            "avail1": {
                "day": "Monday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail2": {
                "day": "Monday",
                "start": "02:00pm",
                "end": "07:00pm"
            },
            "avail3": {
                "day": "Tuesday",
                "start": "08:00am",
                "end": "08:00pm"
            },
            "avail4": {
                "day": "Wednesday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail5": {
                "day": "Wednesday",
                "start": "02:00pm",
                "end": "07:00pm"
            },
            "avail6": {
                "day": "Thursday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail7": {
                "day": "Thursday",
                "start": "02:00pm",
                "end": "07:00pm"
            },
            "avail8": {
                "day": "Friday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail9": {
                "day": "Friday",
                "start": "12:30pm",
                "end": "04:00pm"
            }
        }
    ],
    "12": [
        "WILLIAM, ABBRUZZESE",
        {
            "avail1": {
                "day": "Monday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail2": {
                "day": "Monday",
                "start": "12:30pm",
                "end": "04:00pm"
            },
            "avail3": {
                "day": "Tuesday",
                "start": "08:00am",
                "end": "08:00pm"
            },
            "avail4": {
                "day": "Wednesday",
                "start": "09:00am",
                "end": "09:00pm"
            },
            "avail5": {
                "day": "Thursday",
                "start": "08:00am",
                "end": "01:00pm"
            },
            "avail6": {
                "day": "Thursday",
                "start": "02:00pm",
                "end": "07:00pm"
            },
            "avail7": {
                "day": "Friday",
                "start": "09:00am",
                "end": "01:00pm"
            },
            "avail8": {
                "day": "Friday",
                "start": "01:30pm",
                "end": "08:00pm"
            }
        }
    ],
    "13": [
        "LESTER, BAILEY",
        {
            "avail1": {
                "day": "Monday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail2": {
                "day": "Monday",
                "start": "02:00pm",
                "end": "04:00pm"
            },
            "avail3": {
                "day": "Tuesday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail4": {
                "day": "Tuesday",
                "start": "12:30pm",
                "end": "04:00pm"
            },
            "avail5": {
                "day": "Wednesday",
                "start": "09:00am",
                "end": "01:00pm"
            },
            "avail6": {
                "day": "Wednesday",
                "start": "01:30pm",
                "end": "08:00pm"
            },
            "avail7": {
                "day": "Thursday",
                "start": "08:00am",
                "end": "08:00pm"
            },
            "avail8": {
                "day": "Friday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail9": {
                "day": "Friday",
                "start": "12:30pm",
                "end": "04:00pm"
            }
        }
    ],
    "14": [
        "JAIME, ALVARADO",
        {
            "avail1": {
                "day": "Monday",
                "start": "08:00am",
                "end": "08:00pm"
            },
            "avail2": {
                "day": "Tuesday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail3": {
                "day": "Tuesday",
                "start": "12:30pm",
                "end": "04:00pm"
            },
            "avail4": {
                "day": "Wednesday",
                "start": "09:00am",
                "end": "09:00pm"
            },
            "avail5": {
                "day": "Thursday",
                "start": "08:00am",
                "end": "01:00pm"
            },
            "avail6": {
                "day": "Thursday",
                "start": "02:00pm",
                "end": "07:00pm"
            },
            "avail7": {
                "day": "Friday",
                "start": "08:30am",
                "end": "12:00pm"
            },
            "avail8": {
                "day": "Friday",
                "start": "02:00pm",
                "end": "04:00pm"
            }
        }
    ],
    "15": [
        "GRACE, AKINLEMIBOLA",
        {
            "avail1": {
                "day": "Monday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail2": {
                "day": "Monday",
                "start": "12:30pm",
                "end": "04:00pm"
            },
            "avail3": {
                "day": "Tuesday",
                "start": "09:00am",
                "end": "09:00pm"
            },
            "avail4": {
                "day": "Wednesday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail5": {
                "day": "Wednesday",
                "start": "12:30pm",
                "end": "04:00pm"
            },
            "avail6": {
                "day": "Thursday",
                "start": "08:00am",
                "end": "12:30pm"
            },
            "avail7": {
                "day": "Thursday",
                "start": "01:00pm",
                "end": "07:00pm"
            },
            "avail8": {
                "day": "Friday",
                "start": "09:00am",
                "end": "09:00pm"
            }
        }
    ],
    "16": [
        "BLAIR, ALTENBACH",
        {
            "avail1": {
                "day": "Monday",
                "start": "08:30am",
                "end": "12:00pm"
            },
            "avail2": {
                "day": "Monday",
                "start": "12:30pm",
                "end": "07:00pm"
            },
            "avail3": {
                "day": "Tuesday",
                "start": "09:00am",
                "end": "09:00pm"
            },
            "avail4": {
                "day": "Wednesday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail5": {
                "day": "Wednesday",
                "start": "12:30pm",
                "end": "04:00pm"
            },
            "avail6": {
                "day": "Thursday",
                "start": "08:30am",
                "end": "12:00pm"
            },
            "avail7": {
                "day": "Thursday",
                "start": "12:30pm",
                "end": "07:00pm"
            },
            "avail8": {
                "day": "Friday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail9": {
                "day": "Friday",
                "start": "12:30pm",
                "end": "04:00pm"
            }
        }
    ],
    "17": [
        "SAMUEL, ALEGADO",
        {
            "avail1": {
                "day": "Monday",
                "start": "08:30am",
                "end": "12:00pm"
            },
            "avail2": {
                "day": "Monday",
                "start": "02:00pm",
                "end": "04:00pm"
            },
            "avail3": {
                "day": "Tuesday",
                "start": "08:00am",
                "end": "12:30pm"
            },
            "avail4": {
                "day": "Tuesday",
                "start": "01:00pm",
                "end": "07:00pm"
            },
            "avail5": {
                "day": "Wednesday",
                "start": "08:30am",
                "end": "12:00pm"
            },
            "avail6": {
                "day": "Wednesday",
                "start": "12:30pm",
                "end": "07:00pm"
            },
            "avail7": {
                "day": "Thursday",
                "start": "08:30am",
                "end": "12:00pm"
            },
            "avail8": {
                "day": "Thursday",
                "start": "12:30pm",
                "end": "07:00pm"
            },
            "avail9": {
                "day": "Friday",
                "start": "08:30am",
                "end": "12:00pm"
            },
            "avail10": {
                "day": "Friday",
                "start": "02:00pm",
                "end": "04:00pm"
            }
        }
    ],
    "18": [
        "JOHN, BAJIC",
        {
            "avail1": {
                "day": "Monday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail2": {
                "day": "Monday",
                "start": "02:00pm",
                "end": "04:00pm"
            },
            "avail3": {
                "day": "Tuesday",
                "start": "08:00am",
                "end": "01:00pm"
            },
            "avail4": {
                "day": "Tuesday",
                "start": "02:00pm",
                "end": "07:00pm"
            },
            "avail5": {
                "day": "Wednesday",
                "start": "08:30am",
                "end": "12:00pm"
            },
            "avail6": {
                "day": "Wednesday",
                "start": "12:30pm",
                "end": "07:00pm"
            },
            "avail7": {
                "day": "Thursday",
                "start": "08:00am",
                "end": "01:00pm"
            },
            "avail8": {
                "day": "Thursday",
                "start": "02:00pm",
                "end": "07:00pm"
            },
            "avail9": {
                "day": "Friday",
                "start": "09:00am",
                "end": "09:00pm"
            }
        }
    ],
    "19": [
        "EDWARD, ANNUNZIO",
        {
            "avail1": {
                "day": "Monday",
                "start": "NA",
                "end": "NA"
            },
            "avail2": {
                "day": "Tuesday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail3": {
                "day": "Tuesday",
                "start": "02:00pm",
                "end": "04:00pm"
            },
            "avail4": {
                "day": "Wednesday",
                "start": "09:00am",
                "end": "01:00pm"
            },
            "avail5": {
                "day": "Wednesday",
                "start": "01:30pm",
                "end": "08:00pm"
            },
            "avail6": {
                "day": "Thursday",
                "start": "08:00am",
                "end": "07:00pm"
            },
            "avail7": {
                "day": "Friday",
                "start": "08:00am",
                "end": "12:30pm"
            },
            "avail8": {
                "day": "Friday",
                "start": "01:00pm",
                "end": "07:00pm"
            }
        }
    ],
    "20": [
        "VINCENT, BALDASSANO",
        {
            "avail1": {
                "day": "Monday",
                "start": "08:30am",
                "end": "12:00pm"
            },
            "avail2": {
                "day": "Monday",
                "start": "12:30pm",
                "end": "07:00pm"
            },
            "avail3": {
                "day": "Tuesday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail4": {
                "day": "Tuesday",
                "start": "02:00pm",
                "end": "04:00pm"
            },
            "avail5": {
                "day": "Wednesday",
                "start": "NA",
                "end": "NA"
            },
            "avail6": {
                "day": "Thursday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail7": {
                "day": "Thursday",
                "start": "02:00pm",
                "end": "07:00pm"
            },
            "avail8": {
                "day": "Friday",
                "start": "08:30am",
                "end": "12:00pm"
            },
            "avail9": {
                "day": "Friday",
                "start": "02:00pm",
                "end": "04:00pm"
            }
        }
    ],
    "21": [
        "RAY, AGUILAR",
        {
            "avail1": {
                "day": "Monday",
                "start": "08:30am",
                "end": "12:00pm"
            },
            "avail2": {
                "day": "Monday",
                "start": "02:00pm",
                "end": "04:00pm"
            },
            "avail3": {
                "day": "Tuesday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail4": {
                "day": "Tuesday",
                "start": "02:00pm",
                "end": "04:00pm"
            },
            "avail5": {
                "day": "Wednesday",
                "start": "08:30am",
                "end": "12:00pm"
            },
            "avail6": {
                "day": "Wednesday",
                "start": "12:30pm",
                "end": "07:00pm"
            },
            "avail7": {
                "day": "Thursday",
                "start": "NA",
                "end": "NA"
            },
            "avail8": {
                "day": "Friday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail9": {
                "day": "Friday",
                "start": "12:30pm",
                "end": "04:00pm"
            }
        }
    ],
    "22": [
        "ABEL, AZUL",
        {
            "avail1": {
                "day": "Monday",
                "start": "08:00am",
                "end": "12:30pm"
            },
            "avail2": {
                "day": "Monday",
                "start": "01:00pm",
                "end": "07:00pm"
            },
            "avail3": {
                "day": "Tuesday",
                "start": "08:30am",
                "end": "12:00pm"
            },
            "avail4": {
                "day": "Tuesday",
                "start": "12:30pm",
                "end": "07:00pm"
            },
            "avail5": {
                "day": "Wednesday",
                "start": "NA",
                "end": "NA"
            },
            "avail6": {
                "day": "Thursday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail7": {
                "day": "Thursday",
                "start": "02:00pm",
                "end": "04:00pm"
            },
            "avail8": {
                "day": "Friday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail9": {
                "day": "Friday",
                "start": "02:00pm",
                "end": "07:00pm"
            }
        }
    ],
    "23": [
        "MOHAMMED, ABUBAKER",
        {
            "avail1": {
                "day": "Monday",
                "start": "08:30am",
                "end": "12:00pm"
            },
            "avail2": {
                "day": "Monday",
                "start": "02:00pm",
                "end": "04:00pm"
            },
            "avail3": {
                "day": "Tuesday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail4": {
                "day": "Tuesday",
                "start": "02:00pm",
                "end": "07:00pm"
            },
            "avail5": {
                "day": "Wednesday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail6": {
                "day": "Wednesday",
                "start": "02:00pm",
                "end": "04:00pm"
            },
            "avail7": {
                "day": "Thursday",
                "start": "08:00am",
                "end": "01:00pm"
            },
            "avail8": {
                "day": "Thursday",
                "start": "02:00pm",
                "end": "07:00pm"
            },
            "avail9": {
                "day": "Friday",
                "start": "08:00am",
                "end": "07:00pm"
            }
        }
    ],
    "24": [
        "TIMOTHY, BAILEY",
        {
            "avail1": {
                "day": "Monday",
                "start": "08:00am",
                "end": "08:00pm"
            },
            "avail2": {
                "day": "Tuesday",
                "start": "08:30am",
                "end": "12:00pm"
            },
            "avail3": {
                "day": "Tuesday",
                "start": "02:00pm",
                "end": "04:00pm"
            },
            "avail4": {
                "day": "Wednesday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail5": {
                "day": "Wednesday",
                "start": "02:00pm",
                "end": "04:00pm"
            },
            "avail6": {
                "day": "Thursday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail7": {
                "day": "Thursday",
                "start": "02:00pm",
                "end": "04:00pm"
            },
            "avail8": {
                "day": "Friday",
                "start": "08:00am",
                "end": "01:00pm"
            },
            "avail9": {
                "day": "Friday",
                "start": "02:00pm",
                "end": "07:00pm"
            }
        }
    ],
    "25": [
        "ISABEL, ARENAS",
        {
            "avail1": {
                "day": "Monday",
                "start": "09:00am",
                "end": "01:00pm"
            },
            "avail2": {
                "day": "Monday",
                "start": "01:30pm",
                "end": "08:00pm"
            },
            "avail3": {
                "day": "Tuesday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail4": {
                "day": "Tuesday",
                "start": "12:30pm",
                "end": "04:00pm"
            },
            "avail5": {
                "day": "Wednesday",
                "start": "09:00am",
                "end": "01:00pm"
            },
            "avail6": {
                "day": "Wednesday",
                "start": "01:30pm",
                "end": "08:00pm"
            },
            "avail7": {
                "day": "Thursday",
                "start": "09:00am",
                "end": "01:00pm"
            },
            "avail8": {
                "day": "Thursday",
                "start": "01:30pm",
                "end": "08:00pm"
            },
            "avail9": {
                "day": "Friday",
                "start": "09:00am",
                "end": "09:00pm"
            }
        }
    ],
    "26": [
        "CHRISTOPHER, AKINES",
        {
            "avail1": {
                "day": "Monday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail2": {
                "day": "Monday",
                "start": "02:00pm",
                "end": "04:00pm"
            },
            "avail3": {
                "day": "Tuesday",
                "start": "08:00am",
                "end": "08:00pm"
            },
            "avail4": {
                "day": "Wednesday",
                "start": "08:00am",
                "end": "07:00pm"
            },
            "avail5": {
                "day": "Thursday",
                "start": "09:00am",
                "end": "09:00pm"
            },
            "avail6": {
                "day": "Friday",
                "start": "08:00am",
                "end": "08:00pm"
            }
        }
    ],
    "27": [
        "LOUIS, AGUILAR",
        {
            "avail1": {
                "day": "Monday",
                "start": "08:30am",
                "end": "12:00pm"
            },
            "avail2": {
                "day": "Monday",
                "start": "12:30pm",
                "end": "07:00pm"
            },
            "avail3": {
                "day": "Tuesday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail4": {
                "day": "Tuesday",
                "start": "12:30pm",
                "end": "04:00pm"
            },
            "avail5": {
                "day": "Wednesday",
                "start": "09:00am",
                "end": "09:00pm"
            },
            "avail6": {
                "day": "Thursday",
                "start": "NA",
                "end": "NA"
            },
            "avail7": {
                "day": "Friday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail8": {
                "day": "Friday",
                "start": "12:30pm",
                "end": "04:00pm"
            }
        }
    ],
    "28": [
        "TIMOTHY, ALLEN",
        {
            "avail1": {
                "day": "Monday",
                "start": "08:00am",
                "end": "12:30pm"
            },
            "avail2": {
                "day": "Monday",
                "start": "01:00pm",
                "end": "07:00pm"
            },
            "avail3": {
                "day": "Tuesday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail4": {
                "day": "Tuesday",
                "start": "12:30pm",
                "end": "04:00pm"
            },
            "avail5": {
                "day": "Wednesday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail6": {
                "day": "Wednesday",
                "start": "12:30pm",
                "end": "04:00pm"
            },
            "avail7": {
                "day": "Thursday",
                "start": "08:30am",
                "end": "12:00pm"
            },
            "avail8": {
                "day": "Thursday",
                "start": "12:30pm",
                "end": "07:00pm"
            },
            "avail9": {
                "day": "Friday",
                "start": "09:00am",
                "end": "01:00pm"
            },
            "avail10": {
                "day": "Friday",
                "start": "01:30pm",
                "end": "08:00pm"
            }
        }
    ],
    "29": [
        "SCOTT, AHERN",
        {
            "avail1": {
                "day": "Monday",
                "start": "09:00am",
                "end": "09:00pm"
            },
            "avail2": {
                "day": "Tuesday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail3": {
                "day": "Tuesday",
                "start": "02:00pm",
                "end": "07:00pm"
            },
            "avail4": {
                "day": "Wednesday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail5": {
                "day": "Wednesday",
                "start": "12:30pm",
                "end": "04:00pm"
            },
            "avail6": {
                "day": "Thursday",
                "start": "08:00am",
                "end": "07:00pm"
            },
            "avail7": {
                "day": "Friday",
                "start": "08:00am",
                "end": "12:30pm"
            },
            "avail8": {
                "day": "Friday",
                "start": "01:00pm",
                "end": "07:00pm"
            }
        }
    ],
    "30": [
        "LAZARO, ALTAMIRANO",
        {
            "avail1": {
                "day": "Monday",
                "start": "NA",
                "end": "NA"
            },
            "avail2": {
                "day": "Tuesday",
                "start": "NA",
                "end": "NA"
            },
            "avail3": {
                "day": "Wednesday",
                "start": "09:00am",
                "end": "09:00pm"
            },
            "avail4": {
                "day": "Thursday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail5": {
                "day": "Thursday",
                "start": "12:30pm",
                "end": "04:00pm"
            },
            "avail6": {
                "day": "Friday",
                "start": "08:30am",
                "end": "12:00pm"
            },
            "avail7": {
                "day": "Friday",
                "start": "02:00pm",
                "end": "04:00pm"
            }
        }
    ],
    "31": [
        "CHRISTOPHER, ALONZO",
        {
            "avail1": {
                "day": "Monday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail2": {
                "day": "Monday",
                "start": "02:00pm",
                "end": "04:00pm"
            },
            "avail3": {
                "day": "Tuesday",
                "start": "09:00am",
                "end": "09:00pm"
            },
            "avail4": {
                "day": "Wednesday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail5": {
                "day": "Wednesday",
                "start": "12:30pm",
                "end": "04:00pm"
            },
            "avail6": {
                "day": "Thursday",
                "start": "08:00am",
                "end": "08:00pm"
            },
            "avail7": {
                "day": "Friday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail8": {
                "day": "Friday",
                "start": "12:30pm",
                "end": "04:00pm"
            }
        }
    ],
    "32": [
        "PATRICK, ASHE",
        {
            "avail1": {
                "day": "Monday",
                "start": "08:30am",
                "end": "12:00pm"
            },
            "avail2": {
                "day": "Monday",
                "start": "12:30pm",
                "end": "07:00pm"
            },
            "avail3": {
                "day": "Tuesday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail4": {
                "day": "Tuesday",
                "start": "02:00pm",
                "end": "04:00pm"
            },
            "avail5": {
                "day": "Wednesday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail6": {
                "day": "Wednesday",
                "start": "02:00pm",
                "end": "07:00pm"
            },
            "avail7": {
                "day": "Thursday",
                "start": "08:00am",
                "end": "01:00pm"
            },
            "avail8": {
                "day": "Thursday",
                "start": "02:00pm",
                "end": "07:00pm"
            },
            "avail9": {
                "day": "Friday",
                "start": "08:00am",
                "end": "12:30pm"
            },
            "avail10": {
                "day": "Friday",
                "start": "01:00pm",
                "end": "07:00pm"
            }
        }
    ],
    "33": [
        "MAJED, ASSAF",
        {
            "avail1": {
                "day": "Monday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail2": {
                "day": "Monday",
                "start": "02:00pm",
                "end": "07:00pm"
            },
            "avail3": {
                "day": "Tuesday",
                "start": "NA",
                "end": "NA"
            },
            "avail4": {
                "day": "Wednesday",
                "start": "08:30am",
                "end": "12:00pm"
            },
            "avail5": {
                "day": "Wednesday",
                "start": "12:30pm",
                "end": "07:00pm"
            },
            "avail6": {
                "day": "Thursday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail7": {
                "day": "Thursday",
                "start": "12:30pm",
                "end": "04:00pm"
            },
            "avail8": {
                "day": "Friday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail9": {
                "day": "Friday",
                "start": "12:30pm",
                "end": "04:00pm"
            }
        }
    ],
    "34": [
        "JASON, ARELLANO",
        {
            "avail1": {
                "day": "Monday",
                "start": "09:00am",
                "end": "09:00pm"
            },
            "avail2": {
                "day": "Tuesday",
                "start": "09:00am",
                "end": "09:00pm"
            },
            "avail3": {
                "day": "Wednesday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail4": {
                "day": "Wednesday",
                "start": "12:30pm",
                "end": "04:00pm"
            },
            "avail5": {
                "day": "Thursday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail6": {
                "day": "Thursday",
                "start": "02:00pm",
                "end": "07:00pm"
            },
            "avail7": {
                "day": "Friday",
                "start": "08:00am",
                "end": "12:30pm"
            },
            "avail8": {
                "day": "Friday",
                "start": "01:00pm",
                "end": "07:00pm"
            }
        }
    ],
    "35": [
        "GRACE ANN, ARMOUR",
        {
            "avail1": {
                "day": "Monday",
                "start": "08:00am",
                "end": "07:00pm"
            },
            "avail2": {
                "day": "Tuesday",
                "start": "NA",
                "end": "NA"
            },
            "avail3": {
                "day": "Wednesday",
                "start": "08:00am",
                "end": "12:30pm"
            },
            "avail4": {
                "day": "Wednesday",
                "start": "01:00pm",
                "end": "07:00pm"
            },
            "avail5": {
                "day": "Thursday",
                "start": "08:00am",
                "end": "08:00pm"
            },
            "avail6": {
                "day": "Friday",
                "start": "08:00am",
                "end": "01:00pm"
            },
            "avail7": {
                "day": "Friday",
                "start": "02:00pm",
                "end": "07:00pm"
            }
        }
    ],
    "36": [
        "DAVID, ADAMS",
        {
            "avail1": {
                "day": "Monday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail2": {
                "day": "Monday",
                "start": "12:30pm",
                "end": "04:00pm"
            },
            "avail3": {
                "day": "Tuesday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail4": {
                "day": "Tuesday",
                "start": "12:30pm",
                "end": "04:00pm"
            },
            "avail5": {
                "day": "Wednesday",
                "start": "08:30am",
                "end": "12:00pm"
            },
            "avail6": {
                "day": "Wednesday",
                "start": "12:30pm",
                "end": "07:00pm"
            },
            "avail7": {
                "day": "Thursday",
                "start": "NA",
                "end": "NA"
            },
            "avail8": {
                "day": "Friday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail9": {
                "day": "Friday",
                "start": "12:30pm",
                "end": "04:00pm"
            }
        }
    ],
    "37": [
        "CONSTANTINE, ARGIRIS",
        {
            "avail1": {
                "day": "Monday",
                "start": "09:00am",
                "end": "01:00pm"
            },
            "avail2": {
                "day": "Monday",
                "start": "01:30pm",
                "end": "08:00pm"
            },
            "avail3": {
                "day": "Tuesday",
                "start": "08:30am",
                "end": "12:00pm"
            },
            "avail4": {
                "day": "Tuesday",
                "start": "02:00pm",
                "end": "04:00pm"
            },
            "avail5": {
                "day": "Wednesday",
                "start": "08:00am",
                "end": "07:00pm"
            },
            "avail6": {
                "day": "Thursday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail7": {
                "day": "Thursday",
                "start": "02:00pm",
                "end": "07:00pm"
            },
            "avail8": {
                "day": "Friday",
                "start": "08:00am",
                "end": "01:00pm"
            },
            "avail9": {
                "day": "Friday",
                "start": "02:00pm",
                "end": "07:00pm"
            }
        }
    ],
    "38": [
        "CLARISSA, ACEVEDO",
        {
            "avail1": {
                "day": "Monday",
                "start": "09:00am",
                "end": "09:00pm"
            },
            "avail2": {
                "day": "Tuesday",
                "start": "09:00am",
                "end": "01:00pm"
            },
            "avail3": {
                "day": "Tuesday",
                "start": "01:30pm",
                "end": "08:00pm"
            },
            "avail4": {
                "day": "Wednesday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail5": {
                "day": "Wednesday",
                "start": "12:30pm",
                "end": "04:00pm"
            },
            "avail6": {
                "day": "Thursday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail7": {
                "day": "Thursday",
                "start": "12:30pm",
                "end": "04:00pm"
            },
            "avail8": {
                "day": "Friday",
                "start": "08:00am",
                "end": "08:00pm"
            }
        }
    ],
    "39": [
        "MARY, ACCURSO",
        {
            "avail1": {
                "day": "Monday",
                "start": "08:00am",
                "end": "12:30pm"
            },
            "avail2": {
                "day": "Monday",
                "start": "01:00pm",
                "end": "07:00pm"
            },
            "avail3": {
                "day": "Tuesday",
                "start": "08:00am",
                "end": "07:00pm"
            },
            "avail4": {
                "day": "Wednesday",
                "start": "09:00am",
                "end": "01:00pm"
            },
            "avail5": {
                "day": "Wednesday",
                "start": "01:30pm",
                "end": "08:00pm"
            },
            "avail6": {
                "day": "Thursday",
                "start": "NA",
                "end": "NA"
            },
            "avail7": {
                "day": "Friday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail8": {
                "day": "Friday",
                "start": "12:30pm",
                "end": "04:00pm"
            }
        }
    ],
    "40": [
        "BRUCE, ASKEW",
        {
            "avail1": {
                "day": "Monday",
                "start": "08:00am",
                "end": "01:00pm"
            },
            "avail2": {
                "day": "Monday",
                "start": "02:00pm",
                "end": "07:00pm"
            },
            "avail3": {
                "day": "Tuesday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail4": {
                "day": "Tuesday",
                "start": "12:30pm",
                "end": "04:00pm"
            },
            "avail5": {
                "day": "Wednesday",
                "start": "09:00am",
                "end": "01:00pm"
            },
            "avail6": {
                "day": "Wednesday",
                "start": "01:30pm",
                "end": "08:00pm"
            },
            "avail7": {
                "day": "Thursday",
                "start": "08:00am",
                "end": "12:30pm"
            },
            "avail8": {
                "day": "Thursday",
                "start": "01:00pm",
                "end": "07:00pm"
            },
            "avail9": {
                "day": "Friday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail10": {
                "day": "Friday",
                "start": "12:30pm",
                "end": "04:00pm"
            }
        }
    ],
    "41": [
        "CAROLYN, ALLAIN",
        {
            "avail1": {
                "day": "Monday",
                "start": "08:30am",
                "end": "12:00pm"
            },
            "avail2": {
                "day": "Monday",
                "start": "12:30pm",
                "end": "07:00pm"
            },
            "avail3": {
                "day": "Tuesday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail4": {
                "day": "Tuesday",
                "start": "02:00pm",
                "end": "04:00pm"
            },
            "avail5": {
                "day": "Wednesday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail6": {
                "day": "Wednesday",
                "start": "12:30pm",
                "end": "04:00pm"
            },
            "avail7": {
                "day": "Thursday",
                "start": "08:00am",
                "end": "08:00pm"
            },
            "avail8": {
                "day": "Friday",
                "start": "08:30am",
                "end": "12:00pm"
            },
            "avail9": {
                "day": "Friday",
                "start": "02:00pm",
                "end": "04:00pm"
            }
        }
    ],
    "42": [
        "MARIO, ALONSO",
        {
            "avail1": {
                "day": "Monday",
                "start": "08:00am",
                "end": "07:00pm"
            },
            "avail2": {
                "day": "Tuesday",
                "start": "08:00am",
                "end": "07:00pm"
            },
            "avail3": {
                "day": "Wednesday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail4": {
                "day": "Wednesday",
                "start": "12:30pm",
                "end": "04:00pm"
            },
            "avail5": {
                "day": "Thursday",
                "start": "08:30am",
                "end": "12:00pm"
            },
            "avail6": {
                "day": "Thursday",
                "start": "12:30pm",
                "end": "07:00pm"
            },
            "avail7": {
                "day": "Friday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail8": {
                "day": "Friday",
                "start": "12:30pm",
                "end": "04:00pm"
            }
        }
    ],
    "43": [
        "CARA, BADER",
        {
            "avail1": {
                "day": "Monday",
                "start": "08:00am",
                "end": "08:00pm"
            },
            "avail2": {
                "day": "Tuesday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail3": {
                "day": "Tuesday",
                "start": "02:00pm",
                "end": "04:00pm"
            },
            "avail4": {
                "day": "Wednesday",
                "start": "08:00am",
                "end": "08:00pm"
            },
            "avail5": {
                "day": "Thursday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail6": {
                "day": "Thursday",
                "start": "12:30pm",
                "end": "04:00pm"
            },
            "avail7": {
                "day": "Friday",
                "start": "08:00am",
                "end": "01:00pm"
            },
            "avail8": {
                "day": "Friday",
                "start": "02:00pm",
                "end": "07:00pm"
            }
        }
    ],
    "44": [
        "JEFFREY, ADAMOW",
        {
            "avail1": {
                "day": "Monday",
                "start": "08:00am",
                "end": "08:00pm"
            },
            "avail2": {
                "day": "Tuesday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail3": {
                "day": "Tuesday",
                "start": "12:30pm",
                "end": "04:00pm"
            },
            "avail4": {
                "day": "Wednesday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail5": {
                "day": "Wednesday",
                "start": "02:00pm",
                "end": "04:00pm"
            },
            "avail6": {
                "day": "Thursday",
                "start": "08:00am",
                "end": "07:00pm"
            },
            "avail7": {
                "day": "Friday",
                "start": "08:30am",
                "end": "12:00pm"
            },
            "avail8": {
                "day": "Friday",
                "start": "12:30pm",
                "end": "07:00pm"
            }
        }
    ],
    "45": [
        "ALEJANDRO, ALMAZAN",
        {
            "avail1": {
                "day": "Monday",
                "start": "09:00am",
                "end": "01:00pm"
            },
            "avail2": {
                "day": "Monday",
                "start": "01:30pm",
                "end": "08:00pm"
            },
            "avail3": {
                "day": "Tuesday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail4": {
                "day": "Tuesday",
                "start": "02:00pm",
                "end": "04:00pm"
            },
            "avail5": {
                "day": "Wednesday",
                "start": "08:00am",
                "end": "12:30pm"
            },
            "avail6": {
                "day": "Wednesday",
                "start": "01:00pm",
                "end": "07:00pm"
            },
            "avail7": {
                "day": "Thursday",
                "start": "08:30am",
                "end": "12:00pm"
            },
            "avail8": {
                "day": "Thursday",
                "start": "12:30pm",
                "end": "07:00pm"
            },
            "avail9": {
                "day": "Friday",
                "start": "NA",
                "end": "NA"
            }
        }
    ],
    "46": [
        "RONALDO, ANGELES",
        {
            "avail1": {
                "day": "Monday",
                "start": "09:00am",
                "end": "01:00pm"
            },
            "avail2": {
                "day": "Monday",
                "start": "01:30pm",
                "end": "08:00pm"
            },
            "avail3": {
                "day": "Tuesday",
                "start": "09:00am",
                "end": "01:00pm"
            },
            "avail4": {
                "day": "Tuesday",
                "start": "01:30pm",
                "end": "08:00pm"
            },
            "avail5": {
                "day": "Wednesday",
                "start": "NA",
                "end": "NA"
            },
            "avail6": {
                "day": "Thursday",
                "start": "09:00am",
                "end": "01:00pm"
            },
            "avail7": {
                "day": "Thursday",
                "start": "01:30pm",
                "end": "08:00pm"
            },
            "avail8": {
                "day": "Friday",
                "start": "08:00am",
                "end": "12:30pm"
            },
            "avail9": {
                "day": "Friday",
                "start": "01:00pm",
                "end": "07:00pm"
            }
        }
    ],
    "47": [
        "SANDRA, ALLEN",
        {
            "avail1": {
                "day": "Monday",
                "start": "08:00am",
                "end": "12:30pm"
            },
            "avail2": {
                "day": "Monday",
                "start": "01:00pm",
                "end": "07:00pm"
            },
            "avail3": {
                "day": "Tuesday",
                "start": "08:00am",
                "end": "12:30pm"
            },
            "avail4": {
                "day": "Tuesday",
                "start": "01:00pm",
                "end": "07:00pm"
            },
            "avail5": {
                "day": "Wednesday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail6": {
                "day": "Wednesday",
                "start": "02:00pm",
                "end": "04:00pm"
            },
            "avail7": {
                "day": "Thursday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail8": {
                "day": "Thursday",
                "start": "12:30pm",
                "end": "04:00pm"
            },
            "avail9": {
                "day": "Friday",
                "start": "09:00am",
                "end": "09:00pm"
            }
        }
    ],
    "48": [
        "ROBERT, AMSTADT",
        {
            "avail1": {
                "day": "Monday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail2": {
                "day": "Monday",
                "start": "02:00pm",
                "end": "04:00pm"
            },
            "avail3": {
                "day": "Tuesday",
                "start": "08:30am",
                "end": "12:00pm"
            },
            "avail4": {
                "day": "Tuesday",
                "start": "12:30pm",
                "end": "07:00pm"
            },
            "avail5": {
                "day": "Wednesday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail6": {
                "day": "Wednesday",
                "start": "12:30pm",
                "end": "04:00pm"
            },
            "avail7": {
                "day": "Thursday",
                "start": "08:00am",
                "end": "08:00pm"
            },
            "avail8": {
                "day": "Friday",
                "start": "09:00am",
                "end": "01:00pm"
            },
            "avail9": {
                "day": "Friday",
                "start": "01:30pm",
                "end": "08:00pm"
            }
        }
    ],
    "49": [
        "CARRIE, AUSTIN",
        {
            "avail1": {
                "day": "Monday",
                "start": "08:30am",
                "end": "12:00pm"
            },
            "avail2": {
                "day": "Monday",
                "start": "02:00pm",
                "end": "04:00pm"
            },
            "avail3": {
                "day": "Tuesday",
                "start": "08:30am",
                "end": "12:00pm"
            },
            "avail4": {
                "day": "Tuesday",
                "start": "12:30pm",
                "end": "07:00pm"
            },
            "avail5": {
                "day": "Wednesday",
                "start": "08:00am",
                "end": "08:00pm"
            },
            "avail6": {
                "day": "Thursday",
                "start": "08:00am",
                "end": "08:00pm"
            },
            "avail7": {
                "day": "Friday",
                "start": "08:30am",
                "end": "12:00pm"
            },
            "avail8": {
                "day": "Friday",
                "start": "02:00pm",
                "end": "04:00pm"
            }
        }
    ],
    "50": [
        "HIRAM, ARAGONES",
        {
            "avail1": {
                "day": "Monday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail2": {
                "day": "Monday",
                "start": "02:00pm",
                "end": "04:00pm"
            },
            "avail3": {
                "day": "Tuesday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail4": {
                "day": "Tuesday",
                "start": "12:30pm",
                "end": "04:00pm"
            },
            "avail5": {
                "day": "Wednesday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail6": {
                "day": "Wednesday",
                "start": "12:30pm",
                "end": "04:00pm"
            },
            "avail7": {
                "day": "Thursday",
                "start": "08:00am",
                "end": "12:30pm"
            },
            "avail8": {
                "day": "Thursday",
                "start": "01:00pm",
                "end": "07:00pm"
            },
            "avail9": {
                "day": "Friday",
                "start": "09:00am",
                "end": "01:00pm"
            },
            "avail10": {
                "day": "Friday",
                "start": "01:30pm",
                "end": "08:00pm"
            }
        }
    ],
    "51": [
        "MARIE, ALLEN",
        {
            "avail1": {
                "day": "Monday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail2": {
                "day": "Monday",
                "start": "12:30pm",
                "end": "04:00pm"
            },
            "avail3": {
                "day": "Tuesday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail4": {
                "day": "Tuesday",
                "start": "02:00pm",
                "end": "04:00pm"
            },
            "avail5": {
                "day": "Wednesday",
                "start": "09:00am",
                "end": "01:00pm"
            },
            "avail6": {
                "day": "Wednesday",
                "start": "01:30pm",
                "end": "08:00pm"
            },
            "avail7": {
                "day": "Thursday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail8": {
                "day": "Thursday",
                "start": "02:00pm",
                "end": "04:00pm"
            },
            "avail9": {
                "day": "Friday",
                "start": "08:00am",
                "end": "08:00pm"
            }
        }
    ],
    "52": [
        "ALESIA, ARELLANO",
        {
            "avail1": {
                "day": "Monday",
                "start": "08:00am",
                "end": "12:30pm"
            },
            "avail2": {
                "day": "Monday",
                "start": "01:00pm",
                "end": "07:00pm"
            },
            "avail3": {
                "day": "Tuesday",
                "start": "09:00am",
                "end": "01:00pm"
            },
            "avail4": {
                "day": "Tuesday",
                "start": "01:30pm",
                "end": "08:00pm"
            },
            "avail5": {
                "day": "Wednesday",
                "start": "09:00am",
                "end": "09:00pm"
            },
            "avail6": {
                "day": "Thursday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail7": {
                "day": "Thursday",
                "start": "12:30pm",
                "end": "04:00pm"
            },
            "avail8": {
                "day": "Friday",
                "start": "09:00am",
                "end": "01:00pm"
            },
            "avail9": {
                "day": "Friday",
                "start": "01:30pm",
                "end": "08:00pm"
            }
        }
    ],
    "53": [
        "JUANITA, AGUILAR",
        {
            "avail1": {
                "day": "Monday",
                "start": "08:30am",
                "end": "12:00pm"
            },
            "avail2": {
                "day": "Monday",
                "start": "12:30pm",
                "end": "07:00pm"
            },
            "avail3": {
                "day": "Tuesday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail4": {
                "day": "Tuesday",
                "start": "02:00pm",
                "end": "04:00pm"
            },
            "avail5": {
                "day": "Wednesday",
                "start": "08:00am",
                "end": "07:00pm"
            },
            "avail6": {
                "day": "Thursday",
                "start": "NA",
                "end": "NA"
            },
            "avail7": {
                "day": "Friday",
                "start": "08:00am",
                "end": "01:00pm"
            },
            "avail8": {
                "day": "Friday",
                "start": "02:00pm",
                "end": "07:00pm"
            }
        }
    ],
    "54": [
        "HASSAN, ABOUELKHEIR",
        {
            "avail1": {
                "day": "Monday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail2": {
                "day": "Monday",
                "start": "02:00pm",
                "end": "07:00pm"
            },
            "avail3": {
                "day": "Tuesday",
                "start": "08:00am",
                "end": "07:00pm"
            },
            "avail4": {
                "day": "Wednesday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail5": {
                "day": "Wednesday",
                "start": "12:30pm",
                "end": "04:00pm"
            },
            "avail6": {
                "day": "Thursday",
                "start": "08:30am",
                "end": "12:00pm"
            },
            "avail7": {
                "day": "Thursday",
                "start": "02:00pm",
                "end": "04:00pm"
            },
            "avail8": {
                "day": "Friday",
                "start": "08:00am",
                "end": "12:30pm"
            },
            "avail9": {
                "day": "Friday",
                "start": "01:00pm",
                "end": "07:00pm"
            }
        }
    ],
    "55": [
        "JOSE, ALVAREZ",
        {
            "avail1": {
                "day": "Monday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail2": {
                "day": "Monday",
                "start": "12:30pm",
                "end": "04:00pm"
            },
            "avail3": {
                "day": "Tuesday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail4": {
                "day": "Tuesday",
                "start": "12:30pm",
                "end": "04:00pm"
            },
            "avail5": {
                "day": "Wednesday",
                "start": "NA",
                "end": "NA"
            },
            "avail6": {
                "day": "Thursday",
                "start": "09:00am",
                "end": "09:00pm"
            },
            "avail7": {
                "day": "Friday",
                "start": "08:30am",
                "end": "12:00pm"
            },
            "avail8": {
                "day": "Friday",
                "start": "12:30pm",
                "end": "07:00pm"
            }
        }
    ],
    "56": [
        "JAMES, ALLEN",
        {
            "avail1": {
                "day": "Monday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail2": {
                "day": "Monday",
                "start": "12:30pm",
                "end": "04:00pm"
            },
            "avail3": {
                "day": "Tuesday",
                "start": "08:00am",
                "end": "01:00pm"
            },
            "avail4": {
                "day": "Tuesday",
                "start": "02:00pm",
                "end": "07:00pm"
            },
            "avail5": {
                "day": "Wednesday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail6": {
                "day": "Wednesday",
                "start": "02:00pm",
                "end": "07:00pm"
            },
            "avail7": {
                "day": "Thursday",
                "start": "08:00am",
                "end": "12:30pm"
            },
            "avail8": {
                "day": "Thursday",
                "start": "01:00pm",
                "end": "07:00pm"
            },
            "avail9": {
                "day": "Friday",
                "start": "08:00am",
                "end": "07:00pm"
            }
        }
    ],
    "57": [
        "RAGINA, BAGGETTE",
        {
            "avail1": {
                "day": "Monday",
                "start": "09:00am",
                "end": "09:00pm"
            },
            "avail2": {
                "day": "Tuesday",
                "start": "08:00am",
                "end": "12:30pm"
            },
            "avail3": {
                "day": "Tuesday",
                "start": "01:00pm",
                "end": "07:00pm"
            },
            "avail4": {
                "day": "Wednesday",
                "start": "09:00am",
                "end": "01:00pm"
            },
            "avail5": {
                "day": "Wednesday",
                "start": "01:30pm",
                "end": "08:00pm"
            },
            "avail6": {
                "day": "Thursday",
                "start": "08:00am",
                "end": "12:30pm"
            },
            "avail7": {
                "day": "Thursday",
                "start": "01:00pm",
                "end": "07:00pm"
            },
            "avail8": {
                "day": "Friday",
                "start": "NA",
                "end": "NA"
            }
        }
    ],
    "58": [
        "BLANCA, BAHENA",
        {
            "avail1": {
                "day": "Monday",
                "start": "09:00am",
                "end": "09:00pm"
            },
            "avail2": {
                "day": "Tuesday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail3": {
                "day": "Tuesday",
                "start": "12:30pm",
                "end": "04:00pm"
            },
            "avail4": {
                "day": "Wednesday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail5": {
                "day": "Wednesday",
                "start": "02:00pm",
                "end": "07:00pm"
            },
            "avail6": {
                "day": "Thursday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail7": {
                "day": "Thursday",
                "start": "12:30pm",
                "end": "04:00pm"
            },
            "avail8": {
                "day": "Friday",
                "start": "08:00am",
                "end": "07:00pm"
            }
        }
    ],
    "59": [
        "LESTER, ANDERSON",
        {
            "avail1": {
                "day": "Monday",
                "start": "09:00am",
                "end": "09:00pm"
            },
            "avail2": {
                "day": "Tuesday",
                "start": "08:00am",
                "end": "07:00pm"
            },
            "avail3": {
                "day": "Wednesday",
                "start": "08:30am",
                "end": "12:00pm"
            },
            "avail4": {
                "day": "Wednesday",
                "start": "12:30pm",
                "end": "07:00pm"
            },
            "avail5": {
                "day": "Thursday",
                "start": "NA",
                "end": "NA"
            },
            "avail6": {
                "day": "Friday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail7": {
                "day": "Friday",
                "start": "02:00pm",
                "end": "07:00pm"
            }
        }
    ],
    "60": [
        "RONALD, BADAMI",
        {
            "avail1": {
                "day": "Monday",
                "start": "08:00am",
                "end": "12:30pm"
            },
            "avail2": {
                "day": "Monday",
                "start": "01:00pm",
                "end": "07:00pm"
            },
            "avail3": {
                "day": "Tuesday",
                "start": "08:00am",
                "end": "12:30pm"
            },
            "avail4": {
                "day": "Tuesday",
                "start": "01:00pm",
                "end": "07:00pm"
            },
            "avail5": {
                "day": "Wednesday",
                "start": "08:00am",
                "end": "01:00pm"
            },
            "avail6": {
                "day": "Wednesday",
                "start": "02:00pm",
                "end": "07:00pm"
            },
            "avail7": {
                "day": "Thursday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail8": {
                "day": "Thursday",
                "start": "12:30pm",
                "end": "04:00pm"
            },
            "avail9": {
                "day": "Friday",
                "start": "08:30am",
                "end": "12:00pm"
            },
            "avail10": {
                "day": "Friday",
                "start": "02:00pm",
                "end": "04:00pm"
            }
        }
    ],
    "61": [
        "DAVID, ANDREWS",
        {
            "avail1": {
                "day": "Monday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail2": {
                "day": "Monday",
                "start": "02:00pm",
                "end": "04:00pm"
            },
            "avail3": {
                "day": "Tuesday",
                "start": "08:00am",
                "end": "08:00pm"
            },
            "avail4": {
                "day": "Wednesday",
                "start": "08:00am",
                "end": "08:00pm"
            },
            "avail5": {
                "day": "Thursday",
                "start": "08:00am",
                "end": "01:00pm"
            },
            "avail6": {
                "day": "Thursday",
                "start": "02:00pm",
                "end": "07:00pm"
            },
            "avail7": {
                "day": "Friday",
                "start": "09:00am",
                "end": "09:00pm"
            }
        }
    ],
    "62": [
        "CAMUHOO, AITKEN",
        {
            "avail1": {
                "day": "Monday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail2": {
                "day": "Monday",
                "start": "02:00pm",
                "end": "07:00pm"
            },
            "avail3": {
                "day": "Tuesday",
                "start": "NA",
                "end": "NA"
            },
            "avail4": {
                "day": "Wednesday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail5": {
                "day": "Wednesday",
                "start": "02:00pm",
                "end": "04:00pm"
            },
            "avail6": {
                "day": "Thursday",
                "start": "08:30am",
                "end": "12:00pm"
            },
            "avail7": {
                "day": "Thursday",
                "start": "02:00pm",
                "end": "04:00pm"
            },
            "avail8": {
                "day": "Friday",
                "start": "08:30am",
                "end": "12:00pm"
            },
            "avail9": {
                "day": "Friday",
                "start": "12:30pm",
                "end": "07:00pm"
            }
        }
    ],
    "63": [
        "LUTHER, ANDERSON",
        {
            "avail1": {
                "day": "Monday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail2": {
                "day": "Monday",
                "start": "02:00pm",
                "end": "04:00pm"
            },
            "avail3": {
                "day": "Tuesday",
                "start": "08:00am",
                "end": "08:00pm"
            },
            "avail4": {
                "day": "Wednesday",
                "start": "08:30am",
                "end": "12:00pm"
            },
            "avail5": {
                "day": "Wednesday",
                "start": "02:00pm",
                "end": "04:00pm"
            },
            "avail6": {
                "day": "Thursday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail7": {
                "day": "Thursday",
                "start": "02:00pm",
                "end": "04:00pm"
            },
            "avail8": {
                "day": "Friday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail9": {
                "day": "Friday",
                "start": "12:30pm",
                "end": "04:00pm"
            }
        }
    ],
    "64": [
        "EVA, AVINA",
        {
            "avail1": {
                "day": "Monday",
                "start": "08:30am",
                "end": "12:00pm"
            },
            "avail2": {
                "day": "Monday",
                "start": "12:30pm",
                "end": "07:00pm"
            },
            "avail3": {
                "day": "Tuesday",
                "start": "NA",
                "end": "NA"
            },
            "avail4": {
                "day": "Wednesday",
                "start": "08:00am",
                "end": "01:00pm"
            },
            "avail5": {
                "day": "Wednesday",
                "start": "02:00pm",
                "end": "07:00pm"
            },
            "avail6": {
                "day": "Thursday",
                "start": "09:00am",
                "end": "01:00pm"
            },
            "avail7": {
                "day": "Thursday",
                "start": "01:30pm",
                "end": "08:00pm"
            },
            "avail8": {
                "day": "Friday",
                "start": "08:00am",
                "end": "08:00pm"
            }
        }
    ],
    "65": [
        "DAVID, ALPERS",
        {
            "avail1": {
                "day": "Monday",
                "start": "NA",
                "end": "NA"
            },
            "avail2": {
                "day": "Tuesday",
                "start": "09:00am",
                "end": "01:00pm"
            },
            "avail3": {
                "day": "Tuesday",
                "start": "01:30pm",
                "end": "08:00pm"
            },
            "avail4": {
                "day": "Wednesday",
                "start": "08:30am",
                "end": "12:00pm"
            },
            "avail5": {
                "day": "Wednesday",
                "start": "02:00pm",
                "end": "04:00pm"
            },
            "avail6": {
                "day": "Thursday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail7": {
                "day": "Thursday",
                "start": "02:00pm",
                "end": "07:00pm"
            },
            "avail8": {
                "day": "Friday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail9": {
                "day": "Friday",
                "start": "02:00pm",
                "end": "07:00pm"
            }
        }
    ],
    "66": [
        "NANCY, ARROYO-FREGOSO",
        {
            "avail1": {
                "day": "Monday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail2": {
                "day": "Monday",
                "start": "02:00pm",
                "end": "07:00pm"
            },
            "avail3": {
                "day": "Tuesday",
                "start": "08:00am",
                "end": "01:00pm"
            },
            "avail4": {
                "day": "Tuesday",
                "start": "02:00pm",
                "end": "07:00pm"
            },
            "avail5": {
                "day": "Wednesday",
                "start": "08:00am",
                "end": "07:00pm"
            },
            "avail6": {
                "day": "Thursday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail7": {
                "day": "Thursday",
                "start": "12:30pm",
                "end": "04:00pm"
            },
            "avail8": {
                "day": "Friday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail9": {
                "day": "Friday",
                "start": "12:30pm",
                "end": "04:00pm"
            }
        }
    ],
    "67": [
        "BAHLEBBY, AMDEMICHAEL",
        {
            "avail1": {
                "day": "Monday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail2": {
                "day": "Monday",
                "start": "12:30pm",
                "end": "04:00pm"
            },
            "avail3": {
                "day": "Tuesday",
                "start": "08:30am",
                "end": "12:00pm"
            },
            "avail4": {
                "day": "Tuesday",
                "start": "02:00pm",
                "end": "04:00pm"
            },
            "avail5": {
                "day": "Wednesday",
                "start": "NA",
                "end": "NA"
            },
            "avail6": {
                "day": "Thursday",
                "start": "08:30am",
                "end": "12:00pm"
            },
            "avail7": {
                "day": "Thursday",
                "start": "12:30pm",
                "end": "07:00pm"
            },
            "avail8": {
                "day": "Friday",
                "start": "09:00am",
                "end": "09:00pm"
            }
        }
    ],
    "68": [
        "NIKOS, APOSTOLOPOALOS",
        {
            "avail1": {
                "day": "Monday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail2": {
                "day": "Monday",
                "start": "12:30pm",
                "end": "04:00pm"
            },
            "avail3": {
                "day": "Tuesday",
                "start": "NA",
                "end": "NA"
            },
            "avail4": {
                "day": "Wednesday",
                "start": "NA",
                "end": "NA"
            },
            "avail5": {
                "day": "Thursday",
                "start": "09:00am",
                "end": "01:00pm"
            },
            "avail6": {
                "day": "Thursday",
                "start": "01:30pm",
                "end": "08:00pm"
            },
            "avail7": {
                "day": "Friday",
                "start": "08:00am",
                "end": "07:00pm"
            }
        }
    ],
    "69": [
        "MICHELLE, ASHFORD",
        {
            "avail1": {
                "day": "Monday",
                "start": "09:00am",
                "end": "01:00pm"
            },
            "avail2": {
                "day": "Monday",
                "start": "01:30pm",
                "end": "08:00pm"
            },
            "avail3": {
                "day": "Tuesday",
                "start": "08:30am",
                "end": "12:00pm"
            },
            "avail4": {
                "day": "Tuesday",
                "start": "12:30pm",
                "end": "07:00pm"
            },
            "avail5": {
                "day": "Wednesday",
                "start": "08:30am",
                "end": "12:00pm"
            },
            "avail6": {
                "day": "Wednesday",
                "start": "02:00pm",
                "end": "04:00pm"
            },
            "avail7": {
                "day": "Thursday",
                "start": "09:00am",
                "end": "09:00pm"
            },
            "avail8": {
                "day": "Friday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail9": {
                "day": "Friday",
                "start": "12:30pm",
                "end": "04:00pm"
            }
        }
    ],
    "70": [
        "MICHAEL, BAILEY",
        {
            "avail1": {
                "day": "Monday",
                "start": "09:00am",
                "end": "09:00pm"
            },
            "avail2": {
                "day": "Tuesday",
                "start": "08:00am",
                "end": "08:00pm"
            },
            "avail3": {
                "day": "Wednesday",
                "start": "08:00am",
                "end": "01:00pm"
            },
            "avail4": {
                "day": "Wednesday",
                "start": "02:00pm",
                "end": "07:00pm"
            },
            "avail5": {
                "day": "Thursday",
                "start": "09:00am",
                "end": "01:00pm"
            },
            "avail6": {
                "day": "Thursday",
                "start": "01:30pm",
                "end": "08:00pm"
            },
            "avail7": {
                "day": "Friday",
                "start": "08:00am",
                "end": "12:30pm"
            },
            "avail8": {
                "day": "Friday",
                "start": "01:00pm",
                "end": "07:00pm"
            }
        }
    ],
    "71": [
        "DEBRA, ANTHONY SANDERS",
        {
            "avail1": {
                "day": "Monday",
                "start": "NA",
                "end": "NA"
            },
            "avail2": {
                "day": "Tuesday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail3": {
                "day": "Tuesday",
                "start": "12:30pm",
                "end": "04:00pm"
            },
            "avail4": {
                "day": "Wednesday",
                "start": "09:00am",
                "end": "09:00pm"
            },
            "avail5": {
                "day": "Thursday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail6": {
                "day": "Thursday",
                "start": "02:00pm",
                "end": "07:00pm"
            },
            "avail7": {
                "day": "Friday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail8": {
                "day": "Friday",
                "start": "12:30pm",
                "end": "04:00pm"
            }
        }
    ],
    "72": [
        "EARL, ALEXANDER",
        {
            "avail1": {
                "day": "Monday",
                "start": "08:00am",
                "end": "07:00pm"
            },
            "avail2": {
                "day": "Tuesday",
                "start": "NA",
                "end": "NA"
            },
            "avail3": {
                "day": "Wednesday",
                "start": "08:00am",
                "end": "08:00pm"
            },
            "avail4": {
                "day": "Thursday",
                "start": "08:00am",
                "end": "08:00pm"
            },
            "avail5": {
                "day": "Friday",
                "start": "NA",
                "end": "NA"
            }
        }
    ],
    "73": [
        "ELIZABETH, ALCANTARA",
        {
            "avail1": {
                "day": "Monday",
                "start": "08:30am",
                "end": "12:00pm"
            },
            "avail2": {
                "day": "Monday",
                "start": "02:00pm",
                "end": "04:00pm"
            },
            "avail3": {
                "day": "Tuesday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail4": {
                "day": "Tuesday",
                "start": "02:00pm",
                "end": "07:00pm"
            },
            "avail5": {
                "day": "Wednesday",
                "start": "08:00am",
                "end": "12:30pm"
            },
            "avail6": {
                "day": "Wednesday",
                "start": "01:00pm",
                "end": "07:00pm"
            },
            "avail7": {
                "day": "Thursday",
                "start": "08:00am",
                "end": "08:00pm"
            },
            "avail8": {
                "day": "Friday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail9": {
                "day": "Friday",
                "start": "02:00pm",
                "end": "04:00pm"
            }
        }
    ],
    "74": [
        "MICHAEL, AUSTIN",
        {
            "avail1": {
                "day": "Monday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail2": {
                "day": "Monday",
                "start": "12:30pm",
                "end": "04:00pm"
            },
            "avail3": {
                "day": "Tuesday",
                "start": "08:00am",
                "end": "08:00pm"
            },
            "avail4": {
                "day": "Wednesday",
                "start": "NA",
                "end": "NA"
            },
            "avail5": {
                "day": "Thursday",
                "start": "09:00am",
                "end": "09:00pm"
            },
            "avail6": {
                "day": "Friday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail7": {
                "day": "Friday",
                "start": "02:00pm",
                "end": "07:00pm"
            }
        }
    ],
    "75": [
        "CHRIS, ANDERSEN",
        {
            "avail1": {
                "day": "Monday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail2": {
                "day": "Monday",
                "start": "12:30pm",
                "end": "04:00pm"
            },
            "avail3": {
                "day": "Tuesday",
                "start": "09:00am",
                "end": "01:00pm"
            },
            "avail4": {
                "day": "Tuesday",
                "start": "01:30pm",
                "end": "08:00pm"
            },
            "avail5": {
                "day": "Wednesday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail6": {
                "day": "Wednesday",
                "start": "12:30pm",
                "end": "04:00pm"
            },
            "avail7": {
                "day": "Thursday",
                "start": "08:00am",
                "end": "07:00pm"
            },
            "avail8": {
                "day": "Friday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail9": {
                "day": "Friday",
                "start": "02:00pm",
                "end": "04:00pm"
            }
        }
    ],
    "76": [
        "ROCCO, BALESTRI",
        {
            "avail1": {
                "day": "Monday",
                "start": "08:00am",
                "end": "01:00pm"
            },
            "avail2": {
                "day": "Monday",
                "start": "02:00pm",
                "end": "07:00pm"
            },
            "avail3": {
                "day": "Tuesday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail4": {
                "day": "Tuesday",
                "start": "02:00pm",
                "end": "07:00pm"
            },
            "avail5": {
                "day": "Wednesday",
                "start": "08:00am",
                "end": "01:00pm"
            },
            "avail6": {
                "day": "Wednesday",
                "start": "02:00pm",
                "end": "07:00pm"
            },
            "avail7": {
                "day": "Thursday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail8": {
                "day": "Thursday",
                "start": "12:30pm",
                "end": "04:00pm"
            },
            "avail9": {
                "day": "Friday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail10": {
                "day": "Friday",
                "start": "02:00pm",
                "end": "04:00pm"
            }
        }
    ],
    "77": [
        "FABIAN, ALBARRAN",
        {
            "avail1": {
                "day": "Monday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail2": {
                "day": "Monday",
                "start": "02:00pm",
                "end": "07:00pm"
            },
            "avail3": {
                "day": "Tuesday",
                "start": "08:00am",
                "end": "07:00pm"
            },
            "avail4": {
                "day": "Wednesday",
                "start": "08:30am",
                "end": "12:00pm"
            },
            "avail5": {
                "day": "Wednesday",
                "start": "12:30pm",
                "end": "07:00pm"
            },
            "avail6": {
                "day": "Thursday",
                "start": "08:00am",
                "end": "12:30pm"
            },
            "avail7": {
                "day": "Thursday",
                "start": "01:00pm",
                "end": "07:00pm"
            },
            "avail8": {
                "day": "Friday",
                "start": "NA",
                "end": "NA"
            }
        }
    ],
    "78": [
        "MIGUEL, BAHENA",
        {
            "avail1": {
                "day": "Monday",
                "start": "08:00am",
                "end": "01:00pm"
            },
            "avail2": {
                "day": "Monday",
                "start": "02:00pm",
                "end": "07:00pm"
            },
            "avail3": {
                "day": "Tuesday",
                "start": "08:00am",
                "end": "01:00pm"
            },
            "avail4": {
                "day": "Tuesday",
                "start": "02:00pm",
                "end": "07:00pm"
            },
            "avail5": {
                "day": "Wednesday",
                "start": "NA",
                "end": "NA"
            },
            "avail6": {
                "day": "Thursday",
                "start": "08:30am",
                "end": "12:00pm"
            },
            "avail7": {
                "day": "Thursday",
                "start": "12:30pm",
                "end": "07:00pm"
            },
            "avail8": {
                "day": "Friday",
                "start": "08:00am",
                "end": "01:00pm"
            },
            "avail9": {
                "day": "Friday",
                "start": "02:00pm",
                "end": "07:00pm"
            }
        }
    ],
    "79": [
        "BAHLEBBY, AMDEMICHAEL",
        {
            "avail1": {
                "day": "Monday",
                "start": "08:30am",
                "end": "12:00pm"
            },
            "avail2": {
                "day": "Monday",
                "start": "02:00pm",
                "end": "04:00pm"
            },
            "avail3": {
                "day": "Tuesday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail4": {
                "day": "Tuesday",
                "start": "12:30pm",
                "end": "04:00pm"
            },
            "avail5": {
                "day": "Wednesday",
                "start": "NA",
                "end": "NA"
            },
            "avail6": {
                "day": "Thursday",
                "start": "NA",
                "end": "NA"
            },
            "avail7": {
                "day": "Friday",
                "start": "08:00am",
                "end": "01:00pm"
            },
            "avail8": {
                "day": "Friday",
                "start": "02:00pm",
                "end": "07:00pm"
            }
        }
    ],
    "80": [
        "BILAL, ALI",
        {
            "avail1": {
                "day": "Monday",
                "start": "08:30am",
                "end": "12:00pm"
            },
            "avail2": {
                "day": "Monday",
                "start": "02:00pm",
                "end": "04:00pm"
            },
            "avail3": {
                "day": "Tuesday",
                "start": "08:30am",
                "end": "12:00pm"
            },
            "avail4": {
                "day": "Tuesday",
                "start": "12:30pm",
                "end": "07:00pm"
            },
            "avail5": {
                "day": "Wednesday",
                "start": "08:00am",
                "end": "12:00pm"
            },
            "avail6": {
                "day": "Wednesday",
                "start": "02:00pm",
                "end": "04:00pm"
            },
            "avail7": {
                "day": "Thursday",
                "start": "NA",
                "end": "NA"
            },
            "avail8": {
                "day": "Friday",
                "start": "08:30am",
                "end": "12:00pm"
            },
            "avail9": {
                "day": "Friday",
                "start": "12:30pm",
                "end": "07:00pm"
            }
        }
    ]
}    

	return [c,s];
}
