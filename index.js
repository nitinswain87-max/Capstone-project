import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  const selectedCategory = req.query.category || "Any";
  try {
    const response = await axios.get(
      `https://v2.jokeapi.dev/joke/${selectedCategory}`,
    );
    res.render("index.ejs", {
      joke: response.data,
      category: selectedCategory,
      error: null,
    });
  } catch (error) {
    console.error("error fetching server", error.message);
    res.render("index.ejs", {
      joke: null,
      category: selectedCategory,
      error: "opps could not fetch joke please try again later",
    });
  }
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
