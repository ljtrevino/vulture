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


    // console.log(current);
    // console.log(previous);
    // console.log("//////////////////////");
    // console.log(currentSecs);
    // console.log(previousSecs);
    // console.log(elapsed);
    // console.log("//////////////////////");
    // console.log(currentArr[0]+","+currentArr[1]+","+currentArr[2]);
    // console.log(previousArr[0]+","+previousArr[1]+","+previousArr[2]);
    
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



function foodDOMObject(foodJSON) {
  const row = document.createElement('tr');
  row.setAttribute('id', foodJSON._id);
  row.addEventListener("click", function() {
    //UPDATE CARD
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
    document.getElementById('current-distance').innerHTML = "";
                        
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
      console.log("HERE!!!!");
    });
  
location.reload();
  });



});
  row.className = 'foodRow';

  const type = document.createElement('td');
  type.className = "type pointer";
  type.innerHTML = foodJSON.food_type;
  row.appendChild(type);

  const building = document.createElement('td');
  building.className = "building pointer";
  building.innerHTML = foodJSON.building;
  row.appendChild(building);

  const room = document.createElement('td');
  room.className = "room pointer";
  room.innerHTML = foodJSON.room;
  row.appendChild(room);

  const quantity = document.createElement('td');
  quantity.className = "quantity pointer";
  quantity.innerHTML = foodJSON.quantity;
  row.appendChild(quantity);

  const vendor = document.createElement('td');
  vendor.className = "vendor pointer";
  vendor.innerHTML = foodJSON.vendor;
  row.appendChild(vendor);

  const time = document.createElement('td');
  time.className = "time pointer";
  time.innerHTML = timeDifference(new Date().toLocaleTimeString(),foodJSON.posting_time);//change to difference in time
  row.appendChild(time);






// Distance


//   const dist = document.createElement('td');
//   dist.className = "dist pointer";
//   dist.innerHTML = "Calculating...";
// function getLocation() {
//   navigator.geolocation.getCurrentPosition(
//             function(position) {
//                 var latLngA = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
//                 var latLngB = new google.maps.LatLng(foodJSON.latitude, foodJSON.longitude);
//                 var distance = google.maps.geometry.spherical.computeDistanceBetween(latLngA, latLngB);
//                 dist.innerHTML = Math.round(distance)+ " meters";
//             },
//     );
// }


// getLocation();


//   row.appendChild(dist);

  return row;
}




function renderFood(user) {
  const foodTableBody = document.getElementById('table-body');

$("#table-body tr").remove(); 
setTimeout(renderFood, 30000);

  get('/api/food', {}, function(FoodArr) {
    
///////////////////////////////////////////////////////////////
// SORT BY BUILDING
    // const building = document.getElementById('th-building');
    // building.addEventListener("click", function() {
    //     //console.log(FoodArr.building);

    //     building_list = []
    //     var building_dict = {};

    //     for (let i = 0; i < FoodArr.length; i++) {
    //       building_list.push(FoodArr[i].building);
    //       building_dict[FoodArr[i].building] = i;

    //       // console.log(building_list[i]);
    //     }

    //     building_list.sort(function(a, b) {
    //   return /[A-Za-z]/.test(a.a) - /[A-Za-z]/.test(b.a) || (a.a.toUpperCase() < b.a.toUpperCase() ? -1 : a.a.toUpperCase() > b.a.toUpperCase() ? 1 : 0)
    // });

    //       $("#table-body tr").remove(); 
    //     for (let j = 0; j < FoodArr.length; j++) {
    //       const currentFood = FoodArr[building_dict[building_list[j]]];
    //       const food = foodDOMObject(currentFood);
    //       foodTableBody.append(food);
    //     }

    // });

///////////////////////////////////////////////////////////////
// SORT BY TYPE
    const type = document.getElementById('th-type');
    type.addEventListener("click", function() {

        type_list = []
        var type_dict = {};

        for (let i = 0; i < FoodArr.length; i++) {
          type_list.push(FoodArr[i].food_type);
          type_dict[FoodArr[i].food_type] = i;

        }

        type_list.sort(function (a, b) {
    return a.toLowerCase().localeCompare(b.toLowerCase());
});


          $("#table-body tr").remove(); 
        for (let j = 0; j < FoodArr.length; j++) {
          const currentFood = FoodArr[type_dict[type_list[j]]];
          const food = foodDOMObject(currentFood);
          foodTableBody.append(food);
        }

    });
///////////////////////////////////////////////////////////////
// SORT BY ROOM
//         const room = document.getElementById('th-room');
//     room.addEventListener("click", function() {

//         room_list = []
//         var room_dict = [];

//         for (let i = 0; i < FoodArr.length; i++) {
//           room_list.push(FoodArr[i].room);
//           room_dict.push([FoodArr[i].room,FoodArr[i]._id])
//         }
//         // console.log(quant_list);
//         Array.prototype.alphanumSort = function(caseInsensitive) {
//   for (var z = 0, t; t = this[z]; z++) {
//     this[z] = [];
//     var x = 0, y = -1, n = 0, i, j;

//     while (i = (j = t.charAt(x++)).charCodeAt(0)) {
//       var m = (i == 46 || (i >=48 && i <= 57));
//       if (m !== n) {
//         this[z][++y] = "";
//         n = m;
//       }
//       this[z][y] += j;
//     }
//   }


//   room_list.sort(function(a, b) {
//     for (var x = 0, aa, bb; (aa = a[x]) && (bb = b[x]); x++) {
//       if (caseInsensitive) {
//         aa = aa.toLowerCase();
//         bb = bb.toLowerCase();
//       }
//       if (aa !== bb) {
//         var c = Number(aa), d = Number(bb);
//         if (c == aa && d == bb) {
//           return c - d;
//         } else return (aa > bb) ? 1 : -1;
//       }
//     }
//     return a.length - b.length;
//   });

//   for (var z = 0; z < this.length; z++)
//     this[z] = this[z].join("");
// }


//           $("#table-body tr").remove(); 
//        for (let j = 0; j < FoodArr.length; j++) {
//           for (let i = 0; i < FoodArr.length; i++) {
//             for(let k=0; k<FoodArr.length;k++){

//           if (room_list[j] === room_dict[k][0] && room_dict[k][1] === FoodArr[i]._id){
//             const food = foodDOMObject(FoodArr[i]);
//             foodTableBody.prepend(food);
//           }}
//         }
//         }

//     });

// ///////////////////////////////////////////////////////////////
// // SORT BY QUANTITY
//         const quant = document.getElementById('th-quantity');
//     quant.addEventListener("click", function() {

//         quant_list = []
//         var quant_dict = [];

//         for (let i = 0; i < FoodArr.length; i++) {
//           quant_list.push(FoodArr[i].quantity);
//           quant_dict.push([FoodArr[i].quantity,FoodArr[i]._id])
//         }
//         // console.log(quant_list);
//         Array.prototype.alphanumSort = function(caseInsensitive) {
//   for (var z = 0, t; t = this[z]; z++) {
//     this[z] = [];
//     var x = 0, y = -1, n = 0, i, j;

//     while (i = (j = t.charAt(x++)).charCodeAt(0)) {
//       var m = (i == 46 || (i >=48 && i <= 57));
//       if (m !== n) {
//         this[z][++y] = "";
//         n = m;
//       }
//       this[z][y] += j;
//     }
//   }


//   quant_list.sort(function(a, b) {
//     for (var x = 0, aa, bb; (aa = a[x]) && (bb = b[x]); x++) {
//       if (caseInsensitive) {
//         aa = aa.toLowerCase();
//         bb = bb.toLowerCase();
//       }
//       if (aa !== bb) {
//         var c = Number(aa), d = Number(bb);
//         if (c == aa && d == bb) {
//           return c - d;
//         } else return (aa > bb) ? 1 : -1;
//       }
//     }
//     return a.length - b.length;
//   });

//   for (var z = 0; z < this.length; z++)
//     this[z] = this[z].join("");
// }



//      console.log('/////////////////');   
// console.log(quant_list);
// console.log(quant_dict);
//           $("#table-body tr").remove(); 
//        for (let j = 0; j < FoodArr.length; j++) {
//           for (let i = 0; i < FoodArr.length; i++) {
//             for(let k=0; k<FoodArr.length;k++){

//           if (quant_list[j] === quant_dict[k][0] && quant_dict[k][1] === FoodArr[i]._id){
//             const food = foodDOMObject(FoodArr[i]);
//             foodTableBody.append(food);
//           }}
//         }
//         }

//     });

///////////////////////////////////////////////////////////////
// SORT BY DISTANCE



// const dist = document.getElementById('th-dist');
//     dist.addEventListener("click", function() {

//         dist_list = []
//         var dist_dict = {};

//         for (let i = 0; i < FoodArr.length; i++) {
//           function getLocation() {
//   navigator.geolocation.getCurrentPosition(
//             function(position) {
//                 var latLngA = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
//                 var latLngB = new google.maps.LatLng(FoodArr.latitude, FoodArr.longitude);
//                 var distance = google.maps.geometry.spherical.computeDistanceBetween(latLngA, latLngB);
//                 dist_list.push(Math.round(distance));
//                 dist_dict[Math.round(distance)] = i
//             },
//     );
// }

// //TEST
// for (let j = 0; j < FoodArr.length; j++) {
//   console.log(dist_list[j]); //undefined
// }



// getLocation()
//         }

//         dist_list.sort(function(a, b){return a-b});

//           $("#table-body tr").remove(); 
//         for (let j = 0; j < FoodArr.length; j++) {
//           const currentFood = FoodArr[dist_dict[dist_list[j]]];
//           console.log (dist_dict[dist_list[j]]);
//           const food = foodDOMObject(currentFood);
//           foodTableBody.append(food);
//         }

//     });


///////////////////////////////////////////////////////////////
// SORT BY VENDOR

// const vendor = document.getElementById('th-vendor');
//     vendor.addEventListener("click", function() {


//         vendor_list = []
//         var vendor_dict = {};

//         for (let i = 0; i < FoodArr.length; i++) {
//           vendor_list.push(FoodArr[i].vendor);
//           vendor_dict[FoodArr[i].vendor] = i;
 
//         }

//         vendor_list.sort(function (a, b) {
//     return a.toLowerCase().localeCompare(b.toLowerCase());
// });


//           $("#table-body tr").remove(); 
//         for (let j = 0; j < FoodArr.length; j++) {
//           const currentFood = FoodArr[vendor_dict[vendor_list[j]]];
//           const food = foodDOMObject(currentFood);
//           foodTableBody.append(food);
//         }

//     });

///////////////////////////////////////////////////////////////
// SORT BY TIME

// const time = document.getElementById('th-time');
//     time.addEventListener("click", function() {

//           $("#table-body tr").remove(); 
//         for (let i = 0; i < FoodArr.length; i++) {
//       const currentFood = FoodArr[i];
//       const food = foodDOMObject(currentFood);
//       foodTableBody.prepend(food);

//     }

//     });

    const ti = document.getElementById('th-time');
    ti.addEventListener("click", function() {

        ti_list = [];

        for (let i = 0; i < FoodArr.length; i++) {
          ti_list.push(timeSecs(new Date().toLocaleTimeString(),FoodArr[i].posting_time,FoodArr[i]._id));
        }

ti_list = ti_list.sort(Comparator);
console.log(ti_list);

          $("#table-body tr").remove(); 

        for (let j = 0; j < FoodArr.length; j++) {
          for (let i = 0; i < FoodArr.length; i++) {
          if (ti_list[j][1] === FoodArr[i]._id){
            const food = foodDOMObject(FoodArr[i]);
            foodTableBody.prepend(food);
          }
        }
        }

    });

///////////////////////////////////////////////////////////////
// DEFAULT TABLE INITIALIZATION
   
    for (let i = 0; i < FoodArr.length; i++) {
      const currentFood = FoodArr[i];
      const food = foodDOMObject(currentFood);
      foodTableBody.prepend(food);

    }






  });
}

 function Comparator(a, b) {
   if (a[1] < b[1]) return -1;
   if (a[1] > b[1]) return 1;
   return 0;
 }

function orderKeys(obj, expected) {

  var keys = Object.keys(obj).sort(function keyOrder(k1, k2) {
      if (k1 < k2) return -1;
      else if (k1 > k2) return +1;
      else return 0;
  });

  var i, after = {};
  for (i = 0; i < keys.length; i++) {
    after[keys[i]] = obj[keys[i]];
    delete obj[keys[i]];
  }

  for (i = 0; i < keys.length; i++) {
    obj[keys[i]] = after[keys[i]];
  }
  return obj;
}





function timeSecs(current, previous, current_id) {
    
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
    return [elapsed, current_id]
}

