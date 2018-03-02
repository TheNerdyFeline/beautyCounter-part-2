let names = [];
let newName;

$(document).ready(function() {
  console.log("READY!!");
  function populateNames() {
    $.ajax ({
      url: "https://swapi.co/api/people/",
      method: "GET"
    }).done(function(res) {
      console.log(res);
      res.results.forEach(function(people) {
        names.push(people.name);
      });
      // console.log(names);
    });
  };

  function showResults(name) {
    queryUrl = "https://swapi.co/api/people/?search=" + name;
    console.log(queryUrl);
    $.ajax ({
      url: queryUrl,
      method: "GET"
    }).done(function(res) {
      console.log(res.results);
      let charRes = JSON.stringify(res.results, null, 1);
      $(".character").append(charRes);
    });
  }

  populateNames();
  console.log(names);
  
  $("#name").autocomplete({source: names});
  
  $("#search").on("click", function(event) {
    event.preventDefault();
    newName = $("#name").val().trim();
    showResults(newName);
  });
});
