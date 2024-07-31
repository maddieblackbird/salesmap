function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: { lat: 37.7749, lng: -122.4194 } // Center on San Francisco
    });

    const zipCodes = ['94103', '94107', '94110']; // List of zip codes to outline

    zipCodes.forEach(function(zipCode) {
        // Fetching data from your local server endpoint
        fetch(`http://localhost:3000/zipcode?zip=${zipCode}`)
            .then(response => response.json())
            .then(data => {
                // Assuming data includes the necessary lat, lng, and other boundary info
                // If the API response structure is different, you might need to adjust how you access these values
                var bounds = data.zip_codes.map(zip => ({ lat: zip.lat, lng: zip.lng }));

                var zipPolygon = new google.maps.Polygon({
                    paths: bounds,
                    strokeColor: '#FF0000',
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: '#FF0000',
                    fillOpacity: 0.35
                });

                zipPolygon.setMap(map);
            })
            .catch(error => console.error('Error fetching data:', error));
    });
}
