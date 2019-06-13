(function(){

  (function(){

    // map options
    var options = {
      scrollWheelZoom: true,
      zoomSnap: .1,
      dragging: true,
      zoomControl: false,
      center: [38, -90],
      zoom: 4
    }

    // create the Leaflet map
    var map = L.map('map', options);

    // request tiles and add to map
    var tiles = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
      subdomains: 'abcd',
      ext: 'png'
    }).addTo(map);

    var zoom = L.control.zoom({
      position: 'topleft'
    }).addTo(map);

    // AJAX request for GeoJSON data
    $.getJSON("data/states.geojson", function (states) {
      Papa.parse('data/participation-percentage.csv', {
        download: true,
        header: true,
        complete: function (data) {
          processData(states, data);
        }
      }); // end of Papa.parse()
    }) // end of getJSON

      .fail(function () {
        console.log("the data file failed to load")
      }); // show error if error in data

    function processData(states, data) {
      // loop through all the states
      for (var i = 0; i < states.features.length; i++) {

        // short-hand reference to state properties
        var props = states.features[i].properties;

        // for each of the CSV data rows
        for (var j = 0; j < data.data.length; j++) {

          // if the state fi code and data fips code match
          if (props.STATEFP === data.data[j].STATE_FIP) {
            //reassign the data for that state as the state's properties
            states.features[i].properties = data.data[j];
            // end loop
            break;

          } //end reassign
        } //end inner loop
      } // end outer loop

      // empty array to store all the data values
      var rates = [];

      // iterate through all the states
      states.features.forEach(function (state) {

        // iterate through all the props of each state
        for (var prop in state.properties) {

          // if the attribute is a number and not one of the fips codes or name
          if (+prop) {

            // push that attribute value into the array
            rates.push(+state.properties[prop]);
          } //end if
        }// end loop
      });
      // create class breaks using chroma 
      var breaks = chroma.limits(rates, 'q', 5);

      //assign colors to class breaks
      var colorize = chroma.scale(chroma.brewer.Blues).classes(breaks).mode('lab');
      drawMap(states, colorize);
      drawLegend(breaks, colorize);
    } //end function processData

    function drawMap(states, colorize) {

      // create Leaflet object with geometry data and add to map
      var dataLayer = L.geoJson(states, {
        style: function (feature) {

          return {
            color: '#1e1e1e',
            weight: 1,
            fillOpacity: 1,
            fillColor: 'blue'
          };
        },
        onEachFeature: function (feature, layer) {

          // when mousing over a layer
          layer.on('mouseover', function () {

            // change the stroke color and bring that element to the front
            layer.setStyle({
              color: 'red'
            }).bringToFront();
          });

          // on mousing off layer
          layer.on('mouseout', function () {

            // reset the layer style to its original stroke color
            layer.setStyle({
              color: '#1e1e1e'
            }); 
          });
       } //end oneachfeature


      }).addTo(map);
      updateMap(dataLayer, colorize, '2014');
      addUI(dataLayer, colorize);

    } // end function drawMap()

    function updateMap(dataLayer, colorize, currentYear) {
      //loop through each state
      dataLayer.eachLayer(function (layer) {
        //shorthand properties
        var props = layer.feature.properties;
        // set the fill color of layer based on its normalized data value
        layer.setStyle({
          fillColor: colorize(Number(props[currentYear]))
        });
        layer.bindTooltip("<b>" + layer.feature.properties.Name + "</b><br>" + layer.feature.properties[currentYear] + "E-05 % of state population");
      })
    }// end updateMap()

    function drawLegend(breaks, colorize) {
      // create legend control box
      var legendControl = L.control({
        position: 'topright'
      });
      legendControl.onAdd = function (map) {

        var legend = L.DomUtil.create('div', 'legend');
        return legend;

      };

      legendControl.addTo(map);//add to map
      //legend title
      var legend = $('.legend').html("<h3><span>2014</span></h3><br>% of State Population at USAW Nationals<br><ul>");

      for (var i = 0; i < breaks.length - 1; i++) {

        var color = colorize(breaks[i], breaks);
        //make legend based on class breaks
        var classRange = '<li><span style="background:' + color + '"></span> ' +
          breaks[i].toLocaleString() + ' E-05' + ' &mdash; ' +
          breaks[i + 1].toLocaleString() + ' E-05' + '</li>'

        $('.legend ul').append(classRange);
      } //end loop

      legend.append("</ul>");

    } // end drawLegend()

    //call slider
    function addUI(dataLayer, colorize) {
      //place sldier control in bottom left
      var sliderControl = L.control({
        position: 'bottomleft'
      });

      sliderControl.onAdd = function (map) {
        var slider = L.DomUtil.get("ui-controls");
        // disable scrolling of the map while using controls
        L.DomEvent.disableScrollPropagation(slider);
        // disable click events while using control
        L.DomEvent.disableClickPropagation(slider);
        return slider;
      }
      //update Legend title and slider label with currentYear
      $(".year-slider")
        .on("input change", function () {
          var currentYear = this.value
          $('.legend h3 span').html(currentYear);
          $(".value").html(currentYear);
          updateMap(dataLayer, colorize, currentYear);
        });
      sliderControl.addTo(map);

    } // end createSliderUI()*/

  })();

})();
