///////////////// FUNCTIONS /////////////////

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
        prompt = "Student ID"
        break;
    case "professor":
        prompt = "Class Num"
        break;
    case "dean":
        prompt = "WHAT"  
        break;
    }
    printOnDiv(prompt,"userPrompt")
    document.getElementById("userPrompt").style.display='block';
    document.getElementById("promptID").disabled = false;
    document.getElementById("doIt").disabled = false;
}

// submit button, retrieves data from JSON and displays in website
function doIt(){
    var out = "";
    var id = document.getElementById("promptID").value;
    if  (document.getElementById("student").checked){
         out = JSON.stringify(s[id]);
    } else if (document.getElementById("professor").checked){
        out = JSON.stringify(c["classes"][id]);
    } else {
        out = "DEAN SUCKS COCK"
    }
    printOnDiv(out,"output");
}

///////////////// JSONs /////////////////

var c = {"classes": {
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

var s = {
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