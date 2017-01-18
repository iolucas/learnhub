var fs = require("fs");

var csv = fs.readFileSync("public/allcourses3.csv", 'utf-8');

var csvArray = CSVToArray(csv);


var titles = [];

for (var i = 1; i < csvArray.length; i++) {
    titles.push(csvArray[i][0]);            
}

var clusters = {}

//Get clusters
for (var i = 1; i < titles.length; i++) {
    var title = titles[i];

    //Split title
    var titleSplit = title.split(" ");

    for (var j = 1; j < titleSplit.length; j++) {
        var titleWord = titleSplit[j];

        if(clusters[titleWord])
            clusters[titleWord]++;
        else
            clusters[titleWord] = 1;    
    }
}

//Sorte clusters
clustersSorted = [];

for(var word in clusters) {
    clustersSorted.push({
        word: word,
        qty: clusters[word]
    });
}

clustersSorted = clustersSorted.sort(function(a, b) {
    return a.qty - b.qty;
});

console.log(clustersSorted);







//Create course object
/*var courseObjs = [];

for (var i = 1; i < csvArray.length; i++) {
    var csv = csvArray[i];
    
    //If the row is invalid, clear it
    if(csv[1] == undefined)
        continue;
        
    courseObjs.push({
        title: csv[0],
        site: csv[1],
        free: csv[2]
    });                 
}*/



/*var lengths = [];

for(var i = 0; i < csvArray.length; i++) {
    var data = csvArray[i];

    if(lengths[data.length.toString()])
        lengths[data.length.toString()]++;
    else
        lengths[data.length.toString()] = 1;    

}*/


function CSVToArray(strData, strDelimiter) {
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