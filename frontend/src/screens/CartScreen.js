import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'


const CartScreen = ({ match, location, history }) => {
    const productId = match.params.id;

    const qty = location.search ? Number(location.search.split('=')[1]) : Number(1);

    const dispatch = useDispatch();


    const cart = useSelector(state => state.cart)
    const { cartItem } = cart;

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty));
        }
    }, [dispatch, productId, qty]);


    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        history.push('/login?redirect=shipping')
    }

    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Card</h1>
                {cartItem.length === 0 ? (
                    <Message>
                        Your cart is empty  <Link to='/'>  Go Back</Link>
                    </Message>
                ) : (
                    <ListGroup variant='flush'>
                        {cartItem.map(item => (
                            <ListGroup.Item key={item.product}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded />
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={2}>
                                        <i class='fa fa-inr'> </i>{item.price}
                                    </Col>
                                    <Col md={2}>
                                        <Form.Control size='sm' as='Select' value={item.qty} onChange={(e) => {
                                            dispatch(addToCart(item.product, Number(e.target.value)))
                                        }}>
                                            {[...Array(item.countInStock).keys()].map((x) => (
                                                <option key={x + 1} value={x + 1}>{x + 1}</option>
                                            ))}
                                        </Form.Control>
                                    </Col>
                                    <Col>
                                        <Button type='button' variant='light' onClick={() =>
                                            removeFromCartHandler(item.product)
                                        }>
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>
                                Subtotal ({cartItem.reduce((acc, item) => acc + item.qty, 0)}) items
                            </h2>
                            <i className='fa fa-inr'> </i>{cartItem.reduce((acc, item) => acc + item.qty * item.price, 0)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button type='button'
                                className='btn-block'
                                disabled={cartItem.length === 0}
                                onClick={checkoutHandler}
                            >
                                Proceed to Checkout
                            </Button>
                        </ListGroup.Item>

                    </ListGroup>
                </Card>
            </Col>
        </Row >
    )
}

export default CartScreen
