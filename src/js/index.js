//  Constants
const item = document.getElementById('item')
const itemQty = document.getElementById('qty')
const itemPrice = document.getElementById('price')
const listTotal = document.getElementById('list-total')
const tbody = document.getElementById('list-tbody')

// Define product items
const PRODUCTS = {
    MILK: 'leche',
    FRUIT: 'fruta',
    MEAT: 'carne',
    WATER: 'agua',
    BREAD: 'pan'
}

let shoppingList = []

/**
 * function addItem()
 * Add new item to shoppingList
 * Call drawTable function
 * @returns 
 */
function addItem() {  
    if (!item.value) {
        alert('Debe rellenar el campo artículo')
        return
    }
    let qty = 0
    let price = 0
    let article = item.value
    switch (article) {
        case PRODUCTS.MILK:
            qty = 6
            price = 2
            break;
        case PRODUCTS.FRUIT:
            qty = 3
            price = 1
            break;
        case PRODUCTS.MEAT:
            qty = 2
            price = 11
            break;
        case PRODUCTS.WATER:
            qty = 6
            price = 1
            break;
        case PRODUCTS.BREAD:
            qty = 2
            price = 1
            break;
        default:
            break;
    }

    if (itemQty.value) {
        qty = Number(itemQty.value)
    }
    if (itemPrice.value) {
        price = Number(itemPrice.value)
    }
    let newItem = {
        item: article,
        qty: qty,
        price: price
    }
    shoppingList.push(newItem)
    item.value = ''
    itemQty.value = ''
    itemPrice.value = ''
    drawTable()
}

/**
 * function clearList()
 * Change shoppingList to an empty array
 * Clear tbody from table 'list-table'
 */
function clearList() {
    shoppingList = []
    console.log(shoppingList)
    tbody.innerHTML = ''
    listTotal.innerText = '0 €'
}

/**
 * function drawTable()
 * Draw the table 'list-table' with the shoppingList's articles
 */
function drawTable() {
    tbody.innerHTML = ''
    let totalAmount = 0
    shoppingList.forEach((el, index) => {
        let total = el.qty * el.price
        /* literal template 
        tbody.innerHTML += `
            <tr class="bb1">
                <td>${el.item}</td>
                <td>${el.qty}</td>
                <td>${el.price} €</td>
                <td>${total} €</td>
                <td><button onclick="deleteItem(${index})">borrar</button></td>
            </tr>
        `
        */
        let row = document.createElement('tr')
        row.classList.add('bb1')
        let cellItem = document.createElement('td')
        cellItem.innerText = el.item
        row.appendChild(cellItem)
        let cellQty = document.createElement('td')
        cellQty.innerText = el.qty
        row.appendChild(cellQty)
        let cellPrice = document.createElement('td')
        cellPrice.innerText = el.price + '€'
        row.appendChild(cellPrice)
        let cellTotal = document.createElement('td')
        cellTotal.innerText = total + '€'
        row.appendChild(cellTotal)
        let cellBtn = document.createElement('td')
        let delBtn = document.createElement('button')
        delBtn.onclick = () => deleteItem(index)
        delBtn.innerText = 'Borrar'
        cellBtn.appendChild(delBtn)
        row.appendChild(cellBtn)
        tbody.appendChild(row)
        
        totalAmount += total
    })
    listTotal.innerText = totalAmount + ' €'
}

/**
 * function deleteItem(index)
 * Delete an article from the shoppingList
 * Call drawTable function
 * @param {number} index 
 */
function deleteItem(index) {
    shoppingList.splice(index, 1)
    drawTable()
}