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
        alert("Data: " + data + "\nStatus: " + status);
      });
    })
    
})


