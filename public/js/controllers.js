angular.module('learnhubApp.controllers', []).
    controller('CourseController', function($scope, $http) {

        $http.get("allcourses2.csv").then(function(response){

            //Must save the csv again with utf8 format otherwise, an encoding bug happens
            keep working on learnhub mvp

            var csvData = CSVToArray(response.data, ",");
            //Create course object
            var courseObjs = [];

            for (var i = 1; i < csvData.length; i++) {
                var csv = csvData[i];
                courseObjs.push({
                    title: csv[0],
                    site: csv[1],
                    free: csv[2]
                });              
            }

            $scope.courses = courseObjs;
        });
        
        /*$scope.courses = $http.get("allcourses.csv").then(function(response){
            //var courses = CSVToArray(response.data, ",");
            //console.log(CSVToArray(response.data, ","))
            //return CSVToArray(response.data, ",");
            return [
                "OI"
            ]
        });*/

        $scope.courses = ["oi"];

        /*$scope.salary = 0;
        $scope.percentage = 0;
        $scope.result = function() {
            return $scope.salary * $scope.percentage * 0.01;
        };*/
});



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