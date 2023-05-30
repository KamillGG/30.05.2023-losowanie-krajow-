var map = L.map('map').setView([51.9189046, 19.1343786], 7);
var titleLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
var dupArr = []
function start(){
    var random =getRandomInt()
    map.eachLayer(function (layer) {
        if(layer != titleLayer)
        map.removeLayer(layer)
    })
    console.log(dupArr)
    for(var i=0;i<=dupArr.length-1;i++){
        random = getRandomInt();
        if (!isNumberDuplicate(random)) {
          var tempObj = { "number": random };
          dupArr.push(tempObj);
        } else {
          while (isNumberDuplicate(random) || dupArr.length == 16) {
            random = getRandomInt();
          }
          var tempObj = { "number": random };
          console.log(".")
          dupArr.push(tempObj);
        }
    }
    console.log(random)
    geojson.features.forEach(element => {
        if(element.id==random){
            var geojson = L.geoJSON(element,{color:"yellow"}).addTo(map)
        }
        else{ var geojson = L.geoJSON(element,{color:"blue"}).addTo(map)

        
        geojson.on('mouseover',()=>{
            geojson.setStyle({color:"red"})
        })
        geojson.on('mouseout',()=>{
            geojson.setStyle({color:"blue"})
        })
    }
    });
}
start()
function getRandomInt(){
    var random = Math.floor(Math.random() * 16);
    
    return random;
}
function isNumberDuplicate(number){
    for (var i = 0; i < dupArr.length; i++) {
        console.log(dupArr[i])
        console.log(number)
        if (dupArr[i].number === number) {
            
          return true;
        }
      }
      return false;
    }
