import {
  Modal,
  Row,
  Col,
  Button,
  Form,
  InputNumber,
  Checkbox,
  notification,
} from "antd";
import PropTypes from "prop-types";
import store from "../../../store";
const UserGoalModal = (props) => {
  const { showModal, toggleModal, handleSubmit } = props;
  const { loading } = store();
  const [form] = Form.useForm();

  const beforeSubmit = async (values) => {
    const { isExerciseSchedule, isDiet } = values;
    if (!isExerciseSchedule && !isDiet) {
      notification.error({
        message:
          "Please select either 'Diet' or 'Exercise Schedule' to proceed.",
      });
      return;
    }
    const response = await handleSubmit(values);
    if (response) {
      form.resetFields();
    }
  };
  return (
    <>
      <Modal
        title="Request Gym Week Schedule & Diet"
        open={showModal}
        onCancel={toggleModal}
        footer={[
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={() => form.submit()}
          >
            Submit
          </Button>,
        ]}
      >
        <Form
          name="userGoalForm"
          form={form}
          layout="vertical"
          onFinish={beforeSubmit}
        >
          <Row gutter={10}>
            <Col span={24}>
              <Form.Item
                name="currentWeight"
                label="Current Weight (KG)"
                rules={[
                  {
                    required: true,
                    message: "Current weight is required field",
                  },
                ]}
              >
                <InputNumber
                  className="w-100"
                  placeholder="Current Weight"
                  min={30}
                  max={200}
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                name="goalWeight"
                label="Goal Weight (KG)"
                rules={[
                  { required: true, message: "Goal weight is required field" },
                ]}
              >
                <InputNumber className="w-100" placeholder="Goal Weight" />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                name="height"
                label="Height (cm)"
                rules={[
                  { required: true, message: "Height is required field" },
                ]}
              >
                <InputNumber
                  className="w-100"
                  min={110}
                  max={250}
                  placeholder="Height"
                />
              </Form.Item>
            </Col>

            <Col span={24} className="d-flex gap-3">
              <Form.Item name="isDiet" valuePropName="checked">
                <Checkbox>Diet</Checkbox>
              </Form.Item>

              <Form.Item name="isExerciseSchedule" valuePropName="checked">
                <Checkbox>Exercise Schedule</Checkbox>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};
UserGoalModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
};
export default UserGoalModal;
