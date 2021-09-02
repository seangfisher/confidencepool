// All bets
var betList = [];

const tuesdays = [[9, 14], [9, 21], [9, 28], [10, 5],
[10, 12], [10, 19], [10, 26], [11, 2], [11, 9],
[11, 16], [11, 23], [11, 30], [12, 7], [12, 14],
[12, 21], [12, 28], [1, 4], [1, 11]];


// Const schedule for games -- Last is MNF
const schedule = [["DAL@TB", "JAX@HOU", "LAC@WAS", "SEA@IND", "NYJ@CAR", "MIN@CIN", "ARI@TEN", "SF@DET", "PIT@BUF", "PHI@ATL", "CLE@KC", "GB@NO", "DEN@NYG", "MIA@NE", "CHI@LAR", "BAL@LV"],
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

// Gets index of week that is in play
function getData() {
    var hoy = new Date(); // Today and Now
    var idx = 0; // Week of data
    var earliest = new Date(2021, 9, 4, 0, 0).getTime();
    if (hoy.getTime() < earliest) {
        console.log("The season has not started yet");
        return 0;
    }
    for (var i = 0; i < tuesdays.length; ++i) {
        var tues = new Date(tuesdays[i][0] != 1 ? 2021 : 2022, tuesdays[i][0] - 1, tuesdays[i][1], 0, 0);
        if (hoy.getTime() > tues.getTime()) {
            idx = i;
            break;
        } // end if
        if (i == tuesdays.length - 1) {
            idx = -1;
            console.log("Something went wrong with the date");
        } // end if
    } // end for
    return idx;
}

function awayTeam(str) {
    return str.substring(0, str.indexOf('@'));
}

function homeTeam(str) {
    return str.substring(str.indexOf('@') + 1);
}

// Called on load of page
function startup() {
    var idx = getData();
    var scheduleData = schedule[idx];
    document.getElementById("week").innerHTML = "Week " + (idx + 1);
    var div = document.getElementById("forms");

    for (var i = 0; i < scheduleData.length; ++i) {
        if (scheduleData[i] == 'BYE') continue; // Skip if we have a bye
        ++count; // Increment count
        var home = teamMap.get(homeTeam(scheduleData[i]));
        var away = teamMap.get(awayTeam(scheduleData[i]));
        var form = document.createElement('form');  //creating element
        form.setAttribute('id', 'form_' + count);
        form.textContent = away + " at " + home;    //adding text on the element
        // Create Div for radio form
        var div1 = document.createElement('div');
        div1.innerHTML = "Who won?";
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
        div1.appendChild(document.createElement("br"));

        form.appendChild(div1); // Done with Radio form

        div.appendChild(form); // Done with entire form for this game
    } // end for

    // Tiebreaker
    // Create div for tiebreaker input
    var div2 = document.createElement('div');
    div2.setAttribute('id', 'tiebreakdiv');

    // Label
    var label = document.createElement("label");
    label.innerHTML = "What was the combined score of Monday Night's game?";


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


}

// Called upon clicking report button
function report() {
    // Confirmation Dialogue
    var confirm = window.prompt("Type \'Yes\' to calculate scores for the week", "");
    if (confirm != 'Yes') return;
    // Function setup
    var idx = getData();
    var winList = {};
    winList.wins = [];
    winList.mnf = 0;
    var tiebreak = document.getElementById('tiebreaker').value;
    if (!tiebreak) { alert("Insert a tiebreaking score"); return; }

    betList = []; // TODO: Load from file somewhere

    // Experiment territory
    var bet = {};
    bet.name = "Sean";
    bet.tiebreak = 0;
    bet.betList = []; for (var i = 0; i < count; ++i) bet.betList.push([0, i + 1]);
    bet.week = 1;

    betList.push(bet);

    var bet = {};
    bet.name = "Nick";
    bet.tiebreak = 0;
    bet.betList = []; for (var i = 0; i < count; ++i) bet.betList.push([1, 1]);
    bet.week = 1;

    betList.push(bet);

    var bet = {};
    bet.name = "Shu";
    bet.tiebreak = 3;
    bet.betList = []; for (var i = 0; i < count; ++i) bet.betList.push([1, 1]);
    bet.week = 1;

    betList.push(bet);

    var bet = {};
    bet.name = "Dylan";
    bet.tiebreak = 25;
    bet.betList = []; for (var i = 0; i < count; ++i) bet.betList.push([1, 1]);
    bet.betList[0] = [0, 25];
    bet.week = 1;

    betList.push(bet);

    // Experiment end
    
    
    // Populate winList
    for (var i = 1; i <= count; ++i) {
        // Get values from document form
        var r1 = document.getElementById("radio1_" + i).checked;
        var r2 = document.getElementById("radio2_" + i).checked;
        if (!r1 && !r2) {
            alert("You forgot to check at least one game");
            return;
        }
        winList.wins.push(r1 ? 0 : 1); // If away team won, true, else false
    } // end for

    winList.mnf = document.getElementById('tiebreaker').value;
    // End Populate winList

    // Rank bets
    var sortedbets = rankWinners(idx, winList);
    var div = document.getElementById("forms");

    // Show ranked bets, find winner
    sortedbets.forEach(function callback(value, index) {
        var div1 = document.createElement("div");
        var [pts, tie] = calcPoints(value, winList);
        div1.innerHTML = `${index + 1}: ${value.name} with  ${pts}  points`;
        console.log(`${index} : ${value.name} : ${pts} : ${tie}`);
        div.appendChild(div1);
    });

    var div1 = document.createElement("div");
    div1.innerHTML = `$${sortedbets.length * 2} goes to the winner!`;
    div.appendChild(document.createElement("br"));
    div.appendChild(div1);

    // Delete reporting forms
    for (var i = 1; i <= count; ++i) {
        // Get values from document form
        var form = document.getElementById("form_" + i);
        form.parentNode.removeChild(form);

    } // end for
    var tbdiv = document.getElementById("tiebreakdiv");
    tbdiv.parentNode.removeChild(tbdiv);
    // End delete reporting forms

    // TODO: Save sortedbets to a file as winners of last week (for display on front page)

}

function calcPoints(bet, winningList) {
    var pts = 0;
    var gameBetsList =  bet.betList;
    for (var i = 0; i < gameBetsList.length; ++i) {
        if (gameBetsList[i][0] == winningList.wins[i])
            pts += gameBetsList[i][1];
    } // end for
    var tie = Math.abs(bet.tiebreak - winningList.mnf);
    return [pts, tie];
}

function rankWinners(week, winningList) {
    // Getting list of bets for the week
    var weekList = [];
    betList.forEach(bet => {
        if (bet.week == week + 1) weekList.push(bet);
    });

    weekList.sort(compareBets(winningList));

    return weekList;
}

// Custom bet comparison function
function compareBets(winningList) {
    return function (first, second) {
        [pts1, tie1] = calcPoints(first, winningList);
        [pts2, tie2] = calcPoints(second, winningList);
        console.log(first.name + " " + pts1);
        console.log(second.name + " " + pts2);
        if (pts1 > pts2) {
            return -1;
        } else if (pts1 < pts2) {
            return 1;
        } else if (pts1 == pts2) {
            if (tie1 < tie2) {
                return -1;
            } else if (tie1 > tie2) {
                return 1;
            } else if (tie1 == tie2) {
                console.log("We have a tie!"); // Record ties
                return 0;
            }
        }
        return 0;
    }
}