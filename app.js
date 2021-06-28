const express = require("express")
const bodyParser = require("body-parser")
const https = require("https")
const { time } = require("console")




const app = express()

app.set("view engine", "ejs")

app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static(__dirname + "/public"))

const today = new Date();

const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

let date = today.toLocaleDateString('en-US', options)





app.get("/", function(req, res){

  res.sendFile(__dirname + "/index.html")
  
})



app.post("/", function(req, res){
  
  

  const apiKey = 'Your api key here'
  const query = req.body.cityName
  const unit = "metric"
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +  "&units=" + unit +  "&appid=" + apiKey
  
  https.get(url, function(response){
    response.on('data', function(data){
     
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp
      const des = weatherData.weather[0].description
      const icon = weatherData.weather[0].icon
      const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"

    let letter = des.charAt(0)
    letter = letter.toUpperCase()
    console.log(letter)
     let cap = des.slice(1)
    let descrip = letter + cap
      
      

      
              
     
      res.render("weather", {date: date, des: descrip, temp: temp, url: imgURL, cityname: query})
     
      
    })
  
  })
})

   
   
 
   
    
   


app.listen(process.env.PORT || 3000, function(){
    console.log("Server started on port 3000")
})