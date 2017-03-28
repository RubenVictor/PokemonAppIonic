angular.module('starter.services', [])

.factory('PokemonFactory', function($http){
    //base url
    var baseUrl = 'http://localhost:8080/api/';
    //variable
    var pokemonCount = 0;
    var searchResults = [];


    pokemonCount.$promise = $http.get(baseUrl+'pokemons?limit=20&offset=0/', {headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"}
    }).then(function (response) {
        angular.copy(response.data.count, pokemonCount);
        return pokemonCount;
    })

    pokemon = [{name: ''}];
    searchResults.$promise = $http.get(baseUrl+'pokemons?limit=20&offset=0/', {headers: { "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    }}).then(function (response) {
            angular.copy(response.data.results, searchResults);

        return searchResults;
        })

    var search = function (searchArg) {
        searchResults.$promise = $http.get(baseUrl+'pokemon/'+searchArg, {headers: { "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
        }}).then(function (response) {
            angular.copy(response.data.results, searchResults );

            return searchResults;
        });
    }

    var findPokemon = function (searchArg) {
        pokemon.$promise = $http.get(baseUrl+'pokemon/'+searchArg, {headers: { "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
        }}).then(function (response) {
            angular.copy(response.data, pokemon );
            return pokemon;
        });
    }







    return{
        pokemonCount: pokemonCount,
        pokemon : pokemon,
        findPokemon : findPokemon,
        search: search,
        searchResults : searchResults

    }
})