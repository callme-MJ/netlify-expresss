'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');

const router = express.Router();
router.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Hello from Express MJ.js!</h1>');
  res.end();
});
router.get('/another', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Hello from another route!</h1>');
  console.log('Hello from another route!');
  res.end();
});
const weatherCall = async (req, res, next) => {
  try {
      const searchParams = req.query
      const apiKey = "6b5b8caf65d880fae5fefb98288bdce5"

      const url = "https://api.openweathermap.org/data/2.5/weather?q=alappuzha&appid=5b61522c47c162cbedbecc5b128a1ccf"
      const response = await axios.get(url)

      // const forecastData = await forecastWeather({lat:response.data.coord.lat,lon:response.data.coord.lon,exclude:"minutely",units:"metric"});
      // const weatherData = await formatWeatherData(response.data, forecastData.data.timezone)
      // const weatherForecast = await formatForecastData(forecastData.data)
      // const date = formatToLocalTime(forecastData.data.current.dt, forecastData.data.timezone)
     

      res.status(200).json({ date, weatherData, weatherForecast })
  } catch (err) {
      next(err)
  }
router.get("/weather", weatherCall)
}
router.post('/', (req, res) => res.json({ postBody: req.body }));

app.use((err,req,res,next)=>{
  const errorStatus = err.status || 500
  const errorMessage = err.message || "Something went wrong!"
  return res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
      stack: err.stack,
  });
})
app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

module.exports = app;
module.exports.handler = serverless(app);
