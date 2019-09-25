$(document).ready(function() {
    $('.create-form').on("submit", function(event) {
        event.preventDefault();
        console.log('form submitted')

    })
    $('#get').on("click", function(event){
        event.preventDefault()
      var burger =  $('#burgerToGo').val()
      console.log (burger)
      $.post("/api/burgers", {burger_name: burger}, function(data, status){
        window.location.replace("/")
      }).catch(error => console.log('error from failed put', error));
    })
    $('#get').on("click", function(event){
      event.preventDefault()
    var burger =  $('#burgerToGo').val()
    console.log (burger)
    $.post("/api/burgers/:id", {burger_name: burger}, function(data, status){
      window.location.replace("/")
    }).catch(error => console.log('error from failed put', error));
  })
})


