var map = L.map('map').setView([51.9189046, 21.1343786], 7);
var onlyOnce = true
var points = 0
var titleLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
var dupArr = []
var dupLen
var random
function start(){
  var tempObj
  document.getElementById("start").style.visibility = "hidden"
  document.getElementById("input").style.visibility = "visible"
  document.getElementById("check").style.visibility = "visible"
    map.eachLayer(function (layer) {
        if(layer != titleLayer)
        map.removeLayer(layer)
    })
    console.log(dupArr)
    dupLen = dupArr.length-1
    for(var i=0;i<=dupLen;i++){
        random = getRandomInt();
        if (!isNumberDuplicate(random)) {
          tempObj = { "number": random };
        }
        if(dupArr.length==16){
          if(points==16){
            document.getElementById("EndgameCom").style.zIndex="5"
          }
          document.getElementById("info").style.width = "100%"
          document.getElementById("good").innerHTML = "Koniec"
          document.getElementById("check").style.visibility = "hidden"
          document.getElementById("input").style.visibility = "hidden"
          random="none"
        } 
        else {
          while (isNumberDuplicate(random)) {
            random = getRandomInt();
          }
          tempObj = { "number": random };
          console.log("dodano")
          console.log(tempObj)
        }
    }
    if(dupArr.length==16){
      Listy()
    }
    if(onlyOnce){
      random = getRandomInt()
      tempObj = { "number": random };
      onlyOnce=false
    }
    if(dupArr.length!=16){
      dupArr.push(tempObj);
    console.log(random)
    }
    
    geojson.features.forEach(element => {
      var tempvar
      for(var i=0;i<=dupArr.length-1;i++){
        if(element.id==dupArr[i].number && dupArr[i].color!=undefined){
          tempvar=1
        }
        else if(element.id==dupArr[i].number){
          tempvar = 2
        }
      }
        if(element.id==random){
            var geojson = L.geoJSON(element,{color:"yellow"}).addTo(map)
            console.log(".")
        }
        else if(tempvar==2){
          var geojson = L.geoJSON(element,{color:"red"}).addTo(map)
          if(dupArr.length!=16){

            document.getElementById("good").innerHTML = "Źle!"
          }
          tempvar=false
        }
        else if(tempvar==1){
          var geojson = L.geoJSON(element,{color:"green"}).addTo(map)
          if(dupArr.length!=16){

            document.getElementById("good").innerHTML = "Dobrze!"
          }
          
          tempvar=false
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
//start()
function getRandomInt(){
    var random = Math.floor(Math.random() * 16);
    
    return random;
}
function isNumberDuplicate(number){
  console.log(dupArr)
    for (var i = 0; i < dupLen+1; i++) {
        if (dupArr[i].number === number) {
            
          return true;
        }
      }
      return false;
}
function check(){
  var inputValue = document.getElementById("input").value
  var correct
  for(let i=0;i<=geojson.features.length-1;i++){
    if(random==geojson.features[i].id){
      correct = geojson.features[i].properties.nazwa
    }
  }
  if(inputValue.toLowerCase()==correct.toLowerCase()){
    dupArr[dupArr.length-1].color="green"
    points++
  }
  start()
  console.log(random)
}
function Listy(){
  for(var i=0;i<=dupArr.length-1;i++){
    if(dupArr[i].color=="green"){
      console.log(dupArr[i])
      for(var j=0;j<=dupArr.length-1;j++){
        if(geojson.features[j].id==dupArr[i].number){
          console.log(geojson.features[j].id)
          const li = document.createElement("li")
          li.innerHTML = geojson.features[j].properties.nazwa
          document.getElementById("goodAns").appendChild(li)
        }
      }
    }
    else{
      console.log(dupArr[i])
      for(var j=0;j<=dupArr.length-1;j++){
        if(geojson.features[j].id==dupArr[i].number){
          console.log(geojson.features[j].id)
          const li = document.createElement("li")
          li.innerHTML = geojson.features[j].properties.nazwa
          document.getElementById("wrongAns").appendChild(li)
        }
      }
    }
  }
}