function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: { lat: 40.7128, lng: -74.0060 } // Center on New York City
    });

    const zipCodes = ['10001', '10002', '10003']; // Example zip codes in NYC

    zipCodes.forEach(function(zipCode, index) {
        fetch(`http://localhost:3000/zipcode?zip=${zipCode}`)
            .then(response => response.json())
            .then(data => {
                // Assuming the data returned is in GeoJSON format or similar
                var zipPolygon = new google.maps.Polygon({
                    paths: data.coordinates, // Make sure this matches your actual data structure
                    strokeColor: getRandomColor(), // Function call to get a random color
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: getRandomColor(), // You could use the same color or another random one
                    fillOpacity: 0.35
                });

                zipPolygon.setMap(map);
            })
            .catch(error => console.error('Error fetching data:', error));
    });
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
