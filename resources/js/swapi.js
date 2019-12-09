function starWarsCharacters(){
  ajax(
    'GET',
    'https://swapi.co/api/people/',
    "",
    "",
    'json'
  ).then(data => {
    if(data.results){
      var text = "I haven't found any results, but here is a list of some Star Wars characters:<br/><ul>";
      $.each(data.results, function(key, value){
        console.log(value.name);
        text += "<li>"+value.name+"</li>";
      });
      text += "</ul>";
      saveSession(0,text);
      $("#conversacion").append("<li>"+text+"</li>");
      $("#writing").hide();
      $("#chat").val("");
    }
  }).catch(error => {
    console.log(error)
  });
}

function starWarsFilms(){
  ajax(
    'GET',
    'https://swapi.co/api/films/',
    "",
    "",
    'json'
  ).then(data => {
    if(data.results){
      var text = "The <b>force</b> is in this movies:<br/><ul>";
      $.each(data.results, function(key, value){
        console.log(value.title);
        text += "<li>"+value.title+"</li>";
      });
      text += "</ul>";
      saveSession(0,text);
      $("#conversacion").append("<li>"+text+"</li>");
      $("#writing").hide();
      $("#chat").val("");
    }
  }).catch(error => {
    console.log(error)
  });
}
