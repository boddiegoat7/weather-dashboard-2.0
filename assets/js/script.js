var searchedCities = $("#searchedCities");
var cities = [];
var key = "d52c830bdb2890093bf60a2d8c63f2e5";

//Calling function init();
init();


function init() {

  //Get stored cities from localStorage
    var storedCities = JSON.parse(localStorage.getItem("cities"));

    if (storedCities !== null) {
    cities = storedCities;
    }
    renderCities();

}



function storeCities() {
    localStorage.setItem("cities", JSON.stringify(cities));
    console.log(localStorage);
}


function renderCities() {
    searchedCities.empty();
    for (var i = 0; i < cities.length; i++) {
    var city = cities[i];

    var li = $("<li>").text(city);
    li.attr("id", "listC");
    li.attr("data-city", city);
    li.attr("class", "list-group-item");
    console.log(li);
    searchedCities.prepend(li);
    }
    if (!city) {
        return;
    } else {

        getResponseWeather(city);
    }
}



$("#add-city").on("click", function (event) {

    event.preventDefault();

    var city = $("#city-input").val().trim();

    if (city === "") {
        return;

    }

    cities.push(city);
    storeCities();
    renderCities();
});



function getResponseWeather(cityName) {

    var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + key;


    $("#today-weather").empty();
    
    $.ajax({

        url: queryURL,
        method: "GET",
    
    })
        
        .then(function (response) {


    // Create a new table row element
            
    cityTitle = $("<h4>").text(response.name + " " + "(" + FormatDay() + ")");
            $("#today-weather").append(cityTitle);
            
    var TempetureToNum = parseInt((response.main.temp * 9) / 5 - 459);
    
    var cityTemperature = $("<p>").text("Temp: " + TempetureToNum + " °F");
    $("#today-weather").append(cityTemperature);
    
    var cityWindSpeed = $("<p>").text("Wind: " + response.wind.speed + " MPH");
    $("#today-weather").append(cityWindSpeed);
            
    var cityHumidity = $("<p>").text(
        "Humidity: " + response.main.humidity + " %"
    );
    
    $("#today-weather").append(cityHumidity);

    //disply of  5-day forecast
    var queryURL3 =
        "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + key;
    
            $.ajax({
                url: queryURL3,
                method: "GET",
            })
                
                .then(function (response5day) {
                $("#boxes").empty();
                console.log(response5day);
    
                    for (var i = 0, j = 0; j < 5; i = i + 7) {
                    var read_date = response5day.list[i].dt;
        
                        if (response5day.list[i].dt != response5day.list[i + 1].dt) {

                            var FivedayDiv = $("<div>");   
                            FivedayDiv.attr("class", "col-2 m-2 ");
                            var d = new Date(0); 
                            var date = d;
                                console.log(date);
                            var month = date.getMonth() + 1;
                            var day = date.getDate() + 1;
                            var dayOutput = date.getFullYear() +"/" +
                                (month < 10 ? "0" : "") + month + "/" + (day < 10 ? "0" : "") + day;
                            var Fivedayh4 = $("<h6>").text(dayOutput);
                            var imgtag = $("<img>");
                            var skyconditions = response5day.list[i].weather[0].main;
                            if (skyconditions === "Clouds") {
                                imgtag.attr("src","https://img.icons8.com/color/48/000000/cloud.png");
        
                            }
                            else if (skyconditions === "Clear") {
                                imgtag.attr("src", "https://img.icons8.com/color/48/000000/summer.png");
        
                            } 
        
                            else if (skyconditions === "Rain") {imgtag.attr("src","https://img.icons8.com/color/48/000000/rain.png");
    
                            }

                            
                            var pTemperatureK = response5day.list[i].main.temp;
        
                            console.log(skyconditions);
        
                            var TempetureToNum = parseInt((pTemperatureK * 9) / 5 - 459);
        
                            var pTemperature = $("<p>").text("Temp: " + TempetureToNum + " °F");
                            var pWind = $("<p>")
                                .text("Wind: " + response5day.list[i].wind.speed + " MPH");
        
                            var pHumidity = $("<p>")
                                .text("Humidity: " + response5day.list[i].main.humidity + " %");
                                    FivedayDiv.append(Fivedayh4);
                                    FivedayDiv.append(imgtag);
                                    FivedayDiv.append(pTemperature);
                                    FivedayDiv.append(pWind);
                                    FivedayDiv.append(pHumidity);
        
                            $("#boxes").append(FivedayDiv);
                                console.log(response5day);
                                j++;
                        }
                    }
                });
    });
}

//Format for day
function FormatDay(date) {
  var date = new Date();
  console.log(date);
  var month = date.getMonth() + 1;
  var day = date.getDate();

  var dayOutput =
    date.getFullYear() +
    "/" +
    (month < 10 ? "0" : "") +
    month +
    "/" +
    (day < 10 ? "0" : "") +
    day;
  return dayOutput;
}

//Click function to each Li
$(document).on("click", "#listC", function () {
  var thisCity = $(this).attr("data-city");
  getResponseWeather(thisCity);
});
