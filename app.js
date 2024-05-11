
const username = document.getElementById("username");
const checkInBtn = document.getElementById("check-in");
const checkOutBtn = document.getElementById("check-out");
const getMyLocationBtn = document.getElementById("location");


function getUserLocation() {
  const success = (position) => {

    const locationBar = document.getElementById("location-bar");


    console.log(position);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log(latitude, longitude);

    const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;

    fetch(geoApiUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.city);
       locationBar.innerHTML = `youre working from "${data.city}"`;
       
      });
      
  };

  const error = () => {
    console.log("could not find state");
    locationBar.textContent = "Could not find location";
  };

  navigator.geolocation.getCurrentPosition(success, error);
}



getMyLocationBtn.addEventListener("click", getUserLocation);
checkInBtn.addEventListener("click", () => {
  checkInBtn.disabled = true;
  checkOutBtn.disabled = true;
  checkInBtn.textContent = "Checking in...";
});
