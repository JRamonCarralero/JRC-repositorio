//  variables
const item = document.getElementById('item')
const qty = document.getElementById('qty')
const price = document.getElementById('price')
const listTotal = document.getElementById('list-total')
const tbody = document.getElementById('list-tbody')

let shoppingList = []
console.log(shoppingList)

// Añade un elemento a la lista y llama a la función que pinta la tabla
function addItem() {  
    if (!item.value) {
        alert('Debe rellenar el campo artículo')
        return
    }
    if (!qty.value) {
        alert('Debe rellenar el campo cantidad')
        return
    }
    if (!price.value) {
        alert('Debe rellenar el campo precio')
        return
    }
    let newItem = {
        item: item.value,
        qty: qty.value,
        price: price.value
    }
    shoppingList.push(newItem)
    item.value = ''
    qty.value = ''
    price.value = ''
    console.log(shoppingList)
    drawTable()
}

// Limpipa lista de elementos y la tabla que los muestra
function clearList() {
    shoppingList = []
    console.log(shoppingList)
    tbody.innerHTML = ''
    listTotal.textContent = '0€'
}

// Rellena la tabla con la lista de elementos
function drawTable() {
    tbody.innerHTML = ''
    let totalAmount = 0
    shoppingList.forEach((el, index) => {
        let total = el.qty * el.price
        tbody.innerHTML += `
            <tr class="bb1">
                <td>${el.item}</td>
                <td>${el.qty}</td>
                <td>${el.price}€</td>
                <td>${total}€</td>
                <td><button onclick="deleteItem(${index})">borrar</button></td>
            </tr>
        `
        totalAmount += total
    })
    listTotal.textContent = totalAmount + '€'
}

// Elimina el elemento de la lista y llama a la función que pinta la tabla
function deleteItem(index) {
    shoppingList.splice(index, 1)
    drawTable()
}