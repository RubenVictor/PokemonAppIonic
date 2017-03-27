angular.module('starter.services', [])

.factory('PokemonFactory', function($http){


    var baseUrl = 'http://pokeapi.co/api/v2/';
    searchResults = [];
    pokemon = [{name: ''}];
    searchResults.$promise = $http.get(baseUrl+'pokemon/').then(function (response) {
            angular.copy(response.data.results, searchResults);
        return searchResults;
        })

    var search = function (searchArg) {
        searchResults.$promise = $http.get(baseUrl+'pokemon/'+searchArg).then(function (response) {
            angular.copy(response.data.results, searchResults );

            return searchResults;
        });
    }

    var findPokemon = function (searchArg) {
        pokemon.$promise = $http.get(baseUrl+'pokemon/'+searchArg).then(function (response) {
            angular.copy(response.data, pokemon );
            return pokemon;
        });
    }







    return{
        pokemon : pokemon,
        findPokemon : findPokemon,
        search: search,
        searchResults : searchResults

    }
})