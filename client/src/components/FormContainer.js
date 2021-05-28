import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const FormContainer = ({ children }) => {
    return (
        <Container>
            <Row className="justify-content-md-center py-3">
                <Col xs={12} md={4}>
                    {children}
                </Col>
            </Row>
        </Container>
    )
}

export default FormContainer