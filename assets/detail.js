// $('li').on('click', function(){
//     var item = $(this).text().replace(/ /g, "-");
//     $.ajax({
//       type: 'GET',
//       url: '/stappen/' + item,
//       success: function(data){
//         //do something with the data via front-end framework
//         location.reload();
//         alert('De opdracht is succesvol verwijderd');
//       }
//     });
// });

$(document).ready(function(){

  //attach delete function to button

  $('#delete').click(function(){
    var id = $('#idguest');
    var idval = id[0].innerText;
    var body = {id: idval};
    $.ajax({
      type: 'POST',
      url: '/detail/delete',
      data: body,
      success: function(data){
        window.location.href = "/gasten";
      },
      error: function(){ alert('fail')}
    });
    return false;
});


  // set default checked status checkbox for yellow flag
  checkbox = $('#geel');
  checked = checkbox.val() === "true";
  if(checked){
    checkbox.attr("checked", "checked");
  }

  $('#geel').click(function(){
      var id = $('#idguest');
      var idval = id[0].innerText;
      var newValue = $('#geel').val() === "false";
      var geel = {yellowCard: newValue, id: idval};
        $.ajax({
          type: 'POST',
          url: '/detail/flag',
          data: geel,
          success: function(data){
          //do something with the data via front-end framework
          location.reload();
          },
          error: function(){ alert('fail')}
      });
      return false;
  });

  //add defaults and listeners for checkboxes
  var aantalSteps = $('#aantal-steps').val();
  for(i = 1; i <= aantalSteps; i++){
    let aantalTaken = $('#'+i+'-aantal-steps').val();
    for(c = 0; c < aantalTaken; c++){
      var check = $('#task-'+i+'-'+c);
      checked = check.val() === 'true';
      const unchecked = `${!checked}`;   // calculate here to not get the latest value for the iteration
      if(checked){
        check.attr("checked", "checked");
      }
      const sid = $('#task-'+i+'-'+c+'-id').val();
      check.click(function(){
        var id = $('#idguest');
        var idval = id[0].innerText;
        console.log(`step id ${sid}`);
        var update = {person: idval, step: sid, value:unchecked};
        console.log(`sending update req ${JSON.stringify(update)}`);
          $.ajax({
            type: 'POST',
            url: '/detail/step',
            data: update,
            success: function(data){
              console.log(`sent update request succesfully`);
            //do something with the data via front-end framework
            location.reload();
            },
            error: function(){ alert('fail')}
        });
        return false;
    });
    }
  }



});