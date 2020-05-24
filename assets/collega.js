$(document).ready(function(){

    //attach delete function to button
    const aantal = $('#aantal').val();
    for(i = 0; i < aantal; i++){
        const pid = $('#person-'+ i).val();
        $('#delete-'+ i).click(function(){
        $.ajax({
            type: 'POST',
            url: '/collegas/delete',
            data: {id: pid},
            success: function(data){
            location.reload();
            },
            error: function(){ alert('fail')}
        });
        return false;
    });
    }
});