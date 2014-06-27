function initialize() {     
    var markers = [];

	var myLatlng = new google.maps.LatLng(25.019530, 121.541258);
	var mapOptions = {
		zoom: 17,
		center: myLatlng
	};

	var map = new google.maps.Map(document.getElementById('map'), mapOptions);

    var restaurants = [], places = [];

    $.ajax({
        url: 'data/result.txt', 
        success: function(rawData) {
            //alert(rawData);
            restaurants = rawData.split('--------------------');
            //alert(restaurants);
            
            for (var i=0; i < restaurants.length - 1; i++) {
                addMarker(restaurants[i], i);
                /*var info = restaurants[i].split('\n');
                var offset = i == 0 ? 0 : 1;
                //alert(restaurants[i]);
                var tmp = info[3 + offset].split(',');
                var LatLng = new google.maps.LatLng(parseFloat(tmp[0]), parseFloat(tmp[1]));
                //alert(tmp);
                
                var marker = new google.maps.Marker({
                    position: LatLng,
                    map: map, 
                    title: info[0 + offset]
                });
                
                places.push(marker);
                
                var a = document.createElement('a');
                a.setAttribute('id', 'restaurant_' + parseInt(info[1 + offset]));
                a.setAttribute('class', 'fancybox fancybox.iframe');
                a.setAttribute('href', 'restaurant.html?id=' + parseInt(info[1 + offset]));
                $('body').append(a);
                
                google.maps.event.addListener(marker, 'click', function() {
                    var ID = parseInt(info[1 + offset]);
                    jQuery(document).ready(function() {
                        $('#restaurant_' + ID).trigger('click');
                        map.setCenter(marker.getPosition());
                    });
                });*/
            }
        }
    });
    
    function addMarker (place, index){
        var info = place.split('\n');
        var offset = index == 0 ? 0 : 1;
        //alert(restaurants[i]);
        var tmp = info[3 + offset].split(',');
        var LatLng = new google.maps.LatLng(parseFloat(tmp[0]), parseFloat(tmp[1]));
        //alert(tmp);
        
        var marker = new google.maps.Marker({
            position: LatLng,
            map: map, 
            title: info[0 + offset]
        });
        
        var ID = parseInt(info[1 + offset]);
        
        var a = document.createElement('a');
        a.setAttribute('id', 'restaurant_' + ID);
        a.setAttribute('class', 'fancybox fancybox.iframe');
        a.setAttribute('href', 'restaurant.html?id=' + ID);
        $('body').append(a);
        
        google.maps.event.addListener(marker, 'click', function() {
            jQuery(document).ready(function() {
                $('#restaurant_' + (ID)).trigger('click');
                map.setCenter(marker.getPosition());
            });
        });
    }
    
	/*var marker = new google.maps.Marker({
	  position: myLatlng,
	  map: map,
	  title: 'Uluru (Ayers Rock)'
	});*/
	
	//Link to restaurant part
	/*google.maps.event.addListener(marker, 'click', function() {
		$id=1;
		document.getElementById("autoclick").href="restaurant.html?id="+$id;
		jQuery(document).ready(function() 
		{ $("#autoclick").trigger('click'); }); 
	});*/
	
	// Create the search box and link it to the UI element.
    var input = /** @type {HTMLInputElement} */(
        document.getElementById('pac-input'));
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    var searchBox = new google.maps.places.SearchBox(
        /** @type {HTMLInputElement} */(input));
     
	// Listen for the event fired when the user selects an item from the
    // pick list. Retrieve the matching places for that item.
    google.maps.event.addListener(searchBox, 'places_changed', function() {
        var places = searchBox.getPlaces();
        
        for (var i = 0, marker; marker = markers[i]; i++) {
            marker.setMap(null);
        }

        // For each place, get the icon, place name, and location.
        markers = [];
        var bounds = new google.maps.LatLngBounds();
        
        for (var i = 0, place; place = places[i]; i++) {
            var image = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };
            
            // Create a marker for each place.
            var marker = new google.maps.Marker({
                map: map,
                icon: image,
                title: place.name,
                position: place.geometry.location
            });
            
            markers.push(marker);
            
            bounds.extend(place.geometry.location);
        }
        
        map.fitBounds(bounds);
    });

    // Bias the SearchBox results towards places that are within the bounds of the
    // current map's viewport.
    google.maps.event.addListener(map, 'bounds_changed', function() {
        var bounds = map.getBounds();
        searchBox.setBounds(bounds);
    });
}

google.maps.event.addDomListener(window, 'load', initialize);
