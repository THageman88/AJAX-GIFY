const gifArea = $("#gif-area"); //new var for the gif area html
const searchInput = $("#search"); // newvar for the search results



function addGif(res) { //set up a function to get random gif
  let numResults = res.data.length; //create a variable for the site results
  if (numResults) {
    let randomIdx = Math.floor(Math.random() * numResults); //creates a random generatrorto get random result
    let newCol = $("<div>"); //creates a new div for the image to be placed in
    let newGif = $("<img>", {// creates a new image
      src: res.data[randomIdx].images.original.url}); //gets the image from a random index number amking it randomly generated
    newCol.append(newGif); //appends the img of the gif to the div
    gifArea.append(newCol); // appends the div to the gif area
  }
}

/* handle form submission: clear search box & make ajax call */

$("form").on("submit", async function(evt) { //handles the submit function
  evt.preventDefault(); // keeps the form from resetting

  let searchTerm = searchInput.val(); //sets a new var to handle the user input data 
  searchInput.val("");

  const response = await axios.get("http://api.giphy.com/v1/gifs/search", { //sends the request to gify and says wait for the response
    params: {
      q: searchTerm,
      api_key: "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym"
    }
  });
  addGif(response.data); //adds the gif
});

/* remove gif */

$("#remove").on("click", function() { // empties everything in the gif area
  gifArea.empty();
});