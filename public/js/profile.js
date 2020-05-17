function main() {
  const profileId = window.location.search.substring(1);
  get('/api/user', {'_id': profileId}, function(profileUser) {
    renderUserData(profileUser);
  });
  get('/api/whoami', {}, function(user) {
    renderNavbar(user);
  });
}


// var items = Array("");


function timeDifference(current, previous) {
    
    var sPerMinute = 60;
    var sPerHour = sPerMinute * 60;
    var sPerDay = sPerHour * 24;
    var sPerMonth = sPerDay * 30;
    var sPerYear = sPerDay * 365;
    
    currentArr = current.split(/[\s:]+/, 3);
    previousArr = previous.split(/[\s:]+/, 3);

    for (var i = 0;i<3;i++){
      currentArr[i] = Number(currentArr[i]);
      previousArr[i] = Number(previousArr[i]);
    }

    if (current.slice(-2)=="AM" && currentArr[0]==12){
      currentArr[0]=0;
    }

    else if (current.slice(-2)=="PM" && currentArr[0]==12){
      currentArr[0]=12;
    }

    else if (current.slice(-2)=="PM"){
      currentArr[0]+=12;
    }



    currentSecs = currentArr[0]*3600 + currentArr[1]*60 + currentArr[2];
    previousSecs = previousArr[0]*3600 + previousArr[1]*60 + previousArr[2];


    var elapsed = currentSecs - previousSecs;
    if (elapsed<0){
      elapsed = currentSecs+3600*24 - previousSecs
    }




    if (elapsed < sPerMinute && Math.round(elapsed)==0) {
         return 'Just Now';   
    }

    else if (elapsed < sPerMinute && Math.round(elapsed)==1) {
         return Math.round(elapsed) + ' second ago';   
    }
    
    else if (elapsed < sPerMinute && Math.round(elapsed)>1) {
         return Math.round(elapsed) + ' seconds ago';   
    }

    
    else if (elapsed < sPerHour && Math.round(elapsed/sPerMinute)>1) {
         return Math.round(elapsed/sPerMinute) + ' minutes ago';   
    }

    else if (elapsed < sPerHour && Math.round(elapsed/sPerMinute)==1) {
         return Math.round(elapsed/sPerMinute) + ' minute ago';   
    }

     else{
      post('/api/report', {'_id' : current_id }, function(result) {
      console.log("HERE!!!!");

    });
  return '1 hour ago';
    }

}


function renderUserData(user) {


	// rendering name
	const nameContainer = document.getElementById('name-container');
	const nameHeader = document.createElement('h1');
	nameHeader.innerHTML = user.name;
	nameContainer.appendChild(nameHeader);

	// rendering profile image
	const profileImage = document.getElementById('profile-image');
	profileImage.style = 'background-image:url('+ user.image +')';
	console.log(user.image);

	const membersince = document.getElementById('member');
	membersince.innerHTML = 'Member Since: ' + user.created.substring(4, 10)+',' +user.created.substring(10, 15)+ ' ';
	// rendering latest post

  // const creatorSpan = document.createElement('a');
  // creatorSpan.className = 'story-creator card-title';
  // creatorSpan.innerHTML = user.name;
  // creatorSpan.setAttribute('href', '/u/profile?'+user._id);
  // latestPostCard.appendChild(creatorSpan);


	const latestPost = document.createElement('p');
	latestPost.className = 'story-content card-text';
	const mq = window.matchMedia( "(min-width: 500px)" );
	const mq2 = window.matchMedia( "(min-width: 1400px)" );

  get('/api/food', {}, function(FoodArr) {
	for (let j = FoodArr.length-1; j >=0; j--) {
		if(FoodArr[j].creator_id === user._id){
			
					const newCol = document.createElement('div');
					if (mq2.matches) {newCol.className = 'col-lg-4';}	
					else if (mq.matches){newCol.className = 'col-lg-6';}
					else{newCol.className = 'col-lg';}
					const activeCard = document.createElement('div');
					activeCard.className = "card-text-center";
					activeCard.style = "width: 18rem;"
					const activeCardBody = document.createElement('div');
					activeCardBody.className = "card-body";
					const activeCardBodyh5 = document.createElement('h5');
					activeCardBodyh5.className = "card-title";
					activeCardBodyh5.innerHTML = FoodArr[j].food_type + ' in ' + FoodArr[j].building + '-' + FoodArr[j].room;
					const activeCardBodyp = document.createElement('p');
					activeCardBodyp.className = "card-text";
					activeCardBodyp.innerHTML = timeDifference(new Date().toLocaleTimeString(),FoodArr[j].posting_time);
					const goButton = document.createElement('a');
					goButton.className = 'btn btn-primary';
					goButton.href='/';
					goButton.innerHTML='View Post';

					activeCardBody.appendChild(activeCardBodyh5);
					activeCardBody.appendChild(activeCardBodyp);
					activeCardBody.appendChild(goButton);
					activeCard.appendChild(activeCardBody);
					newCol.appendChild(activeCard);
					const activePosts = document.getElementById('active-posts');
					activePosts.appendChild(newCol);

		}
	}
});

}

main();



