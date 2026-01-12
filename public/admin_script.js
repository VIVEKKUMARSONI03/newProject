const loc = document.getElementById('aloc');
const nm = ducument.getElementById('name');
const socket = io();



socket.emit('msg_from_admin', 'i am admin');

socket.on('mfb', (msg) => {
    console.log('admin is printing:', msg);
})

const setloc = () => {

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude =  position.coords.longitude;

                // console.log("Latitude:", latitude);
                // console.log("Longitude:", longitude);

                //socket.emit('msg_from_admin', `admin Loc : latitude: ${latitude}, longitude : ${longitude}`);
                socket.emit({latitude:latitude, longitude: longitude, location: loc.textContent, name: nm.textContent});
            },
            (error) => {
                console.error("Error getting location:", error.message);
            }
        );
    } else {
        console.log("Geolocation is not supported");
    }

}

setInterval(setloc,3000);