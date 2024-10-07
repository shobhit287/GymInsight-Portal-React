import { Row, Col, notification, Input, Form, message } from "antd";
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
  const [userForm] = Form.useForm();
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [users, setUsers] = useState([]);
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
    setShowUserModal(!showUserModal);
    userForm.resetFields();
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
    }
    setLoading(false);
  };

  async function getAdminDocument(id) {
    const response = await adminMetaDataService.getDocumentById(id);
    if (response) {
      setAdminStatus(response.data.status);
      if (response.data.status) {
        getAdminMetaData();
        getAllUsers();
      } 
    }
  }
  
  async function getAllUsers() {
   const response = await userMetaDataService.getAll();
   if(response) {
     const structuredData = response.usersMetaData.flatMap(user=>{
       return{
        userId:  user.userId,
        userName: `${user.firstName} ${user.lastName}`,
        duration: `${user.currentPlanDuration} months`,
        fees: user.fees,
        joiningDate: dateToString(user.createdAt),
        lastFeesDate: dateToString(user.lastFeesDate),
        renewalDate: dateToString(user.renewalDate),
       }
     });
     setUsers(structuredData);
   }
  }

  async function getAdminMetaData() {
     const response = await adminMetaDataService.getById(user.userId);
     if(response) {
        setDefaultUserPassword(response.data.defaultUserPassword);
     }
  }

 
  async function handleUserDetailsSubmit(values) {
    setLoading(true);
    const userData = {
      "firstName": values.firstName,
      "lastName": values.lastName,
      "email": values.email,
      "password": defaultUserPassword,
      "role": "USER",
    }
    const response = await userService.create(userData);
    if(response) {
        const metaData ={
          "userId": response.user.userId,
          "trainerName": values.trainerName,
          "lastFeesDate": new Date(values.lastFeesDate).toISOString().split('T')[0],
          "renewalDate": new Date(values.renewalDate).toISOString().split('T')[0],
          "paymentMethod": values.paymentMethod,
          "currentPlanDuration": values.currentPlanDuration,
          "fees": values.fees,
          "shift": values.shift,
        }
        const userMetaResponse = await userMetaDataService.create(metaData);
        if(userMetaResponse) {
           notification.success({message: "Member Added Successfully"});
           getAllUsers();
           toggleUserModal();
        }
    }
    setLoading(false);
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
            form={adminForm}
            handleSubmit={handleAdminSubmit}
            showModal={showAdminModal}
            toggleModal={toggleAdminModal}
          />
        </Card>
      ) : (
        <>
          <Row>
            <Col span={8}>
              <Input placeholder="Search user...." />
            </Col>
            <Col span={16} align="end">
              <Button type="primary" onClick={toggleUserModal}>
                Add new user
              </Button>
            </Col>
          </Row>
          <Row>
            <Col span={24} className="mt-3">
              <UserTable data={users}/>
              <UserCreateEditModal
                form={userForm}
                handleSubmit={handleUserDetailsSubmit}
                toggleModal={toggleUserModal}
                showModal={showUserModal}
              />
            </Col>
          </Row>
        </>
      )}
    </>
  );
};
export default GymMembers;
