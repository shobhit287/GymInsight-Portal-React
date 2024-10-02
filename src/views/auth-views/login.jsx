import { Row, Col, Card, Form, Input, Button, notification } from "antd";
import { authService } from "../../services/authService";
import { authBackground, saveToLocalStorage } from "../../utils";
import { useNavigate } from "react-router-dom";
import store from "../../store";
import { APP_PREFIX_PATH, AUTHENTICATED_ENTRY } from "../../config/routesConfig";
import { jwtDecode } from "jwt-decode";
const Login = () => {
  const [form] = Form.useForm();
  const {setUser} = store();
  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    const response = await authService.login(values);
    if(response){
      const user = jwtDecode(response.token);
      setUser({user, token: response.token});
      saveToLocalStorage("token", response.token)
      navigate(AUTHENTICATED_ENTRY);
      notification.success({message:"Login Successfully"})
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
            <Col span={12} className="p-3">
              <Form
                layout="vertical"
                name="login-form"
                onFinish={handleSubmit}
                form={form}
              >
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
                      message: "Please enter your password",
                    },
                  ]}
                >
                  <Input.Password placeholder="Enter password" />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" className="w-100" htmlType="submit">
                    Sign In
                  </Button>
                </Form.Item>
              </Form>
              <div className="text-center mt-2">
                <span className="cursor-pointer auth-forget" onClick={()=> navigate(`${APP_PREFIX_PATH}/forget-password`)}>
                  Forget Password
                </span>
              </div>
            </Col>

            <Col span={12} className="login-section-2">
              <div className="d-flex flex-column justify-content-center align-items-center h-100">
                <h2 className="login-section-2-p1">Welcome To Gym Insight</h2>
                <p className="login-section-2-p2">
                  Don&apos;t have an account ?
                </p>
                <button className="rounded-pill px-3 py-2" onClick={() => navigate(`${APP_PREFIX_PATH}/signup`)}>
                  Sign Up for Gym Management
                </button>
              </div>
            </Col>
          </Row>
        </Card>
      </div>
    </div>
  );
};

export default Login;
