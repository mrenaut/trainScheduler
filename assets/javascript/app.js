//
//<script src="https://www.gstatic.com/firebasejs/4.1.2/firebase.js"></script>
//<script>
//  // Initialize Firebase
//  // TODO: Replace with your project's customized code snippet
//  var config = {
//    apiKey: "<API_KEY>",
//    authDomain: "<PROJECT_ID>.firebaseapp.com",
//    databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
//    storageBucket: "<BUCKET>.appspot.com",
//    messagingSenderId: "<SENDER_ID>",
//  };
//  firebase.initializeApp(config);
//</script>


//
//<script src="https://www.gstatic.com/firebasejs/4.1.2/firebase-app.js"></script>
//<script src="https://www.gstatic.com/firebasejs/4.1.2/firebase-auth.js"></script>
//<script src="https://www.gstatic.com/firebasejs/4.1.2/firebase-database.js"></script>
//<script src="https://www.gstatic.com/firebasejs/4.1.2/firebase-messaging.js"></script>
//
//<!-- Leave out Storage -->
//<!-- <script src="https://www.gstatic.com/firebasejs/4.1.2/firebase-storage.js"></script> -->
//
//<script>
//  var config = {
//    // ...
//  };
//  firebase.initializeApp(config);
//</script>
//

// Document ready function 
$(document).ready(function() {

    
    //Global Variables
    var trainName = "";
    var destinationName = "";
    var trainTime = "";
    var frequency = "";
    var minutesAway = "";
    
  
    //add a table row when the user enters information then hits the submit button      
	$(document).on("click", "#submitButton", function(event) {
		event.preventDefault();
		trainName = $("#trainInput").val().trim();
		console.log("train name: " + trainName);
        destinationName = $("#destinationInput").val().trim();
        console.log("destination name: " + destinationName);
        trainTime = $("#timeInput").val().trim();
        console.log("train time: " + trainTime);
        frequency = $("#frequencyInput").val().trim();
		console.log("frequency: " + frequency);
        $("#table").append ("<tr>" +            
        "<td>" + trainName + "</td>" +
        "<td>" + destinationName + "</td>" +
        "<td>" + trainTime + "</td>" +
        "<td>" + frequency + "</td>" +
        "<td>" + minutesAway + "</td>" +
        "</tr>")         
        
        formClearing ();
          
	});
            

               
    function formClearing() {
        
      $("#trainInput").val("");
      $("#destinationInput").val("");
      $("#timeInput").val("");
      $("#frequencyInput").val("");
    }
    
   
//    $.ajax({
//				url: queryURL,
//				method: "GET"
//			}).done(function(response) {
    
    
    
//end of document ready function    
});