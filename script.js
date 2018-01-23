window.onload = function() {
    pkmnPicture = document.querySelector('.pokemon');
    pkmnName = document.querySelector('.name');
    pkmnAttack = document.querySelector('.attack');
    pkmnDefense = document.querySelector('.defense');
    move0 = document.querySelector('#move0');
    move1 = document.querySelector('#move1');
    move2 = document.querySelector('#move2');
    move3 = document.querySelector('#move3');

    $.ajax({
            method: 'get',
            dataType: 'json',
            url: './pokemon.json',
            success: function(data) {
                pokemon = data;
                url = 'https://archives.bulbagarden.net/media/upload/thumb/e/ec/122Mr._Mime.png/120px-122Mr._Mime.png';
                pkmnPicture.innerHTML = '<img src="'+url+'"/>';
                pkmnName.innerHTML = pokemon[122].name;
                pkmnAttack.innerHTML = 'Attack:' + pokemon[122].attack;
                pkmnDefense.innerHTML = 'Defense:' + pokemon[122].defense;
                for (var i in pokemon[122].moves) {
                    console.log(i);
                    document.querySelector('#move'+i).innerHTML = pokemon[122].moves[i];
                }
            }
        });
    
};