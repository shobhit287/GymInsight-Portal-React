import { Row, Col, Card, Form, Input, Button, notification } from "antd";
import { authService } from "../../services/authService";
import { authBackground } from "../../utils";
import { useNavigate } from "react-router-dom";
import { APP_PREFIX_PATH} from "../../config/routesConfig";
import store from "../../store";
const ForgetPassword = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const {loading, setLoading} = store();
  const handleSubmit = async (values) => {
    setLoading(true);
    const response = await authService.forgetPassword(values);
    if(response){
      notification.success({message:response.message})
      form.resetFields();
    }
    setLoading(false);
  };

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center min-vh-100"
      style={authBackground}
    >
      <div className="text-center"></div>
      <div className="mt-4 w-25 card-auth">
        <Card>
          <Row gutter={[0, 0]}>
            <Col span={24} className="p-3">
              <Form
                layout="vertical"
                name="forget-password"
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

                <Form.Item>
                  <Button type="primary" className="w-100" htmlType="submit" loading={loading}>
                    Reset Password
                  </Button>
                </Form.Item>
              </Form>
              <div className="text-center mt-2">
                <span className="cursor-pointer auth-forget" onClick={()=> navigate(`${APP_PREFIX_PATH}/login`)}>
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

export default ForgetPassword;
