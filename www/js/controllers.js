angular.module('starter.controllers', ['ngCordova','ionic'])


.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
    if(counter == undefined){
        counter = 0;
    }
    var counter = window.localStorage.getItem("counter");
    counter++;
    window.localStorage.setItem('counter', counter);


    // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};
  $scope.formdaData = {searchText:''};

  //vars
    $scope.widget = {search: ''};

    // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;

  });



  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})


.controller('PokemonsController', function($ionicPlatform, $scope, PokemonFactory, $stateParams, $cordovaGeolocation) {
  //save how many times the app has been used
    var limit = 20;
    var offset = 0;



     $scope.counter = window.localStorage.getItem('counter');
    console.log($scope.counter);

    //get geolocation from phone
    $ionicPlatform.ready(function(){
        $cordovaGeolocation.getCurrentPosition().then(function (position) {
            alert(position.coords.latitude)
        });
    });


    //search results from spotify in the Spotify factory
    $scope.searchResults = PokemonFactory.searchResults;
    console.log(PokemonFactory.pokemonCount);

    $scope.search = [];
    $scope.search  = function (iets) {
        PokemonFactory.search(iets);
        $scope.searchResults = PokemonFactory.searchResults;
    }
    // infinitif scrolling

    $scope.noMoreItemsAvailable = false;
//load more for loading data
    $scope.loadMore = function() {


        if (  objectLength(PokemonFactory.searchResults) >= 811 ) {
            $scope.noMoreItemsAvailable = true;
        }

            PokemonFactory.loadMore(limit, offset);


offset += 20;


        $scope.$broadcast('scroll.infiniteScrollComplete');
        $scope.$broadcast('searchResults');
        PokemonFactory.searchResults;

    };

    //counts the objects in an array
    function objectLength(obj) {
        var result = 0;
        for(var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                // or Object.prototype.hasOwnProperty.call(obj, prop)
                result++;
            }
        }
        return result;
    }


})

    .controller('PokemonDetailCtrl', function($scope, $stateParams, PokemonFactory) {
        PokemonFactory.findPokemon($stateParams.pokemon);
        $scope.pokemon = PokemonFactory.pokemon;


    })

    .controller('PokemonsNearbyController', function($ionicPopup,$scope, $stateParams, PokemonNearbyFactory) {
        $scope.searchResults = PokemonNearbyFactory.searchResults;

        $scope.addToMyPokemons = function(pokemon){
    if(pokemon != null) {
    //gets data from local storage puts it in an array and saves it in local storage
     a = (JSON.parse( window.localStorage.getItem('myPokemons')));
     if( a != null){
         a[a.length] = pokemon;

     }else {
         var a = [];
         a[0] = pokemon;
     }
     localStorage.setItem('myPokemons', JSON.stringify(a));
      $ionicPopup.alert({
             title: 'Pokemon catchet',
             template: '' + pokemon.name + ' has been added to your pokemons.'

     })
    }
        }
    })



    .controller('MyPokemonsController', function($ionicPlatform,$cordovaSocialSharing,$ionicPopup,$scope, $stateParams, MyPokemonFactory) {
       //Item variable
        $scope.listCanSwipe = true;

        //items
        $scope.searchResults = MyPokemonFactory.searchResults;

        //functions
        $ionicPlatform.ready(function() {
        });
        //share
        $scope.share = function(item){
            $cordovaSocialSharing
                .shareViaWhatsApp("hoi", null, "http//")
                .then(function(result) {
                    // Success!
                }, function(err) {
                    // An error occurred. Show a message to the user
                })}

        //dell
        $scope.del = function (item) {


            // A confirm dialog
            $scope.showConfirm = function(item) {
                var confirmPopup = $ionicPopup.confirm({
                    title: 'Delete '+item.name,
                    template: 'Are you sure you want to delete '+item.name
                });

                confirmPopup.then(function(res) {
                    if(res) {
                        var json = JSON.parse(window.localStorage.getItem('myPokemons'));
                        for(var i = 0; i < json.length; i++) {
                            //if item was found delete it
                            if(json[i].id == item.id){
                                findAndRemove(json,'id',item.id);
                            }
                        }
                        localStorage.setItem('myPokemons', JSON.stringify(json));

                        counter = 0;
                        console.log(item.name);

                        $scope.searchResults = MyPokemonFactory.searchResults;

                    } else {
                    }
                });
            };

$scope.showConfirm(item);
        }

        function findAndRemove(array, property, value) {
            array.forEach(function(result, index) {
                if(result[property] === value) {
                    //Remove from array
                    array.splice(index, 1);
                }
            });
        }
    })


    .controller('PlaylistCtrl', function($scope, $stateParams ) {




});
