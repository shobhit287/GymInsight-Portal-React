import { Row, Col, Input } from "antd";
import { useEffect, useState } from "react";
import OwnersTable from "./ownersTable";
import { adminMetaDataService } from "../../../services/adminMetaService";
import { dateToString } from "../../../utils";
const GymOwners = () => {
  const [owners, setOwners] = useState([]);
  const [filteredOwners, setFilteredOwners] = useState([]);
  const {setLoading} = store();
  useEffect(() => {
    getAllOwners();
  }, []);

  async function getAllOwners() {
    setLoading(true);
    const response = await adminMetaDataService.getAll();
    if (response != null && response != undefined) {
      const structuredData = response.data.flatMap((admin, index) => {
        return {
          key: index,
          admin: admin,
          name: `${admin.firstName} ${admin.lastName}`,
          email: admin.email,
          registrationDate: dateToString(admin.createdAt),
        };
      });
      setOwners(structuredData);
      setFilteredOwners(structuredData);
    }
    setLoading(false);
  }

  function handleSearch(searchValue) {
    const value = searchValue.toLowerCase();
    const filteredData = owners.filter((ownerInfo) => {
      const {
        admin: { gymName, gymCity, gymGstNo, status, gymAddress, gymPhoneNo },
        name,
        email,
        registrationDate,
      } = ownerInfo;
      return (
        gymName.toLowerCase().includes(value) ||
        gymCity.toLowerCase().includes(value) ||
        gymGstNo.toLowerCase().includes(value) ||
        status.toLowerCase().includes(value) ||
        gymAddress.toLowerCase().includes(value) ||
        name.toLowerCase().includes(value) ||
        email.toLowerCase().includes(value) ||
        registrationDate.toLowerCase().includes(value) ||
        String(gymPhoneNo).toLowerCase().includes(value) ||
        gymName.toLowerCase().includes(value)
      );
    });
    setFilteredOwners(filteredData);
  }
  return (
    <>
      <Row>
        <Col span={8}>
          <Input
            placeholder="Search Gym Owner...."
            onChange={(e) => handleSearch(e.target.value)}
          />
        </Col>
      </Row>
      {owners && (
        <div className="mt-3">
          <OwnersTable data={filteredOwners} getAllOwners={getAllOwners} />
        </div>
      )}
    </>
  );
};
export default GymOwners;
