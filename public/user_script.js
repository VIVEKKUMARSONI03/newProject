const loc = document.getElementById('uloc');
const nm = document.getElementById('name');
const socket = io();

socket.emit('msg_from_user', 'i am a user');

socket.on('mfb', (msg) => {
    //console.log(msg);
})

const setloc = () => {

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude =  position.coords.longitude;

                // console.log("Latitude:", latitude);
                // console.log("Longitude:", longitude);

                socket.emit('msg_from_user', {latitude: latitude, longitude:longitude, location : loc.textContent, name: nm.textContent});
            },
            (error) => {
                console.error("Error getting location:", error.message);
            }
        );
    } else {
        console.log("Geolocation is not supported");
    }

}

setInterval(setloc,500);

