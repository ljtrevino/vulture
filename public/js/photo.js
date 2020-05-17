var albumBucketName = 'vulture-food-photos';//
var bucketRegion = 'us-east-1';
var IdentityPoolId = 'us-east-1:dc8f508f-91f7-4352-adf4-fa7425ff7a47';
//

//update the configurations for AWS to use our credentials
AWS.config.update({
  region: bucketRegion,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: IdentityPoolId
  })
});

//create an S3 instance that we can use to access the databaseph
var s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  params: {Bucket: albumBucketName}
});

// //get all the data from the bucket and call addAllPhotos to display it
// function viewAlbum() {
//   s3.listObjects({}, function(err, data) {
//     if (err) {
//       return alert('There was an error viewing your album: ' + err.message);
//     }
//     // `this` references the AWS.Response instance that represents the response
//     var href = this.request.httpRequest.endpoint.href;
//     console.log(href)
//     var bucketUrl = "https://s3.amazonaws.com/" + albumBucketName + '/';
//     addAllPhotos(bucketUrl, data)
//   });
// }




// //adds all the photos located in the bucket (from gallery.js from class)
// function addAllPhotos(bucketUrl, data){
//   document.getElementById("photogrid").innerHTML = "";
//   for (i = 0; i < data.Contents.length; i++){

// //display photo
// function viewPhoto() {
//   s3.listObjects({}, function(err, data) {
//     if (err) {
//       return alert('There was an error viewing your photo: ' + err.message);
//     }
//     // `this` references the AWS.Response instance that represents the response
//     var href = this.request.httpRequest.endpoint.href;
//     console.log(href)
//     var bucketUrl = "https://s3.amazonaws.com/" + albumBucketName + '/';
//     addAllPhotos(bucketUrl, data)
//   });
// }

//adds a photo to our S3 database
function addPhoto() {
  //get the file out of the upload widget	
  var files = document.getElementById('photoupload').files;
  if (!files.length) {
    // return alert('Please choose a file to upload first.');
  } else { 
  var file = files[0];
  var photoKey = files[0].name;
  }
console.log(file);
console.log(photoKey);

  console.log('Upload part 1');

  //TODO: upload the file to s3

  if (!files.length) {
    window.location.replace("/");
  } else { 
    s3.upload({
      Key: photoKey,
      Body: file,
      ACL: 'public-read'
    }, function(err, data) {
      if (err) {
        console.log(err);
        return alert('There was an error uploading your photo: ', err.message);
      }
      console.log('Successfully uploaded photo.');
      window.location.replace("/");
      // viewPhoto();
    });
  }
}


const submitBTN = document.getElementById('submit-button');
const building = document.getElementById('tags');
const room = document.getElementById('roomInput');
const type = document.getElementById('typeInput');
const quantity = document.getElementById('quantInput');
const vendor = document.getElementById('vendInput');
const notes = document.getElementById('notesInput');
const photo = document.getElementById('photoupload');

submitBTN.addEventListener("click", function() {
  if (building.value === ''){
    alert("Please enter a building number");
  }

  else if (room.value === ''){
  alert("Please enter a room number");
  }
  
// add additional checks here

  else{

  this.disabled = true;


  addPhoto();
  

  post('/api/findfood',{
      'food_type': type.value,
      'building': building.value,
      'room': room.value,
      'quantity': quantity.value,
      'vendor': vendor.value,
      'notes': notes.value,
      'food_image': photo.value

    })}
  });




