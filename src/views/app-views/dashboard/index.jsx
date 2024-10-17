import { useEffect, useState } from "react";
import store from "../../../store";
import {Row,Col, Form, Input, Radio, Button, notification} from "antd";
import { userService } from "../../../services/userService";
import DocumentSubmissionModal from "../../../components/document-submission-modal";
import { adminMetaDataService } from "../../../services/adminMetaService";
const Dashboard= () => {
  const {user, setUser, setLoading}= store();
  const [infoForm] = Form.useForm();
  const [editMode, setEditMode] = useState(null);
  const [showDrawer, setShowDrawer] = useState(false);
  const [adminMetaData, setAdminMetaData] = useState(null);
  useEffect(()=>{
      infoForm.setFieldsValue({
         firstName: user.firstName,
         lastName: user.lastName,
         email: user.email,
      })
  },[]);
  useEffect(()=>{
    if(editMode == "updateGym") {
      getAdminDetails();
      setShowDrawer(!showDrawer);
    }
  },[editMode])

  async function getAdminDetails() {
    const response = await adminMetaDataService.getById(user.userId);
    if(response != null && response != undefined) {
      setAdminMetaData(response.data);
    } 
  }

  async function handleSubmit(values) {
    const response = await userService.update(user.userId, values);
    if(response != null && response != undefined) {
      setUser(response.user, localStorage.getItem("token"));
      notification.success({message:"Details Updated Successfully"})
    }

  }
  function toggleDrawer(){
    setShowDrawer(!showDrawer);
    setAdminMetaData(null);
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
     if(response != null && response != undefined) {
      notification.success({message: "Gym details updated successfully and send for approval"})
     }
     toggleDrawer();
     setLoading(false);
  }
  return(<>
  <Radio.Group value={editMode} onChange={(e)=> setEditMode(e.target.value)}>
    <Radio value="updateDetails">Update Details</Radio>
    {user.role == "ADMIN" && (<Radio value="updateGym">Update Gym Details</Radio>)}
  </Radio.Group>
   <Form name="infoForm" className="mt-3" layout="vertical" form={infoForm} onFinish= {handleSubmit} disabled={editMode != "updateDetails"}>
    <Row gutter={10}>
      <Col span={8}>
          <Form.Item name="firstName" label="First Name" rules={[{required:true, message: "First Name is required Field"}]}>
               <Input placeholder="First Name"/>
          </Form.Item>
      </Col>
      <Col span={8}>
          <Form.Item name="lastName" label="Last Name" rules={[{required:true, message: "Last Name is required Field"}]}>
               <Input placeholder="Last Name"/>
          </Form.Item>
      </Col>
      <Col span={8}>
          <Form.Item name="email" label="Email" rules={[{required:true, message: "Email is required Field"}]}>
               <Input placeholder="Email" disabled={true}/>
          </Form.Item>
      </Col>
      {editMode == "updateDetails" && (
      <Col span={24} align= "end">
          <Button type="primary" htmlType="submit">Update</Button>
      </Col>
    )}
    </Row>
    </Form>
    {editMode == "updateGym" && adminMetaData && (<DocumentSubmissionModal transaction="update" admin={adminMetaData} handleSubmit={updateGymDetails} showModal={showDrawer} toggleModal={toggleDrawer}/>)}
  </>)
}
export default Dashboard;