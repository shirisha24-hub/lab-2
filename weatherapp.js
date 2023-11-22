const express = require("express");
const axios = require("axios");
const app = express();
const port = process.env.PORT || 8002;

// Serve static files (if any, e.g., CSS and images)
app.use(express.static("public"));

// Serve the HTML file (located in the root directory)
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Create a route to handle the weather API request
app.get("/weather", async (req, res) => {
  const city = req.query.city;
  const apiKey = "a19def8a46msh97d5c020478d57fp1b6333jsn14d11adab06d";
  const apiUrl = `https://open-weather13.p.rapidapi.com/city/${city}`;

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": "open-weather13.p.rapidapi.com",
      },
    });

    const weatherData = response.data;
    res.json(weatherData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching weather data" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
