function loadMap(){
  var mapProp = {
    center:new google.maps.LatLng( 41.384279176844764,2.1526336669921875),
    zoom:14,
    mapTypeId:google.maps.MapTypeId.ROADMAP
  };

  var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);

  const delimitation = new CustomEvent("delimitation");
  const markers = [];
  google.maps.event.addListener(map, 'click', function(event) {
    console.log(`click`);

    const marker = new google.maps.Marker({
      position: new google.maps.LatLng(event.latLng.lat(),event.latLng.lng()),
      map: map,
    });
    delimitation.lng = event.latLng.lng();
    delimitation.lat = event.latLng.lat();
    document.dispatchEvent(delimitation);
    google.maps.event.addListener(marker,'click',function() {
      poly.setMap(null);
      google.maps.event.clearListeners(map, 'mousemove');
      const myTrip = polygon.map(function (coord) {
        return new google.maps.LatLng(coord[0],coord[1]);
      });

      const flightPath = new google.maps.Polygon({
        path:myTrip,
        strokeColor:"#0000FF",
        strokeOpacity:0.8,
        strokeWeight:1,
        fillColor:"#0000FF",
        fillOpacity:0.1
      });

      flightPath.setMap(map);

    });



    delimitation.lng = event.latLng.lng();
    delimitation.lat = event.latLng.lat();
    document.dispatchEvent(delimitation);




  });
  const path = [];
  const polygon = [  ];
  let listenerHandle;
  let poly;
  let tempDelimitation;

  document.addEventListener("delimitation", function(e) {
    path.push(new google.maps.LatLng( e.lat,e.lng));
    polygon.push([e.lat, e.lng]);



    listenerHandle=google.maps.event.addListener(map, 'mousemove', function (event) {
      if (polygon.length > 1) {
        polygon.push(new google.maps.LatLng( event.latLng.lat(),event.latLng.lng()));

        if (tempDelimitation !== undefined) {
          tempDelimitation.setMap(null);
        }
        const myTrip = polygon.map(function (coord) {
          return new google.maps.LatLng(coord[0],coord[1]);
        });

        const flightPath = new google.maps.Polygon({
          path:myTrip,
          strokeColor:"#0000FF",
          strokeOpacity:0.8,
          strokeWeight:1,
          fillColor:"#0000FF",
          fillOpacity:0.1
        });
        polygon.pop();
        if (tempDelimitation !== undefined) {

          tempDelimitation.setMap(map);
        }
      }

      path.push(new google.maps.LatLng( event.latLng.lat(),event.latLng.lng()));
      if (poly !== undefined) {
        poly.setMap(null);
      }

      poly = new google.maps.Polyline({
        path: path,
        geodesic: true,
        strokeColor: '#1f38ff',
        strokeOpacity: 1.0,
        strokeWeight: 2,

      });

      poly.setMap(map);
      if (path.length>1) {
        path.pop();
      }
    });
  });

}