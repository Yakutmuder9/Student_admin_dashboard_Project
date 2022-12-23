import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import FullscreenIcon from '@mui/icons-material/Fullscreen';


import ReactToPrint from "react-to-print";
import PropTypes from "prop-types";

const ResourcesDetail = () => {
  const values = [true];
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);

  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setShow(true);
  }
  return (
    <div className="row shadow" >
      <div className="col-2 bg-secondary p-2">
        <div id="simple-list-example" className="d-flex flex-column gap-2 simple-list-example-scrollspy text-center">
          <a className="p-1 rounded text-light text-decoration-none" href="#simple-list-item-1">Chapter 1</a>
          <a className="p-1 rounded text-light text-decoration-none" href="#simple-list-item-2">Chapter 2</a>
          <a className="p-1 rounded text-light text-decoration-none" href="#simple-list-item-3">Chapter 3</a>
          <a className="p-1 rounded text-light text-decoration-none" href="#simple-list-item-4">Chapter 4</a>
          <a className="p-1 rounded text-light text-decoration-none" href="#simple-list-item-5">Chapter 5</a>
        </div>
      </div>
      <div className="col-10 bg-light " style={fullscreen ? { height: "100vh", width: "80%", overflowX: "hidden" } : { height: "100vh", width: "97%", overflowX: "hidden", position: "absolute" }}>
        <div className='text-center pt-2 d-flex align-items-center  justify-content-end'>
          <h2 className='w-100 text-center pt-2'> Book Titels</h2>
          {/* <FullscreenIcon type="button" className='text-white bg-dark top-0' /> */}
          
          <>
      {values.map((v, idx) => (
        <Button key={idx} className="me-2 mb-2 bg-dark" onClick={() => handleShow(v)}>
          <FullscreenIcon />
          {typeof v === 'string' && `below ${v.split('-')[0]}`}
        </Button>
      ))}
      <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Book Titels</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
        <Print />
        </Modal.Body>
      </Modal>
    </>


        </div>

        <Print />
       
      </div>


     


    </div>
  )
}

export default ResourcesDetail


function Chapter(){
  return(<div data-bs-spy="scroll" data-bs-target="#simple-list-example" data-bs-offset="0" data-bs-smooth-scroll="true" className="scrollspy-example " tabindex="0">
  <h4 className="ps-2" id="simple-list-item-1">Chapter 1</h4>
  <p className="p-2">People are surfing the web and relying on web sites more than ever to research companies, compare offerings and form opinions about brands and companies. Living in the digital world, a website is now a necessity for a business, big or small. If you have a business and don’t have a website, you are probably losing a number of great opportunities for your business. A website itself can be used to accomplish many different marketing strategies to help your business grow. The web has a far wider reach than any other form of advertising. Increasing visibility is one major factor that makes having a website important. Even if people have heard about your company, they may want to carry out research online first, before entertaining the idea of leaving the comfort of their own home. Websites usually provide a map and directions to company`s shops or offices, for visitors to less likely have trouble finding your location. Another important reason why having a website to represent your business is to give you credibility. A website will not only give you credibility but it will also help to give the impression that your company is bigger and more successful than it may actually be (Kelvin, 2015).
    Websites are also available and accessible 24 hours a day, every day of the year. Because of this, your customers and potential customers can visit your site for support or information about new and upcoming products and services whenever it is convenient for them. Your website will act as an invaluable and always-available resource for information which would otherwise only be accessible during your company`s business hours (Adewale, 2012).
  </p>
  <h4 className="ps-2" id="simple-list-item-2">Chapter 2</h4>
  <p className="p-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  <h4 className="ps-2" id="simple-list-item-3">Chapter 3</h4>
  <p className="p-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, </p>
  <h4 className="ps-2" id="simple-list-item-4">Chapter 4</h4>
  <p className="p-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, </p>
  <h4 className="ps-2" id="simple-list-item-5">Chapter 5</h4>
  <p className="p-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, </p>
</div>)
}



class ComponentToPrint extends React.Component {
  render() {
    return (
      <Chapter/>
    );
  }
}

class Print extends React.Component {
  render() {
    return (
      <div className="p-2">
        <ReactToPrint
          trigger={() => <a href="#">Print this out!</a>}
          content={() => this.componentRef}
        />
        <ComponentToPrint ref={el => (this.componentRef = el)} className="p-2"/>
      </div>
    );
  }
}
