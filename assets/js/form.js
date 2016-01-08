---
layout: null
---
 // process the form
$('#form').submit(function(event) {
	
	//disable the submit button and show spinning wheel
	$( "#loading" ).show( "slow", function() {
		// Animation complete.
	});

	//disable the input button by appending 'disabled' to the button
	$('#submit').prop('disabled', true);

	

	// get the form data
	// there are many ways to get this data using jQuery (you can use the class or id also)
	var formData = {
		'name'              : $('input[id=name]').val(),
		'email'             : $('input[id=email]').val(),
		'subject'           : $('input[id=subject]').val(),
		'message'           : $('textarea[id=message]').val()
	};

	// process the form
	$.ajax({
		type        : 'POST', // define the type of HTTP verb we want to use (POST for our form)
		{% if site.production %}
		url         : 'https://joshuazeitlinger.com/process.php', // the url where we want to POST
		{% else %}
		url         : 'http://staging.joshuazeitlinger.com/process.php', // the url where we want to POST
		{% endif %}
		data        : formData, // our data object
		dataType    : 'json', // what type of data do we expect back from the server
		encode          : true
	})
		// using the done promise callback
		.done(function(data) {

			// log data to the console so we can see
			console.log(data); 

			// here we will handle errors and validation messages
			if ( ! data.success) {
				
				//hide spinning wheel
				$( "#loading" ).hide( "slow", function() {
					// Animation complete.
				});

				//reenable the input button by unappending 'disabled' to the button
				$('#submit').prop('disabled', false);
		
				// handle errors for name ---------------
				if (data.errors.name) {
					//set the element active so the error message appears well formatted
					$("#name").siblings('label').addClass('active');
					//trigger the error message
					$("#name").addClass('invalid');
					
				}

				// handle errors for email ---------------
				if (data.errors.email) {
					
					//set the element active so the error message appears well formatted
					$("#email").siblings('label').addClass('active');
					//trigger the error message
					$("#email").addClass('invalid');
					
				}

				// handle errors for subject ---------------
				if (data.errors.subject) {
					
					//set the element active so the error message appears well formatted
					$("#subject").siblings('label').addClass('active');
					//trigger the error message
					$("#subject").addClass('invalid');
					
				}
				
				// handle errors for subject ---------------
				if (data.errors.message) {
					
					//set the element active so the error message appears well formatted
					$("#message").siblings('label').addClass('active');
					//trigger the error message
					$("#message").addClass('invalid');
					
				}

			} else {

				//Success
				$( "#incomplete" ).hide( "slow", function() {
					// Animation complete, open the other one
					$( "#complete" ).show( "slow", function() {
						// Animation complete.
					});
				});
				

			}
		});

	// stop the form from submitting the normal way and refreshing the page
	event.preventDefault();
});