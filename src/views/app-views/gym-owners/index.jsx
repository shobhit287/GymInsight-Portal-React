import { Row, Col, Input } from "antd";
import { useEffect, useState } from "react";
import OwnersTable from "./ownersTable";
import { adminMetaDataService } from "../../../services/adminMetaService";
import { dateToString } from "../../../utils";
const GymOwners = () => {
  const [owners, setOwners] = useState([]);
  useEffect(()=>{
    getAllOwners();
  },[]);

  async function getAllOwners() {
    const response = await adminMetaDataService.getAll();
    if (response != null && response != undefined) {
        const structuredData = response.data.flatMap((admin, index)=>{
           return {
            key : index,
            admin: admin,
            name : `${admin.firstName} ${admin.lastName}`,
            email : admin.email,
            registrationDate : dateToString(admin.createdAt),
           }
        })
        setOwners(structuredData);
    }
    
  }
  return (
    <>
      <Row>
        <Col span={8}>
          <Input placeholder="Search Gym Owner...." />
        </Col>
      </Row>
      {owners && (
      <div className="mt-3">
        <OwnersTable data={owners} getAllOwners={getAllOwners}/>
      </div>
    )}
    </>
  );
};
export default GymOwners;
