

function loadMap() {
  const path = [];
  const polygon = [  ];
  let poly;
  let tempArea;

  const mapProperties = {
    center:new google.maps.LatLng( 41.384279176844764,2.1526336669921875),
    zoom:14,
    mapTypeId:google.maps.MapTypeId.ROADMAP
  };

  const map = new google.maps.Map(document.getElementById("googleMap"),mapProperties);
  const afterFirstClick = new CustomEvent("afterFirstClick");
  const markers = [];
  google.maps.event.addListener(map, 'click', function (event) {
    console.log('click');
  });


    google.maps.event.addListener(map, 'click', function (event) {


    path.push(new google.maps.LatLng(event.latLng.lat(),event.latLng.lng()));
    polygon.push([event.latLng.lat(),event.latLng.lng()]);

    const marker = new google.maps.Marker({
      position: new google.maps.LatLng(event.latLng.lat(),event.latLng.lng()),
      map: map
    });


      var dialog = document.getElementById('myDialog');
      // document.getElementById('show').onclick = function() {  dialog.showModal();  };
      document.getElementById('hide').onclick = function() {  dialog.close();      };
    //Functionality For Marker, (close final Polygon) this is done after finishing polygon
    google.maps.event.addListener(marker,'click',function() {
      tempArea.setMap(null);

      poly.setMap(null);
      google.maps.event.clearListeners(map, 'mousemove');
      dialog.showModal();
      const perimeter = new google.maps.Polygon({
        path:polygon.map(function (coord) {
          return new google.maps.LatLng(coord[0],coord[1]);
        }),
        strokeColor:"#0000FF",
        strokeOpacity:0.8,
        strokeWeight:1,
        fillColor:"#0000FF",
        fillOpacity:0.1
      });
      perimeter.setMap(map);
    });


    // Line following the cursor functionality
    google.maps.event.addListener(map, `mousemove`, function (event) {
      path.push(new google.maps.LatLng(event.latLng.lat(),event.latLng.lng()));
      if (poly !== undefined) {
        poly.setMap(null);
      }
      poly = new google.maps.Polyline({
        path: path,
        geodesic: true,
        strokeColor: '#1f38ff',
        strokeOpacity: 1.0,
        strokeWeight: 2
      });

      poly.setMap(map);
      if (path.length>1) {
        path.pop();
      }
    });
    google.maps.event.addListener(map, `mousemove`, function (event) {
      if (polygon.length > 1) {
        polygon.push([event.latLng.lat(),event.latLng.lng()]);
        if (tempArea!==undefined) {
          tempArea.setMap(null);
        }

         tempArea = new google.maps.Polygon({
          path:polygon.map(function (coord) {
            return new google.maps.LatLng(coord[0],coord[1]);
          }),
          strokeColor:"#0000FF",
          strokeOpacity:0.8,
          strokeWeight:0.5,
          fillColor:"#0000FF",
          fillOpacity:0.1
        });
        polygon.pop();
        tempArea.setMap(map);
      }
    });

  });

}