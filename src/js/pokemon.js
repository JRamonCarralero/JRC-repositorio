import pokemons from '../pokemon/pokedex.json' with { type: 'json' };
/**
 * Variables
 */

/**
 * necesito un segundo array que contenga los elementos filtrados a dibujar
 * al declararlo aquí, lo tengo como variable global y puedo usarla en las distintas 
 * funciones sin necesidad de pasarlas como parámetro
 */
let pok = pokemons
//aqui defino un valor inicial a la hora de pintar los pokemons
let ini = 0

//añadimos el DOMContentLoaded
document.addEventListener('DOMContentLoaded', onDOMContentLoaded)

/**
 * function onDOMContentLoaded
 * Add the buttons events and draw Pokemons
 */
function onDOMContentLoaded() {
    //recojo los botones
    const searchBtn = document.getElementById('search-btn')
    const showMoreBtn = document.getElementById('show-more')
    //añado eventos a los botones
    showMoreBtn.addEventListener('click', drawPokemons)
    searchBtn.addEventListener('click', searchPokemon)
    
    //cancelamos en evento del intro
    const formElement = document.querySelector('#search-form')
    formElement.addEventListener('submit', onFormSubmit)

    //llamo a la función que va a dibujar los pokemons
    drawPokemons()

}

/**
 * function onFormSubmit
 * cancel submit form and call searchPokemon
 * @param {event} e 
 */
function onFormSubmit(e) {
    //paro el submit
    e.preventDefault()
    //recojo el boton de busqueda
    const searchBtn = document.getElementById('search-btn')
    //creo el evento de click con el ratón
    const clickEvent = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
      });
    //emulo el evento de clickar el botón de búsqueda
    searchBtn.dispatchEvent(clickEvent)
}

/**
 * function searchPokemon
 * Search pokemons by id or by name
 * Call drawPokemons function
 */
function searchPokemon() {
    //vacio la lista
    document.getElementById('list').innerHTML = ''
    //al ser una nueva búsqueda, pongo el valor inicial a 0
    ini = 0
    //recojo el valor del input (en minuscula) y lo guardo en una variable
    let input = document.getElementById('search').value.toLowerCase()
    // si es una cadena vacía, selecciono todos los pokemons
    if (input === ''){
        pok = pokemons
    } else {
        //vacio el array pok por la nueva busqueda
        pok = []
        // si no, compruebo que no sea un número
        if (isNaN(Number(input))) {
            //por cada item en pokemons
            for (let item of pokemons){
                //si el nombre contiene ese valor, lo añado a pok
                if (item.name.english.toLowerCase().includes(input)) 
                    pok.push(item)
            }
        } else {
            for (let item of pokemons){
                //en este caso, como el id es un número, lo convierto en string y compruebo si esta el número
                //si el nombre contiene ese valor, lo añado a pok
                if (item.id.toString().includes(input)) 
                    pok.push(item)
            }
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
    //indicamos el valor maximo a visualizar, en este caso 28 mas que el inicial
    let maxShow = ini + 28
    //si el último valor a mostrar es mayor que el tamaño del array, el valor maximo sera el tamaño del array
    if (pok.length < (maxShow + ini)){
        maxShow = pok.length
    }
    //recojo el elemento ul
    const pList = document.getElementById('list')
    //recorremos el array para pintar la lista
    //decimos que i<maxShow porque maxShow como mucho es el tamaño del array, y el último elemento es tamaño-1
    for (let i=ini; i<maxShow; i++){
        /*
            mi html tiene este formato
            <li>
                <div>
                    <img>
                    <p></p>
                    <h3></h3>
                    <div>
                        <span></span>
                        ...
                    <div>
                </div>
            </li>
            Los tipos, en mi caso, son span
        */
        //creo el elemento li y lo añado al ul
        let elist = document.createElement('li')
        pList.appendChild(elist)
        //creo el elemento div con la clase card y lo añado al li
        let box = document.createElement('div')
        box.classList.add('card')
        elist.appendChild(box)
        //construyo la id para la imagen
        let nId = pok[i].id.toString().padStart(3, '0')
        //creo la imagen con la clase imgPkmn, su id su ruta y alt y lo añado al div
        let img = document.createElement('img')
        img.classList.add('imgPkmn')
        img.id = 'pkmn-' + i
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
        //creo el elemento p y lo añado al div
        let idText =  document.createElement('p')
        idText.innerText = 'Nº 0' + nId
        box.appendChild(idText)
        //creo el elemento h3 y lo añado al div
        let nameText =  document.createElement('h3')
        nameText.innerText = pok[i].name.english
        box.appendChild(nameText)
        // creo el nuevo elemento div con clase types y lo añado al div principal
        let box2 = document.createElement('div')
        box2.classList.add('types')
        box.appendChild(box2)
        //añado los diferentes tipos, uso el for ... of porque no necesito index
        for (let typePok of pok[i].type) {
            //Creo el elemento span y lo añado al nuevo div, con su clase
            let typeText =  document.createElement('span')
            typeText.innerText = typePok
            typeText.classList.add(typePok.toLowerCase())
            box2.appendChild(typeText) 
            //prueba de eventos en el tipo
            typeText.addEventListener('click', () => console.log(typePok))
        }

        //prueba de eventos en imagenes
        img.addEventListener('click', () => console.log(pok[i].base))
    }
    //cambio el valor a ini para el ver mas, y lo muestro o escondo
    //el valor que doy es el de maxShow, que es 1 mas del último elemento mostrado
    ini = maxShow
    //mientras ini sea menos que la longitud del array, muestro el boton de ver mas
    if (ini < pok.length) {
        document.getElementById('show-more').style.display = 'block'
    } else {
        document.getElementById('show-more').style.display = 'none'
    }
}
