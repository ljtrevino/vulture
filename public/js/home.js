$(function() {
    $('.pop').on('click', function() {
      $('.imagepreview').attr('src', $(this).find('img').attr('src'));
      $('#imagemodal').modal('show');   
    });   
});


// GET USER LOCATION!!!!

var user_latitude = null;
var user_longitude = null;

function geoFindMe() {

//setTimeout(geoFindMe, 30000);

  var output = document.getElementById("location-button");

  if (!navigator.geolocation){
    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    return;
  }

  function success(position) {
    var user_latitude  = position.coords.latitude;  //current latitude
    var user_longitude = position.coords.longitude; //current longitude
    
    //Place marker @ current location
    

 var user_location_marker = new google.maps.Marker({
    position: {lat: user_latitude, lng: user_longitude},
    map: map,
    title: 'User_Location',
   icon: 'https://png.icons8.com/color/50/000000/define-location.png', //https://image.ibb.co/gH3cGw/icons8_map_pin_55.png === pin img
   optimized: false,
   zIndex:1000
  });
    
    //Update button success
    
    output.innerHTML = "Location Updated"

    
  }

  function error() {
    output.innerHTML = "Unable to retrieve your location";
  }

  output.innerHTML = "Locating…";

  navigator.geolocation.getCurrentPosition(success, error);
}

/////////////////////////////////////////////////////////////////////////////////////

var map;

function initMap() {
console.log(new Date());

setTimeout(initMap, 60000);
geoFindMe(); //reinitializes map but removes current location

  var mapOptions = {
    center: {lat: 42.360, lng: -71.0902},
          zoom: 16,
    styles: [
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "landscape.man_made",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#999999"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.business",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#c1bcbf"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#b4f2ec"
      }
    ]
  }
]
  };
map = new google.maps.Map(document.getElementById('map'),
      mapOptions);
  


// function timeSince(timeStamp) {
//     var now = new Date(),
//         secondsPast = (now.getTime() - timeStamp.getTime() ) / 1000;
//     if(secondsPast < 60){
//         return parseInt(secondsPast) + 's';
//     }
//     if(secondsPast < 3600){
//         return parseInt(secondsPast/60) + 'm';
//     }
//     if(secondsPast <= 86400){
//         return parseInt(secondsPast/3600) + 'h';
//     }
//     if(secondsPast > 86400){
//           day = timeStamp.getDate();
//           month = timeStamp.toDateString().match(/ [a-zA-Z]*/)[0].replace(" ","");
//           year = timeStamp.getFullYear() == now.getFullYear() ? "" :  " "+timeStamp.getFullYear();
//           return day + " " + month + year;
//     }
// }


function timeDifference(current, previous, current_id) {
    
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
      

    });
  return '1 hour ago';
    }

}


  //ADD GOOGLE MAPS MARKERS HERE

    // use the GET function from ./public/js/api.js
    get('/api/food', {}, function(foodJSON) {
     

        foodJSON.forEach(function(foodJSON) {

        the_food_type = foodJSON.food_type;
        console.log(the_food_type);


var markerImage = new google.maps.MarkerImage('https://image.ibb.co/hSBuUG/icons8_0_percent_55_5.png', //green equivalent:  https://image.ibb.co/bWiPUG/icons8_0_percent_55_2.png
                new google.maps.Size(55, 55),                                                          //grey only equivalent: https://image.ibb.co/fY3DOb/icons8_0_percent_55_4.png
                new google.maps.Point(0, 0),
                new google.maps.Point(27.5, 27.5));

let google_marker = new google.maps.Marker({


                icon: markerImage,
                position: {lat: foodJSON.latitude, lng: foodJSON.longitude},
                map: map,
                optimized: false,
                zIndex:-100
            });
   ///////////     



////////////////////////////////////////////////////////////////////////////      PIZZA      /////////////////////////////////////////////////////////////////////////////
if (the_food_type == "Pizza"){

  var markerImage2 = new google.maps.MarkerImage('https://png.icons8.com/color/40/000000/pizza.png',
                new google.maps.Size(40, 45),
                new google.maps.Point(0, 0),
                new google.maps.Point(20, 22.5));

            let google_marker = new google.maps.Marker({

                //PIZZA ICON
                icon: markerImage2,
                position: {lat: foodJSON.latitude, lng: foodJSON.longitude},
                map: map,
                optimized: false,
                zIndex:100
            });

                google_marker.addListener('click', function() {
                        
                        if(foodJSON.food_image.length>=1){
                  const current_image_url = "https://s3.amazonaws.com/vulture-food-photos/" + foodJSON.food_image.substring(12);
                        const picture = document.getElementById('foodphotooncard');
                        picture.src = current_image_url;
                        }
                else{
                  const current_image_url = "https://s3.amazonaws.com/vulture-food-photos/defaultvulture.png";
                        const picture = document.getElementById('foodphotooncard');
                        picture.src = current_image_url;
                }

                        const current_id = foodJSON._id;
                        const current_title = document.getElementById('currentcardtitle');
                        current_title.innerHTML = foodJSON.food_type + " at " + foodJSON.building+"-"+foodJSON.room;
                        const current_quantity = document.getElementById('current-quantity');
                        current_quantity.innerHTML = "Quantity: "+ foodJSON.quantity;
                        const current_vendor = document.getElementById('current-vendor');
                        current_vendor.innerHTML = "Vendor: "+ foodJSON.vendor;
                        const current_notes = document.getElementById('current-notes');
                        current_notes.innerHTML = "Notes: "+ foodJSON.notes;
                        const current_time = document.getElementById('current-time');
                        timeDiff = timeDifference(new Date().toLocaleTimeString(),foodJSON.posting_time, current_id);
                        current_time.innerHTML = timeDiff;
                        document.getElementById('current-distance').innerHTML = ""
                        
function getLocation() {
  navigator.geolocation.getCurrentPosition(
            function(position) {
                var latLngA = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
                var latLngB = new google.maps.LatLng(foodJSON.latitude, foodJSON.longitude);
                var distance = google.maps.geometry.spherical.computeDistanceBetween(latLngA, latLngB);
                document.getElementById('current-distance').innerHTML = "Distance: " + Math.round(distance)+ " meters";
            },
    );
}


getLocation();


                        
    
                        document.getElementById("reportBtn").addEventListener("click", function(){
                                post('/api/report', {'_id' : current_id }, function(result) {});
                                      location.reload();
                        });
                });

    }
////////////////////////////////////////////////////////////////////////////      PIZZA  END    /////////////////////////////////////////////////////////////////////////////
 
////////////////////////////////////////////////////////////////////////////      Burger      /////////////////////////////////////////////////////////////////////////////
else if (the_food_type.includes("Burgers") || the_food_type.includes("Hamburgers") || the_food_type.includes("burgers") || the_food_type.includes("hamburgers") || the_food_type.includes("sandwich") || the_food_type.includes("Sandwich")){
            var markerImage2 = new google.maps.MarkerImage('https://png.icons8.com/color/40/000000/hamburger.png',
                new google.maps.Size(40, 45),
                new google.maps.Point(0, 0),
                new google.maps.Point(20, 22.5));

            let google_marker = new google.maps.Marker({

                // ICON
                icon: markerImage2,
                position: {lat: foodJSON.latitude, lng: foodJSON.longitude},
                map: map,
                optimized: false,
                zIndex:100
            });

                google_marker.addListener('click', function() {

                       if(foodJSON.food_image.length>=1){
                  const current_image_url = "https://s3.amazonaws.com/vulture-food-photos/" + foodJSON.food_image.substring(12);
                        const picture = document.getElementById('foodphotooncard');
                        picture.src = current_image_url;
                        }
                else{
                  const current_image_url = "https://s3.amazonaws.com/vulture-food-photos/defaultvulture.png";
                        const picture = document.getElementById('foodphotooncard');
                        picture.src = current_image_url;
                }
   
                        const current_id = foodJSON._id;
                        const current_title = document.getElementById('currentcardtitle');
                        current_title.innerHTML = foodJSON.food_type + " at " + foodJSON.building+"-"+foodJSON.room;
                        const current_quantity = document.getElementById('current-quantity');
                        current_quantity.innerHTML = "Quantity: "+ foodJSON.quantity;
                        const current_vendor = document.getElementById('current-vendor');
                        current_vendor.innerHTML = "Vendor: "+ foodJSON.vendor;
                        const current_notes = document.getElementById('current-notes');
                        current_notes.innerHTML = "Notes: "+ foodJSON.notes
                        const current_time = document.getElementById('current-time');
                        timeDiff = timeDifference(new Date().toLocaleTimeString(),foodJSON.posting_time, current_id);
                        current_time.innerHTML = timeDiff;
                        document.getElementById('current-distance').innerHTML = ""
                        
function getLocation() {
  navigator.geolocation.getCurrentPosition(
            function(position) {
                var latLngA = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
                var latLngB = new google.maps.LatLng(foodJSON.latitude, foodJSON.longitude);
                var distance = google.maps.geometry.spherical.computeDistanceBetween(latLngA, latLngB);
                document.getElementById('current-distance').innerHTML = "Distance: " + Math.round(distance)+ " meters";
            },
    );
}


getLocation();
    
                        document.getElementById("reportBtn").addEventListener("click", function(){
                                post('/api/report', {'_id' : current_id }, function(result) {});
                                      location.reload();
                        });
                });

    }
////////////////////////////////////////////////////////////////////////////      Burger  END    /////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////      Salad      /////////////////////////////////////////////////////////////////////////////
else if (the_food_type.includes("Salad") || the_food_type.includes("salad") || the_food_type.includes("lettuce") || the_food_type.includes("Lettuce")){
            var markerImage2 = new google.maps.MarkerImage('https://png.icons8.com/color/40/000000/lettuce.png',
                new google.maps.Size(40, 45),
                new google.maps.Point(0, 0),
                new google.maps.Point(20, 22.5));

            let google_marker = new google.maps.Marker({

                // ICON
                icon: markerImage2,
                position: {lat: foodJSON.latitude, lng: foodJSON.longitude},
                map: map,
                optimized: false,
                zIndex:100
            });

                google_marker.addListener('click', function() {

                 if(foodJSON.food_image.length>=1){
                  const current_image_url = "https://s3.amazonaws.com/vulture-food-photos/" + foodJSON.food_image.substring(12);
                        const picture = document.getElementById('foodphotooncard');
                        picture.src = current_image_url;
                        }
                else{
                  const current_image_url = "https://s3.amazonaws.com/vulture-food-photos/defaultvulture.png";
                        const picture = document.getElementById('foodphotooncard');
                        picture.src = current_image_url;
                }
   
                        const current_id = foodJSON._id;
                        const current_title = document.getElementById('currentcardtitle');
                        current_title.innerHTML = foodJSON.food_type + " at " + foodJSON.building+"-"+foodJSON.room;
                        const current_quantity = document.getElementById('current-quantity');
                        current_quantity.innerHTML = "Quantity: "+ foodJSON.quantity;
                        const current_vendor = document.getElementById('current-vendor');
                        current_vendor.innerHTML = "Vendor: "+ foodJSON.vendor;
                        const current_notes = document.getElementById('current-notes');
                        current_notes.innerHTML = "Notes: "+ foodJSON.notes
                        const current_time = document.getElementById('current-time');
                        timeDiff = timeDifference(new Date().toLocaleTimeString(),foodJSON.posting_time, current_id);
                        current_time.innerHTML = timeDiff;
                        document.getElementById('current-distance').innerHTML = ""
                        
function getLocation() {
  navigator.geolocation.getCurrentPosition(
            function(position) {
                var latLngA = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
                var latLngB = new google.maps.LatLng(foodJSON.latitude, foodJSON.longitude);
                var distance = google.maps.geometry.spherical.computeDistanceBetween(latLngA, latLngB);
                document.getElementById('current-distance').innerHTML = "Distance: " + Math.round(distance)+ " meters";
            },
    );
}


getLocation();
    
                        document.getElementById("reportBtn").addEventListener("click", function(){
                                post('/api/report', {'_id' : current_id }, function(result) {});
                                      location.reload();
                        });
                });

    }
////////////////////////////////////////////////////////////////////////////      Salad  END    /////////////////////////////////////////////////////////////////////////////
 
////////////////////////////////////////////////////////////////////////////      Taco      /////////////////////////////////////////////////////////////////////////////
else if (the_food_type.includes("Taco") || the_food_type.includes("taco") || the_food_type.includes("mexican")){
            var markerImage2 = new google.maps.MarkerImage('https://png.icons8.com/color/40/000000/taco.png',
                new google.maps.Size(40, 45),
                new google.maps.Point(0, 0),
                new google.maps.Point(20, 22.5));

            let google_marker = new google.maps.Marker({

                // ICON
                icon: markerImage2,
                position: {lat: foodJSON.latitude, lng: foodJSON.longitude},
                map: map,
                optimized: false,
                zIndex:100
            });

                google_marker.addListener('click', function() {

                 if(foodJSON.food_image.length>=1){
                  const current_image_url = "https://s3.amazonaws.com/vulture-food-photos/" + foodJSON.food_image.substring(12);
                        const picture = document.getElementById('foodphotooncard');
                        picture.src = current_image_url;
                        }
                else{
                  const current_image_url = "https://s3.amazonaws.com/vulture-food-photos/defaultvulture.png";
                        const picture = document.getElementById('foodphotooncard');
                        picture.src = current_image_url;
                }
   
                        const current_id = foodJSON._id;
                        const current_title = document.getElementById('currentcardtitle');
                        current_title.innerHTML = foodJSON.food_type + " at " + foodJSON.building+"-"+foodJSON.room;
                        const current_quantity = document.getElementById('current-quantity');
                        current_quantity.innerHTML = "Quantity: "+ foodJSON.quantity;
                        const current_vendor = document.getElementById('current-vendor');
                        current_vendor.innerHTML = "Vendor: "+ foodJSON.vendor;
                        const current_notes = document.getElementById('current-notes');
                        current_notes.innerHTML = "Notes: "+ foodJSON.notes
                        const current_time = document.getElementById('current-time');
                        timeDiff = timeDifference(new Date().toLocaleTimeString(),foodJSON.posting_time, current_id);
                        current_time.innerHTML = timeDiff;
                        document.getElementById('current-distance').innerHTML = ""
                        
function getLocation() {
  navigator.geolocation.getCurrentPosition(
            function(position) {
                var latLngA = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
                var latLngB = new google.maps.LatLng(foodJSON.latitude, foodJSON.longitude);
                var distance = google.maps.geometry.spherical.computeDistanceBetween(latLngA, latLngB);
                document.getElementById('current-distance').innerHTML = "Distance: " + Math.round(distance)+ " meters";
            },
    );
}


getLocation();
    
                        document.getElementById("reportBtn").addEventListener("click", function(){
                                post('/api/report', {'_id' : current_id }, function(result) {});
                                      location.reload();
                        });
                });

    }
////////////////////////////////////////////////////////////////////////////      Salad  END    /////////////////////////////////////////////////////////////////////////////
 

////////////////////////////////////////////////////////////////////////////      Hot Dog      /////////////////////////////////////////////////////////////////////////////
else if (the_food_type.includes("Hot Dogs") || the_food_type.includes("Hot Dog") || the_food_type.includes("hot dog") || the_food_type.includes("hot dogs") || the_food_type.includes("Hotdogs") || the_food_type.includes("Hotdog") || the_food_type.includes("hotdog") || the_food_type.includes("hotdogs")){
             var markerImage2 = new google.maps.MarkerImage('https://png.icons8.com/color/40/000000/hot-dog.png',
                new google.maps.Size(40, 40),
                new google.maps.Point(0, 0),
                new google.maps.Point(20, 20));

            let google_marker = new google.maps.Marker({

                // ICON
                icon: markerImage2,
                position: {lat: foodJSON.latitude, lng: foodJSON.longitude},
                map: map,
                optimized: false,
                zIndex:100
            });

                google_marker.addListener('click', function() {

                 if(foodJSON.food_image.length>=1){
                  const current_image_url = "https://s3.amazonaws.com/vulture-food-photos/" + foodJSON.food_image.substring(12);
                        const picture = document.getElementById('foodphotooncard');
                        picture.src = current_image_url;
                        }
                else{
                  const current_image_url = "https://s3.amazonaws.com/vulture-food-photos/defaultvulture.png";
                        const picture = document.getElementById('foodphotooncard');
                        picture.src = current_image_url;
                }
   
                        const current_id = foodJSON._id;
                        const current_title = document.getElementById('currentcardtitle');
                        current_title.innerHTML = foodJSON.food_type + " at " + foodJSON.building+"-"+foodJSON.room;
                        const current_quantity = document.getElementById('current-quantity');
                        current_quantity.innerHTML = "Quantity: "+ foodJSON.quantity;
                        const current_vendor = document.getElementById('current-vendor');
                        current_vendor.innerHTML = "Vendor: "+ foodJSON.vendor;
                        const current_notes = document.getElementById('current-notes');
                        current_notes.innerHTML = "Notes: "+ foodJSON.notes
                        const current_time = document.getElementById('current-time');
                        timeDiff = timeDifference(new Date().toLocaleTimeString(),foodJSON.posting_time, current_id);
                        current_time.innerHTML = timeDiff;
                        document.getElementById('current-distance').innerHTML = ""
                        
function getLocation() {
  navigator.geolocation.getCurrentPosition(
            function(position) {
                var latLngA = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
                var latLngB = new google.maps.LatLng(foodJSON.latitude, foodJSON.longitude);
                var distance = google.maps.geometry.spherical.computeDistanceBetween(latLngA, latLngB);
                document.getElementById('current-distance').innerHTML = "Distance: " + Math.round(distance)+ " meters";
            },
    );
}


getLocation();
    
                        document.getElementById("reportBtn").addEventListener("click", function(){
                                post('/api/report', {'_id' : current_id }, function(result) {});
                                      location.reload();
                        });
                });

    }
////////////////////////////////////////////////////////////////////////////      Hot Dog  END    /////////////////////////////////////////////////////////////////////////////
 
////////////////////////////////////////////////////////////////////////////      Cookies      /////////////////////////////////////////////////////////////////////////////
else if (the_food_type.includes("Cookies") || the_food_type.includes("Cookie") || the_food_type.includes("Chocolate Chip Cookies") || the_food_type.includes("cookie")){
            var markerImage2 = new google.maps.MarkerImage('https://png.icons8.com/color/40/000000/cookies.png',
                new google.maps.Size(40, 40),
                new google.maps.Point(0, 0),
                new google.maps.Point(20, 20));

            let google_marker = new google.maps.Marker({

                // ICON
                icon: markerImage2,
                position: {lat: foodJSON.latitude, lng: foodJSON.longitude},
                map: map,
                optimized: false,
                zIndex:100
            });

                google_marker.addListener('click', function() {

                 if(foodJSON.food_image.length>=1){
                  const current_image_url = "https://s3.amazonaws.com/vulture-food-photos/" + foodJSON.food_image.substring(12);
                        const picture = document.getElementById('foodphotooncard');
                        picture.src = current_image_url;
                        }
                else{
                  const current_image_url = "https://s3.amazonaws.com/vulture-food-photos/defaultvulture.png";
                        const picture = document.getElementById('foodphotooncard');
                        picture.src = current_image_url;
                }
   
                        const current_id = foodJSON._id;
                        const current_title = document.getElementById('currentcardtitle');
                        current_title.innerHTML = foodJSON.food_type + " at " + foodJSON.building+"-"+foodJSON.room;
                        const current_quantity = document.getElementById('current-quantity');
                        current_quantity.innerHTML = "Quantity: "+ foodJSON.quantity;
                        const current_vendor = document.getElementById('current-vendor');
                        current_vendor.innerHTML = "Vendor: "+ foodJSON.vendor;
                        const current_notes = document.getElementById('current-notes');
                        current_notes.innerHTML = "Notes: "+ foodJSON.notes
                        const current_time = document.getElementById('current-time');
                        timeDiff = timeDifference(new Date().toLocaleTimeString(),foodJSON.posting_time, current_id);
                        current_time.innerHTML = timeDiff;
                        document.getElementById('current-distance').innerHTML = ""
                        
function getLocation() {
  navigator.geolocation.getCurrentPosition(
            function(position) {
                var latLngA = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
                var latLngB = new google.maps.LatLng(foodJSON.latitude, foodJSON.longitude);
                var distance = google.maps.geometry.spherical.computeDistanceBetween(latLngA, latLngB);
                document.getElementById('current-distance').innerHTML = "Distance: " + Math.round(distance)+ " meters";
            },
    );
}


getLocation();
    
                        document.getElementById("reportBtn").addEventListener("click", function(){
                                post('/api/report', {'_id' : current_id }, function(result) {});
                                      location.reload();
                        });
                });

    }
////////////////////////////////////////////////////////////////////////////      Cookies  END    /////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////???????///      Sushi      ////////////??/////////////////////////////////////////////////////////////
else if (the_food_type.includes("Sushi") || the_food_type.includes("sushi") || the_food_type.includes("california roll") || the_food_type.includes("California Roll")){
            var markerImage2 = new google.maps.MarkerImage('https://png.icons8.com/color/40/000000/sushi.png',
                new google.maps.Size(40, 40),
                new google.maps.Point(0, 0),
                new google.maps.Point(20, 20));

            let google_marker = new google.maps.Marker({

                // ICON
                icon: markerImage2,
                position: {lat: foodJSON.latitude, lng: foodJSON.longitude},
                map: map,
                optimized: false,
                zIndex:100
            });

                google_marker.addListener('click', function() {

                  if(foodJSON.food_image.length>=1){
                  const current_image_url = "https://s3.amazonaws.com/vulture-food-photos/" + foodJSON.food_image.substring(12);
                        const picture = document.getElementById('foodphotooncard');
                        picture.src = current_image_url;
                        }
                else{
                  const current_image_url = "https://s3.amazonaws.com/vulture-food-photos/defaultvulture.png";
                        const picture = document.getElementById('foodphotooncard');
                        picture.src = current_image_url;
                }
   
                        const current_id = foodJSON._id;
                        const current_title = document.getElementById('currentcardtitle');
                        current_title.innerHTML = foodJSON.food_type + " at " + foodJSON.building+"-"+foodJSON.room;
                        const current_quantity = document.getElementById('current-quantity');
                        current_quantity.innerHTML = "Quantity: "+ foodJSON.quantity;
                        const current_vendor = document.getElementById('current-vendor');
                        current_vendor.innerHTML = "Vendor: "+ foodJSON.vendor;
                        const current_notes = document.getElementById('current-notes');
                        current_notes.innerHTML = "Notes: "+ foodJSON.notes
                        const current_time = document.getElementById('current-time');
                        timeDiff = timeDifference(new Date().toLocaleTimeString(),foodJSON.posting_time, current_id);
                        current_time.innerHTML = timeDiff;
                        document.getElementById('current-distance').innerHTML = ""
                        
function getLocation() {
  navigator.geolocation.getCurrentPosition(
            function(position) {
                var latLngA = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
                var latLngB = new google.maps.LatLng(foodJSON.latitude, foodJSON.longitude);
                var distance = google.maps.geometry.spherical.computeDistanceBetween(latLngA, latLngB);
                document.getElementById('current-distance').innerHTML = "Distance: " + Math.round(distance)+ " meters";
            },
    );
}


getLocation();
    
                        document.getElementById("reportBtn").addEventListener("click", function(){
                                post('/api/report', {'_id' : current_id }, function(result) {});
                                      location.reload();
                        });
                });

    }
/////////////////////////////////////////////////////////////////////////////      Sushi  END    /////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////???????///      Avocado      ////////////??/////////////////////////////////////////////////////////////
else if (the_food_type.includes("guac") || the_food_type.includes("Guac") || the_food_type.includes("Avocado") || the_food_type.includes("avocado")){
            var markerImage2 = new google.maps.MarkerImage('https://png.icons8.com/color/40/000000/avocado.png',
                new google.maps.Size(40, 40),
                new google.maps.Point(0, 0),
                new google.maps.Point(20, 20));

            let google_marker = new google.maps.Marker({

                // ICON
                icon: markerImage2,
                position: {lat: foodJSON.latitude, lng: foodJSON.longitude},
                map: map,
                optimized: false,
                zIndex:100
            });

                google_marker.addListener('click', function() {

                 if(foodJSON.food_image.length>=1){
                  const current_image_url = "https://s3.amazonaws.com/vulture-food-photos/" + foodJSON.food_image.substring(12);
                        const picture = document.getElementById('foodphotooncard');
                        picture.src = current_image_url;
                        }
                else{
                  const current_image_url = "https://s3.amazonaws.com/vulture-food-photos/defaultvulture.png";
                        const picture = document.getElementById('foodphotooncard');
                        picture.src = current_image_url;
                }
   
                        const current_id = foodJSON._id;
                        const current_title = document.getElementById('currentcardtitle');
                        current_title.innerHTML = foodJSON.food_type + " at " + foodJSON.building+"-"+foodJSON.room;
                        const current_quantity = document.getElementById('current-quantity');
                        current_quantity.innerHTML = "Quantity: "+ foodJSON.quantity;
                        const current_vendor = document.getElementById('current-vendor');
                        current_vendor.innerHTML = "Vendor: "+ foodJSON.vendor;
                        const current_notes = document.getElementById('current-notes');
                        current_notes.innerHTML = "Notes: "+ foodJSON.notes
                        const current_time = document.getElementById('current-time');
                        timeDiff = timeDifference(new Date().toLocaleTimeString(),foodJSON.posting_time, current_id);
                        current_time.innerHTML = timeDiff;
                        document.getElementById('current-distance').innerHTML = ""
                        
function getLocation() {
  navigator.geolocation.getCurrentPosition(
            function(position) {
                var latLngA = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
                var latLngB = new google.maps.LatLng(foodJSON.latitude, foodJSON.longitude);
                var distance = google.maps.geometry.spherical.computeDistanceBetween(latLngA, latLngB);
                document.getElementById('current-distance').innerHTML = "Distance: " + Math.round(distance)+ " meters";
            },
    );
}


getLocation();
    
                        document.getElementById("reportBtn").addEventListener("click", function(){
                                post('/api/report', {'_id' : current_id }, function(result) {});
                                      location.reload();
                        });
                });

    }
/////////////////////////////////////////////////////////////////////////////      Avocado  END    /////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////???????///      Pastries      ////////////??/////////////////////////////////////////////////////////////
else if (the_food_type.includes("Cinnamon Rolls") || the_food_type.includes("cinnamon rolls") || the_food_type.includes("Pastries") || the_food_type.includes("pastries") || the_food_type.includes("baked goods") || the_food_type.includes("Baked Goods")){
            var markerImage2 = new google.maps.MarkerImage('https://png.icons8.com/color/40/000000/cinnamon-roll.png',
                new google.maps.Size(40, 40),
                new google.maps.Point(0, 0),
                new google.maps.Point(20, 20));

            let google_marker = new google.maps.Marker({

                // ICON
                icon: markerImage2,
                position: {lat: foodJSON.latitude, lng: foodJSON.longitude},
                map: map,
                optimized: false,
                zIndex:100
            });

                google_marker.addListener('click', function() {

                  if(foodJSON.food_image.length>=1){
                  const current_image_url = "https://s3.amazonaws.com/vulture-food-photos/" + foodJSON.food_image.substring(12);
                        const picture = document.getElementById('foodphotooncard');
                        picture.src = current_image_url;
                        }
                else{
                  const current_image_url = "https://s3.amazonaws.com/vulture-food-photos/defaultvulture.png";
                        const picture = document.getElementById('foodphotooncard');
                        picture.src = current_image_url;
                }
   
                        const current_id = foodJSON._id;
                        const current_title = document.getElementById('currentcardtitle');
                        current_title.innerHTML = foodJSON.food_type + " at " + foodJSON.building+"-"+foodJSON.room;
                        const current_quantity = document.getElementById('current-quantity');
                        current_quantity.innerHTML = "Quantity: "+ foodJSON.quantity;
                        const current_vendor = document.getElementById('current-vendor');
                        current_vendor.innerHTML = "Vendor: "+ foodJSON.vendor;
                        const current_notes = document.getElementById('current-notes');
                        current_notes.innerHTML = "Notes: "+ foodJSON.notes
                        const current_time = document.getElementById('current-time');
                        timeDiff = timeDifference(new Date().toLocaleTimeString(),foodJSON.posting_time, current_id);
                        current_time.innerHTML = timeDiff;
                        document.getElementById('current-distance').innerHTML = ""
                        
function getLocation() {
  navigator.geolocation.getCurrentPosition(
            function(position) {
                var latLngA = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
                var latLngB = new google.maps.LatLng(foodJSON.latitude, foodJSON.longitude);
                var distance = google.maps.geometry.spherical.computeDistanceBetween(latLngA, latLngB);
                document.getElementById('current-distance').innerHTML = "Distance: " + Math.round(distance)+ " meters";
            },
    );
}


getLocation();
    
                        document.getElementById("reportBtn").addEventListener("click", function(){
                                post('/api/report', {'_id' : current_id }, function(result) {});
                                      location.reload();
                        });
                });

    }
/////////////////////////////////////////////////////////////////////////////      Pastries  END    /////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////???????///      Chinese      ////////////??/////////////////////////////////////////////////////////////
else if (the_food_type.includes("Chinese Food") || the_food_type.includes("chinese food") || the_food_type.includes("Chinese") || the_food_type.includes("chinese") || the_food_type.includes("Noodles") || the_food_type.includes("noodles") || the_food_type.includes("Ramen") || the_food_type.includes("ramen")){
            var markerImage2 = new google.maps.MarkerImage('https://png.icons8.com/color/40/000000/noodles.png',
                new google.maps.Size(40, 40),
                new google.maps.Point(0, 0),
                new google.maps.Point(20, 20));

            let google_marker = new google.maps.Marker({

                // ICON
                icon: markerImage2,
                position: {lat: foodJSON.latitude, lng: foodJSON.longitude},
                map: map,
                optimized: false,
                zIndex:100
            });

                google_marker.addListener('click', function() {

                 if(foodJSON.food_image.length>=1){
                  const current_image_url = "https://s3.amazonaws.com/vulture-food-photos/" + foodJSON.food_image.substring(12);
                        const picture = document.getElementById('foodphotooncard');
                        picture.src = current_image_url;
                        }
                else{
                  const current_image_url = "https://s3.amazonaws.com/vulture-food-photos/defaultvulture.png";
                        const picture = document.getElementById('foodphotooncard');
                        picture.src = current_image_url;
                }
   
                        const current_id = foodJSON._id;
                        const current_title = document.getElementById('currentcardtitle');
                        current_title.innerHTML = foodJSON.food_type + " at " + foodJSON.building+"-"+foodJSON.room;
                        const current_quantity = document.getElementById('current-quantity');
                        current_quantity.innerHTML = "Quantity: "+ foodJSON.quantity;
                        const current_vendor = document.getElementById('current-vendor');
                        current_vendor.innerHTML = "Vendor: "+ foodJSON.vendor;
                        const current_notes = document.getElementById('current-notes');
                        current_notes.innerHTML = "Notes: "+ foodJSON.notes
                        const current_time = document.getElementById('current-time');
                        timeDiff = timeDifference(new Date().toLocaleTimeString(),foodJSON.posting_time, current_id);
                        current_time.innerHTML = timeDiff;
                        document.getElementById('current-distance').innerHTML = ""
                        
function getLocation() {
  navigator.geolocation.getCurrentPosition(
            function(position) {
                var latLngA = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
                var latLngB = new google.maps.LatLng(foodJSON.latitude, foodJSON.longitude);
                var distance = google.maps.geometry.spherical.computeDistanceBetween(latLngA, latLngB);
                document.getElementById('current-distance').innerHTML = "Distance: " + Math.round(distance)+ " meters";
            },
    );
}


getLocation();
    
                        document.getElementById("reportBtn").addEventListener("click", function(){
                                post('/api/report', {'_id' : current_id }, function(result) {});
                                      location.reload();
                        });
                });

    }
/////////////////////////////////////////////////////////////////////////////      Chinese  END    /////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////???????///      Candy      ////////////??/////////////////////////////////////////////////////////////
else if (the_food_type.includes("Candy") || the_food_type.includes("candy") || the_food_type.includes("Candies") || the_food_type.includes("candies")){
            var markerImage2 = new google.maps.MarkerImage('https://png.icons8.com/color/40/000000/christmas-candy.png',
                new google.maps.Size(40, 40),
                new google.maps.Point(0, 0),
                new google.maps.Point(20, 20));

            let google_marker = new google.maps.Marker({

                // ICON
                icon: markerImage2,
                position: {lat: foodJSON.latitude, lng: foodJSON.longitude},
                map: map,
                optimized: false,
                zIndex:100
            });

                google_marker.addListener('click', function() {

                  if(foodJSON.food_image.length>=1){
                  const current_image_url = "https://s3.amazonaws.com/vulture-food-photos/" + foodJSON.food_image.substring(12);
                        const picture = document.getElementById('foodphotooncard');
                        picture.src = current_image_url;
                        }
                else{
                  const current_image_url = "https://s3.amazonaws.com/vulture-food-photos/defaultvulture.png";
                        const picture = document.getElementById('foodphotooncard');
                        picture.src = current_image_url;
                }
   
                        const current_id = foodJSON._id;
                        const current_title = document.getElementById('currentcardtitle');
                        current_title.innerHTML = foodJSON.food_type + " at " + foodJSON.building+"-"+foodJSON.room;
                        const current_quantity = document.getElementById('current-quantity');
                        current_quantity.innerHTML = "Quantity: "+ foodJSON.quantity;
                        const current_vendor = document.getElementById('current-vendor');
                        current_vendor.innerHTML = "Vendor: "+ foodJSON.vendor;
                        const current_notes = document.getElementById('current-notes');
                        current_notes.innerHTML = "Notes: "+ foodJSON.notes
                        const current_time = document.getElementById('current-time');
                        timeDiff = timeDifference(new Date().toLocaleTimeString(),foodJSON.posting_time, current_id);
                        current_time.innerHTML = timeDiff;
                        document.getElementById('current-distance').innerHTML = ""
                        
function getLocation() {
  navigator.geolocation.getCurrentPosition(
            function(position) {
                var latLngA = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
                var latLngB = new google.maps.LatLng(foodJSON.latitude, foodJSON.longitude);
                var distance = google.maps.geometry.spherical.computeDistanceBetween(latLngA, latLngB);
                document.getElementById('current-distance').innerHTML = "Distance: " + Math.round(distance)+ " meters";
            },
    );
}


getLocation();
    
                        document.getElementById("reportBtn").addEventListener("click", function(){
                                post('/api/report', {'_id' : current_id }, function(result) {});
                                      location.reload();
                        });
                });

    }
/////////////////////////////////////////////////////////////////////////////      Candy  END    /////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////???????///      Ice Cream      ////////////??/////////////////////////////////////////////////////////////
else if (the_food_type.includes("Icecream") || the_food_type.includes("icecream") || the_food_type.includes("Ice Cream") || the_food_type.includes("Ice cream") || the_food_type.includes("ice cream") || the_food_type.includes("sundaes") || the_food_type.includes("Sundaes")){
            var markerImage2 = new google.maps.MarkerImage('https://png.icons8.com/color/40/000000/ice-cream-cone.png',
                new google.maps.Size(40, 40),
                new google.maps.Point(0, 0),
                new google.maps.Point(20, 20));

            let google_marker = new google.maps.Marker({

                // ICON
                icon: markerImage2,
                position: {lat: foodJSON.latitude, lng: foodJSON.longitude},
                map: map,
                optimized: false,
                zIndex:100
            });

                google_marker.addListener('click', function() {

                if(foodJSON.food_image.length>=1){
                  const current_image_url = "https://s3.amazonaws.com/vulture-food-photos/" + foodJSON.food_image.substring(12);
                        const picture = document.getElementById('foodphotooncard');
                        picture.src = current_image_url;
                        }
                else{
                  const current_image_url = "https://s3.amazonaws.com/vulture-food-photos/defaultvulture.png";
                        const picture = document.getElementById('foodphotooncard');
                        picture.src = current_image_url;
                }
   
                        const current_id = foodJSON._id;
                        const current_title = document.getElementById('currentcardtitle');
                        current_title.innerHTML = foodJSON.food_type + " at " + foodJSON.building+"-"+foodJSON.room;
                        const current_quantity = document.getElementById('current-quantity');
                        current_quantity.innerHTML = "Quantity: "+ foodJSON.quantity;
                        const current_vendor = document.getElementById('current-vendor');
                        current_vendor.innerHTML = "Vendor: "+ foodJSON.vendor;
                        const current_notes = document.getElementById('current-notes');
                        current_notes.innerHTML = "Notes: "+ foodJSON.notes
                        const current_time = document.getElementById('current-time');
                        timeDiff = timeDifference(new Date().toLocaleTimeString(),foodJSON.posting_time, current_id);
                        current_time.innerHTML = timeDiff;
                        document.getElementById('current-distance').innerHTML = ""
                        
function getLocation() {
  navigator.geolocation.getCurrentPosition(
            function(position) {
                var latLngA = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
                var latLngB = new google.maps.LatLng(foodJSON.latitude, foodJSON.longitude);
                var distance = google.maps.geometry.spherical.computeDistanceBetween(latLngA, latLngB);
                document.getElementById('current-distance').innerHTML = "Distance: " + Math.round(distance)+ " meters";
            },
    );
}


getLocation();
    
                        document.getElementById("reportBtn").addEventListener("click", function(){
                                post('/api/report', {'_id' : current_id }, function(result) {});
                                      location.reload();
                        });
                });

    }
/////////////////////////////////////////////////////////////////////////////    Ice Cream  END    /////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////???????///      Cupcake      ////////////??/////////////////////////////////////////////////////////////
else if (the_food_type.includes("Cupcake") || the_food_type.includes("cupcakes") || the_food_type.includes("cupcake") || the_food_type.includes("Cupcakes") ){
            var markerImage2 = new google.maps.MarkerImage('https://png.icons8.com/color/40/000000/cupcake.png',
                new google.maps.Size(40, 40),
                new google.maps.Point(0, 0),
                new google.maps.Point(20, 20));

            let google_marker = new google.maps.Marker({

                // ICON
                icon: markerImage2,
                position: {lat: foodJSON.latitude, lng: foodJSON.longitude},
                map: map,
                optimized: false,
                zIndex:100
            });

                google_marker.addListener('click', function() {

                if(foodJSON.food_image.length>=1){
                  const current_image_url = "https://s3.amazonaws.com/vulture-food-photos/" + foodJSON.food_image.substring(12);
                        const picture = document.getElementById('foodphotooncard');
                        picture.src = current_image_url;
                        }
                else{
                  const current_image_url = "https://s3.amazonaws.com/vulture-food-photos/defaultvulture.png";
                        const picture = document.getElementById('foodphotooncard');
                        picture.src = current_image_url;
                }
   
                        const current_id = foodJSON._id;
                        const current_title = document.getElementById('currentcardtitle');
                        current_title.innerHTML = foodJSON.food_type + " at " + foodJSON.building+"-"+foodJSON.room;
                        const current_quantity = document.getElementById('current-quantity');
                        current_quantity.innerHTML = "Quantity: "+ foodJSON.quantity;
                        const current_vendor = document.getElementById('current-vendor');
                        current_vendor.innerHTML = "Vendor: "+ foodJSON.vendor;
                        const current_notes = document.getElementById('current-notes');
                        current_notes.innerHTML = "Notes: "+ foodJSON.notes
                        const current_time = document.getElementById('current-time');
                        timeDiff = timeDifference(new Date().toLocaleTimeString(),foodJSON.posting_time, current_id);
                        current_time.innerHTML = timeDiff;
                        document.getElementById('current-distance').innerHTML = ""
                        
function getLocation() {
  navigator.geolocation.getCurrentPosition(
            function(position) {
                var latLngA = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
                var latLngB = new google.maps.LatLng(foodJSON.latitude, foodJSON.longitude);
                var distance = google.maps.geometry.spherical.computeDistanceBetween(latLngA, latLngB);
                document.getElementById('current-distance').innerHTML = "Distance: " + Math.round(distance)+ " meters";
            },
    );
}


getLocation();
    
                        document.getElementById("reportBtn").addEventListener("click", function(){
                                post('/api/report', {'_id' : current_id }, function(result) {});
                                      location.reload();
                        });
                });

    }
/////////////////////////////////////////////////////////////////////////////    Cupcake  END    /////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////???????///      Pancake      ////////////??/////////////////////////////////////////////////////////////
else if (the_food_type.includes("Pancake") || the_food_type.includes("Pancakes") || the_food_type.includes("pancake") || the_food_type.includes("pancakes") || the_food_type.includes("breakfast")|| the_food_type.includes("Breakfast")){
            var markerImage2 = new google.maps.MarkerImage('https://png.icons8.com/color/40/000000/pancake.png',
                new google.maps.Size(40, 40),
                new google.maps.Point(0, 0),
                new google.maps.Point(20, 20));

            let google_marker = new google.maps.Marker({

                // ICON
                icon: markerImage2,
                position: {lat: foodJSON.latitude, lng: foodJSON.longitude},
                map: map,
                optimized: false,
                zIndex:100
            });

                google_marker.addListener('click', function() {

                 if(foodJSON.food_image.length>=1){
                  const current_image_url = "https://s3.amazonaws.com/vulture-food-photos/" + foodJSON.food_image.substring(12);
                        const picture = document.getElementById('foodphotooncard');
                        picture.src = current_image_url;
                        }
                else{
                  const current_image_url = "https://s3.amazonaws.com/vulture-food-photos/defaultvulture.png";
                        const picture = document.getElementById('foodphotooncard');
                        picture.src = current_image_url;
                }
   
                        const current_id = foodJSON._id;
                        const current_title = document.getElementById('currentcardtitle');
                        current_title.innerHTML = foodJSON.food_type + " at " + foodJSON.building+"-"+foodJSON.room;
                        const current_quantity = document.getElementById('current-quantity');
                        current_quantity.innerHTML = "Quantity: "+ foodJSON.quantity;
                        const current_vendor = document.getElementById('current-vendor');
                        current_vendor.innerHTML = "Vendor: "+ foodJSON.vendor;
                        const current_notes = document.getElementById('current-notes');
                        current_notes.innerHTML = "Notes: "+ foodJSON.notes
                        const current_time = document.getElementById('current-time');
                        timeDiff = timeDifference(new Date().toLocaleTimeString(),foodJSON.posting_time, current_id);
                        current_time.innerHTML = timeDiff;
                        document.getElementById('current-distance').innerHTML = ""
                        
function getLocation() {
  navigator.geolocation.getCurrentPosition(
            function(position) {
                var latLngA = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
                var latLngB = new google.maps.LatLng(foodJSON.latitude, foodJSON.longitude);
                var distance = google.maps.geometry.spherical.computeDistanceBetween(latLngA, latLngB);
                document.getElementById('current-distance').innerHTML = "Distance: " + Math.round(distance)+ " meters";
            },
    );
}


getLocation();
    
                        document.getElementById("reportBtn").addEventListener("click", function(){
                                post('/api/report', {'_id' : current_id }, function(result) {});
                                      location.reload();
                        });
                });

    }
/////////////////////////////////////////////////////////////////////////////    Pancake  END    /////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////???????///      Berries      ////////////??/////////////////////////////////////////////////////////////
else if (the_food_type.includes("Berries") || the_food_type.includes("berries") || the_food_type.includes("berry") || the_food_type.includes("Berry") || the_food_type.includes("fruit")|| the_food_type.includes("Fruit")){
            var markerImage2 = new google.maps.MarkerImage('https://png.icons8.com/color/40/000000/strawberry.png',
                new google.maps.Size(40, 40),
                new google.maps.Point(0, 0),
                new google.maps.Point(20, 20));

            let google_marker = new google.maps.Marker({

                // ICON
                icon: markerImage2,
                position: {lat: foodJSON.latitude, lng: foodJSON.longitude},
                map: map,
                optimized: false,
                zIndex:100
            });

                google_marker.addListener('click', function() {

                 if(foodJSON.food_image.length>=1){
                  const current_image_url = "https://s3.amazonaws.com/vulture-food-photos/" + foodJSON.food_image.substring(12);
                        const picture = document.getElementById('foodphotooncard');
                        picture.src = current_image_url;
                        }
                else{
                  const current_image_url = "https://s3.amazonaws.com/vulture-food-photos/defaultvulture.png";
                        const picture = document.getElementById('foodphotooncard');
                        picture.src = current_image_url;
                }
   
                        const current_id = foodJSON._id;
                        const current_title = document.getElementById('currentcardtitle');
                        current_title.innerHTML = foodJSON.food_type + " at " + foodJSON.building+"-"+foodJSON.room;
                        const current_quantity = document.getElementById('current-quantity');
                        current_quantity.innerHTML = "Quantity: "+ foodJSON.quantity;
                        const current_vendor = document.getElementById('current-vendor');
                        current_vendor.innerHTML = "Vendor: "+ foodJSON.vendor;
                        const current_notes = document.getElementById('current-notes');
                        current_notes.innerHTML = "Notes: "+ foodJSON.notes
                        const current_time = document.getElementById('current-time');
                        timeDiff = timeDifference(new Date().toLocaleTimeString(),foodJSON.posting_time, current_id);
                        current_time.innerHTML = timeDiff;
                        document.getElementById('current-distance').innerHTML = ""
                        
function getLocation() {
  navigator.geolocation.getCurrentPosition(
            function(position) {
                var latLngA = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
                var latLngB = new google.maps.LatLng(foodJSON.latitude, foodJSON.longitude);
                var distance = google.maps.geometry.spherical.computeDistanceBetween(latLngA, latLngB);
                document.getElementById('current-distance').innerHTML = "Distance: " + Math.round(distance)+ " meters";
            },
    );
}


getLocation();
    
                        document.getElementById("reportBtn").addEventListener("click", function(){
                                post('/api/report', {'_id' : current_id }, function(result) {});
                                      location.reload();
                        });
                });

    }
/////////////////////////////////////////////////////////////////////////////    Berries  END    /////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////???????///      Veggies      ////////////??/////////////////////////////////////////////////////////////
else if (the_food_type.includes("Veggies") || the_food_type.includes("veggies") || the_food_type.includes("vegetables") || the_food_type.includes("Vegetables")|| the_food_type.includes("Carrot")|| the_food_type.includes("carrot")){
            var markerImage2 = new google.maps.MarkerImage('https://png.icons8.com/color/40/000000/carrot.png',
                new google.maps.Size(40, 40),
                new google.maps.Point(0, 0),
                new google.maps.Point(20, 20));

            let google_marker = new google.maps.Marker({

                // ICON
                icon: markerImage2,
                position: {lat: foodJSON.latitude, lng: foodJSON.longitude},
                map: map,
                optimized: false,
                zIndex:100
            });

                google_marker.addListener('click', function() {

                 if(foodJSON.food_image.length>=1){
                  const current_image_url = "https://s3.amazonaws.com/vulture-food-photos/" + foodJSON.food_image.substring(12);
                        const picture = document.getElementById('foodphotooncard');
                        picture.src = current_image_url;
                        }
                else{
                  const current_image_url = "https://s3.amazonaws.com/vulture-food-photos/defaultvulture.png";
                        const picture = document.getElementById('foodphotooncard');
                        picture.src = current_image_url;
                }
   
                        const current_id = foodJSON._id;
                        const current_title = document.getElementById('currentcardtitle');
                        current_title.innerHTML = foodJSON.food_type + " at " + foodJSON.building+"-"+foodJSON.room;
                        const current_quantity = document.getElementById('current-quantity');
                        current_quantity.innerHTML = "Quantity: "+ foodJSON.quantity;
                        const current_vendor = document.getElementById('current-vendor');
                        current_vendor.innerHTML = "Vendor: "+ foodJSON.vendor;
                        const current_notes = document.getElementById('current-notes');
                        current_notes.innerHTML = "Notes: "+ foodJSON.notes
                        const current_time = document.getElementById('current-time');
                        timeDiff = timeDifference(new Date().toLocaleTimeString(),foodJSON.posting_time, current_id);
                        current_time.innerHTML = timeDiff;
                        document.getElementById('current-distance').innerHTML = ""
                        
function getLocation() {
  navigator.geolocation.getCurrentPosition(
            function(position) {
                var latLngA = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
                var latLngB = new google.maps.LatLng(foodJSON.latitude, foodJSON.longitude);
                var distance = google.maps.geometry.spherical.computeDistanceBetween(latLngA, latLngB);
                document.getElementById('current-distance').innerHTML = "Distance: " + Math.round(distance)+ " meters";
            },
    );
}


getLocation();
    
                        document.getElementById("reportBtn").addEventListener("click", function(){
                                post('/api/report', {'_id' : current_id }, function(result) {});
                                      location.reload();
                        });
                });

    }
/////////////////////////////////////////////////////////////////////////////     Veggies  END    /////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////???????///      Fish      ////////////??/////////////////////////////////////////////////////////////
else if (the_food_type.includes("Fish") || the_food_type.includes("fish") || the_food_type.includes("Seafood") || the_food_type.includes("Sea food")|| the_food_type.includes("sea food")|| the_food_type.includes("seafood")){
            var markerImage2 = new google.maps.MarkerImage('https://png.icons8.com/color/40/000000/fish-food.png',
                new google.maps.Size(40, 40),
                new google.maps.Point(0, 0),
                new google.maps.Point(20, 20));

            let google_marker = new google.maps.Marker({

                // ICON
                icon: markerImage2,
                position: {lat: foodJSON.latitude, lng: foodJSON.longitude},
                map: map,
                optimized: false,
                zIndex:100
            });

                google_marker.addListener('click', function() {

                 if(foodJSON.food_image.length>=1){
                  const current_image_url = "https://s3.amazonaws.com/vulture-food-photos/" + foodJSON.food_image.substring(12);
                        const picture = document.getElementById('foodphotooncard');
                        picture.src = current_image_url;
                        }
                else{
                  const current_image_url = "https://s3.amazonaws.com/vulture-food-photos/defaultvulture.png";
                        const picture = document.getElementById('foodphotooncard');
                        picture.src = current_image_url;
                }
   
                        const current_id = foodJSON._id;
                        const current_title = document.getElementById('currentcardtitle');
                        current_title.innerHTML = foodJSON.food_type + " at " + foodJSON.building+"-"+foodJSON.room;
                        const current_quantity = document.getElementById('current-quantity');
                        current_quantity.innerHTML = "Quantity: "+ foodJSON.quantity;
                        const current_vendor = document.getElementById('current-vendor');
                        current_vendor.innerHTML = "Vendor: "+ foodJSON.vendor;
                        const current_notes = document.getElementById('current-notes');
                        current_notes.innerHTML = "Notes: "+ foodJSON.notes
                        const current_time = document.getElementById('current-time');
                        timeDiff = timeDifference(new Date().toLocaleTimeString(),foodJSON.posting_time, current_id);
                        current_time.innerHTML = timeDiff;
                        document.getElementById('current-distance').innerHTML = ""
                        
function getLocation() {
  navigator.geolocation.getCurrentPosition(
            function(position) {
                var latLngA = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
                var latLngB = new google.maps.LatLng(foodJSON.latitude, foodJSON.longitude);
                var distance = google.maps.geometry.spherical.computeDistanceBetween(latLngA, latLngB);
                document.getElementById('current-distance').innerHTML = "Distance: " + Math.round(distance)+ " meters";
            },
    );
}


getLocation();
    
                        document.getElementById("reportBtn").addEventListener("click", function(){
                                post('/api/report', {'_id' : current_id }, function(result) {});
                                      location.reload();
                        });
                });

    }
/////////////////////////////////////////////////////////////////////////////     Fish  END    /////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////???????///      Donut      ////////////??/////////////////////////////////////////////////////////////
else if (the_food_type.includes("Donut") || the_food_type.includes("Donuts") || the_food_type.includes("donut") || the_food_type.includes("Donut")){
            var markerImage2 = new google.maps.MarkerImage('https://png.icons8.com/color/40/000000/doughnut.png',
                new google.maps.Size(40, 40),
                new google.maps.Point(0, 0),
                new google.maps.Point(20, 20));

            let google_marker = new google.maps.Marker({

                // ICON
                icon: markerImage2,
                position: {lat: foodJSON.latitude, lng: foodJSON.longitude},
                map: map,
                optimized: false,
                zIndex:100
            });

                google_marker.addListener('click', function() {

                  if(foodJSON.food_image.length>=1){
                  const current_image_url = "https://s3.amazonaws.com/vulture-food-photos/" + foodJSON.food_image.substring(12);
                        const picture = document.getElementById('foodphotooncard');
                        picture.src = current_image_url;
                        }
                else{
                  const current_image_url = "https://s3.amazonaws.com/vulture-food-photos/defaultvulture.png";
                        const picture = document.getElementById('foodphotooncard');
                        picture.src = current_image_url;
                }
   
                        const current_id = foodJSON._id;
                        const current_title = document.getElementById('currentcardtitle');
                        current_title.innerHTML = foodJSON.food_type + " at " + foodJSON.building+"-"+foodJSON.room;
                        const current_quantity = document.getElementById('current-quantity');
                        current_quantity.innerHTML = "Quantity: "+ foodJSON.quantity;
                        const current_vendor = document.getElementById('current-vendor');
                        current_vendor.innerHTML = "Vendor: "+ foodJSON.vendor;
                        const current_notes = document.getElementById('current-notes');
                        current_notes.innerHTML = "Notes: "+ foodJSON.notes
                        const current_time = document.getElementById('current-time');
                        timeDiff = timeDifference(new Date().toLocaleTimeString(),foodJSON.posting_time, current_id);
                        current_time.innerHTML = timeDiff;
                        document.getElementById('current-distance').innerHTML = ""
                        
function getLocation() {
  navigator.geolocation.getCurrentPosition(
            function(position) {
                var latLngA = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
                var latLngB = new google.maps.LatLng(foodJSON.latitude, foodJSON.longitude);
                var distance = google.maps.geometry.spherical.computeDistanceBetween(latLngA, latLngB);
                document.getElementById('current-distance').innerHTML = "Distance: " + Math.round(distance)+ " meters";
            },
    );
}


getLocation();
    
                        document.getElementById("reportBtn").addEventListener("click", function(){
                                post('/api/report', {'_id' : current_id }, function(result) {});
                                      location.reload();
                        });
                });

    }
/////////////////////////////////////////////////////////////////////////////     Donut  END    /////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////???????///      Bread      ////////////??/////////////////////////////////////////////////////////////
else if (the_food_type.includes("bread") || the_food_type.includes("Bread") || the_food_type.includes("Breads") || the_food_type.includes("breads")){
            var markerImage2 = new google.maps.MarkerImage('https://png.icons8.com/color/40/000000/bread.png',
                new google.maps.Size(40, 40),
                new google.maps.Point(0, 0),
                new google.maps.Point(20, 20));

            let google_marker = new google.maps.Marker({

                // ICON
                icon: markerImage2,
                position: {lat: foodJSON.latitude, lng: foodJSON.longitude},
                map: map,
                optimized: false,
                zIndex:100
            });

                google_marker.addListener('click', function() {

                  if(foodJSON.food_image.length>=1){
                  const current_image_url = "https://s3.amazonaws.com/vulture-food-photos/" + foodJSON.food_image.substring(12);
                        const picture = document.getElementById('foodphotooncard');
                        picture.src = current_image_url;
                        }
                else{
                  const current_image_url = "https://s3.amazonaws.com/vulture-food-photos/defaultvulture.png";
                        const picture = document.getElementById('foodphotooncard');
                        picture.src = current_image_url;
                }
   
                        const current_id = foodJSON._id;
                        const current_title = document.getElementById('currentcardtitle');
                        current_title.innerHTML = foodJSON.food_type + " at " + foodJSON.building+"-"+foodJSON.room;
                        const current_quantity = document.getElementById('current-quantity');
                        current_quantity.innerHTML = "Quantity: "+ foodJSON.quantity;
                        const current_vendor = document.getElementById('current-vendor');
                        current_vendor.innerHTML = "Vendor: "+ foodJSON.vendor;
                        const current_notes = document.getElementById('current-notes');
                        current_notes.innerHTML = "Notes: "+ foodJSON.notes
                        const current_time = document.getElementById('current-time');
                        timeDiff = timeDifference(new Date().toLocaleTimeString(),foodJSON.posting_time, current_id);
                        current_time.innerHTML = timeDiff;
                        document.getElementById('current-distance').innerHTML = ""
                        
function getLocation() {
  navigator.geolocation.getCurrentPosition(
            function(position) {
                var latLngA = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
                var latLngB = new google.maps.LatLng(foodJSON.latitude, foodJSON.longitude);
                var distance = google.maps.geometry.spherical.computeDistanceBetween(latLngA, latLngB);
                document.getElementById('current-distance').innerHTML = "Distance: " + Math.round(distance)+ " meters";
            },
    );
}


getLocation();
    
                        document.getElementById("reportBtn").addEventListener("click", function(){
                                post('/api/report', {'_id' : current_id }, function(result) {});
                                      location.reload();
                        });
                });

    }
/////////////////////////////////////////////////////////////////////////////     Bread  END    /////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////???????///      Banana      ////////////??/////////////////////////////////////////////////////////////
else if (the_food_type.includes("Banana") || the_food_type.includes("bananas") || the_food_type.includes("banana") || the_food_type.includes("Bananas")){
            var markerImage2 = new google.maps.MarkerImage('https://png.icons8.com/color/40/000000/banana.png',
                new google.maps.Size(40, 40),
                new google.maps.Point(0, 0),
                new google.maps.Point(20, 20));

            let google_marker = new google.maps.Marker({

                // ICON
                icon: markerImage2,
                position: {lat: foodJSON.latitude, lng: foodJSON.longitude},
                map: map,
                optimized: false,
                zIndex:100
            });

                google_marker.addListener('click', function() {

                 if(foodJSON.food_image.length>=1){
                  const current_image_url = "https://s3.amazonaws.com/vulture-food-photos/" + foodJSON.food_image.substring(12);
                        const picture = document.getElementById('foodphotooncard');
                        picture.src = current_image_url;
                        }
                else{
                  const current_image_url = "https://s3.amazonaws.com/vulture-food-photos/defaultvulture.png";
                        const picture = document.getElementById('foodphotooncard');
                        picture.src = current_image_url;
                }
   
                        const current_id = foodJSON._id;
                        const current_title = document.getElementById('currentcardtitle');
                        current_title.innerHTML = foodJSON.food_type + " at " + foodJSON.building+"-"+foodJSON.room;
                        const current_quantity = document.getElementById('current-quantity');
                        current_quantity.innerHTML = "Quantity: "+ foodJSON.quantity;
                        const current_vendor = document.getElementById('current-vendor');
                        current_vendor.innerHTML = "Vendor: "+ foodJSON.vendor;
                        const current_notes = document.getElementById('current-notes');
                        current_notes.innerHTML = "Notes: "+ foodJSON.notes
                        const current_time = document.getElementById('current-time');
                        timeDiff = timeDifference(new Date().toLocaleTimeString(),foodJSON.posting_time, current_id);
                        current_time.innerHTML = timeDiff;
                        document.getElementById('current-distance').innerHTML = ""
                        
function getLocation() {
  navigator.geolocation.getCurrentPosition(
            function(position) {
                var latLngA = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
                var latLngB = new google.maps.LatLng(foodJSON.latitude, foodJSON.longitude);
                var distance = google.maps.geometry.spherical.computeDistanceBetween(latLngA, latLngB);
                document.getElementById('current-distance').innerHTML = "Distance: " + Math.round(distance)+ " meters";
            },
    );
}


getLocation();
    
                        document.getElementById("reportBtn").addEventListener("click", function(){
                                post('/api/report', {'_id' : current_id }, function(result) {});
                                      location.reload();
                        });
                });

    }
/////////////////////////////////////////////////////////////////////////////     Banana  END    /////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////???????///      Cake      ////////////??/////////////////////////////////////////////////////////////
else if (the_food_type.includes("Cake") || the_food_type.includes("cakes") || the_food_type.includes("cake") || the_food_type.includes("Cakes") ){
            var markerImage2 = new google.maps.MarkerImage('https://png.icons8.com/color/40/000000/birthday.png',
                new google.maps.Size(40, 40),
                new google.maps.Point(0, 0),
                new google.maps.Point(20, 20));

            let google_marker = new google.maps.Marker({

                // ICON
                icon: markerImage2,
                position: {lat: foodJSON.latitude, lng: foodJSON.longitude},
                map: map,
                optimized: false,
                zIndex:100
            });

                google_marker.addListener('click', function() {

                  if(foodJSON.food_image.length>=1){
                  const current_image_url = "https://s3.amazonaws.com/vulture-food-photos/" + foodJSON.food_image.substring(12);
                        const picture = document.getElementById('foodphotooncard');
                        picture.src = current_image_url;
                        }
                else{
                  const current_image_url = "https://s3.amazonaws.com/vulture-food-photos/defaultvulture.png";
                        const picture = document.getElementById('foodphotooncard');
                        picture.src = current_image_url;
                }
   
                        const current_id = foodJSON._id;
                        const current_title = document.getElementById('currentcardtitle');
                        current_title.innerHTML = foodJSON.food_type + " at " + foodJSON.building+"-"+foodJSON.room;
                        const current_quantity = document.getElementById('current-quantity');
                        current_quantity.innerHTML = "Quantity: "+ foodJSON.quantity;
                        const current_vendor = document.getElementById('current-vendor');
                        current_vendor.innerHTML = "Vendor: "+ foodJSON.vendor;
                        const current_notes = document.getElementById('current-notes');
                        current_notes.innerHTML = "Notes: "+ foodJSON.notes
                        const current_time = document.getElementById('current-time');
                        timeDiff = timeDifference(new Date().toLocaleTimeString(),foodJSON.posting_time, current_id);
                        current_time.innerHTML = timeDiff;
                        document.getElementById('current-distance').innerHTML = ""
                        
function getLocation() {
  navigator.geolocation.getCurrentPosition(
            function(position) {
                var latLngA = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
                var latLngB = new google.maps.LatLng(foodJSON.latitude, foodJSON.longitude);
                var distance = google.maps.geometry.spherical.computeDistanceBetween(latLngA, latLngB);
                document.getElementById('current-distance').innerHTML = "Distance: " + Math.round(distance)+ " meters";
            },
    );
}


getLocation();
    
                        document.getElementById("reportBtn").addEventListener("click", function(){
                                post('/api/report', {'_id' : current_id }, function(result) {});
                                      location.reload();
                        });
                });

    }
/////////////////////////////////////////////////////////////////////////////    Cake  END    /////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////???????///      Coffee      ////////////??/////////////////////////////////////////////////////////////
else if (the_food_type.includes("Coffee") || the_food_type.includes("coffee") || the_food_type.includes("tea") || the_food_type.includes("Tea")||the_food_type.includes("Hot Chocolate") || the_food_type.includes("hot chocolate") ){
            var markerImage2 = new google.maps.MarkerImage('https://png.icons8.com/color/40/000000/espresso-cup.png',
                new google.maps.Size(40, 40),
                new google.maps.Point(0, 0),
                new google.maps.Point(20, 20));

            let google_marker = new google.maps.Marker({

                // ICON
                icon: markerImage2,
                position: {lat: foodJSON.latitude, lng: foodJSON.longitude},
                map: map,
                optimized: false,
                zIndex:100
            });

                google_marker.addListener('click', function() {
                if(foodJSON.food_image.length>=1){
                  const current_image_url = "https://s3.amazonaws.com/vulture-food-photos/" + foodJSON.food_image.substring(12);
                        const picture = document.getElementById('foodphotooncard');
                        picture.src = current_image_url;
                        }
                else{
                  const current_image_url = "https://s3.amazonaws.com/vulture-food-photos/defaultvulture.png";
                        const picture = document.getElementById('foodphotooncard');
                        picture.src = current_image_url;
                }
                        const current_id = foodJSON._id;
                        const current_title = document.getElementById('currentcardtitle');
                        current_title.innerHTML = foodJSON.food_type + " at " + foodJSON.building+"-"+foodJSON.room;
                        const current_quantity = document.getElementById('current-quantity');
                        current_quantity.innerHTML = "Quantity: "+ foodJSON.quantity;
                        const current_vendor = document.getElementById('current-vendor');
                        current_vendor.innerHTML = "Vendor: "+ foodJSON.vendor;
                        const current_notes = document.getElementById('current-notes');
                        current_notes.innerHTML = "Notes: "+ foodJSON.notes
                        const current_time = document.getElementById('current-time');
                        timeDiff = timeDifference(new Date().toLocaleTimeString(),foodJSON.posting_time, current_id);
                        current_time.innerHTML = timeDiff;
                        document.getElementById('current-distance').innerHTML = ""
                
                        
function getLocation() {
  navigator.geolocation.getCurrentPosition(
            function(position) {
                var latLngA = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
                var latLngB = new google.maps.LatLng(foodJSON.latitude, foodJSON.longitude);
                var distance = google.maps.geometry.spherical.computeDistanceBetween(latLngA, latLngB);
                document.getElementById('current-distance').innerHTML = "Distance: " + Math.round(distance)+ " meters";
            },
    );
}


getLocation();
    
                        document.getElementById("reportBtn").addEventListener("click", function(){
                                post('/api/report', {'_id' : current_id }, function(result) {});
                                      location.reload();
                        });
                });

    }
/////////////////////////////////////////////////////////////////////////////    Coffee  END    /////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////??///      Spaghetti/Pasta      ////////////??/////////////////////////////////////////////////////////////
else if (the_food_type.includes("Pasta") || the_food_type.includes("pasta") || the_food_type.includes("Spaghetti") || the_food_type.includes("spaghetti")){
            var markerImage2 = new google.maps.MarkerImage('https://png.icons8.com/color/40/000000/spaghetti.png',
                new google.maps.Size(40, 40),
                new google.maps.Point(0, 0),
                new google.maps.Point(20, 20));

            let google_marker = new google.maps.Marker({

                // ICON
                icon: markerImage2,
                position: {lat: foodJSON.latitude, lng: foodJSON.longitude},
                map: map,
                optimized: false,
                zIndex:100
            });

                google_marker.addListener('click', function() {

                if(foodJSON.food_image.length>=1){
                  const current_image_url = "https://s3.amazonaws.com/vulture-food-photos/" + foodJSON.food_image.substring(12);
                        const picture = document.getElementById('foodphotooncard');
                        picture.src = current_image_url;
                        }
                else{
                  const current_image_url = "https://s3.amazonaws.com/vulture-food-photos/defaultvulture.png";
                        const picture = document.getElementById('foodphotooncard');
                        picture.src = current_image_url;
                }
   
                        const current_id = foodJSON._id;
                        const current_title = document.getElementById('currentcardtitle');
                        current_title.innerHTML = foodJSON.food_type + " at " + foodJSON.building+"-"+foodJSON.room;
                        const current_quantity = document.getElementById('current-quantity');
                        current_quantity.innerHTML = "Quantity: "+ foodJSON.quantity;
                        const current_vendor = document.getElementById('current-vendor');
                        current_vendor.innerHTML = "Vendor: "+ foodJSON.vendor;
                        const current_notes = document.getElementById('current-notes');
                        current_notes.innerHTML = "Notes: "+ foodJSON.notes
                        const current_time = document.getElementById('current-time');
                        timeDiff = timeDifference(new Date().toLocaleTimeString(),foodJSON.posting_time, current_id);
                        current_time.innerHTML = timeDiff;
                        document.getElementById('current-distance').innerHTML = ""
                        
function getLocation() {
  navigator.geolocation.getCurrentPosition(
            function(position) {
                var latLngA = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
                var latLngB = new google.maps.LatLng(foodJSON.latitude, foodJSON.longitude);
                var distance = google.maps.geometry.spherical.computeDistanceBetween(latLngA, latLngB);
                document.getElementById('current-distance').innerHTML = "Distance: " + Math.round(distance)+ " meters";
            },
    );
}


getLocation();
    
                        document.getElementById("reportBtn").addEventListener("click", function(){
                                post('/api/report', {'_id' : current_id }, function(result) {});
                                      location.reload();
                        });
                });

    }
///////////////////////////////////////////////////////////////////////      Spaghetti/Pasta   END    /////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////      DEFAULT      /////////////////////////////////////////////////////////////////////////////
        else{
            var markerImage2 = new google.maps.MarkerImage('https://png.icons8.com/color/40/000000/dining-room.png',
                new google.maps.Size(40, 40),
                new google.maps.Point(0, 0),
                new google.maps.Point(20, 20));

            let google_marker = new google.maps.Marker({

                // ICON
                icon: markerImage2,
                position: {lat: foodJSON.latitude, lng: foodJSON.longitude},
                map: map,
                optimized: false,
                zIndex:100
            });

               google_marker.addListener('click', function() {

                if(foodJSON.food_image.length>=1){
                  const current_image_url = "https://s3.amazonaws.com/vulture-food-photos/" + foodJSON.food_image.substring(12);
                        const picture = document.getElementById('foodphotooncard');
                        picture.src = current_image_url;
                        }
                else{
                  const current_image_url = "https://s3.amazonaws.com/vulture-food-photos/defaultvulture.png";
                        const picture = document.getElementById('foodphotooncard');
                        picture.src = current_image_url;
                }

    const current_id = foodJSON._id;
    const current_title = document.getElementById('currentcardtitle');
    current_title.innerHTML = foodJSON.food_type + " at " + foodJSON.building+"-"+foodJSON.room;
    const current_quantity = document.getElementById('current-quantity');
    current_quantity.innerHTML = "Quantity: "+ foodJSON.quantity;
    const current_vendor = document.getElementById('current-vendor');
    current_vendor.innerHTML = "Vendor: "+ foodJSON.vendor;
    const current_notes = document.getElementById('current-notes');
    current_notes.innerHTML = "Notes: "+ foodJSON.notes
    const current_time = document.getElementById('current-time');
    timeDiff = timeDifference(new Date().toLocaleTimeString(),foodJSON.posting_time, current_id);
    current_time.innerHTML = timeDiff;
    document.getElementById('current-distance').innerHTML = ""
                        
function getLocation() {
  navigator.geolocation.getCurrentPosition(
            function(position) {
                var latLngA = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
                var latLngB = new google.maps.LatLng(foodJSON.latitude, foodJSON.longitude);
                var distance = google.maps.geometry.spherical.computeDistanceBetween(latLngA, latLngB);
                document.getElementById('current-distance').innerHTML = "Distance: " + Math.round(distance)+ " meters";
            },
    );
}


getLocation();




document.getElementById("reportBtn").addEventListener("click", function(){


  post('/api/report', {'_id' : current_id }, function(result) {
      //console.log("HERE!!!!");
    });
  
location.reload();
  });



            });
        }
////////////////////////////////////////////////////////////////////////////      DEFAULT ENG      /////////////////////////////////////////////////////////////////////////////
 
 
            






        });
    });
  
}












///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
////////?????//      NOTIFICATIONS         ///////////////
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////

// Notification.requestPermission(function(status) {
//     console.log('Notification permission status:', status);
// });


// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', function() {
//     navigator.serviceWorker.register('/sw.js').then(function(registration) {
//       // Registration was successful
//       console.log('ServiceWorker registration successful with scope: ', registration.scope);
//     }, function(err) {
//       // registration failed
//       console.log('ServiceWorker registration failed: ', err);
//     });
//   });
// }

// function subscribeUser() {
//   if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.ready.then(function(reg) {

//       reg.pushManager.subscribe({
//         userVisibleOnly: true
//       }).then(function(sub) {
//         console.log('Endpoint URL: ', sub.endpoint);
//       }).catch(function(e) {
//         if (Notification.permission === 'denied') {
//           console.warn('Permission for notifications was denied');
//         } else {
//           console.error('Unable to subscribe to push', e);
//         }
//       });
//     })
//   }
// }


// function displayNotification() {
//   if (Notification.permission == 'granted') {
//     console.log(navigator)
//     navigator.serviceWorker.getRegistration().then(function(reg) {
//       var options = {
//         body: 'Here is a notification body!',
//         vibrate: [100, 50, 100],
//         data: {
//           dateOfArrival: Date.now(),
//           primaryKey: 1
//         }
//         // actions: [
//         //   {action: 'explore', title: 'Explore this new world',
//         //     icon: 'images/checkmark.png'},
//         //   {action: 'close', title: 'Close notification',
//         //     icon: 'images/xmark.png'},
//         // ]
//       };
//       reg.showNotification('Food alert!', options);
//     });
//   }
// }



