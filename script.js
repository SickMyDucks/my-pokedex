window.onload = function () {
    body = document.querySelector('body');
    upperScreen = document.querySelector('.upper-screen');
    joystick = document.querySelector('.joystick');
    if (body.getBoundingClientRect().height > body.getBoundingClientRect().width) {
        upperScreen.classList.remove('open-pokedex');
        upperScreen.classList.add('close-pokedex');
        document.querySelector('.joystick').classList.add('close-joystick');
    }
    document.querySelector('.buttons div:first-child').onclick = function () {
        document.querySelector('.input').style.display = 'none';
    }
    joystick.classList.add('open-joystick');

    document.querySelector('.buttons div:last-child').onclick = function () {
        document.querySelector('.input').style.display = 'flex';
        document.querySelector('input').select();
    }

    document.querySelector('tr:nth-child(2) td:first-child').onclick = function () {
        refreshData(chosenPokemon, -1);
    }
    document.querySelector('tr:nth-child(2) td:last-child').onclick = function () {
        refreshData(chosenPokemon, 1);
    }

    document.querySelector('form').onsubmit = function () {
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
            refreshData(chosenPokemon, 0);
        }
        return false;
    }
};

pokemon = $.ajax({
    method: 'get',
    dataType: 'json',
    url: './pokemon.json',
    success: function (data) {
        pokemon = data;
        return pokemon;
    }
});

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function refreshData(selectedPokemon, number) {
    if (parseInt(chosenPokemon) + number < 1) {
        chosenPokemon = 1;
    } else if (parseInt(chosenPokemon) + number > 151) {
        chosenPokemon = 151;
    } else {
        chosenPokemon = parseInt(chosenPokemon) + number
    }
    var selected = chosenPokemon;

    document.querySelector('h2').innerHTML = '';
    url = 'http://www.pokestadium.com/sprites/xy/' + pokemon[selected].name.toLowerCase() + '.gif';
    document.querySelector('.pokemon').innerHTML = '<img src="' + url + '"/>';
    document.querySelector('.name').innerHTML = pokemon[selected].name + ' #' + (selected);
    document.querySelector('.type').innerHTML = 'Type: ' + pokemon[selected].type;
    document.querySelector('.stats').innerHTML = 'Stats:';
    document.querySelector('.attack').innerHTML = 'Attack:' + pokemon[selected].attack;
    document.querySelector('.defense').innerHTML = 'Defense:' + pokemon[selected].defense;
    document.querySelector('.moves').style.display = 'block';
    for (var i = 0; i < 4; i++) {
        document.querySelector('#move' + i).innerHTML = typeof pokemon[selected].moves[i] == 'undefined' ? '' : pokemon[selected].moves[i];
    }
    document.querySelector('.input').style.display = 'none';
}

window.onresize = function () {
    if (body.getBoundingClientRect().height < 600) {
        if (upperScreen.classList.contains('open-pokedex') || joystick.classList.contains('close-joystick')) {
            upperScreen.classList.remove('open-pokedex');
            joystick.classList.remove('open-joystick');
        }
        document.querySelector('.pokedex').style.transform = 'translateY(-20%)';
        upperScreen.classList.add('close-pokedex');
        joystick.classList.add('close-joystick');
    } else {
        if (upperScreen.classList.contains('close-pokedex') || joystick.classList.contains('close-joystick')) {
            upperScreen.classList.remove('close-pokedex');
            upperScreen.classList.add('open-pokedex');
            joystick.classList.remove('close-joystick');
            joystick.classList.add('open-joystick');
            document.querySelector('.pokedex').style.transform = 'translateY(0%)';
        }
    }
}