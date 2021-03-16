import { Avatar, Col, List, Row, InputNumber } from 'antd';
import { Component, ContextType, CSSProperties } from 'react';
import saveToCart from '../CartUtils';
import { Product } from '../ProductItemsList';
import { Link } from 'react-router-dom';
import { CartContext } from '../../contexts/CartContext';

export interface CartItem {
    product: Product;
    quantity: number;
}

interface State {
    cartItems?: CartItem[];
}
class CartItemsList extends Component<State> {
    context!: ContextType<typeof CartContext>
    static contextType = CartContext;
   
    state: State = {
        cartItems: []
    }

    componentDidMount() {
        this.setState({ cartItems: JSON.parse(localStorage.getItem('cartItems') as string) || []});
    }
    
    deleteItemFromList(id: number) {
        let cartItems = JSON.parse(localStorage.getItem('cartItems') as string) || [];
        const newCartItemsList = cartItems.filter((item: CartItem) => item.product.id !== id);
        localStorage.setItem('cartItems', JSON.stringify(newCartItemsList));
    }

    handleDelete = (id: number) => {
        const updatedCartItems = [...this.state.cartItems || []];
        this.setState({ cartItems: updatedCartItems.filter(item => item.product.id !== id) });
        this.deleteItemFromList(id as number);
    }

    onChangeQuantity(quantity: number, product: Product) {
        const { addProductToCart } = this.context;
        const cartItems = addProductToCart(product, quantity);
        this.setState({ cartItems: cartItems });
    }
    
    render() {
        return (
            <CartContext.Consumer>
                {({ cart }) => {
                    return (
                        <Row style={listContainerStyle}>
                            <Col span={24} style={columnStyle}>
                                <List
                                    itemLayout="horizontal"
                                    dataSource={cart}
                                    renderItem={item => (
                                    <List.Item
                                        actions={[<a key="delete-item" 
                                        style={deleteStyle}
                                        onClick={() => this.handleDelete(item.product.id)}>delete</a>]}>
                                        <List.Item.Meta                    
                                            avatar={<Avatar src={item.product.imageUrl} />}
                                            title={<Link to={'/product/' + item.product.id}>{item.product.title}</Link>}
                                            description={[item.product.description.split('.')[0], 
                                            <InputNumber min={1} max={10} defaultValue={item.quantity} onChange={(value) => this.onChangeQuantity(value, item.product)} style={numberInputStyle} />,
                                            item.product.price * item.quantity + ' kr']}
                                        />
                                    </List.Item>
                                    )}
                                />
                            </Col>
                        </Row>
                    )
                }}
            </CartContext.Consumer>
        )
    }
}

const listContainerStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'space-around',
    width: '80%',
    margin: 'auto'
}

const columnStyle: CSSProperties = {
    marginTop: '3rem',
    marginBottom: '3rem',
}

const numberInputStyle: CSSProperties = {
    margin: '0 8rem'
}

const deleteStyle: CSSProperties = {
    color: 'red',
    marginTop: '1rem'
}

export default CartItemsList;