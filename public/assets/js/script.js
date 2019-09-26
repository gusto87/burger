$(document).ready(function () {
  $('.create-form').on("submit", function (event) {
    event.preventDefault();
    console.log('form submitted')

  })
  $('#get').on("click", function (event) {
    event.preventDefault()
    var burger = $('#burgerToGo').val()
    console.log(burger)
    $.post("/api/burgers", {
      burger_name: burger
    }, function (data, status) {
      window.location.replace("/")
    }).catch(error => console.log('error from failed put', error));
  })
  $('.a-burger').on("click", function (event) {
    event.preventDefault()
    var id = $(this).attr("data-id")
    console.log(id)
    // $.put("/api/burgers/"+ id, {
    //   devoured: true 
    // }, function (data, status) {
    //   window.location.replace("/")
    // }).catch(error => console.log('error from failed put', error));

    $.ajax({
      url: '/api/burgers/'+ id,
      type: 'PUT',
      data:{devoured: true},
      success: function(result) {
        window.location.replace("/")
      }
  });
  })

})