function main() {
  get('/api/whoami', {}, function(user) {
    console.log(user);
    renderNavbar(user);
    renderFood(user);
  });
}

main();
