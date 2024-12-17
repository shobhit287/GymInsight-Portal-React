import { Row, Col, notification, Input, Form, message, Select } from "antd";
import { useEffect, useState } from "react";
import { Button, Card, Typography } from "antd";
import store from "../../../store";
import { userService } from "../../../services/userService";
import UserCreateEditModal from "./userCreateEditModal";
import { adminMetaDataService } from "../../../services/adminMetaService";
import { userMetaDataService } from "../../../services/userMetaData";
import { FileAddOutlined } from "@ant-design/icons";
import DocumentSubmissionModal from "../../../components/document-submission-modal";
import UserTable from "./userTable";
import { dateToString } from "../../../utils";
const { Title, Paragraph } = Typography;
const GymMembers = () => {
  const { user, setLoading } = store();
  const [adminStatus, setAdminStatus] = useState(null);
  const [adminForm] = Form.useForm();
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showUserModal, setShowUserModal] = useState(false);
  const [defaultUserPassword, setDefaultUserPassword] = useState("");

  useEffect(() => {
    if (user && user.role == "ADMIN") {
      getAdminDocument(user.userId);
    }
  }, []);

  const toggleAdminModal = () => {
    setShowAdminModal(!showAdminModal);
  };

  const toggleUserModal = () => {
    if (adminStatus == "REJECTED") {
      notification.error({
        message: "Action Blocked",
        description:
          "Your gym details were rejected by the super admin. Please update and resubmit your details to proceed with adding users.",
      });
      return;
    }
    if (adminStatus == "PENDING") {
      notification.error({
        message: "Action Blocked",
        description:
          "Your gym details were submited to the super admin. Please wait for approval.",
      });
      return;
    }
    setShowUserModal(!showUserModal);
  };

  const handleAdminSubmit = async (values) => {
    setLoading(true);
    values.gymLogo = values.gymLogo.file;
    values.gymLicense = values.gymLicense.file;
    values.gymCertificate = values.gymCertificate.file;
    let formData = new FormData();
    for (const key in values) {
      if (Object.prototype.hasOwnProperty.call(values, key)) {
        formData.append(key, values[key]);
      }
    }
    const response = await adminMetaDataService.create(formData);
    if (response) {
      getAdminDocument(user.userId);
      toggleAdminModal();
      notification.success({ message: "Gym Details Submitted Successfully." });
      setLoading(false);
      return true;
    }
    setLoading(false);
    return false;
  };

  async function getAdminDocument(id) {
    setLoading(true);
    const response = await adminMetaDataService.getDocumentById(id);
    if (response) {
      setAdminStatus(response.data.status);
      if (response.data.status) {
        getAdminMetaData();
        getAllUsers();
      }
    }
    setLoading(false);
  }

  async function getAllUsers() {
    const response = await userMetaDataService.getAll();
    if (response) {
      const structuredData = response.usersMetaData.flatMap((user, index) => {
        return {
          key: index,
          user: user,
          userName: `${user.firstName} ${user.lastName}`,
          duration: `${user.currentPlanDuration} months`,
          fees: user.fees,
          joiningDate: dateToString(user.createdAt),
          lastFeesDate: dateToString(user.lastFeesDate),
          renewalDate: dateToString(user.renewalDate),
        };
      });
      setUsers(structuredData);
      setFilteredUsers(structuredData);
    }
  }

  async function getAdminMetaData() {
    const response = await adminMetaDataService.getById(user.userId);
    if (response) {
      setDefaultUserPassword(response.data.defaultUserPassword);
    }
  }

  async function handleUserDetailsSubmit(values) {
    setLoading(true);
    const userData = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: defaultUserPassword,
      role: "USER",
    };
    const response = await userService.create(userData);
    if (response) {
      const metaData = {
        userId: response.user.userId,
        trainerName: values.trainerName,
        lastFeesDate: new Date(values.lastFeesDate).toISOString().split("T")[0],
        renewalDate: new Date(values.renewalDate).toISOString().split("T")[0],
        paymentMethod: values.paymentMethod,
        currentPlanDuration: values.currentPlanDuration,
        fees: values.fees,
        shift: values.shift,
      };
      const userMetaResponse = await userMetaDataService.create(metaData);
      if (userMetaResponse) {
        notification.success({ message: "Member Added Successfully" });
        getAllUsers();
        toggleUserModal();
        setLoading(false);
        return true;
      }
    }
    setLoading(false);
    return false;
  }

  function handleSearch(value) {
    const filteredData = users.filter(userInfo => {
      const {
        user: { email, shift, paymentMethod, trainerName },
        userName,
        duration,
        fees,
        joiningDate,
        lastFeesDate,
        renewalDate
      } = userInfo;
  
      return (
        userName.toLowerCase().includes(value.toLowerCase()) ||
        duration.toLowerCase().includes(value.toLowerCase()) ||
        String(fees).toLowerCase().includes(value.toLowerCase()) ||
        joiningDate.toLowerCase().includes(value.toLowerCase()) ||
        lastFeesDate.toLowerCase().includes(value.toLowerCase()) ||
        email.toLowerCase().includes(value.toLowerCase()) ||
        shift.toLowerCase().includes(value.toLowerCase()) ||
        paymentMethod.toLowerCase().includes(value.toLowerCase()) ||
        trainerName.toLowerCase().includes(value.toLowerCase()) ||
        renewalDate.toLowerCase().includes(value.toLowerCase())
      );
    });
    setFilteredUsers(filteredData);
  }

  function handleSortBy(value) {
    const sortedUsers = [...users];
    if (value === "renewal") {
      sortedUsers.sort((a, b) => {
        const dateA = new Date(a.renewalDate);
        const dateB = new Date(b.renewalDate);
        return dateA - dateB;
      });
    } else if (value === "joining") {
      sortedUsers.sort((a, b) => {
        const dateA = new Date(a.joiningDate);
        const dateB = new Date(b.joiningDate);
        return dateB - dateA;
      });
    } 
    setFilteredUsers(sortedUsers); 
  }
  
  return (
    <>
      {!adminStatus ? (
        <Card className="pending-card" bordered={false}>
          <div className="pending-content">
            <FileAddOutlined className="pending-icon" />
            <Title level={4} className="pending-title">
              Pending Approval
            </Title>
            <Paragraph className="pending-paragraph">
              {`Dear ${user.firstName} ${user.lastName}, submit your documents and get approved to start adding users.`}
            </Paragraph>
            <Button
              type="primary"
              size="large"
              className="submit-button"
              onClick={toggleAdminModal}
            >
              Submit Your Gym Details
            </Button>
          </div>
          <DocumentSubmissionModal
            transaction="create"
            form={adminForm}
            handleSubmit={handleAdminSubmit}
            showModal={showAdminModal}
            toggleModal={toggleAdminModal}
          />
        </Card>
      ) : (
        <>
          <Row gutter={10}>
            <Col span={8}>
              <Input placeholder="Search user...." onChange={(e)=> handleSearch(e.target.value)} />
            </Col>
            <Col span={4}>
              <Select placeholder="Sort By" className="w-100" allowClear onChange={(value)=> handleSortBy(value)}>
                 <Select.Option value="renewal">Renewal Date</Select.Option>
                 <Select.Option value="joining">Joining Date</Select.Option>
              </Select>
            </Col>
            <Col span={12} className="d-flex gap-3 justify-content-end">
              <Button type="primary" onClick={toggleUserModal}>
                Add new user
              </Button>
            </Col>
          </Row>
          <Row>
            <Col span={24} className="mt-3">
              <UserTable data={filteredUsers} getAllUsers={getAllUsers} />
              <UserCreateEditModal
                handleSubmit={handleUserDetailsSubmit}
                toggleModal={toggleUserModal}
                showModal={showUserModal}
                transaction="create"
              />
            </Col>
          </Row>
        </>
      )}
    </>
  );
};
export default GymMembers;
