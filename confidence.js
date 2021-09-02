
const thursdays = [[9, 9], [9, 16], [9, 23], [9, 30], 
    [10, 7], [10, 14], [10, 21], [10, 28], [11, 4],
    [11, 11], [11, 18], [11, 25], [12, 2], [12, 9],
    [12, 16], [12, 23], [12, 30], [1, 6]];


// Const schedule for games -- Last is MNF
const schedule =    [["DAL@TB", "JAX@HOU", "LAC@WAS", "SEA@IND", "NYJ@CAR", "MIN@CIN", "ARI@TEN", "SF@DET", "PIT@BUF", "PHI@ATL", "CLE@KC", "GB@NO", "DEN@NYG", "MIA@NE", "CHI@LAR", "BAL@LV"],
                     ["NYG@WAS", "NE@NYJ", "DEN@JAX", "BUF@MIA", "SF@PHI", "LAR@IND", "LV@PIT", "CIN@CHI", "HOU@CLE", "NO@CAR", "MIN@ARI", "ATL@TB", "TEN@SEA", "DAL@LAC", "KC@BAL", "DET@GB"],
                     ["CAR@HOU", "IND@TEN", "ATL@NYG", "LAC@KC", "CIN@PIT", "CHI@CLE", "BAL@DET", "NO@NE", "ARI@JAX", "WAS@BUF", "NYJ@DEN", "MIA@LV", "SEA@MIN", "TB@LAR", "GB@SF", "PHI@DAL"],
                     ["JAX@CIN", "TEN@NYJ", "KC@PHI", "CAR@DAL", "NYG@NO", "CLE@MIN", "DET@CHI", "HOU@BUF", "IND@MIA", "WAS@ATL", "SEA@SF", "ARI@LAR", "PIT@GB", "BAL@DEN", "TB@NE", "LV@LAC"],
                     ["LAR@SEA", "NYJ@ATL", "DET@MIN", "NO@WAS", "NE@HOU", "MIA@TB", "GB@CIN", "DEN@PIT", "PHI@CAR", "TEN@JAX", "CLE@LAC", "CHI@LV", "SF@ARI", "NYG@DAL", "BUF@KC", "IND@BAL"],
                     ["BYE", "BYE", "TB@PHI", "MIA@JAX", "KC@WAS", "LAR@NYG", "HOU@IND", "CIN@DET", "GB@CHI", "LAC@BAL", "MIN@CAR", "ARI@CLE", "LV@DEN", "DAL@NE", "SEA@PIT", "BUF@TEN"]
];

// Maps team shorthand to full team name
const teamMap = new Map();
teamMap.set("DAL", "Dallas Cowboys");
teamMap.set("JAX", "Jacksonville Jaguars");
teamMap.set("TB", "Tampa Bay Buccaneers");
teamMap.set("HOU", "Houston Texans");
teamMap.set("LAC", "Los Angeles Chargers");
teamMap.set("WAS", "Washington Football Team");
teamMap.set("SEA", "Seattle Seahawks");
teamMap.set("IND", "Indianapolis Colts");
teamMap.set("NYJ", "New York Jets");
teamMap.set("CAR", "Carolina Panthers");
teamMap.set("MIN", "Minnesota Vikings");
teamMap.set("CIN", "Cincinatti Bengals");
teamMap.set("ARI", "Arizona Cardinals");
teamMap.set("TEN", "Tennessee Titans");
teamMap.set("SF", "San Francisco 49ers");
teamMap.set("DET", "Detroit Lions");
teamMap.set("PIT", "Pittsburgh Steelers");
teamMap.set("BUF", "Buffalo Bills");
teamMap.set("PHI", "Philadelphia Eagles");
teamMap.set("ATL", "Atlanta Falcons");
teamMap.set("CLE", "Cleveland Browns");
teamMap.set("KC", "Kansas City Chiefs");
teamMap.set("GB", "Green Bay Packers");
teamMap.set("NO", "New Orleans Saints");
teamMap.set("DEN", "Denver Broncos");
teamMap.set("NYG", "New York Giants");
teamMap.set("MIA", "Miami Dolphins");
teamMap.set("NE", "New England Patriots");
teamMap.set("CHI", "Chicago Bears");
teamMap.set("LAR", "Los Angeles Rams");
teamMap.set("LV", "Las Vegas Raiders");
teamMap.set("BAL", "Baltimore Ravens");

// Count of games
var count = 0;

/**
* Make a request without ajax and without refresh the page
* Invisible for the user
* -- https://stackoverflow.com/questions/692196/post-request-javascript
* @param url string
* @param params object
* @param method string get or post
**/
function requestWithoutAjax( url, params, method ){

    params = params || {};
    method = method || "post";

    // function to remove the iframe
    var removeIframe = function( iframe ){
        iframe.parentElement.removeChild(iframe);
    };

    // make a iframe...
    var iframe = document.createElement('iframe');
    iframe.style.display = 'none';

    iframe.onload = function(){
        var iframeDoc = this.contentWindow.document;

        // Make a invisible form
        var form = iframeDoc.createElement('form');
        form.method = method;
        form.action = url;
        iframeDoc.body.appendChild(form);

        // pass the parameters
        for( var name in params ){
            var input = iframeDoc.createElement('input');
            input.type = 'hidden';
            input.name = name;
            input.value = params[name];
            form.appendChild(input);
        }

        form.submit();
        // remove the iframe
        setTimeout( function(){ 
            removeIframe(iframe);
        }, 500);
    };

    document.body.appendChild(iframe);
}

// Gets index of week that is in play
function getData() {
    var hoy = new Date(); // Today and Now
    var idx = 0; // Week of data
    var thurs = new Date(2021, thursdays[0][0], thursdays[0][1], 7, 20);
    if (hoy.getTime() >= thurs.getTime()) {
        for (var i = 1; i < thursdays.length; ++i) {
            var thurs = new Date(thursdays[i][0] != 1 ? 2021 : 2022, thursdays[i][0], thursdays[i][1] - 1, 7, 20);
            var LastThurs = new Date(thursdays[i][0] != 1 ? 2021 : 2022, thursdays[i-1][0], thursdays[i-1][1] - 1, 7, 20);
            if (hoy.getTime() > LastThurs.getTime() && hoy.getTime() < thurs.getTime()) {
                idx = i;
                break;
            } // end if
            if (i == thursdays.length - 1) {
                idx = -1;
                console.log("Something went wrong with the date");
            }
        } // end for
    } // end if

    return idx;
}

function awayTeam(str) {
    return str.substring(0, str.indexOf('@'));
}

function homeTeam(str) {
    return str.substring(str.indexOf('@') + 1);
}

/**
 * Startup function called from html code to start the program.
 */
function startup() {
    var idx = getData();
    var scheduleData = schedule[idx];
    document.getElementById("week").innerHTML = "Week " + (idx + 1);

    var div = document.getElementById("forms");

    // Create all game forms
    for (var i = 0; i < scheduleData.length; ++i) {
        if (scheduleData[i] == 'BYE') continue; // Skip if we have a bye
        ++count; // Increment count
        var home = teamMap.get(homeTeam(scheduleData[i]));
        var away = teamMap.get(awayTeam(scheduleData[i]));
        var form = document.createElement('form');  //creating element
        form.textContent = away + " at " + home;    //adding text on the element
        // Create Div for radio form
        var div1 = document.createElement('div');
        div1.innerHTML = "Who will win?";
        // Create winner selection in form
        // Label 1
        var winlabel1 = document.createElement("label");
        winlabel1.innerHTML = away;
        

        // Radio 1
        var winput1 = document.createElement("input");
        winput1.setAttribute('type', 'radio');
        winput1.setAttribute('name', 'winningteam');
        winput1.setAttribute('id', 'radio1_' + count);
        winput1.setAttribute('checked', 'true');
        
        div1.appendChild(document.createElement("br"));

        // Label 2
        var winlabel2 = document.createElement("label");
        winlabel2.innerHTML = home;

        // Radio 2
        var winput2 = document.createElement("input");
        winput2.setAttribute('type', 'radio');
        winput2.setAttribute('name', 'winningteam');
        winput2.setAttribute('id', 'radio2_' + count);
        winput2.setAttribute('checked', 'false');

        div1.appendChild(winlabel1);
        div1.appendChild(winput1);
        div1.appendChild(winlabel2);
        div1.appendChild(winput2);
        div1.appendChild(document.createElement("br"));

        form.appendChild(div1); // Done with Radio form
        

        // Create div for number input form
        var div2 = document.createElement('div');
        
        // Label
        var label = document.createElement("label");
        label.innerHTML = "What is your confidence rating?";
        

        // Input
        var input = document.createElement("input");
        input.setAttribute('type', 'number');
        input.setAttribute('name', 'confidence');
        input.setAttribute('id', 'conf_' + count);
        input.setAttribute('value', count);

        div2.appendChild(label);
        div2.append(document.createElement('br'));
        div2.appendChild(input);
        div2.append(document.createElement('br'));
        div2.append(document.createElement('br'));

        form.appendChild(div2); // Done with Number form
        
        div.appendChild(form); // Done with entire form for this game
    } // end for

    // Tiebreaker
    // Create div for tiebreaker input
    var div2 = document.createElement('div');
        
    // Label
    var label = document.createElement("label");
    label.innerHTML = "What will be the combined score of Monday Night's game?";
    

    // Input
    var input = document.createElement("input");
    input.setAttribute('type', 'number');
    input.setAttribute('id', 'tiebreaker');
    input.setAttribute('name', 'tie');
    input.setAttribute('value', '0');

    div2.appendChild(document.createElement("br"));
    div2.appendChild(document.createElement("br"));
    div2.appendChild(label);
    div2.appendChild(document.createElement("br"));
    div2.appendChild(input);

    div.appendChild(div2); // Done with Tiebreaker

    // Name
    // Create div for tiebreaker input
    var div3 = document.createElement('div');
        
    // Label
    var label = document.createElement("label");
    label.innerHTML = "What is your name?";
    

    // Input
    var input = document.createElement("input");
    input.setAttribute('type', 'text');
    input.setAttribute('id', 'name');
    input.setAttribute('name', 'name');

    div3.appendChild(document.createElement("br"));
    div3.appendChild(document.createElement("br"));
    div3.appendChild(label);
    div3.appendChild(document.createElement("br"));
    div3.appendChild(input);

    div.appendChild(div3); // Done with Name
}

function submit() {
    var name = document.getElementById('name').value;
    var tiebreak = document.getElementById('tiebreaker').value;
    if (!name) {alert("Insert a name"); return;}
    if (!tiebreak) {alert("Insert a tiebreaking score"); return;}
    var winList = [];

    // Create list to check confidence numbers
    var numList = [];
    for (var i = 0; i < count; ++i) numList.push(false);

    for (var i = 1; i <= count; ++i) {
        // Get values from document form
        var r1 = document.getElementById("radio1_" + i).checked;
        var r2 = document.getElementById("radio2_" + i).checked;
        if (!r1 && !r2) {
            alert("You forgot to check at least one game");
            return;
        }
        var c = document.getElementById("conf_" + i).value;
        if (c > count || c < 1) {
            alert("One or more of your confidence rankings are out of range");
            return;
        }
        numList[c - 1] = true; // Mark number as seen
        var gameBet = [r1 ? 0 : 1, c];
        winList.push(gameBet);
    } // end for
    
    // Check to make sure all numbers are used
    for (var i = 0; i < count; ++i) {
        if (!numList[i]) {
            alert("You did not choose confidence rankings correctly");
            return;
        }
    } // end for

    // Create bet out of the data
    var bet = {};
    bet.name = name;
    bet.tiebreak = tiebreak;
    bet.betList = winList;
    bet.week = getData() + 1;

    // Save JSON to file
    //requestWithoutAjax("savedata.php", bet);
    

    // Return to index page upon success
    alert("Submission successful!");
    window.location.href = "index.html";
}