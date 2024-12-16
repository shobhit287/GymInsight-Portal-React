import { useEffect, useState } from "react";
import store from "../../../store";
import {
  Row,
  Col,
  Form,
  Input,
  Radio,
  Button,
  notification,
  Tooltip,
} from "antd";
import { userService } from "../../../services/userService";
import DocumentSubmissionModal from "../../../components/document-submission-modal";
import { adminMetaDataService } from "../../../services/adminMetaService";
import { useLocation } from "react-router-dom";
import { colorStatus, dateToString, renewalDate } from "../../../utils";
import {
  EyeOutlined,
  FileProtectOutlined,
  IdcardOutlined,
} from "@ant-design/icons";
import { userMetaDataService } from "../../../services/userMetaData";
import UserGoalModal from "./userGoalModal";
const Dashboard = () => {
  const { user, setUser, setLoading } = store();
  const location = useLocation();
  const [infoForm] = Form.useForm();
  const [editMode, setEditMode] = useState(null);
  const [showDrawer, setShowDrawer] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState(null);
  useEffect(() => {
    infoForm.setFieldsValue({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
    if (user.role == "ADMIN") {
      getAdminDocument();
      const queryParams = new URLSearchParams(location.search);
      const adminId = queryParams.get("adminId");
      if (adminId) {
        setEditMode("updateGym");
      }
    } else if (user.role == "USER") {
      getUserDetail();
    }
  }, []);

  async function getUserDetail() {
    const response = await userMetaDataService.getById(user.userId);
    if (response) {
      setData(response.userMetaData);
    }
  }

  useEffect(() => {
    if (editMode == "updateGym") {
      setShowDrawer(!showDrawer);
    }
  }, [editMode]);

  async function getAdminDocument() {
    const response = await adminMetaDataService.getDocumentById(user.userId);
    if (response != null && response != undefined) {
      if (response.data.status) {
        getAdminDetails();
      }
    }
  }

  async function getAdminDetails() {
    const response = await adminMetaDataService.getById(user.userId);
    if (response != null && response != undefined) {
      setData(response.data);
    }
  }

  async function handleSubmit(values) {
    const response = await userService.update(user.userId, values);
    if (response != null && response != undefined) {
      setUser(response.user, localStorage.getItem("token"));
      notification.success({ message: "Details Updated Successfully" });
    }
  }
  function toggleDrawer() {
    setShowDrawer(!showDrawer);
    setEditMode(null);
  }
  async function updateGymDetails(values) {
    setLoading(true);
    values.gymLogo = values.gymLogo?.file || null;
    values.gymLicense = values.gymLicense?.file || null;
    values.gymCertificate = values.gymCertificate?.file || null;
    const formData = new FormData();
    for (const key in values) {
      if (values.hasOwnProperty(key)) {
        formData.append(key, values[key]);
      }
    }
    const response = await adminMetaDataService.update(user.userId, formData);
    if (response != null && response != undefined) {
      notification.success({
        message: "Gym details updated successfully and send for approval",
      });
      toggleDrawer();
      getAdminDetails();
      return true;
    }
    setLoading(false);
    return false;
  }

  function toggleModal() {
    setShowModal(!showModal);
  }

  async function handleUserGoalSubmission(values) {
    setLoading(true);
    const response = await userMetaDataService.requestPlan(values);
    if(response) {
      
    }
    setLoading(false);
  }
  return (
    <>
      <Row>
        <Col span={8}>
          <Radio.Group
            value={editMode}
            onChange={(e) => setEditMode(e.target.value)}
          >
            <Radio value="updateDetails">Update Details</Radio>
            {user.role == "ADMIN" && data && data.status != "PENDING" && (
              <Radio value="updateGym">Update Gym Details</Radio>
            )}
          </Radio.Group>
        </Col>
       
       {user.role == "USER" && (
        <Col span={16} align="end">
          <Button type="primary" onClick={() => setShowModal(!showModal)}>
             Request Gym Plan
          </Button>
        </Col>
      )}
      </Row>
      <Form
        name="infoForm"
        className="mt-3"
        layout="vertical"
        form={infoForm}
        onFinish={handleSubmit}
        disabled={editMode != "updateDetails"}
      >
        <Row gutter={10}>
          <Col span={8}>
            <Form.Item
              name="firstName"
              label="First Name"
              rules={[
                { required: true, message: "First Name is required Field" },
              ]}
            >
              <Input placeholder="First Name" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="lastName"
              label="Last Name"
              rules={[
                { required: true, message: "Last Name is required Field" },
              ]}
            >
              <Input placeholder="Last Name" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: "Email is required Field" }]}
            >
              <Input placeholder="Email" disabled={true} />
            </Form.Item>
          </Col>
          {editMode == "updateDetails" && (
            <Col span={24} align="end">
              <Button type="primary" htmlType="submit">
                Update
              </Button>
            </Col>
          )}
        </Row>
      </Form>

      {data && user.role == "ADMIN" && (
        <div className="dashboard-details p-2 mt-3">
          <Row gutter={[10, 10]}>
            <Col span={12}>
              <strong className="px-2">Gym Name:</strong>
              <span>{data.gymName}</span>
            </Col>
            <Col span={12}>
              <strong className="px-2">Gym GST No:</strong>
              <span>{data.gymGstNo}</span>
            </Col>
            <Col span={12}>
              <strong className="px-2">Gym Phone No:</strong>
              <span>{data.gymPhoneNo}</span>
            </Col>
            <Col span={12}>
              <strong className="px-2">Gym Address:</strong>
              <span>{data.gymAddress}</span>
            </Col>
            <Col span={12}>
              <strong className="px-2">Gym City:</strong>
              <span>{data.gymCity}</span>
            </Col>
            <Col span={12}>
              <strong className="px-2">Total Members:</strong>
              <span>{data.totalUsers}</span>
            </Col>
            <Col span={12}>
              {(() => {
                const { bgColor, color } = colorStatus(data.status);
                return (
                  <>
                    <strong className="px-2">Status:</strong>
                    <span
                      className="statusLabel"
                      style={{ backgroundColor: bgColor, color: color }}
                    >
                      {data.status}
                    </span>
                  </>
                );
              })()}
            </Col>
            {data.status == "REJECTED" && (
              <>
                <Col span={12}>
                  <strong className="px-2">Rejected Reason:</strong>
                  <span>{data.documentData.rejectedReason || "-"}</span>
                </Col>
                <Col span={12}>
                  <strong className="px-2">Rejected Summary:</strong>
                  <span>{data.documentData.rejectedSummary || "-"}</span>
                </Col>
              </>
            )}
            <Col span={12}>
              <strong className="px-2">Documents:</strong>
              <Tooltip title="View Logo">
                <a href={data.documentData.gymLogoPath} target="_blank">
                  <EyeOutlined />
                </a>
              </Tooltip>

              <Tooltip title="View Certificate">
                <a
                  className="px-3"
                  href={data.documentData.gymCertificatePath}
                  target="_blank"
                >
                  <FileProtectOutlined />
                </a>
              </Tooltip>

              <Tooltip title="View License">
                <a href={data.documentData.gymLicensePath} target="_blank">
                  <IdcardOutlined />
                </a>
              </Tooltip>
            </Col>
          </Row>
        </div>
      )}

      {data && user.role == "USER" && (
        <div className="dashboard-details p-2 mt-3">
          <Row gutter={[10, 10]}>
            <Col span={12}>
              <strong className="px-2">Joining Date:</strong>
              <span>{dateToString(data.createdAt)}</span>
            </Col>
            <Col span={12}>
              <strong className="px-2">Shift:</strong>
              <span>{data.shift}</span>
            </Col>
            <Col span={12}>
              <strong className="px-2">Current Plan Duration:</strong>
              <span>{data.currentPlanDuration}</span>
            </Col>
            <Col span={12}>
              <strong className="px-2">Last Fees Submitted:</strong>
              <span>{data.fees}</span>
            </Col>
            <Col span={12}>
              {(() => {
                const { bgColor, color } = renewalDate(data.renewalDate);
                return (
                  <>
                    <strong className="px-2">Renewal Date:</strong>
                    <span
                      className="statusLabel"
                      style={{ backgroundColor: bgColor, color: color }}
                    >
                      {dateToString(data.renewalDate)}
                    </span>
                  </>
                );
              })()}
            </Col>
          </Row>
        </div>
      )}

      {editMode == "updateGym" && data && (
        <DocumentSubmissionModal
          transaction="update"
          admin={data}
          handleSubmit={updateGymDetails}
          showModal={showDrawer}
          toggleModal={toggleDrawer}
        />
      )}
      <UserGoalModal
        showModal={showModal}
        toggleModal={toggleModal}
        handleSubmit={handleUserGoalSubmission}
      />
    </>
  );
};
export default Dashboard;
