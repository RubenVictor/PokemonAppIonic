angular.module('starter.services', [])

.factory('PokemonFactory', function($http){
    //base url
    var baseUrl = 'https://cryptic-lowlands-27872.herokuapp.com/api/';
    //variable
    var searchResults = [];
    var pokemonCount = 811;
    pokemon = [{name: ''}];



    pokemonCount.$promise = $http.get(baseUrl+'pokemons?limit=20&offset=0/')
        .then(function (response) {
        pokemonCount = response.data.count;
        return pokemonCount;
    })

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
    .factory('PokemonNearbyFactory', function($http){
        //base url
        var baseUrl = 'https://cryptic-lowlands-27872.herokuapp.com/api/';
        //variable
        var searchResults = [];

        searchResults.$promise = $http.get(baseUrl+'pokemons/pokemonLocations')
            .then(function (response) {
                angular.copy(response.data, searchResults);

                return searchResults;
            });
        var getNearbyPokemons = function (lat,long) {
            var pokemonsNearby = [];
            for(var i = 0; i < searchResults.length; i++) {
                var iets = lat - 1;
                var testobject = searchResults[i].latitude;

                    if (searchResults[i].latitude > (lat- 1)
                        && searchResults[i].latitude < (lat+ 1)
                        && searchResults[i].longitude > (long- 1)
                        && searchResults[i].longitude < (long+ 1)
                    ){
                        alert("Pokemon Dichtbij !!" + searchResults[i].name)
                        pokemonsNearby.push(searchResults[i]);

                    }
            }
return pokemonsNearby;
        }


        return{
            getNearbyPokemons :getNearbyPokemons,
            searchResults : searchResults

        }
    })
    .factory('MyPokemonFactory', function(){

        //variable
        var searchResults = JSON.parse( window.localStorage.getItem('myPokemons'));

        return{

            searchResults : searchResults

        }
    })