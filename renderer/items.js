exports.toreadItems = JSON.parse(localStorage.getItem('toreadItems')) || []

exports.saveItems = () => {
  localStorage.setItem('toreadItems', JSON.stringify(this.toreadItems))
}

exports.addItem = (item) => {
  /* UI */
  // hide initial empty message
  $('#no-items').hide()

  // html for new item
  let itemScript = `<a class="panel-block read-item">
                      <figure class="image has-shadow is-64x64 thumb">
                        <img src="${item.screenshot}" alt="thumb"/>
                      </figure>
                      <h2 class="title is-4 column">${item.title}</h2>
                    </a>`
  // Append to list
  $('#read-list').append(itemScript)
}
