var locations = [
    {
    	name: 'Dunkin Donuts',
        lat: 24.657961,
        long: 46.694438,
        street: "King Fahd Road",
        city: "Riyadh",
        id: 0
    },
    {
       name: 'STARBUCKS',
        lat: 24.663881,
		long: 46.683205,
        street: "King Fahd Road",
        city: "Riyadh", 
        //visible: ko.observable(true),     
        id: 1
    },
    {
       name: 'AANI & DANI',
        lat: 24.664095,
		long:46.678899 ,
        street: "Abdulrahman Alghafiqi St",
        city: "Riyadh",
        //visible: ko.observable(true),
        id: 2
          },{
        name: 'Crown Prince Park',
        lat: 24.711497,
		long: 46.668265,
        street: "Almaather District",
        city: "Riyadh",
        //visible: ko.observable(true),
        id: 3
    },{
       name: 'Al Sayad Seafood',
        lat: 24.693112,
		long: 46.676738,
        street: "Tahlia St.",
        city: "Riyadh",
        //visible: ko.observable(true),
        id: 4
    }];


// declaring global variable
var map;

var Location = function(data){
	var self = this ;

	self.name = ko.observable(data.name);
	self.lat = ko.observable(data.lat);
	self.lng = ko.observable(data.lng);
	self.street = ko.observable(data.street);
	self.city = ko.observable(data.city);
	self.visible = ko.observable(true);


	console.log(self.name());

	self.contentString = '<div class="info-window-content"><div class="title"><b>' + self.name() + "</b></div>" +
        '<div class="content">' + self.street() + "</div>" +
        '<div class="content">' + self.city() + "</div>" ;

   this.infoWindow = new google.maps.InfoWindow({
    content: self.contentString
   	});
   var marker = new google.maps.Marker({
    position: new google.maps.LatLng(data.lat, data.long),
    map: map,
    title: data.name
  });
   
  marker.addListener('click', function() {
  	self.contentString = '<div class="info-window-content"><div class="title"><b>' + self.name() + "</b></div>" +
        '<div class="content">' + self.street() + "</div>" +
        '<div class="content">' + self.city() + "</div>" ;
  	self.infoWindow.setContent(self.contentString);

    self.infoWindow.open(map, this);

	});
  // link the list with the infoWindow 
	 this.bounce = function(place) {
		google.maps.event.trigger(marker, 'click');
		console.log(place)
	};

  this.showMarker = ko.computed(function() {
  	// loops in the locations to make the marker visible 
		for (var i = 0; i > locations.length - 1; i++) {
				if(locations[i].visible() === true) {
					this.marker.setMap(map);
				} else {
					this.marker.setMap(null);
				}
		}
		return true;
	}, this);
};
 function ViewModel() {
 	var self = this ;
 	
	this.locationList = ko.observableArray([]);

	map = new google.maps.Map(document.getElementById('map'), {
			zoom: 10,
			center: {lat: 24.774265, lng: 46.738586}
	});
   
	locations.forEach(function(locationItem){
		self.locationList.push( new Location(locationItem));
		console.log(locationItem);
	});
	
    
	// showimg the list  
    this.filteredList = ko.computed( function() {
            self.locationList().forEach(function(locationItem){
				locationItem.visible();
			});
            return self.locationList();
    }, self);
 
   
 }
      
function startApp() {
	ko.applyBindings(new ViewModel());
}

function errorHandling() {
	alert(" Google Maps has failed to load ");
}
