angular.module('starter.controllers', [])

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


.controller('SearchController', function($ionicPlatform,$scope, PokemonFactory,$stateParams,$cordovaGeolocation) {
  //save how many times the app has been used



     $scope.counter = window.localStorage.getItem('counter');
    console.log($scope.counter);

    //get geolocation from phone
    $ionicPlatform.ready(function(){
        $cordovaGeolocation.getCurrentPosition().then(function (position) {
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

    $scope.loadMore = function() {


        if ( 10 == 10 ) {
            $scope.noMoreItemsAvailable = true;
        }
        $scope.$broadcast('scroll.infiniteScrollComplete');
    };


})

    .controller('PokemonDetailCtrl', function($scope, $stateParams, PokemonFactory) {
        PokemonFactory.findPokemon($stateParams.pokemon);
        $scope.pokemon = PokemonFactory.pokemon;


    })

.controller('PlaylistCtrl', function($scope, $stateParams) {




});
