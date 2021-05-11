//Book Constructor- Enables new books creation

function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}
//UI Constructor - enables UI creation
function UI() {

}

// Add Book to list
UI.prototype.addBookToList = function(book){
  tbody = document.querySelector('tbody');
  let row = document.createElement('tr');
  row.className = 'book-row'
  
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">x<a></td>
  `
  
  tbody.appendChild(row);

 
 
}

UI.prototype.removeBook = function(target){
  if(target.parentElement.parentElement.className === 'book-row'){
      
      target.parentElement.parentElement.remove();
      
  }
  
}

UI.prototype.clearFields = function(){
  document.getElementById('title').value = ''
  document.getElementById('author').value = ''
  document.getElementById('isbn').value = ''
}

UI.prototype.addErrorMessage = function (message, className){
  let div = document.createElement('div');
  let container = document.querySelector('.container')
  let form = document.querySelector('form')
  div.className = className;
  div.innerHTML = message;
  container.insertBefore(div, form);

  setTimeout(function(){
    div.remove();
  }, 3000)

}

// Event Listeners
document.getElementById('book-form').addEventListener('submit', function(e){
  //Get form values
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value
        
  
  //Instantiate book
  const book = new Book(title, author, isbn)
  
  // Instantiate UI
  const ui = new UI();
  console.log(ui)
  

  if(title === '' || author === '' || isbn === ''){
    ui.addErrorMessage('Please fill all fields', 'error');
  }else{
    //Add book to list
    ui.addBookToList(book);

    //Show success
    ui.addErrorMessage('Book added', 'success');

    //clear fields
    ui.clearFields()

    //remove Tasks
    
    
  }

  e.preventDefault();
})

document.querySelector('tbody').addEventListener('click', function(e){
  const ui = new UI();
  ui.removeBook(e.target);
  ui.addErrorMessage('Book removed', 'success');
})