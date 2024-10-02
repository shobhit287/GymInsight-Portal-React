import { Row, Col, Card, Form, Input, Button, notification } from "antd";
import { authService } from "../../services/authService";
import { authBackground } from "../../utils";
import { useNavigate, useLocation } from "react-router-dom";
import { AUTH_ENTRY } from "../../config/routesConfig";
const ResetPassword = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const location = useLocation();
  async function handleSubmit(values) {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");
    if (token) {
      const response = await authService.resetPassword({password: values.newUserPassword }, token);
      if (response != null && response != undefined) {
        form.resetFields();
        notification.success({ message: "Password Change Successfully." });
        navigate(AUTH_ENTRY);
      }
    }
  }

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
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Form.Item
                  name="newUserPassword"
                  label="New Password"
                  rules={[
                    { required: true, message: "Please enter your New Password" },
                    {
                      validator(_, value) {
                        const regex = /^(?=.*\d)(?=.*[A-Z])(?=.*[!@$%^&*()_+{}|:<>?])[^#]{8,}$/;
                        if (value && value.includes("#")) {
                          return Promise.reject(new Error("# is not allowed"));
                        }
                        if (!value || regex.test(value)) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error(
                            "Invalid password. It must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character (except #)."
                          )
                        );
                      },
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item
                  name="newUserConfirmPassword"
                  label="Confirm Password"
                  dependencies={["newUserPassword"]}
                  hasFeedback
                  rules={[
                    { required: true, message: "Please confirm your password!" },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("newUserPassword") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error("The new password you entered does not match!"));
                      },
                    }),
                  ]}
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" className="w-100" classNames="rounded-pill" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Card>
      </div>
    </div>
  );
};

export default ResetPassword;
