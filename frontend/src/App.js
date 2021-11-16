import React from "react";
import { Container, Form, Button} from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const baseURL = "http://localhost:5000/requestLoan";


function App() {

    //State variables
    const [tax_id, setTaxId] = React.useState('')
    const [business_name, setBusinessName] = React.useState('')
    const [requested_amount, setRequestedAmount] = React.useState('')

    
    //Set state values
    const changeTaxId = (event) => {
        setTaxId(event.target.value);
    };

    const changeBusinessName = (event) => {
        setBusinessName(event.target.value);
    };

    const changeRequestedAmount = (event) => {
        setRequestedAmount(event.target.value.replace(/\D/,''));
    };

    //Do a POST request to flask server
    const apply = () =>  fetch(baseURL, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        //Create a JSON Object from state variables
        body: JSON.stringify({ tax_id, business_name, requested_amount }),
    })
    .then(response => response.json())
    .then(response => {
        //shows the response in a toast notification
        notify(response);
    });

    
    const notify = (props) => toast(
        props.response, {
            type: props.status,
            theme: "colored"
        });

    return (
        <Container className="d-grid h-100">
            <img className="mb-4 bootstrap-logo" 
                src="https://lendingfront.com/wp-content/uploads/2019/12/color_logo.svg" 
                alt="Lending Front Logo"
            />
            <h1 className="mb-5 fs-2 fw-bold">Application process</h1>

            <Form.Group className="mb-3">
                <label >Tax Id</label>
                <Form.Control type="text" size="lg" value={tax_id} onChange={changeTaxId}/>
            </Form.Group>

            <Form.Group className="mb-3">
                <label>Business Name</label>
                <Form.Control type="text" size="lg" value={business_name} onChange={changeBusinessName}/>
            </Form.Group>

            <Form.Group className="mb-3">
                <label>Requested Amount</label>
                <Form.Control type="number" size="lg" value={requested_amount} onChange={changeRequestedAmount}/>
            </Form.Group>

            <div className="d-grid">
                <Button variant="primary" size="lg" onClick={() => apply()}>Apply</Button>
            </div>

            <ToastContainer />
        </Container>
    );
}

export default App;
