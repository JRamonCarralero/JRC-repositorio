//import pokemons from '../pokemon/pokedex.json' with { type: 'json' };
/**
 * Variables
 */
let pokemons = []
//necesito un segundo array que contenga los elementos filtrados a dibujar
let pok = []
let ini = 0

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

/**
 * function searchPokemon
 * Search pokemons by id or by name
 * Call drawPokemons function
 */
function searchPokemon() {
    const pList = document.getElementById('list')
    pList.innerHTML = ''
    ini = 0
    let input = document.getElementById('search').value.toLowerCase()
    if (input === ''){
        pok = pokemons
    } else {
        if (isNaN(Number(input))) {
            //filtramos diciendo que el nombre contenga el valor del input
            pok = pokemons.filter(item => item.name.english.toLowerCase().includes(input))
            console.log(pok)
        } else {
            //filtramos diciendo que el numero contenga el valor del input
            //convierto el numero en string cara que sea incluido
            pok = pokemons.filter(item => item.id.toString().includes(input))
        }
    } 
    //document.getElementById('search').value = ''
    drawPokemons()
}

/**
 * function drawPokemons
 * Draw Pokemons list
 */
function drawPokemons() {  
    //indicamos el valor maximo a visualizar
    let maxShow = ini + 28
    if (pok.length < (maxShow + ini)){
        maxShow = pok.length
    }
    const pList = document.getElementById('list')
    //recorremos el array para pintar la lista
    for (let i=ini; i<maxShow; i++){
        let elist = document.createElement('li')
        let box = document.createElement('div')
        box.classList.add('card')
        //construyo la id para la imagen
        let nId = pok[i].id.toString().padStart(3, '0')
        let img = document.createElement('img')
        //corrijo las rutas para las imagenes con nombre distinto
        if (nId === '662') {
            img.src = 'pokemon/images/' + nId + 'r.png'
        } else if (nId === '740') {
            img.src = 'pokemon/images/' + nId + 'le.png'
        } else {
            img.src = 'pokemon/images/' + nId + '.png'
        }
        img.alt = pok[i].name
        box.appendChild(img)
        let idText =  document.createElement('p')
        idText.innerText = 'Nº 0' + nId
        box.appendChild(idText)
        let nameText =  document.createElement('h3')
        nameText.innerText = pok[i].name.english
        box.appendChild(nameText)
        let box2 = document.createElement('div')
        box2.classList.add('types')
        //añado los diferentes tipos
        pok[i].type.forEach(item => {
            let typeText =  document.createElement('span')
            typeText.innerText = item
            typeText.classList.add(item.toLowerCase())
            box2.appendChild(typeText)
        });
        box.appendChild(box2)
        elist.appendChild(box)
        pList.appendChild(elist)
    }
    //cambio el valor a ini para el ver mas, y lo muestro o escondo
    ini = maxShow
    if (ini < pok.length) {
        document.getElementById('show-more').style.display = 'block'
    } else {
        document.getElementById('show-more').style.display = 'none'
    }
}
