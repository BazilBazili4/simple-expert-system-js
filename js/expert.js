
let knowledgeBase;
let currentRule;


function getKnowlegeArray() {
    let database = document.getElementById('database');
    knowlegeBase = CSVToArray(database.value); 
    currentRule = getInitialRule(knowledgeBase);
    console.log(currentRule);
}

function getInitialRule(knowlegeBase) {
    return knowlegeBase[0];
}

function getRuleName(knowledgeRule) {
    return knowledgeRule[0];
}

function getQuestionText(knowledgeRule) {
    return knowledgeRule[1];
}
function getNextYesRuleName(knowledgeRule) {
    return knowledgeRule[2];
}
function getNextNoRuleName(knowledgeRule) {
    return knowledgeRule[3];
}

function findRuleByName(knowledgeBase, name) {
    return knowledgeBase.find(
        (rule) => {
            return getRuleName(rule) == name;
        }
    );
}

function setQuestionText(questionText) {
    let question = document.getElementById('questionText');
    question.innerHTML = questionText;
}

function isTerminalRule(ruleName) {
    ruleName = ruleName.split('-')[0];
    return ruleName == 'результат';
}

function getResult(ruleName) {
    ruleName = ruleName.split('-')[1];
    return ruleName;
}

function checkAnswer() {
    theTarget = event.target;
    let answer = theTarget.getAttribute('data-answer');
    let nextRuleName = '';
    if (answer == 1) {
        nextRuleName = getNextYesRuleName(currentRule);

    } else {
        nextRuleName = getNextNoRuleName(currentRule);
    }
    if (isTerminalRule(nextRuleName)) {
        setResultText(getResult(nextRuleName));
        hideQuestions();
        showResult();
    } else {
        currentRule = findRuleByName(knowledgeBase, nextRuleName);
        setQuestionText(getQuestionText(currentRule));   
    }
}



function CSVToArray( strData, strDelimiter ){
    // Check to see if the delimiter is defined. If not,
    // then default to comma.
    strDelimiter = (strDelimiter || ",");
    // Create a regular expression to parse the CSV values.
    var objPattern = new RegExp(
        (
            // Delimiters.
            "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
            // Quoted fields.
            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
            // Standard fields.
            "([^\"\\" + strDelimiter + "\\r\\n]*))"
        ),
        "gi"
        );
    // Create an array to hold our data. Give the array
    // a default empty first row.
    var arrData = [[]];
    // Create an array to hold our individual pattern
    // matching groups.
    var arrMatches = null;
    // Keep looping over the regular expression matches
    // until we can no longer find a match.
    while (arrMatches = objPattern.exec( strData )){
        // Get the delimiter that was found.
        var strMatchedDelimiter = arrMatches[ 1 ];
        // Check to see if the given delimiter has a length
        // (is not the start of string) and if it matches
        // field delimiter. If id does not, then we know
        // that this delimiter is a row delimiter.
        if (
            strMatchedDelimiter.length &&
            strMatchedDelimiter !== strDelimiter
            ){
            // Since we have reached a new row of data,
            // add an empty row to our data array.
            arrData.push( [] );

        }
        var strMatchedValue;
        // Now that we have our delimiter out of the way,
        // let's check to see which kind of value we
        // captured (quoted or unquoted).
        if (arrMatches[ 2 ]){
            // We found a quoted value. When we capture
            // this value, unescape any double quotes.
            strMatchedValue = arrMatches[ 2 ].replace(
                new RegExp( "\"\"", "g" ),
                "\""
                );
        } else {
            // We found a non-quoted value.
            strMatchedValue = arrMatches[ 3 ];

        }
        // Now that we have our value string, let's add
        // it to the data array.
        arrData[ arrData.length - 1 ].push( strMatchedValue );
    }
    // Return the parsed data.
    return( arrData );
}

function showQuestions() {
    let questions = document.getElementById('questions');
    questions.setAttribute('style', 'display: block');
}
function hideQuestions() {
    let questions = document.getElementById('questions');
    questions.setAttribute('style', 'display: none');
}
function setResultText(text) {
    let question = document.getElementById('resultText');
    question.innerHTML = text;
}
function showResult() {
    let questions = document.getElementById('result');
    questions.setAttribute('style', 'display: block');
}
function hideResult() {
    let questions = document.getElementById('result');
    questions.setAttribute('style', 'display: none');
}
function hideOpening() {
    let questions = document.getElementById('opening');
    questions.setAttribute('style', 'display: none');   
}

function reset() {
    currentRule = getInitialRule(knowledgeBase);
    hideResult();
    showQuestions();
    setQuestionText(getQuestionText(currentRule));

}

function setDatabase(text) {
    let database = document.getElementById('database');
    database.value = text;
    knowledgeBase = CSVToArray(text);
    currentRule = getInitialRule(knowledgeBase);
    hideOpening();
    showQuestions();
    setQuestionText(getQuestionText(currentRule));
}

function openFile() {
    let fileForm = document.getElementById('get_the_file');
    var file_to_read = fileForm.files[0];
    var fileread = new FileReader();
    var data;
    result = fileread.onload = function(e) {
        var content = e.target.result;
        // var intern = JSON.parse(content);
        setDatabase(content);
        // createListFromFile(setFeatureFromJson(intern));
    };
    fileread.readAsText(file_to_read);
    return data;

}