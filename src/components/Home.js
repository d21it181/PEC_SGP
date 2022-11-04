import React from "react";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/esm/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';
import { useState } from "react";
import {  FerrisWheelSpinnerOverlay } from 'react-spinner-overlay';
import { useEffect } from "react";
import { useCookies, withCookies } from 'react-cookie'
import Cookies from 'js-cookie';

export default function Home(){
  let history = useNavigate ();
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [cookies, setCookie] = useCookies(['access_token']);

  const initialFormData = Object.freeze({
    enumber : "",
    password: ""
  });
  const [formData, updateFormData] = React.useState(initialFormData);

  const handleChange = (e) => {
    updateFormData({
      ...formData,

      // Trimming any whitespace
      [e.target.name]: e.target.value.trim()
    });
  };

  useEffect(() => {
    if(Cookies.get('access_token') != undefined)
      history("../exam", { replace: true });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault()

    if(formData.password == "" || formData.id == ""){
      setError("Please provide all information") 
      setShow(true);
      return;
    }
    setLoading(true)
    
    axios.get('http://localhost/pec/student_registration.php', {
      params: {
        id: formData.enumber,
        password: formData.password
      }
    }).then((response) => {

      if(response.data.status == "allowed"){
        let expires = new Date(response.data.expiryToken)

        expires.setTime(expires.getTime())
        setCookie('access_token', response.data.studentToken, { path: '/',  expires}) 

        setLoading(false)
        setShow(false);
        history("../exam", { replace: true });
      }

      else if(response.data.status == "invalid"){
        setLoading(false)
        setError("Please enter valid number and password!") 
        setShow(true);
      } else {
        setLoading(false)
        setError("You are not allowed to give exam!")
        setShow(true);
      }
        
      //alert(response.data)
    });
 
  };

    return (
      <div>
        <div >

<FerrisWheelSpinnerOverlay
  loading={loading}

  overlayColor="rgba(255,255,255,0.8)"
/>
</div>
            <div className="center">
            <span className="bg-light square border border-black rounded p-3">
        <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email number</Form.Label>
          <Form.Control type="text" name="enumber" onChange={handleChange} placeholder="Enter enrollment number" />
         
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" onChange={handleChange} placeholder="Password" />
        
        </Form.Group>
        
        <Button onClick={handleSubmit} variant="primary" type="submit">
          Submit
        </Button>

        <Alert show={show} key="danger" className="mt-3" variant="danger">
          {error}
        </Alert>
    </Form>
    </span>
    </div>
    </div>
    );
}