let myLibrary = [];

function Book(title, author, pagesRead, pagesTotal, readAlready) {
    this.title = title
    this.author = author
    this.pagesRead = pagesRead
    this.pagesTotal = pagesTotal
    this.readAlready = readAlready
    //this.info = function() {
    //    return title + " by " + author + ", " + pagesRead;
    //}
}

//const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, 310);
//theHobbit.info();
//console.log(theHobbit.info());

function calculateReadAndLeftPages() {
    let overallPagesRead = myLibrary.reduce(function(a, b){
        return a + b.pagesRead;
      }, 0);      
    let overallPagesOfAllBooks = myLibrary.reduce(function(a, b){
        return a + b.pagesTotal;
    }, 0);     
    let pagesLeftToRead = overallPagesOfAllBooks - overallPagesRead;
    let pagesToRead = document.getElementById("left-pages");
    pagesToRead.innerText = pagesLeftToRead;
    let numOfAllPages = document.getElementById("total-pages");
    numOfAllPages.innerText = overallPagesRead;
}
function addBookToLibrary() {
    let bookTitle = document.getElementById('bookTitle').value;
    let bookAuthor = document.getElementById('bookAuthor').value;
    let bookPagesReadBeforeInt = document.getElementById('bookPagesRead').value;
    let bookPagesRead = parseInt(bookPagesReadBeforeInt);
    let bookPagesTotalBeforeInt = document.getElementById('bookPagesTotal').value;
    let bookPagesTotal = parseInt(bookPagesTotalBeforeInt);
    let completedBooks = document.getElementById('completed-books');
    if (bookPagesTotal == bookPagesRead) {
        readAlready = true;
    }    
    else if (bookPagesRead < bookPagesTotal) {
        readAlready = false;
    }
    let newBook = new Book(bookTitle, bookAuthor, bookPagesRead, bookPagesTotal, readAlready);

    myLibrary.push(newBook);
    let elementForBook = document.createElement('p');
    elementForBook.className = "single-book p-2 col-md-4 d-inline-block";
    elementForBook.innerText = "Title: " + myLibrary[(myLibrary.length - 1)].title + "\n" + "Author: " + myLibrary[(myLibrary.length - 1)].author  + "\n" + "Pages Read: " + myLibrary[(myLibrary.length - 1)].pagesRead + "\n"+ "Total Pages: " + myLibrary[(myLibrary.length - 1)].pagesTotal;
    let addedBooksContainer = document.getElementById('addedBooks');
    addedBooksContainer.appendChild(elementForBook);
    let totalBooks = myLibrary.length;    
    let numOfAllBooks = document.getElementById("total-books");
    numOfAllBooks.innerText = totalBooks;
    if (readAlready) {
        elementForBook.style.borderColor = "green";
        completedBooks.innerText ++;
    }
    calculateReadAndLeftPages();

    let editButton = document.createElement("button");

    if (elementForBook.innerText.includes(bookTitle) && myLibrary[myLibrary.findIndex(({title}) => title == bookTitle)].readAlready == true) {
        editButton.innerHTML = "Read";
        editButton.className = "btn btn-success disabled m-1";
        addedBooksContainer.appendChild(editButton);
    } else {
        editButton.innerHTML = "Not Read";
        editButton.className = "btn btn-primary m-1";
        addedBooksContainer.appendChild(editButton);
        editButton.addEventListener("click", function(){
            editButton.className = "btn btn-success disabled m-1";
            editButton.innerHTML = "Read";
            myLibrary[myLibrary.findIndex(({title}) => title == bookTitle)].readAlready = true;
            myLibrary[myLibrary.findIndex(({title}) => title == bookTitle)].pagesRead = myLibrary[myLibrary.findIndex(({title}) => title == bookTitle)].pagesTotal;
            elementForBook.innerText = "Title: " + myLibrary[(myLibrary.length - 1)].title + "\n" + "Author: " + myLibrary[(myLibrary.length - 1)].author  + "\n" + "Pages Read: " + myLibrary[(myLibrary.length - 1)].pagesTotal+ "\n"+ "Total Pages: " + myLibrary[(myLibrary.length - 1)].pagesTotal;
            elementForBook.style.borderColor = "green";
            completedBooks.innerText ++;
            calculateReadAndLeftPages();


        })
    }

    let removeButton = document.createElement("button");
    removeButton.innerHTML = "Remove";
    removeButton.className = "btn btn-danger";
    addedBooksContainer.appendChild(removeButton);

    
    removeButton.addEventListener("click", function(){
        if (elementForBook.innerText.includes(bookTitle) && myLibrary[myLibrary.findIndex(({title}) => title == bookTitle)].readAlready == true) {
            completedBooks.innerText --;
            myLibrary.splice(myLibrary.findIndex(({title}) => title == bookTitle), 1);
            //remove element from myLibrary where title == bookTitle
        }
        else {
            myLibrary.splice(myLibrary.findIndex(({title}) => title == bookTitle), 1);
        }
        elementForBook.parentNode.removeChild(elementForBook);
        removeButton.parentNode.removeChild(removeButton);
        editButton.parentNode.removeChild(editButton);

        numOfAllBooks.innerText = myLibrary.length;
        calculateReadAndLeftPages();

        
        console.log(myLibrary);
    });
   
    //console.log(myLibrary);
    //document.getElementById("addedBooks").innerHTML = myLibrary;
}


//jesli tytul jest w liscie to usun caly wpis w liscie
