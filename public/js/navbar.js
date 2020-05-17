function newNavbarItem(text, url,id) {
  itemLink = document.createElement('a');
  itemLink.className = 'nav-item nav-link';
  itemLink.innerHTML = text;
  itemLink.href = url;
  itemLink.id = id;


  return itemLink
}


function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}


function renderNavbar(user) {
  const navbarDiv = document.getElementById('nav-item-container');
  const enavbar = document.getElementById('entirenavbar');

  navbarDiv.appendChild(newNavbarItem('Home', '/'));
//  console.log(user);
  // NOTE: this check is a lowkey hack
  if (user._id) {
    navbarDiv.appendChild(newNavbarItem('About', '/about',"aboutlink"));
    // navbarDiv.appendChild(newNavbarItem('Settings', '/settings', 'settingslink'));
    navbarDiv.appendChild(newNavbarItem('Profile', '/u/profile?'+user._id, 'profilelink'));
      

    document.getElementById('profilelink').setAttribute('data-onsuccess', 'onSignIn')
    navbarDiv.appendChild(newNavbarItem('Logout', '/loggout','logoutlink'));

    const button_link = document.createElement('a');
    button_link.href = "/postfood";
    const post_button = document.createElement('button');
    button_link.setAttribute("role" , "button");
    button_link.className = 'btn btn-success activee postbutton';
    button_link.innerHTML = '<div><strong>+</strong> Post Free Food</div>'
    //button_link.appendChild(post_button);
    navbarDiv.appendChild(button_link);

  } else {
    navbarDiv.appendChild(newNavbarItem('About', '/about', 'aboutlink'));
    navbarDiv.appendChild(newNavbarItem('Login', '/auth/google','loginlink'));
    document.getElementById('loginlink').setAttribute('data-onsuccess', 'onSignIn')


    const post_button = document.createElement('button');
    post_button.setAttribute("disabled","true");
    post_button.className = 'btn btn-success opaque disabled';
    post_button.innerHTML = 'Please Login To Post Free Food';
    navbarDiv.appendChild(post_button);
  }
}



