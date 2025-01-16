// Variables
const input = document.getElementById('search')
const searchBtn = document.getElementById('searchBtn')
const ulList = document.getElementById('list')
const showMoreBtn = document.getElementById('show-more')

let pokemons = []
//necesito un segundo array que contenga los elementos filtrados a dibujar
let pok = []
let ini = 0

/**
 * function searchPokemon
 * Search pokemons by id or by name
 * Call drawPokemons function
 */
const searchPokemon = () => {
    ulList.innerHTML = ''
    ini = 0
    if (input.value === ''){
        pok = pokemons
    } else {
        if (isNaN(Number(input.value))) {
            //filtramos diciendo que el nombre contenga el valor del input
            pok = pokemons.filter(item => item.name.english.toLowerCase().includes(input.value.toLowerCase()))
        } else {
            //filtramos diciendo que el numero contenga el valor del input
            //convierto el numero en string para que sea incluido
            pok = pokemons.filter(item => item.id.toString().includes(input.value))
        }
    } 
    //document.getElementById('search').value = ''
    drawPokemons()
}

/**
 * function drawPokemons
 * Draw Pokemons list
 */
const drawPokemons = () => {  
    //indicamos el valor maximo a visualizar
    let maxShow = ini + 28
    if (pok.length < (maxShow + ini)){
        maxShow = pok.length
    }
    //recorremos el array para pintar la lista
    for (let i=ini; i<maxShow; i++){
        //construyo la id para la imagen
        let pokId = pok[i].id.toString().padStart(3, '0')
        let pokUrl = 'pokemon/images/' + pokId + '.png'
        //corrijo las rutas para las imagenes con nombre distinto
        if (pokId === '662') {
            pokUrl = 'pokemon/images/' + pokId + 'r.png'
        }
        if (pokId === '740') {
            pokUrl = 'pokemon/images/' + pokId + 'le.png'
        }
        //creo los tipos y su html
        let pokTypesHTML = ''
        pok[i].type.forEach(item => {
            pokTypesHTML += `
                <span class="${item.toLowerCase()}">${item}</span>
            `
        });
        //Creo el HTML y lo añado
        ulList.innerHTML += `
            <li>
                <div class="card">
                    <img src="${pokUrl}" alt="${pok[i].name}">
                    <p>Nº 0${pokId}</p>
                    <h3>${pok[i].name.english}</h3>
                    <div class="types">
                        ${pokTypesHTML}
                    </div>
                </div>
            </li>
        `
    }
    //cambio el valor a ini para el ver mas, y lo muestro o escondo
    ini = maxShow
    if (ini < pok.length) {
        showMoreBtn.style.display = 'block'
    } else {
        showMoreBtn.style.display = 'none'
    }
}

/**
 * Event click on buttons
 */
showMoreBtn.addEventListener('click', drawPokemons)
searchBtn.addEventListener('click', searchPokemon)

/**
 * call drawPokemons when the page is load
 */
window.onload = () => {
    //con fetch recojo el json y le asigno su contenido al array
    fetch('pokemon/pokedex.json')
        .then(response => response.json())
        .then(data => {
            pokemons = data;
            pok = pokemons
            drawPokemons()
        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
          });
}