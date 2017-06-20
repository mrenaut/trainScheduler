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
            console.log(nextArrival);
            
            if (convertedtrainTime >= currentTimeInMinutes) {
                nextArrival = trainTime; 
                minutesAway = convertedtrainTime - currentTimeInMinutes;

                }
                    
      
            if (convertedtrainTime < currentTimeInMinutes) {
                console.log("converted train time:" + convertedtrainTime);
                console.log("converted current time:" + currentTimeInMinutes);
                //get the difference in minutes, example 15min
                var nextArrivalCalc = currentTimeInMinutes - convertedtrainTime; 
                //divide the difference by the amount of minutes in frequency and get remainder
                var remainder = nextArrivalCalc%frequency;
                //subtract remainder from frequency and that should equal minutes away
                minutesAway = frequency - remainder;
                    
//==========================================================================================      
                unconvertedNextArrival = currentTimeInMinutes + minutesAway;
                console.log("unconverted next arrival in minutes: " + unconvertedNextArrival);
                convertingNextArrival = unconvertedNextArrival / 60;
                //take number in front of decimal and display in hours
                //+ modulus
                console.log("remainder after converting division: " + convertingNextArrival);
                
             
              //  nextArrival = 

              
                } 
//==========================================================================================    

               
            
            //adds information to database
            firebase.database().ref().push({
                  trainName: trainName,
                  destinationName: destinationName,
                  nextArrival: nextArrival,
                  frequency: frequency,
                  dateAdded:firebase.database.ServerValue.TIMESTAMP
            });
                      
            //calls clear form again after submit
            formClearing();
            
            

        });
        
          //gets information from database and displays in table
            firebase.database().ref().orderByChild("dateAdded").limitToLast(5).on("child_added", function(snapshot) {
                $("#table").append("<tr><td>" + 
                snapshot.val().trainName + "</td><td>" + snapshot.val().destinationName + "</td><td>" + snapshot.val().nextArrival + "</td><td>" + snapshot.val().frequency+ "</td><td>" + minutesAway + 
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
        
        
//gets current time
//=================================================================================================================
        
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