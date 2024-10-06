import {
  Drawer,
  Form,
  Row,
  Col,
  Upload,
  notification,
  Input,
  Button,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { useState } from "react";
import { allowedMimes } from "./allowedMimes";
import PropType from "prop-types";
import store from "../../store";
const { Dragger } = Upload;
const DocumentSubmissionModal = (props) => {
  const {loading} = store();
  const [fileList, setFileList] = useState({
    gymLogo: [],
    gymCertificate: [],
    gymLicense: [],
  });

  const beforeUpload = (file, name) => {
    if (file.size > 10 * 1024 * 1024) {
      notification.error({
        message: `File size exceeds the allowed limit of 10 MB`,
      });
      return Upload.LIST_IGNORE;
    }
    let isValid = false;
    if (
      file.type.length &&
      file.type !== null &&
      file.type !== undefined &&
      name != "gymLicense"
    ) {
      isValid = allowedMimes.includes(file.type);
      if (!isValid) {
        notification.error({
          message: "File type not supported only (PNG, JPG, JPEG)",
        });
        return Upload.LIST_IGNORE;
      }
    } else {
      isValid = file.type === "application/pdf";
      if (!isValid) {
        notification.error({ message: "You can only upload PDF files!" });
        return Upload.LIST_IGNORE;
      }
    }
    return false;
  };

  const handleFileChange = (info, name) => {
    const newFileList = { ...fileList };
    if (info.file.status === "removed") {
      newFileList[name] = [];
    } else {
      newFileList[name] = [info.file];
    }
    setFileList(newFileList);
  };

  return (
    <>
      <Drawer
        title="Gym Details"
        placement={"right"}
        closable={true}
        width={850}
        onClose={props.toggleModal}
        open={props.showModal}
        key={"right"}
        maskClosable={false}
      >
        <Form
          layout="vertical"
          name="documentSubmission"
          form={props.form}
          onFinish={props.handleSubmit}
        >
          <Row gutter={10}>
            <Col span={8}>
              <Form.Item
                name="gymLogo"
                rules={[{ required: true, message: "Please upload gym logo" }]}
              >
                <Dragger
                  maxCount={1}
                  fileList={fileList["gymLogo"]}
                  beforeUpload={(file) => beforeUpload(file, "gymLogo")}
                  onChange={(info) => handleFileChange(info, "gymLogo")}
                  onPreview={(file) => {
                    window.open(file.url || file.thumbUrl, "_blank");
                  }}
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined className="inbox-icon" />
                  </p>
                  <p className="ant-upload-text">
                    Click or drag file to this area to upload
                  </p>
                  <p className="ant-upload-hint">Upload your Gym Logo</p>
                </Dragger>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="gymCertificate"
                rules={[
                  { required: true, message: "Please upload gym certifictae" },
                ]}
              >
                <Dragger
                  maxCount={1}
                  fileList={fileList["gymCertificate"]}
                  beforeUpload={(file) => beforeUpload(file, "gymCertificate")}
                  onChange={(info) => handleFileChange(info, "gymCertificate")}
                  onPreview={(file) => {
                    window.open(file.url || file.thumbUrl, "_blank");
                  }}
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined className="inbox-icon" />
                  </p>
                  <p className="ant-upload-text">
                    Click or drag file to this area to upload
                  </p>
                  <p className="ant-upload-hint">Upload your Gym Certificate</p>
                </Dragger>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="gymLicense"
                rules={[
                  { required: true, message: "Please upload gym license" },
                ]}
              >
                <Dragger
                  maxCount={1}
                  fileList={fileList["gymLicense"]}
                  beforeUpload={(file) => beforeUpload(file, "gymLicense")}
                  onChange={(info) => handleFileChange(info, "gymLicense")}
                  onPreview={(file) => {
                    window.open(file.url || file.thumbUrl, "_blank");
                  }}
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined className="inbox-icon" />
                  </p>
                  <p className="ant-upload-text">
                    Click or drag file to this area to upload
                  </p>
                  <p className="ant-upload-hint">Upload your Gym License</p>
                </Dragger>
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                name="gymName"
                label="Gym Name"
                rules={[
                  { required: true, message: "Gym name is required field" },
                ]}
              >
                <Input placeholder="Enter Gym Name" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="gymAddress"
                label="Gym Address"
                rules={[
                  { required: true, message: "Gym address is required field" },
                ]}
              >
                <Input placeholder="Enter Gym Address" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="gymCity"
                label="City"
                rules={[
                  { required: true, message: "Gym city is required field" },
                ]}
              >
                <Input placeholder="Enter Gym City" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="gymPhoneNo"
                label="Phone No."
                rules={[
                  { required: true, message: "Phone Number is required field" },
                ]}
              >
                <Input placeholder="Enter Gym Phone Number" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="gymGstNo"
                label="Gym GST No"
                rules={[
                  { required: true, message: "GST No. is a required field" },
                  {
                    pattern:
                      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/,
                    message:
                      "Please enter a valid GST Number format (e.g., 22AAAAA0000A1Z5)",
                  },
                ]}
              >
                <Input placeholder="Enter Gym GST Number" />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                name="defaultUserPassword"
                label="Default Users Password"
                rules={[
                  { required: true, message: "Users Password is a required field" },
                ]}
              >
                <Input.Password placeholder="Enter Default Users Password" />
              </Form.Item>
            </Col>
            <Col span={24} align="end">
              <Button loading={loading} type="primary" htmlType="submit">
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};
DocumentSubmissionModal.propTypes = {
  toggleModal: PropType.func.isRequired,
  handleSubmit: PropType.func.isRequired,
  showModal: PropType.bool.isRequired,
  form: PropType.any.isRequired,
};
export default DocumentSubmissionModal;
