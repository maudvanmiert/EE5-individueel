//const bcrypt = require('bcrypt');

$(document).ready(function(){
  $('form').on('submit', function(){
      var voorNaam = $('#voornaamke');
      var achterNaam = $('#achternaam');
      var gebruikersNaam = $('#gebruikersnaam');
      var wachtWoord = $('#wachtwoord');
      //var hashedPassword = await bcrypt.hash(wachtWoord.val(), 10);
      var herhaalwachtWoord = $('#herhaalwachtwoord');
      var newStaff = {firstname: voorNaam.val(), lastname: achterNaam.val(), username: gebruikersNaam.val(), password: wachtWoord.val()};

      $.ajax({
        type: 'POST',
        url: '/accountmaken',
        data: newStaff,
        success: function(data){
          //do something with the data via front-end framework
          alert('Het account voor de nieuwe collega is succesvol aangemaakt');
          location.reload();
        }
      });

      return false;

  });

  $('#submitguest').click(function(){

    var voorNaamG = $('#voornaamGast');
    var achterNaamG = $('#achternaamGast');
    var geboorteDatumG = $('#geboortedatumGast');
    var newGuest = {nameG: voorNaamG.val(), lastnameG: achterNaamG.val(), birthdateG: geboorteDatumG.val()};

    $.ajax({
      type: 'POST',
      url: '/accountmaken',
      data: newGuest,
      success: function(data){
        //do something with the data via front-end framework
        alert('Het account voor de nieuwe gast is succesvol aangemaakt');
        location.reload();
      }
    });
    return false;
  });
});