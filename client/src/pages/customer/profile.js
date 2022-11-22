import React, { useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Navbar from '../../components/navbar';
import imgBlank from '../../assets/blank.jpg';
import { UserContext } from '../../context/userContext';

export default function Profile() {
  const [state] = useContext(UserContext);

  return (
    <div>
      <Navbar />
      <Container className="my-5">
        <Row>
          <Col md="6">
            <div 
              className="mb-4"
              style={{ 
                fontFamily: 'Avenir',
                fontStyle: 'normal',
                fontWeight: '900',
                fontSize: '24px',
                lineHeight: '33px',
                color: '#974A4A',
              }}
            >
              My Profile
            </div>
            <Row>
              <Col md="6">
                <img
                  src={imgBlank}
                  className="img-fluid rounded"
                  alt="avatar"
                />
              </Col>
              <Col md="6">
                <div className="text-title">Full Name</div>
                <div className="text-content">{state?.user.name || "-"}</div>

                <div className="text-title">Email</div>
                <div className="text-content">{state?.user.email || "-"}</div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}