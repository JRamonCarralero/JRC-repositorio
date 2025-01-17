// Define product items
const PRODUCTS = {
    MILK: 'leche',
    FRUIT: 'fruta',
    MEAT: 'carne',
    WATER: 'agua',
    BREAD: 'pan'
}

//default shopping list one
const OPTIONONE = [
    {
        item: 'leche',
        qty: 6,
        price: 2,
        row: 0
    },
    {
        item: 'fruta',
        qty: 3,
        price: 3,
        row: 1
    },
    {
        item: 'carne',
        qty: 1,
        price: 11,
        row: 2
    },
    {
        item: 'agua',
        qty: 6,
        price: 1,
        row: 3
    },
    {
        item: 'pan',
        qty: 2,
        price: 1,
        row: 4
    }
]

const shoppingList = []

document.addEventListener('DOMContentLoaded', onDOMContentLoaded)

// ------- EVENTS ------- //

/**
 * function onDOMContentLoaded
 * add the events click on buttons
 */
function onDOMContentLoaded() {
    const addBtn = document.getElementById('add-btn')
    const resetBtn = document.getElementById('reset-btn')
    const optOne = document.getElementById('opt1')
    const formElement = document.getElementById('article-form')
    const item = document.getElementById('item')
    const itemQty = document.getElementById('qty')
    const itemPrice = document.getElementById('price')
    const localShoppingList = JSON.parse(localStorage.getItem('shoppingList'))

    //addBtn.addEventListener('click', createShoppingListArticle)
    addBtn.addEventListener('click', checkCreateOrUpdate)
    resetBtn.addEventListener('click', createNewShoppingList)
    optOne.addEventListener('click', createOptionOne)
    formElement.addEventListener('submit', onFormSubmit)
    item.addEventListener('keypress', onInputEnter)
    itemQty.addEventListener('keypress', onInputEnter)
    itemPrice.addEventListener('keypress', onInputEnter)
    item.addEventListener('keyup', changeBGColorOnKeyUp)
    
    shoppingList.empty = function() {
        while (this.length > 0) {
            this.pop()
        }
    }

    if(localShoppingList) {
        localShoppingList.forEach(article => {
            shoppingList.push(article)
            createNewArticleRow(article)
        })
        calculateTotalAmount()
    }
}

/**
 * function onFormSubmit
 * cancel submit form and call click event on add button
 * @param {event} e 
 */
function onFormSubmit(e) {
    e.preventDefault()
    replyAddButtonClick()
}

/**
 * function onInputEnter
 * call replyAddButtonClick when the event keypress = enter occurs on the form's inputs
 * @param {event} e 
 */
function onInputEnter(e) {
    if (e.key === 'Enter') {
        replyAddButtonClick()
    }

}

/**
 * function replyAddButtonClick
 * reply the click event on the add to shopping list button
 */
function replyAddButtonClick() {
    const addBtn = document.getElementById('add-btn')
    const clickEvent = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
      });
    //emulo el evento de clickar el botón de búsqueda
    addBtn.dispatchEvent(clickEvent)
}

// ------- METHODS ------- //

/**
 * function checkCreateOrUpdate
 * check if the article exist in shoppingList and call updateShoppingListItem or createShoppingListArticle
 * @returns
 */
function checkCreateOrUpdate() {
    const item = document.getElementById('item').value
    const index = shoppingList.findIndex(el => el.item === item)
    
    if (!item) {
        alert('Debe rellenar el campo artículo')
        return
    }

    if (index !== -1) {
        updateShoppingListItem(index)
    } else {
        createShoppingListArticle()
    }
}

/**
 * function checkQtyAndPriceValues
 * check values for qty and price
 * @param {string} article 
 * @returns 
 * returns object with qty and price
 */
function checkQtyAndPriceValues(article) {
    const itemQty = document.getElementById('qty')
    const itemPrice = document.getElementById('price')
    
    let qty = 0
    let price = 0
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

    return {qty, price}
}

/**
 * function createShoppingListArticle
 * create an article object and push it into shoppingList array
 * call createNewArticleRow, calculateTotalAmount, clearInputsElements, resetFocus
 */
function createShoppingListArticle() {
    const item = document.getElementById('item')
    const arrQtyPrice = checkQtyAndPriceValues(item.value)

    let newArticle = {
        item: item.value,
        qty: arrQtyPrice.qty,
        price: arrQtyPrice.price,
        row: new Date().getTime()
    }
    shoppingList.push(newArticle)

    localStorage.setItem('shoppingList', JSON.stringify(shoppingList))

    createNewArticleRow(newArticle)
    calculateTotalAmount()
    clearInputsElements()

    resetFocus()
}

/**
 * function updateShoppingListItem
 * Update the article in the shopping list
 * call updateArticleRow, calculateTotalAmount, resetFocus
 * @param {number} index 
 */
function updateShoppingListItem(index) {
    const arrQtyPrice = checkQtyAndPriceValues(shoppingList[index].item)
    
    shoppingList[index].qty = arrQtyPrice.qty
    shoppingList[index].price = arrQtyPrice.price

    localStorage.setItem('shoppingList', JSON.stringify(shoppingList))

    updateArticleRow(shoppingList[index])
    calculateTotalAmount()
    clearInputsElements()

    resetFocus()
}

/**
 * deleteShoppingListItem
 * delete an article from the shoppingList array
 * call deleteArticleRow(), calculateTotalAmount, resetFocus
 * @param {number} idRow 
 */
function deleteShoppingListItem(idRow) {
    const index = shoppingList.findIndex((item) => item.row === idRow)
  
    shoppingList.splice(index, 1)

    localStorage.setItem('shoppingList', JSON.stringify(shoppingList))
    
    deleteArticleRow(idRow)
    calculateTotalAmount()

    resetFocus()
}

/**
 * function createNewArticleRow
 * Draw the new row with de article
 * @param {object} article 
 */
function createNewArticleRow(article) {
    const tbodyElement = document.getElementById('list-tbody')
    const row = document.createElement('tr')

    row.classList.add('bb1')
    row.id = `row${article.row}`
    tbodyElement.appendChild(row)

    createRowContent(article, row)
}

/**
 * function createRowContent
 * create cells element for row element
 * @param {object} article 
 * @param {string} row 
 */
function createRowContent(article, row) {
    let total = article.qty * article.price
    const cellItem = document.createElement('td')
    const cellQty = document.createElement('td')
    const cellPrice = document.createElement('td')
    const cellTotal = document.createElement('td')
    const cellBtn = document.createElement('td')
    const delBtn = document.createElement('button')
    const editBtn = document.createElement('button')

    cellItem.innerText = article.item
    row.appendChild(cellItem)
    cellQty.innerText = article.qty
    row.appendChild(cellQty)
    cellPrice.innerText = `${article.price} €`
    row.appendChild(cellPrice)
    cellTotal.innerText = `${total} €`
    row.appendChild(cellTotal)
    delBtn.innerText = '☠'
    delBtn.addEventListener('click', () => {
        console.log(row)
        deleteShoppingListItem(article.row)
    })
    cellBtn.appendChild(delBtn)
    editBtn.innerText = '✎'
    editBtn.addEventListener('click', () => editArticleRow(article))
    cellBtn.appendChild(editBtn)
    row.appendChild(cellBtn)
}

/**
 * function updateArticleRow
 * Clear row html and call createRowContent
 * @param {object} article 
 */
function updateArticleRow(article) {
    const row = document.getElementById(`row${article.row}`)
    row.innerHTML = ''

    createRowContent(article, row)
}

/**
 * function deleteArticleRow
 * Delete the article row
 * @param {number} id 
 */
function deleteArticleRow(id) {
    let idRow = `row${id}`
    document.getElementById(idRow).remove()
}

/**
 * function editArticleRow
 * Put into inputs the values of the article
 * @param {object} article 
 */
function editArticleRow(article) {
    document.getElementById('item').value = article.item
    document.getElementById('qty').value = article.qty
    document.getElementById('price').value = article.price

    changeBGColorOnKeyUp()
    resetFocus()
}

/**
 * function calculateTotalAmount
 * calculate the total amount
 */
function calculateTotalAmount() {
    const listTotal = document.getElementById('list-total')
    let totalAmount = 0
    for (let article of shoppingList) {
        totalAmount += (article.qty * article.price)
    }
    listTotal.innerText = totalAmount
}

/**
 * function createNewShoppingList
 * clear shoppingList and table
 * call resetFocus
 */
function createNewShoppingList() {
    const listTotal = document.getElementById('list-total')
    const tbodyElement = document.getElementById('list-tbody')
    shoppingList.empty()
    tbodyElement.innerHTML = ''
    listTotal.innerText = '0'

    localStorage.clear()

    resetFocus()
}

/**
 * function clearInputsElements
 * clear the inputs elements
 */
function clearInputsElements() {
    const item = document.getElementById('item')
    const itemQty = document.getElementById('qty')
    const itemPrice = document.getElementById('price')

    item.value = ''
    itemQty.value = ''
    itemPrice.value = ''
}

/**
 * function resetFocus
 * Put the focus on article input
 */
function resetFocus() {
    const item = document.getElementById('item')
    item.focus()
}

/**
 * function createOptionOne
 * add the values from OPTIONONE to shoppingList and call drawTable
 */
function createOptionOne() {
    const tbodyElement = document.getElementById('list-tbody')
    shoppingList.empty()
    tbodyElement.innerHTML = ''
    for (let article of OPTIONONE) {
        shoppingList.push(article)
        createNewArticleRow(article)
    }
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList))
    calculateTotalAmount()
}

/**
 * function changeBGColorOnKeyUp
 * draw the background-color of rows when article start with article input
 */
function changeBGColorOnKeyUp() {
    const article = document.getElementById('item').value

    shoppingList.forEach(element => {
        const row = document.querySelectorAll(`#row${element.row}>td`)
        if (element.item.startsWith(article) && article) {
            for (let td of row){
                td.classList.add('row-blue')
            }
        } else {
            for (let td of row){
                td.classList.remove('row-blue')
            }
        }
    })
}