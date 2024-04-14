import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Button } from 'react-bootstrap';
import './PopUp.css';


function PopUp() {
    const [bookname, setBookname] = useState('');
    const [bookprice, setBookprice] = useState('');
    const [bookcategory, setBookcategory] = useState('');
    const [bookdescription, setBookdescription] = useState('');

    return (
        <>
        <div className="popup">
            <div className="popup-inner">
                <h2>Add a Book</h2>
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
                            <Form.Control type="text" value={bookcategory} onChange={e => setBookcategory(e.target.value)} placeholder="Enter book cateogry..." />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="4">
                        Book Description:
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" value={bookdescription} onChange={e => setBookdescription(e.target.value)} placeholder="Enter book description..." />
                        </Col>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Close
                    </Button>
                    <Button variant="primary" type="submit">
                        Close
                    </Button>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
        </>
      );
}

export default PopUp;