const username = document.getElementById("username");
const checkInBtn = document.getElementById("check-in");
const checkOutBtn = document.getElementById("check-out");
const getMyLocationBtn = document.getElementById("location");
const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

function getUserLocation() {
//   navigator.geolocation.getCurrentPosition(success, error);

  const success = (position) => {
    getMyLocationBtn.innerHTML = "please wait...";

    const locationBar = document.getElementById("location-bar");

    console.log(position);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log(latitude, longitude);

    const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;

    fetch(geoApiUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        
        locationBar.style.border = "1px solid green";
        locationBar.style.borderStyle = "dashed";
        locationBar.innerHTML = `you're working from "${data.city}"`;
        getMyLocationBtn.innerHTML = "Get My Location";
      });
  };

  const error = () => {
    console.log("could not find state");
    locationBar.textContent = "Could not find location";
  };

  navigator.geolocation.getCurrentPosition(success, error);
}

// getMyLocationBtn.addEventListener("click", getUserLocation);

window.addEventListener("load", getUserLocation);
getMyLocationBtn.addEventListener("click", getUserLocation);

checkInBtn.addEventListener("click", () => {
  checkInBtn.disabled = true;
  checkOutBtn.disabled = true;
  checkInBtn.textContent = "Checking in...";
});
