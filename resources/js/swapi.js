/**
  Consult the star wars characters and show in the conversation
*/
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


/**
  Consult the star wars films and show in the conversation
*/
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
