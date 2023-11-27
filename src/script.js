$( document ).ready(function() {
    
  var $grid = '';
    
    $('.filter button').on("click", function(){

        var value = $(this).attr('data-name');
        console.log(value);

        
        $grid.isotope({ 
            filter: value
        });

    });

    $.ajax({
        url: 'got.json',
        method: 'GET',
        dataType: 'json',
        success: function (data) {

            console.log(data);

            var perso = "";
            $.each(data, function (index, post) {

                perso += '<div class="grid-item text-center '+post.lastName+' p-8 rounded-lg bg-amber-200 m-5">'+post.fullName+'</div>';

            });
            $(".grid").html(perso);

                $grid = $('.grid').isotope({
                itemSelector: '.grid-item',
                layoutMode: 'fitRows'
            });
        }//fin success
    }); //fin ajax


});