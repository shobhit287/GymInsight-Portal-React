import { Row, Col, Card, Form, Input, Button, notification } from "antd";
import { userService } from "../../services/userService";
import { authBackground } from "../../utils";
import { useNavigate } from "react-router-dom";
import store from "../../store";
import { APP_PREFIX_PATH, AUTH_ENTRY } from "../../config/routesConfig";
const SignUp = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { loading, setLoading } = store();
  const handleSubmit = async (values) => {
    setLoading(true);
    values.role = "ADMIN";
    const response = await userService.create(values);
    if (response) {
      notification.success({ message: "Account Created Successfully" });
      form.resetFields();
      navigate(AUTH_ENTRY);
    }
    setLoading(false);
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
                <span className="signup-heading">
                  Create Your Gym Management Account
                </span>
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
                  <Input placeholder="Enter first name" autoComplete="off" />
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
                  <Input placeholder="Enter last name" autoComplete="off" />
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
                  <Input placeholder="Enter email" autoComplete="off" />
                </Form.Item>

                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your password",
                    },
                    {
                      validator: (_, value) => {
                        if (!value) {
                          return Promise.resolve(); // The required rule handles this case
                        }

                        const regex =
                          /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\/\\\-]).{8,}$/;

                        if (!regex.test(value)) {
                          return Promise.reject(
                            "Password must be at least 8 characters long and include an uppercase letter, a number, and a special character"
                          );
                        }
                        return Promise.resolve();
                      },
                    },
                  ]}
                >
                  <Input.Password placeholder="Enter Password" />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    className="w-100"
                    htmlType="submit"
                    loading={loading}
                  >
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
