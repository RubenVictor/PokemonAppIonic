// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers','starter.services', "ngCordova"])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.pokemonsNearby', {
    url: '/nearby',
    views: {
      'menuContent': {
        templateUrl: 'templates/pokemonNearby.html',
          controller: 'PokemonsNearbyController'

      }
    }
  })

  .state('app.myPokemons', {
      url: '/myPokemons',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html',
            controller: 'MyPokemonsController'

        }
      }
    })
      .state('app.home', {
          url: '/home',
          views: {
              'menuContent': {
                  templateUrl: 'templates/home.html'
              }
          }
      })
    .state('app.pokedex', {
      url: '/pokedex',
      views: {
        'menuContent': {
          templateUrl: 'templates/pokemons.html',
          controller: 'PokemonsController'
        }
      }
    })

      .state('app.detail', {
          url: '/detail/:pokemon',
          views: {
              'menuContent': {
                  templateUrl: 'templates/pokemonDetail.html',
                  controller: 'PokemonDetailCtrl'
              }
          }
      })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});
