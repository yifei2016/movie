window.addEventListener('load',function(event){
	let searchButton = document.getElementById("searchButton");
	let exampleInputAmount=document.getElementById("exampleInputAmount");
	let spinner = document.getElementById("spinner");
	spinner.style.display = "none";
	searchButton.addEventListener('click',function(event){
		event.target.disabled = true;
		spinner.style.display = "block";
		let exampleInputAmount=document.getElementById("exampleInputAmount");
		let inputValue = exampleInputAmount.value;
		/*
		 	make request to backend/server 
		 	url: http://www.omdbapi.com/
		 	method: GET
		 	query: t: 'movie_title', r: 'json'
		 */
		 //initialize a request object that is a Ajax
		let req = new XMLHttpRequest();
		//under line: wait the response from the server 
		req.onreadystatechange = function(event) {
			if( req.readyState == 4 ) {
				spinner.style.display = "none";
				searchButton.disabled = false;
				let container = document.getElementById('responseContainer');
				while (container.firstChild) {
 			  	 	container.removeChild(container.firstChild);
				}

				let res = JSON.parse(req.responseText);
				
				//console.log("success"); on the console you will see this message
				let div = document.createElement('div');// <div></div>
				
				
				let data = '<p><span class="pull-right">'+ res.Title +'</span><span>Title</span></p>'
				+ '<p><span class="pull-right">'+ res.Released +'</span><span>Released</span></p>'
				+ '<p><span class="pull-right">'+ res.imdbRating +'</span><span>Rating</span></p>'
				+ '<p><span class="pull-right">'+ res.Director +'</span><span>Director</span></p>'
				+ '<p><span class="pull-right">'+ res.Country +'</span><span>Country</span></p>'
				+ '<p><span class="pull-right">'+ res.Genre +'</span><span>Genre</span></p>'
				+ '<p><span class="pull-right">'+ res.Actors +'</span><span>Actors</span></p>';
				div.innerHTML = data;
				container.appendChild(div);

			} 
				
				
		};
		//tell the request object method to use and url adress and query string 
		req.open('GET', 'https://www.omdbapi.com/?t=' + inputValue +'&y=&plot=short&r=json');
		//set the request header to only accept json response 
		req.setRequestHeader("Accept", "application/json");
		//send it over 
		req.send();
	})
	
})
