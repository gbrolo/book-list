const electron = require('electron')
const es = electron.screen
const shell = electron.shell

exports.toreadItems = JSON.parse(localStorage.getItem('toreadItems')) || []

exports.saveItems = () => {
  localStorage.setItem('toreadItems', JSON.stringify(this.toreadItems))
}

// toggle active item
exports.selectItem = (event) => {
  $('.read-item').removeClass('is-active')
  $(event.currentTarget).addClass('is-active')
}

// select next or previous item
exports.changeItem = (direction) => {
  let active = $('.read-item.is-active')

  let newItem = (direction === 'down') ? active.next('.read-item') : active.prev('.read-item')

  if (newItem.length) {
    active.removeClass('is-active')
    newItem.addClass('is-active')
  }
}

// delete item
window.deleteItem = (i = false) => {
  if (i === false) i = ($('.read-item.is-active').index() - 1)

  $('.read-item').eq(i).remove()

  this.toreadItems = this.toreadItems.filter((item,index) => {
    return index !== i
  })

  this.saveItems()

  if (this.toreadItems.length) {
    let newIndex = (i === 0) ? 0 : i - 1

    $('.read-item').eq(newIndex).addClass('is-active')
  } else {
    $('#no-items').show()
  }
}

window.openInBrowser = () => {
  if(!this.toreadItems.length) return

  let target = $('.read-item.is-active')
  shell.openExternal(target.data('url'))
}

// open item
window.openItem = () => {
  if(!this.toreadItems.length) return

  let target = $('.read-item.is-active')
  let url = encodeURIComponent(target.data('url'))
  let itemIndex = target.index() - 1

  let newWindowUrl = `file://${__dirname}/popup.html?url=${url}&itemIndex=${itemIndex}`

  // open item
  let screenDim = es.getPrimaryDisplay().size
  let nwconfig = `resizable=yes,width=${screenDim.width},height=${screenDim.height}`
  let newWindow = window.open(newWindowUrl, target.data('title'), nwconfig)
}

exports.addItem = (item) => {
  /* UI */
  // hide initial empty message
  $('#no-items').hide()

  // html for new item
  let itemScript = `<a class="panel-block read-item" data-url="${item.url}" data-title="${item.title}">
                      <figure class="image has-shadow is-64x64 thumb">
                        <img src="${item.screenshot}" alt="thumb"/>
                      </figure>
                      <h2 class="title is-4 column">${item.title}</h2>
                    </a>`
  // Append to list
  $('#read-list').append(itemScript)

  // Select event handler
  $('.read-item')
    .off('click, dblclick')
    .on('click', this.selectItem)
    .on('dblclick', window.openItem)
}
