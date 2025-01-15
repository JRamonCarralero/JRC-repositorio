/**
 * Define some pokemons for test
 */
let pokemons = [
    {
        name: 'Bulbasaur',
        id: '0001',
        type: ['planta', 'veneno']
    },
    {
        name: 'Caterpie',
        id: '0002',
        type: ['bicho']
    },
    {
        name: 'Metapod',
        id: '0003',
        type: ['bicho']
    },
    {
        name: 'Butterfree',
        id: '0004',
        type: ['bicho', 'volador']
    },
    {
        name: 'Weedle',
        id: '0005',
        type: ['bicho', 'veneno']
    },
    {
        name: 'Kakuna',
        id: '0006',
        type: ['bicho', 'veneno']
    },
    {
        name: 'Beedrill',
        id: '0007',
        type: ['bicho', 'veneno']
    },
    {
        name: 'Pidgey',
        id: '0008',
        type: ['normal', 'volador']
    }
]

/**
 * function searchPokemon
 * ToDo:
 * Search pokemons by id or by name
 * Call drawPokemons function
 */
function searchPokemon() {
    let input = document.getElementById('search').value
    if (isNaN(Number(input))) {
        console.log('buscar por nombre')
    } else {
        console.log('buscar por numero')
    }

    drawPokemons(pokemons)
}

/**
 * function drawPokemons
 * Draw Pokemons list
 * @param {Array} pok 
 * pok is a pokemons object's array
 */
function drawPokemons(pok) {
    const pList = document.getElementById('list')
    pList.innerHTML = ''
    for (let i=0; i<pok.length; i++){
        let elist = document.createElement('li')
        let img = document.createElement('img')
        img.src = 'https://placehold.co/200x200'
        img.alt = pok[i].name
        elist.appendChild(img)
        let idText =  document.createElement('p')
        idText.innerText = 'Nº ' + pok[i].id
        elist.appendChild(idText)
        let nameText =  document.createElement('h3')
        nameText.innerText = pok[i].name
        elist.appendChild(nameText)
        pok[i].type.forEach(item => {
            let typeText =  document.createElement('span')
            typeText.innerText = item
            typeText.classList.add(item)
            elist.appendChild(typeText)
        });
        pList.appendChild(elist)
    }
}

/**
 * call drawPokemons when the page is load
 * @returns 
 */
window.onload = () => drawPokemons(pokemons)