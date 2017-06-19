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
        
            
        
        

        //gets current time for minutes away function (military time)
        new Date($.now());
        var dt = new Date();
        var time = dt.getHours() + ":" + dt.getMinutes();
        console.log(time);

        //gets current time AM/PM (converted current time)
        var options = {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        };
        var timeString = dt.toLocaleString('en-US', options);
        console.log(timeString);


        //sets variables to change in database
       // var database = firebase.database();
        
        //Global Variables
        var trainName = "";
        var destinationName = "";
        var trainTime = "";
        var frequency = "";
        var minutesAway = "";


        //captures information from input sectoin when user hits the submit button      
        $(document).on("click", "#submitButton", function (event) {
            
            trainName = $("#trainInput").val().trim();
            destinationName = $("#destinationInput").val().trim();
            trainTime = $("#timeInput").val().trim();
            frequency = $("#frequencyInput").val().trim();

//              $("#table").append("<tr>" +
//                "<td>" + trainName + "</td>" +
//                "<td>" + destinationName + "</td>" +
//                "<td>" + trainTime + "</td>" +
//                "<td>" + frequency + "</td>" +
//                "<td>" + minutesAway + "</td>" +
//                "</tr>")
            
            event.preventDefault();
            //adds information to database
              firebase.database().ref().push({
                  trainName: trainName,
                  destinationName: destinationName,
                  trainTime: trainTime,
                  frequency: frequency,
                  dateAdded:firebase.database.ServerValue.TIMESTAMP
        });
            
          
            //calls clear form again after submit
            formClearing();
        });
        
          //gets information from database and displays in table
            firebase.database().ref().orderByChild("dateAdded").limitToLast(10).on("child_added", function(snapshot) {
                $("#table").append("<tr><td>" + 
                                   snapshot.val().trainName + "</td><td>" + snapshot.val().destinationName + "</td><td>" + snapshot.val().trainTime + "</td><td>" + snapshot.val().frequency+ "</td><td>" + "minutesAway" + 
                                   "</td><tr>" )
                              
            })

        //function to clear form again after submit           
        function formClearing() {

            $("#trainInput").val("");
            $("#destinationInput").val("");
            $("#timeInput").val("");
            $("#frequencyInput").val("");
        }
        
        
        
        
        
        //Firebase access section
        //===============================================================================================================

        
            
            var clickCounter = 0;

            
            
            
            
            
            
       // ===============================================================================================================

        //    $.ajax({
        //				url: queryURL,
        //				method: "GET"
        //			}).done(function(response) {



        //end of document ready function    
    });