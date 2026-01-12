const socket = io();

socket.emit('msg_from_partner', 'i am partner');

socket.on('mfb', (msg) => {
    console.log('partner is printing',msg);
})

const setloc = () => {

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude =  position.coords.longitude;

                // console.log("Latitude:", latitude);
                // console.log("Longitude:", longitude);

                socket.emit('msg_from_partner', `partner Loc : latitude: ${latitude}, longitude : ${longitude}`);
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