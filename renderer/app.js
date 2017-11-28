/* Modules */
const { ipcRenderer } = require('electron')
const items = require('./items')

// open-add-modal
$('.open-add-modal').click(() => {
  $('#add-modal').addClass('is-active')
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
  $('#item-input').prop('disabled', false).val('')
  $('#add-button').removeClass('is-loading')
  $('.close-add-modal').removeClass('is-disabled')
})

if (items.toreadItems.length) items.toreadItems.forEach(items.addItem)
