import './App.css';
import React from 'react';
import iconnet from './img/internet.png';
import hacherf from './img/hackerff.png';
import pay from './img/pay.png';
import security from './img/security.png';
import wage from './img/wage.png';
import vectorhacker from './img/hacker-3.png';
import logobaner from './img/logo-orginall.png';
import backgroundshop from './img/background-shop.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import  {Container, Col, Row, Button,} from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      {/* header */}
      <Container fluid className="header">
        <Row className='justify-content-between'>
          <Col className='menu col-lg-7'>
            <ul>
              <li className='name-bold'>BLACK CRIPTO</li>
              <li>TRADE</li>
              <li>EARN</li>
              <li>WIN</li>
              <li>NFT</li>
              <li>...</li>
            </ul>
          </Col>
          <Col className='btn col-lg-3'>
            <div className='btn-wallet'>
              <p>content wallet</p>
            </div>
            <div className='icon'>
              <img className='icon-header' src={iconnet}/>
            </div>
          </Col>
        </Row>
      </Container>
      {/* header */}

      {/* content-criptto */}
      <Container>
        <Row className='row-content justify-content-center'>
          <Col className='content col-lg-12'>
            <h2>BLACK CRIPTTO</h2>
            <p>welcome to hack currency</p>
            <br/>
          </Col>
        </Row>
      </Container>
      {/* content-criptto */}

      {/* content-two */}
      <Container fluid>
        <Row>
          <Col className='content-left col-lg-6 col-md-7'>
            <h2>bedone karmozd bedone sabtenam<br/>hick kas to ra nemishenasad dar inja</h2>
            <Button className='btn-content-1'>content</Button>
            <Button className='btn-content'>content</Button>
          </Col>
          <Col className='content-right col-lg-6'>
            <img className='icon-content' src={hacherf}/>
          </Col>
        </Row>
      </Container>
      {/* content-two */}

      {/* content-paragraph */}
      <Container fluid>
        <Row className='justify-content-center'>
          <Col className='paragraph col-lg-12'>
            <h2>Trusted Whith Bilions</h2>
            <p>black melak has the most of any decentralized platform</p>
            <p>black melak has the most of any decentralized platform</p>
          </Col>
        </Row>
        <Row className='three-itemm justify-content-center'>
          <Col className='three-item col-lg-3'>
            <img className='icon-item' src={pay}/>
            <p>PARDAKHT AMN</p>
          </Col>
          <Col className='three-item col-lg-3'>
            <img className='icon-item' src={security}/>
            <p>AMNIAT ETELAAT</p>
          </Col>
          <Col className='three-item col-lg-3'>
            <img className='icon-item' src={wage}/>
            <p>BEDONE KARMOZD</p>
          </Col>
        </Row>
      </Container>
      {/* content-paragraph */}

      <br/>
      {/* content-trade */}
      <Container fluid>
        <Row className='baner-trade justify-content-center'>
          <Col className='baner col-lg-12'>
            <img className='logo-baner' src={logobaner}/>
            <h2>TRADE ANYTHING .NO<br/>REGISTRATION .NO HASSLE</h2>
            <Button className='btn-baner'>TRADE</Button>
          </Col>
        </Row>
      </Container>
      {/* content-trade */}

      {/* content-trust */}
      <br/><br/>
      <Container fluid>
        <Row className='baner-trust justify-content-center'>
          <Col className='baner-t col-lg-12'>
            <img className='image-trust' src={backgroundshop}/>
            <Col className='index-trust col-lg-7 col-md-7'>
              <br/>
              <h2>Trust Whith Bilions</h2>
              <Row className='row-index justify-content-center'>
                <Col className='index-item col-lg-4 col-md-4'>
                  <h4>START PROJECT</h4>
                  <p>it is a long established fact that a reader will be distracted by the readable</p>
                  <Button className='btn-index'>BUY NOW</Button>
                </Col>
                <Col className='index-item index-item2 col-lg-4 col-md-4'>
                  <h4>BUY BALCK HACK</h4>
                  <p>it is a long established fact that a reader will be distracted by the readable</p>
                  <Button className='btn-index'>BUY NOW</Button>
                </Col>
              </Row>
                <br/><br/>
            </Col>
          </Col>
        </Row>
      </Container>
      {/* content-trust */}

      {/* content-lorem-ipsom */}
      <Container fluid className='lorem'>
        <Row>
          <Col className='lorem-item col-lg-6'>
            <h2>LOREM IPSOM</h2>
            <p>black melak has the most of any decentralized platform</p>
            <Button className='btn-ipsom'>Trusted Whith Bilions</Button>
          </Col>
        </Row>
      </Container>
      {/* content-lorem-ipsom */}

      {/* footer */}
      <img className='img-footer' src={vectorhacker}/>
      <Container fluid className='footer'>
          <Col className='titr-footer col-lg-8'>
            <h2>LOREM IPSOM</h2>
          </Col>
        <Row className='item-footer'>
          <Col className='list-one col-lg-2'>
            <h2>LOREM IPSOM</h2>
            <p>LOREM IPSOM</p>
            <p>LOREM IPSOM</p>
            <p>LOREM IPSOM</p>
          </Col>
          <Col className='list-two col-lg-2'>
            <h2>LOREM IPSOM</h2>
            <p>LOREM IPSOM</p>
            <p>LOREM IPSOM</p>
            <p>LOREM IPSOM</p>
          </Col>
          <Col className='list-three col-lg-2'>
            <h2>LOREM IPSOM</h2>
            <p>LOREM IPSOM</p>
            <p>LOREM IPSOM</p>
            <p>LOREM IPSOM</p>
          </Col>
        </Row>
        <br/>
      </Container>
      {/* footer */}
      
    </div>
  );
}

export default App;
