import PropTypes from "prop-types";
import { Button, Form, Input, Modal, Col, Row, notification } from "antd";
import { adminMetaDataService } from "../../../services/adminMetaService";
const RejectModal = (props) => {
  const [form] = Form.useForm();
  const { TextArea } = Input;

  async function handleReject(values) {
    const response = await adminMetaDataService.reject(props.id, values);
    if (response != null && response != undefined) {
      notification.success({ message: response.message });
      props.getAllOwners();
      props.toggleModal();
      props.toggleDrawer();
    }
  }

  return (
    <Modal
      open={props.showModal}
      title="Reject Owner Details"
      onCancel={props.toggleModal}
      footer={
        <Button type="primary" className="btn-reject" form="rejectForm" key="submit" htmlType="submit">
          Reject
        </Button>
      }
    >
      <Form
        layout="vertical"
        name="rejectForm"
        onFinish={handleReject}
        form={form}
      >
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="rejectedReason"
              label="Rejected Reason"
              rules={[
                {
                  required: true,
                  message: "Please enter your reason",
                },
              ]}
            >
              <Input placeholder="reason" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              name="rejectedSummary"
              label="Rejected Summary"
              rules={[{ required: true, message: "Please enter your Summary" }]}
            >
              <TextArea placeholder="summary" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

RejectModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
  getAllOwners: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default RejectModal;
