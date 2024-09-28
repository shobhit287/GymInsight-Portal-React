import { Row, Col, Card, Form, Input, Button, notification } from "antd";
import { adminService } from "../../services/adminService";
import { authBackground } from "../../utils";
import { useNavigate } from "react-router-dom";
import { APP_PREFIX_PATH } from "../../config/routesConfig";
const SignUp = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const handleSubmit = async (values) => {
    const response = await adminService.create(values);
    if (response) {
      notification.success({ message: response.message });
      form.resetFields();
    }
  };

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center min-vh-100"
      style={authBackground}
    >
      <div className="text-center"></div>
      <div className="mt-4 w-50 card-auth">
        <Card>
          <Row gutter={[0, 0]}>
            <Col span={24} className="p-3">
              <div className="text-center">
                <span className="signup-heading">Create Your Gym Management Account</span>
              </div>
              <Form
                className="mt-3"
                layout="vertical"
                name="login-form"
                onFinish={handleSubmit}
                form={form}
              >
                <Form.Item
                  name="firstName"
                  label="First Name"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your first name",
                    },
                  ]}
                >
                  <Input placeholder="Enter first name" />
                </Form.Item>

                <Form.Item
                  name="lastName"
                  label="Last Name"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your last name",
                    },
                  ]}
                >
                  <Input placeholder="Enter last name" />
                </Form.Item>
                
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your email",
                    },
                    {
                      type: "email",
                      message: "Please enter a valid email!",
                    },
                  ]}
                >
                  <Input placeholder="Enter email" />
                </Form.Item>

                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    {
                      required: true,
                      message: "Please enter password",
                    },
                  ]}
                >
                  <Input placeholder="Enter email" />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" className="w-100" htmlType="submit">
                    Create account
                  </Button>
                </Form.Item>
              </Form>
              <div className="text-center mt-2">
                <span
                  className="cursor-pointer auth-forget"
                  onClick={() => navigate(`${APP_PREFIX_PATH}/login`)}
                >
                  Back To Login
                </span>
              </div>
            </Col>
          </Row>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;
