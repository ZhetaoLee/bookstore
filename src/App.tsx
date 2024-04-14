import React, { useState } from 'react';
import './App.css';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';

interface Book {
  name: string;
  price: number;
  category: string;
  description: string;
}

var bookList: Book[] = [
  { name: "The Great Gatsby", price: 10.99, category: "Classic", description: ""},
  { name: "To Kill a Mockingbird", price: 12.50, category: "Classic", description: "" },
  { name: "1984", price: 9.99, category: "Science Fiction", description: "" },
  { name: "The Catcher in the Rye", price: 11.25, category: "Classic", description: "" },
  { name: "The Hobbit", price: 14.99, category: "Fantasy", description: "" },
  { name: "Harry Potter and the Philosopher's Stone", price: 15.99, category: "Fantasy", description: "" },
];

function App() {
  const [bookstore, setBookstore] = useState(bookList);
  
  const [show, setShow] = useState(false);
  const [editshow, setEditshow] = useState(false);

  const [bookname, setBookname] = useState('');
  const [bookprice, setBookprice] = useState('');
  const [bookcategory, setBookcategory] = useState('Classic');
  const [bookdescription, setBookdescription] = useState('');

  const [originbookname, setOriginbookname] = useState({ name: "", price: 0, category: "", description: ""});

  const [editbookname, setEditbookname] = useState('');
  const [editbookprice, setEditbookprice] = useState('');
  const [editbookcategory, setEditbookcategory] = useState('Classic');
  const [editbookdescription, setEditbookdescription] = useState('');

  const [nameErrorMessage, setNameErrorMessage] = useState('');
  const [priceErrorMessage, setPriceErrorMessage] = useState('');

  const handleClose = () => {
    setShow(false);
    setBookname('');
    setBookprice('');
    setBookcategory('Classic');
    setBookdescription(''); 
    setNameErrorMessage('');
    setPriceErrorMessage('');
  }

  const handleShow = () => setShow(true);

  const handleEditClose = () => {
    setEditshow(false);
    setEditbookname('');
    setEditbookprice('');
    setEditbookcategory('Classic');
    setEditbookdescription('');
    setNameErrorMessage('');
    setPriceErrorMessage('');
  }

  const handleEditShow = (book: Book)  => {
    setEditshow(true);
    setOriginbookname(book);
  }

  const handleDelete = (book: Book) => {
    setBookstore(bookstore.filter((ele)=> ele.name != book.name))
  }

  const handleAdd = (name:string, price:string, category:string, description:string) => {
    if (name === ''){
      setNameErrorMessage("Book name cannot be empty")
    }
    if (price === ''){
      setPriceErrorMessage("Price cannot be empty");
    } else if (Number.isNaN(Number(price))){
      setPriceErrorMessage("Price is not valid");
    } else {
      var addBook: Book = { name: name, price: Number(price), category: category, description: description};
      setShow(false);
      setBookstore(bookstore => [...bookstore, addBook]);
      setBookname('');
      setBookprice('');
      setBookcategory('Classic');
      setBookdescription('');   
    }
  }

  const handleEdit = (name:string, price:string, category:string, description:string) => {
    if (name === ''){
      setNameErrorMessage("Book name cannot be empty");
    }
    if (price === ''){
      setPriceErrorMessage("Price cannot be empty");
    } else if (Number.isNaN(Number(price))){
      setPriceErrorMessage("Price is not valid");
    } else {
      var updateBook: Book = { name: name, price: Number(price), category: category, description: description};
      setEditshow(false);
      setBookstore(bookstore.map((val, index) => val === originbookname? updateBook: val));
    }
  }

  return (
    <>
    <div className='top'>
      <Button onClick={handleShow} className="buttonLeft" variant="primary">Add a book</Button>
    </div>

    <div className="bookList">
      {bookstore.map(book => {
        return(
          <div key={1} onClick={() => handleEditShow(book)} className="book">
            <div className="bookname">{book.name}</div>
            <div className="bookprice">price: ${book.price}</div>
            <div className="category">category: {book.category}</div>
            <Button onClick={(e) => {e.stopPropagation();handleDelete(book)}} variant="primary">Delete</Button>
        </div>
        );
      })}
    </div>

    {show? <div className="popup">
            <div className="popup-inner">
                <h2>Add a Book</h2>
                {nameErrorMessage === ''? null:
                  <Alert variant="danger" onClose={() => setNameErrorMessage('')} dismissible>
                    <p>{nameErrorMessage}</p>
                  </Alert>
                }
                {priceErrorMessage === ''? null:
                  <Alert variant="danger" onClose={() => setPriceErrorMessage('')} dismissible>
                    <p>{priceErrorMessage}</p>
                  </Alert>
                }
                <Form>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="4">
                        Book Name:
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" value={bookname} onChange={e => setBookname(e.target.value)} placeholder="Enter book name..." />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="4">
                        Book Price: 
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" value={bookprice} onChange={e => setBookprice(e.target.value)} placeholder="Enter book price..." />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="4">
                        Book Cateogry:
                        </Form.Label>
                        <Col sm="8">
                            <Form.Select value={bookcategory} onChange={e => setBookcategory(e.target.value)}>
                              <option value="Classic">Classic</option>
                              <option value="Romance">Romance</option>
                              <option value="Science Fiction">Science Fiction</option>
                              <option value="Fantasy">Fantasy</option>
                            </Form.Select>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="4">
                        Book Description:
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control as="textarea" rows={3} value={bookdescription} onChange={e => setBookdescription(e.target.value)} placeholder="Enter book description..." />
                        </Col>
                    </Form.Group>
                    <Button className="buttonLeft" onClick={handleClose} variant="primary">
                        Close
                    </Button>
                    <Button className="buttonRight" onClick={() => handleAdd(bookname, bookprice, bookcategory, bookdescription)} variant="primary">
                        Add
                    </Button>
                </Form>
            </div>
        </div>: null}

        {editshow? <div className="popup">
            <div className="popup-inner">
                <h2>Edit a Book</h2>
                {nameErrorMessage === ''? null:
                  <Alert variant="danger" onClose={() => setNameErrorMessage('')} dismissible>
                    <p>{nameErrorMessage}</p>
                  </Alert>
                }
                {priceErrorMessage === ''? null:
                  <Alert variant="danger" onClose={() => setPriceErrorMessage('')} dismissible>
                    <p>{priceErrorMessage}</p>
                  </Alert>
                }
                <Form>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label>Book Name: {originbookname.name}</Form.Label>
                        <Form.Label>Book Price: ${originbookname.price}</Form.Label>
                        <Form.Label>Book Cateogry: {originbookname.category}</Form.Label>
                        <Form.Label>Book Description: {originbookname.description}</Form.Label>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="4">
                            New Book Name:
                            </Form.Label>
                            <Col sm="8">
                              <Form.Control type="text" value={editbookname} onChange={e => setEditbookname(e.target.value)} placeholder="Change book name..." />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="4">
                            New Book Price:
                            </Form.Label>
                            <Col sm="8">
                              <Form.Control type="text" value={editbookprice} onChange={e => setEditbookprice(e.target.value)} placeholder="Change book price..." />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="4">
                            New Book Category:
                            </Form.Label>
                            <Col sm="8">
                              <Form.Select value={editbookcategory} onChange={e => setEditbookcategory(e.target.value)}>
                                <option value="Classic">Classic</option>
                                <option value="Romance">Romance</option>
                                <option value="Science Fiction">Science Fiction</option>
                                <option value="Fantasy">Fantasy</option>
                              </Form.Select>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="4">
                            New Book Description:
                            </Form.Label>
                            <Col sm="8">
                              <Form.Control as="textarea" rows={3} value={editbookdescription} onChange={e => setEditbookdescription(e.target.value)} placeholder="Change book description..." />
                            </Col>
                        </Form.Group>
                      </Form.Group>
                    <Button className="buttonLeft" onClick={handleEditClose} variant="primary">
                        Close
                    </Button>
                    <Button className="buttonRight" onClick={() => handleEdit(editbookname, editbookprice, editbookcategory, editbookdescription)} variant="primary">
                        Edit
                    </Button>
                </Form>
            </div>
        </div>: null}
    </>
  );
}

export default App;