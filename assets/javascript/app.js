    // Document ready function 
    $(document).ready(function () {


        //  Initialize Firebase
        var config = {
            apiKey: "AIzaSyC908vOZuLJtdZtAKj-TXGDELfwGghBhcQ",
            authDomain: "trainscheduler-465b5.firebaseapp.com",
            databaseURL: "https://trainscheduler-465b5.firebaseio.com",
            projectId: "trainscheduler-465b5",
            storageBucket: "trainscheduler-465b5.appspot.com",
            messagingSenderId: "753403446140"
        };        
        firebase.initializeApp(config);
        
        //sets variables to change in database
        // var database = firebase.database();
        
        //Global Variables
        var trainName = "";
        var destinationName = "";
        var trainTime = "";
        var frequency = "";
        var minutesAway = "";
        var nextArrival = "";


        //captures information from input section when user hits the submit button      
        $(document).on("click", "#submitButton", function (event) {
            $("#trainInput").focus();            
            trainName = $("#trainInput").val().trim();
            destinationName = $("#destinationInput").val().trim();
            trainTime = $("#timeInput").val().trim();
            console.log("train time: " + trainTime);
            frequency = $("#frequencyInput").val().trim();
            
            event.preventDefault();
            
            //converts user's input time into minutes        
            var a = trainTime.split(':'); // split it at the colons
            var convertedtrainTime = (+a[0]) * 60 + (+a[1]);

            //determines if train time entered is after current time and calculates minutes away
            if (convertedtrainTime >= currentTimeInMinutes) {
                nextArrival = trainTime; 
                minutesAway = convertedtrainTime - currentTimeInMinutes;
            }
                    
            //determines if train time entered is before current time and calculates minutes away
            if (convertedtrainTime < currentTimeInMinutes) {
//==========================================================================================    
                //get the difference in minutes
                var nextArrivalCalc = currentTimeInMinutes - convertedtrainTime; 
                //divide the difference by the amount of minutes in frequency and get remainder
                var remainder = nextArrivalCalc%frequency;
                //subtracts remainder from frequency and to get minutes away
                minutesAway = frequency - remainder;
                
//==========================================================================================                    
                    
                //adds minutes away and current time
                unconvertedNextArrival = currentTimeInMinutes + minutesAway;
                console.log(unconvertedNextArrival);
                //divides minutes away combined with current time to determine next arrival time and break into hours
                convertingNextArrival = unconvertedNextArrival / 60;
                console.log(convertingNextArrival);
                
                //if convertingNextArrival is a whole number/integer take number and display in nextArrival hours section and add :00 to the minutes section                
                if (Number.isInteger(convertingNextArrival)) {
                    nextArrival = convertingNextArrival + ":00";
                }                 

                //if convertNextArrival is a float, need to take number after decimal only and multiply by 60 to convert to minutes and display in minutes section of nextArrival
                else{
                    console.log("not a whole number")
                    var decPart = "." + (convertingNextArrival+"").split(".")[1];
                    var intPart = (convertingNextArrival+"").split(".")[0];
                    console.log(intPart);
                    console.log(decPart);
                    decPartInMinutes = Math.round(decPart * 60);              
                    console.log(decPartInMinutes);
                    nextArrival = intPart + ":" + decPartInMinutes;
                }
                
            } 

            //adds information to database
            firebase.database().ref().push({
                  trainName: trainName,
                  destinationName: destinationName,
                  nextArrival: nextArrival,
                  frequency: frequency,
                  minutesAway: minutesAway,
                  dateAdded:firebase.database.ServerValue.TIMESTAMP
            });
                      
            //calls clear form again after submit
            formClearing();
            
        });
        
          //gets information from database and displays in table
            firebase.database().ref().orderByChild("dateAdded").limitToLast(5).on("child_added", function(snapshot) {
                $("#table").append("<tr><td>" + 
                snapshot.val().trainName + "</td><td>" + snapshot.val().destinationName + "</td><td>" + snapshot.val().nextArrival + "</td><td>" + snapshot.val().frequency + "</td><td>" + snapshot.val().minutesAway + 
                "</td><tr>" )
                })

        //function to clear form again after submit           
        function formClearing() {
            $("#trainInput").val("");
            $("#destinationInput").val("");
            $("#timeInput").val("");
            $("#frequencyInput").val("");
            }
        
   
 //if trainTime is ealier than now, subtract difference to find out how many minutes have passed since then
//if trainTime is later than now, calculate how many minutes are betweeen now and then
        
//take frequency and get modulus of frequency into time
//subtract modulus from frequency
//add difference to current time and update that info into variable   
        
      
        //gets current time for minutes away function (military time)
        new Date($.now());
        var dt = new Date();
        var time = dt.getHours() + ":" + dt.getMinutes();
        console.log(time);

        //converts today's time into minutes
        var currentTimeInMinutes= (dt.getHours() * 60) + dt.getMinutes();
        console.log(currentTimeInMinutes);
        
        
        //end of document ready function    
    });