$( document ).ready(function() {
    
  var $grid = '';

    var filters = {};

    function handleButtonClick(container, buttonClass) {
        container.on('click', 'button', function() {
          var $this = $(this);
          container.find('button').removeClass('bg-purple-300');
          $this.addClass('bg-purple-300');
      
          // get group key
          var $buttonGroup = $this.parents('.' + buttonClass);
          var filterGroup = $buttonGroup.attr('data-filter-group');
      
          // set filter for group
          filters[filterGroup] = $this.attr('data-name');
      
          // combine filters
          var filterValue = concatValues(filters);
          $grid.isotope({ filter: filterValue });
        });
      }
      
      // Utiliser la fonction pour gérer les clics sur les boutons pour '.filter'
      handleButtonClick($('.filter'), 'truc');
      
      // Utiliser la fonction pour gérer les clics sur les boutons pour '.genre'
      handleButtonClick($('.genre'), 'truc');
      

// flatten object by concatting values
function concatValues( obj ) {
  var value = '';
  for ( var prop in obj ) {
    value += obj[ prop ];
  }
  return value;
}

$.ajax({
    url: 'got.json',
    method: 'GET',
    dataType: 'json',
    success: function (data) {

        console.log(data);

        var perso = "";
        var btn = "";
        var uniqueLastNames = [];

        $.each(data, function (index, post) {
            perso += '<div class="grid-item text-center '+post.lastName+' '+post.gender+' p-8 rounded-lg bg-amber-200 m-5">'+post.fullName+'</div>';
            
            // Ajouter le nom de famille à uniqueLastNames s'il n'est pas déjà présent
            if (uniqueLastNames.indexOf(post.lastName) === -1 && post.lastName !== "") {
                uniqueLastNames.push(post.lastName);
            }
        });

        // Créer des boutons à partir des noms de famille uniques
        uniqueLastNames.forEach(function(lastName) {
            btn += '<button data-name=".'+lastName+'" class="bg-red-400 hover:bg-black hover:text-red-400 text-black p-3 rounded-lg m-5">'+lastName+'</button>';
        });

        $(".grid").html(perso);
        $(".filter").append(btn);

        $grid = $('.grid').isotope({
            itemSelector: '.grid-item',
            layoutMode: 'fitRows',
            getSortData: {
                category: '[data-sort-by]'
            }
        });
    }//fin success
}); //fin ajax



});