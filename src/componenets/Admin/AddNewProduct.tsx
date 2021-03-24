import { Component, CSSProperties } from "react";
import { Form, Input, InputNumber, Button, Col, Row, message } from "antd";
import { Product } from "../ProductItemsList";
import { RouteComponentProps, withRouter } from "react-router-dom";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
  
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

interface Props extends RouteComponentProps<{ id: string }> {}
interface State {
  product: Product | undefined;
  buttonSaveLoading: boolean;
}

const success = () => {
  message.success('The product has been published', 3);
};
class AddNewProduct extends Component<Props, State> {
  
  state: State = {
    product: undefined,
    buttonSaveLoading: false,
  };
  
  onFinish = async (values: any) => {
    this.setState({ buttonSaveLoading: true });
    try {
      await saveNewProductMockApi();
    } catch (error) {
        console.log(error);
        return;
    }
    const existingProducts = JSON.parse(localStorage.getItem("products") as string) || [];
    const newProduct: Product = {...values.product};
    newProduct.id = Math.max(...existingProducts.map((item: Product) => item.id)) + 1;
    existingProducts.push(newProduct)
    localStorage.setItem('products', JSON.stringify(existingProducts));
    this.props.history.push('/admin-list');
    this.setState({ buttonSaveLoading: false });
  };

  render() {
    return (
      <div>
        <Row style={ContainerStyle}>
          <Col span={24} style={columnStyle}>
            <Form
              {...layout}
              name="nest-messages"
              onFinish={this.onFinish}
              validateMessages={validateMessages}
            >
              <h1
                style={{
                  display: "flex",
                  justifyContent: "center",
                  fontWeight: "bold",
                }}
              >
                ADD NEW PRODUCT {" "}
              </h1>
              <Form.Item name={["product", "title"]} label="Title" required>
                <Input />
              </Form.Item>

              <Form.Item name={["product", "description"]} label="Description" required>
                <Input.TextArea />
              </Form.Item>

              <Form.Item name={["product", "price"]} label="Price" required>
                <InputNumber />
              </Form.Item>
              
              <Form.Item name={["product", "imageUrl"]} label="ImageUrl" required>
                <Input />
              </Form.Item>

              <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Button 
                    type="primary"
                    onClick={() => {success();}}
                    htmlType="submit"
                    loading={this.state.buttonSaveLoading}
                  >
                    Save
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    )
  }
}

const ContainerStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-around",
  alignItems: "space-around",
  width: "60%",
  margin: "auto",
  height: "100vh",
};
  
const columnStyle: CSSProperties = {
  marginTop: "10rem",
  marginBottom: "3rem",
};

export default withRouter(AddNewProduct); 

async function saveNewProductMockApi() {
  return new Promise((res) => setTimeout(() => res("success"), 2000));
}