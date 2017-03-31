angular.module('starter.services', [])

.factory('PokemonFactory', function($http){
    //base url
    var baseUrl = 'http://localhost:8080/api/';
    //variable
    var searchResults = [];
    var pokemonCount = 10000;


    pokemonCount.$promise = $http.get(baseUrl+'pokemons?limit=20&offset=0/')
        .then(function (response) {
        pokemonCount = response.data.count;
        return pokemonCount;
    })

    pokemon = [{name: ''}];
    searchResults.$promise = $http.get(baseUrl+'pokemons?limit=20&offset=0/')
        .then(function (response) {
            angular.copy(response.data.results, searchResults);

            return searchResults;
        });

    var loadMore = function (limit, offset) {
     $http.get(baseUrl+'pokemons?limit='+limit+'&offset='+offset+'')
        .then(function (response) {
            for (var i=0; i< response.data.results.length; i++){
                searchResults.push(response.data.results[i]);
            }

            return searchResults;
        });
    }


    var search = function (searchArg) {
        searchResults.$promise = $http.get(baseUrl+'pokemons/'+searchArg+'/')
            .then(function (response) {
            angular.copy(response.data.results, searchResults );

            return searchResults;
        });
    }

    var findPokemon = function (searchArg) {
        pokemon.$promise = $http.get(baseUrl+'pokemons/'+searchArg).
        then(function (response) {
            angular.copy(response.data, pokemon );
            return pokemon;
        });
    }







    return{
        loadMore : loadMore,
        pokemonCount: pokemonCount,
        pokemon : pokemon,
        findPokemon : findPokemon,
        search: search,
        searchResults : searchResults

    }
})