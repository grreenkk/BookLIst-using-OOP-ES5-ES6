class Book {
  constructor(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn 
  }
}



class UI {



  addBookToList(book){
    const tbody = document.querySelector('tbody');
    let row = document.createElement('tr');
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="delete-book">x<a></td>
    `

    tbody.appendChild(row)
  }

  showAlert(message, className){
    let form = document.getElementById('book-form');
    let div = document.createElement('div');
    let container = document.querySelector('.container');
    div.className = className;
    div.innerHTML = message;
    container.insertBefore(div, form);
    setTimeout(removeDiv, 2000)

    function removeDiv(){
      div.remove()
    }
  }

  deleteBook(target){
    if (target.className === 'delete-book'){
      target.parentElement.parentElement.remove()
    }
 

  }



  clearFields(){
    document.getElementById('title').value = ''
    document.getElementById('author').value = ''
    document.getElementById('isbn').value = ''
  }

 
  
}
function newBook(){
  let title = document.getElementById('title').value;
  author = document.getElementById('author').value;
  isbn = document.getElementById('isbn').value;

  const newBook = new Book(title, author, isbn);
  return newBook
}

class Store {
  static getBook(){
    let books

    if(localStorage.getItem('books') === null){
      books = [];
    }else{
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books
  }

  static addBooks(book){
    let books
    books = Store.getBook()
    books.push(book)

    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbn){
    let books;
    books = Store.getBook();

    books.forEach(function(book, index){
      if(book.isbn === isbn ){
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books))

    
  } 
}



const form = document.getElementById('book-form')
form.addEventListener('submit', function(e){

  newBook()

  const ui = new UI();

  

  if (title === '' || author === '' || isbn === ''){
    ui.showAlert('please fill all fields', 'error');
    
  }else{
    
    ui.addBookToList(newBook())

    Store.addBooks(newBook())
    
    ui.showAlert('Book added successfully', 'success');
    
    ui.clearFields()
  

    
    e.preventDefault()
  }
  
})

const tbody = document.querySelector('tbody')
tbody.addEventListener('click', deleteItem)

function deleteItem(e){
  const ui = new UI();
  ui.deleteBook(e.target);

  //Remove Book
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  ui.showAlert('book removed successfully', 'success');


}


//DOM load Event

document.addEventListener('DOMContentLoaded', function(){


  
  const ui = new UI();

  let books;

  books = Store.getBook();

  books.forEach(function(book){
    ui.addBookToList(book);
  });
  

  
})