// populating the buttons and questions modified from https://codepen.io/danubevictoria/pen/WObGGQ
// five button options appear, clicking them adds to a visible score

var score = 0;
var numOfQuestions = 5;

var prompts = [
    {
        question: "one",
        completion: false
    },
    {
        question: "two",
        completion: false
    },
    {
        question: "three",
        completion: false
    },
    {
        question: "four",
        completion: false
    },
    {
        question: "five",
        completion: false
    }
]

var options = [
    {
        title: "strongly-disagree",
        value: 1
    },
    {
        title: "disagree",
        value: 2
    },
    {
        title: "neutral",
        value: 3
    },
    {
        title: "agree",
        value: 4
    },
    {
        title: "strongly-agree",
        value: 5
    }
]

function createOptions(){
    for (i = 0; i < numOfQuestions; i++){

        var question = document.createElement('h2');
        question.className = 'question';
        var question_text = document.createTextNode(prompts[i].question);
        question.appendChild(question_text);

        document.getElementsByClassName('prompts')[0].appendChild(question);

        // creates div for each button row
        var group = document.createElement('div');
        group.className = 'btn-group'+[i];

        for (j = 0; j < options.length; j++) {
            // adds each individual button to this div

            var btn_group = document.createElement('div');
            btn_group.className = "button"; // "button"+[j];
            
            var button = document.createElement('button');

            var buttonTitle = options[j].title.replace(/-|\s/g," "); // replace hyphen in strongly-(dis)agree with space
            var button_text = document.createTextNode(buttonTitle); // between <button></button>
            button.appendChild(button_text); // add between text to button

            button.className = 'group' + i + ' value-btn btn ' + options[j].title; // class=""
            button.id = 'inactive';

            // onclick function
            button.onclick = (function(a, b) {
                var groupNum = a;
                var optionChosen = b;
                return function() {
                    optionClicked(groupNum, optionChosen);
                }
            })('group'+i, options[j].title);
            
            btn_group.appendChild(button); // put button in button group
            group.appendChild(btn_group); // put button group in group

            document.getElementsByClassName('prompts')[0].appendChild(group);
		}
    }
}

// populate the screen with questions and buttons
createOptions();

// return the option value for selected option
function getOptionValue(optionChosen){
    for(i = 0; i < options.length; i++){
        if(optionChosen == options[i].title){
            return options[i].value;
        }
    }
    return 0;
}

// checks if any other buttons in the button group have been selected
// if so, deselect them and remove their scores
function otherOptionsRemove(groupNum, optionChosen){
    
}

// on button click, call this function
// give this function the button group number and value e.g. group0 agree
function optionClicked(groupNum, optionChosen){

    console.log(groupNum+" "+optionChosen+" clicked");

    // 
    var pointsToRemove = 0;
    var totalScore = document.getElementById('totalScore').textContent;
    totalScore = parseInt(totalScore);

    // remove any other selected buttons 'selection'
    // find if any for that group have :active in classname and remove active 
    // and any other selected buttons scores
    for(var i = 0; i < numOfQuestions; i++){
        var statusCheck = document.getElementsByClassName(groupNum+' value-btn btn '+options[i].title);
        console.log(statusCheck[0].id);
        if(statusCheck[0].id === 'active'){
            statusCheck[0].id = 'inactive';
            // remove points
            pointsToRemove = options[i].value;
            totalScore = totalScore - pointsToRemove;
        }
    }
    
    // make that button 'selected'
    // add active to id
    document.getElementsByClassName(groupNum+' value-btn btn '+optionChosen)[0].id = 'active';

    // add to score
    var points = getOptionValue(optionChosen);
    totalScore = totalScore + points;
    document.getElementById('totalScore').textContent = totalScore;
}