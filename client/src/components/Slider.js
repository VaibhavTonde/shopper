import React from 'react'
import { Carousel } from 'react-bootstrap'

const Slider = () => {
    return (
        <div>
            <Carousel fade>
                <Carousel.Item interval={5000}>
                    <img
                        className="d-block w-100"
                        src="https://image01.oneplus.net/shop/202103/18/1-M00-22-28-rB8LB2BS9SSAV0Y3AAGkc8p2dmg496.jpg"
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        {/* <h3>First slide label</h3>
                        <p style={{ "color": "black" }}>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>? */}
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={5000}>
                    <img
                        className="d-block w-100"
                        src="https://image01.oneplus.net/shop/202103/18/1-M00-22-28-rB8LB2BS9WKABKytAAGT8Yreaic888.jpg"
                        alt="Second slide"
                    />
                    <Carousel.Caption>
                        {/* <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={5000}>
                    <img
                        className="d-block w-100"
                        src="https://image01.oneplus.net/shop/202103/18/1-M00-22-28-rB8LB2BS9XyALk8BAAGbadN3bPk530.jpg"
                        alt="Third slide"
                    />
                    <Carousel.Caption>
                        {/* <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p> */}
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    )
}

export default Slider
