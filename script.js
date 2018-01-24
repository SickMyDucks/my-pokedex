window.onload = function() {
    document.querySelector('.buttons div:last-child').onclick = function() {
        document.querySelector('.input').style.display = 'flex';
    }
    document.querySelector('.buttons div:first-child').onclick = function() {
        document.querySelector('.input').style.display = 'none';
    }

    document.querySelector('form').onsubmit = function() {
        if (typeof chosenPokemon != 'undefined') {
            delete chosenPokemon;
        }
        searchQuery = this.querySelector('input').value;
        searchQuery = capitalize(searchQuery); 

        if (isNaN(this.querySelector('input').value)) {
            for (var j in pokemon) {
                if (pokemon[j].name == searchQuery) {
                    chosenPokemon = j;
                    break;
                }
            }
        } else {
            if (this.querySelector('input').value <= 151) {
                chosenPokemon = this.querySelector('input').value;
            } else {
                document.querySelector('h2').innerHTML = 'Pokémon number ' + this.querySelector('input').value + ' not found';
                return false;
            }
            
        }

        if (typeof chosenPokemon == 'undefined') {
            document.querySelector('h2').innerHTML = this.querySelector('input').value + ' not found';
        } else {
            document.querySelector('h2').innerHTML = '';
            url = 'http://www.pokestadium.com/sprites/xy/'+pokemon[chosenPokemon].name.toLowerCase()+'.gif';
            document.querySelector('.pokemon').innerHTML = '<img src="'+url+'"/>';
            document.querySelector('.name').innerHTML = pokemon[chosenPokemon].name + ' #'+chosenPokemon;
            document.querySelector('.type').innerHTML = '<strong>Type: </strong>'+pokemon[chosenPokemon].type;
            document.querySelector('.stats').innerHTML = '<strong>Stats:</strong>';
            document.querySelector('.attack').innerHTML = 'Attack:' + pokemon[chosenPokemon].attack;
            document.querySelector('.defense').innerHTML = 'Defense:' + pokemon[chosenPokemon].defense;
            $('.moves').prepend("<strong>Moves:</strong>");
            for (var i in pokemon[chosenPokemon].moves) {
                document.querySelector('#move'+i).innerHTML = pokemon[chosenPokemon].moves[i];
            }
            document.querySelector('.input').style.display = 'none';
        }
        return false;
    }
};
pokemon = $.ajax({
    method: 'get',
    dataType: 'json',
    url: './pokemon.json',
    success: function(data) {
        pokemon = data;
        return pokemon;
    }
});

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}