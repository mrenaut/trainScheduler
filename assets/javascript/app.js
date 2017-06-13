// Document ready function 
$( document ).ready(function() {
    console.log( "ready!" );
    
    
    
    //Function for displaying actor buttons
	function tableInsert() {

		// Deletes content in button section to avoid repeat buttons        
		$('#buttonsSection').empty();

	//For loop to create a button for each of the actors listed in the array
	for (var i=0; i<actors.length; i++) {
		var b = $('<button>');
		b.addClass("actor");
		b.attr("data-name", actors[i]); 
		b.text(actors[i]);
		$("#buttonsSection").append(b);
		}
	}
    
    
    
    
    
    
    
    
//    $.ajax({
//				url: queryURL,
//				method: "GET"
//			}).done(function(response) {
    
    
    
    
    
    
    
    
});