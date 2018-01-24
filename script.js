window.onload = function() {
    pkmnPicture = document.querySelector('.pokemon');
    pkmnName = document.querySelector('.name');
    pkmnType = document.querySelector('.type');
    pkmnAttack = document.querySelector('.attack');
    pkmnDefense = document.querySelector('.defense');
    move0 = document.querySelector('#move0');
    move1 = document.querySelector('#move1');
    move2 = document.querySelector('#move2');
    move3 = document.querySelector('#move3');
    document.querySelector('.buttons div:last-child').onclick = function() {
        document.querySelector('.input').style.display = 'flex';
    }
    document.querySelector('.buttons div:first-child').onclick = function() {
        document.querySelector('.input').style.display = 'none';
    }

    document.querySelector('form').onsubmit = function() {
        searchQuery = this.querySelector('input').value;
        searchQuery = capitalize(searchQuery);
        console.log(searchQuery);
        console.log(!isNaN(this.querySelector('input').value)); 

        if (isNaN(this.querySelector('input').value)) {
            for (var j in pokemon) {
                if (pokemon[j].name == searchQuery) {
                    console.log('trouvé');
                    chosenPokemon = j;
                } else {
                    console.log('pas trouvé!');
                }
            }
        } else {
            chosenPokemon = this.querySelector('input').value;
        }

        url = 'http://www.pokestadium.com/assets/img/sprites/official-art/large/'+pokemon[chosenPokemon].name.toLowerCase()+'.png';
        pkmnPicture.innerHTML = '<img src="'+url+'"/>';
        pkmnName.innerHTML = pokemon[chosenPokemon].name + ' #'+chosenPokemon;
        pkmnType.innerHTML = '<strong>Type: </strong>'+pokemon[chosenPokemon].type;
        pkmnAttack.innerHTML = 'Attack:' + pokemon[chosenPokemon].attack;
        pkmnDefense.innerHTML = 'Defense:' + pokemon[chosenPokemon].defense;
        for (var i in pokemon[chosenPokemon].moves) {
            document.querySelector('#move'+i).innerHTML = pokemon[chosenPokemon].moves[i];
        }
        document.querySelector('.input').style.display = 'none';
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