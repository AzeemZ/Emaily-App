const localtunnel = require("localtunnel");

localtunnel(5000, { subdomain: "lndgkekgnrkrj" }, function(err, tunnel) {
  console.log("LT running");
});
