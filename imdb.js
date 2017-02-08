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
		let req = new XMLHttpRequest(),
			method = "GET",
    		url = "http://www.omdbapi.com/?t=" + exampleInputAmount.value + "&y=&plot=short&r=json";
    	//tell the request object what method to use and url adress and query string 
    	//req.open('GET', 'https://www.omdbapi.com/?t=' + inputValue +'&y=&plot=short&r=json');
		req.open(method, url,true);

		//under line: wait the response from the server 
		req.onreadystatechange = function(){
			if(req.readyState === XMLHttpRequest.DONE && req.status === 200){
				spinner.style.display = "none";
				searchButton.disabled = false;
				let res = JSON.parse(req.responseText);
				//res.Actors;
				//console.log(res.Actors);
				let container = document.getElementById('responseContainer');

				while (container.firstChild){
					container.removeChild(container.firstChild);
				}

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


				let image = document.createElement('IMG'); // ->  <img >
				image.setAttribute("src", res.Poster);
				//image.setAttribute("width", "404");
    			//image.setAttribute("height", "528");
				
				container.appendChild(image);

			}
		}


        


		
		


		
		//send it over 
		req.send();
		//set the request header to only accept json response 
		//req.setRequestHeader("Accept", "application/json");
		
	})
	
})
