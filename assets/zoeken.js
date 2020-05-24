// $(document).ready(function(){
//   $('#zoekengast').click(function(){ 
//       $('#onzichtbaarcol').css({'display': 'block'});
//   });
//   $('#zoekenweg').click(function(){ 
//       $('#onzichtbaarcol').css({'display': 'none'});
//   });
// });

$(document).ready(function(){
  // bepaal default visibility
  if($('#zoekveld').val().length > 0){
    $('#onzichtbaarcol').css({'display': 'block'});
  } else {
    $('#onzichtbaarcol').css({'display': 'none'});
  }

  $('#zoekengast').click(function(){
      if($('#onzichtbaarcol').css("display") === 'block'){
        $('#onzichtbaarcol').css({'display': 'none'});
      } else {
        $('#onzichtbaarcol').css({'display': 'block'});
      }
  });
});