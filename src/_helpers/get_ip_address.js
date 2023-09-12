export { getIpAddress }

function getIpAddress(){
    const ip =  fetch("https://geolocation-db.com/json/")
        .then(response => {
            return response.json();
        }, "jsonp")
        .then(res => {
            return res.IPv4
        })
        .catch(err => {
            return false;
        })

        return ip;
}