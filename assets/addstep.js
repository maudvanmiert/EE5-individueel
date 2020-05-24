$(document).ready(function(){
    $('#submitstep1').click(function(){
        var step1 = $('#opdracht1');
        var newStep1 = {name1: step1.val(), position1: '1'};
        $.ajax({
            type: 'POST',
            url: '/stappen',
            data: newStep1,
            success: function(data){
            //do something with the data via front-end framework
            alert('De nieuwe opdracht is succesvol toegevoegd aan Stap1');
            location.reload();
            }
        });
        return false;
    });

    $('#submitstep2').click(function(){
        var step2 = $('#opdracht2');
        var newStep2 = {name2: step2.val(), position2: '2'};
        $.ajax({
            type: 'POST',
            url: '/stappen',
            data: newStep2,
            success: function(data){
            //do something with the data via front-end framework
            alert('De nieuwe opdracht is succesvol toegevoegd aan Stap2');
            location.reload();
            }
        });
        return false;
    });

    $('#submitstep3').click(function(){
        var step3 = $('#opdracht3');
        var newStep3 = {name3: step3.val(), position3: '3'};
        $.ajax({
            type: 'POST',
            url: '/stappen',
            data: newStep3,
            success: function(data){
            //do something with the data via front-end framework
            alert('De nieuwe opdracht is succesvol toegevoegd aan Stap3');
            location.reload();
            }
        });
        return false;
    });

    $('li').on('click', function(){
        var item = $(this).text().replace(/ /g, "-");
        $.ajax({
          type: 'DELETE',
          url: '/stappen/' + item,
          success: function(data){
            //do something with the data via front-end framework
            location.reload();
            alert('De opdracht is succesvol verwijderd');
          }
        });
    });

});