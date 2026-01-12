const socket = io();

socket.emit('mff', 'i am partner');

socket.on('mfb', (msg) => {
    console.log(msg);
})

const setloc = () => {

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude =  position.coords.longitude;

                // console.log("Latitude:", latitude);
                // console.log("Longitude:", longitude);

                socket.emit('mff', `partner Loc : latitude: ${latitude}, longitude : ${longitude}`);
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