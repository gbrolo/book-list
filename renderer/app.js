/* Modules */
const { ipcRenderer } = require('electron')
const items = require('./items')
const menu = require('./menu')

// navigate with up/down arrows
$(document).keydown((event) => {
  switch (event.key) {
    case 'ArrowUp':
      items.changeItem('up')
      break
    case 'ArrowDown':
      items.changeItem('down')
      break
  }
})

// open-add-modal
$('.open-add-modal').click(() => {
  $('#add-modal').addClass('is-active')
  $('#item-input').focus()
})

// close-add-modal
$('.close-add-modal').click(() => {
  $('#add-modal').removeClass('is-active')
})

/* SUBMIT */
//add-button submit
$('#add-button').click(() => {
  // URL from input
  let item = $('#item-input').val()

  // disable modal and show loading
  $('#item-input').prop('disabled', true)
  $('#add-button').addClass('is-loading')
  $('.close-add-modal').addClass('is-disabled')

  // send url via IPC
  if (item) {
    ipcRenderer.send('new-item', item)
  }
})

$('#item-input')
  .keyup((event) => { (event.key === 'Enter') ? $('#add-button').click() : null })

/* LISTEN TO NEW ITEM FROM MAIN */
ipcRenderer.on('new-item-success', (event, item) => {
  items.toreadItems.push(item)
  items.saveItems()
  // add item
  items.addItem(item)

  // close and reset the modal
  $('#add-modal').removeClass('is-active')
  $('#item-input').prop('disabled', false).val('http://')
  $('#add-button').removeClass('is-loading')
  $('.close-add-modal').removeClass('is-disabled')

  // select item if its the first addition to array
  if (items.toreadItems.length === 1) {
    $('.read-item:first()').addClass('is-active')
  }
})

// filter by search
$('#search').keyup((event) => {
  let filter = $(event.currentTarget).val()

  $('.read-item').each((index, element) => {
    $(element).text().toLowerCase().includes(filter) ? $(element).show() : $(element).hide()
  })
})

// add items
if (items.toreadItems.length) {
  items.toreadItems.forEach(items.addItem)
  $('.read-item:first()').addClass('is-active')
}
