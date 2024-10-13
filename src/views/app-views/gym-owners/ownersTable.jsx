import { Table, Tooltip, Modal, notification } from "antd";
import { DeleteOutlined, CheckOutlined } from "@ant-design/icons";
import { colorStatus } from "../../../utils";
import DocumentSubmissionModal from "../../../components/document-submission-modal";
import ExpandableTable from "./expandableTable";
import PropType from "prop-types";
import RejectModal from "./rejectModal";
import { useState } from "react";
import { adminMetaDataService } from "../../../services/adminMetaService";
const OwnersTable = (props) => {
  const [selectedOwner, setSelectedOwner] = useState(null);
  const {confirm}= Modal;
  const [showDrawer, setShowDrawer] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const columns = [
    {
      key: "name",
      title: "Name",
      dataIndex: "name",
    },
    {
      key: "email",
      title: "Email",
      dataIndex: "email",
    },
    {
      key: "registrationDate",
      title: "Registration Date",
      dataIndex: "registrationDate",
    },
    {
      key: "status",
      title: "Status",
      render: (_, record) => {
        const { bgColor, color } = colorStatus(record.admin.status);
        return (
          <span
            className="statusLabel"
            style={{ backgroundColor: bgColor, color: color }}
          >
            {record.admin.status}
          </span>
        );
      },
    },
    {
      key: "action",
      title: "Action",
      dataIndex: "action",
      render: (_, record) => {
        return (
          <div className="d-flex gap-3">
            <Tooltip title="Approve/Reject">
              <CheckOutlined onClick={() => handleApproveReject(record.admin)} />
            </Tooltip>

            <Tooltip title="Delete">
              <DeleteOutlined
                onClick={() => handleDelete(record.user.userId)}
              />
            </Tooltip>
          </div>
        );
      },
    },
  ];
  
  function toggleDrawer(){
    setShowDrawer(!showDrawer);
  }
  
  async function handleApproveReject(data) {
    setSelectedOwner(data);
    toggleDrawer();
    
  }

  async function  handleApprove() {
    confirm({
        title: "Are you sure you want to Approve this Owner?",
        content: "This action cannot be undone.",
        okText: "Yes, Approve",
        okType: "danger",
        cancelText: "No, cancel",
        onOk: async () => {
          const response = await adminMetaDataService.approve(selectedOwner.adminId);
          if (response != null && response != undefined) {
            notification.success({ message: response.message });
            toggleDrawer();
            props.getAllOwners();
          }
        },
      });
  }
 

  async function triggerRejectModal() {
    setShowModal(!showModal);
  }
  return (
    <>
      <Table
        expandable={{
          expandedRowRender: (record) => (
            <ExpandableTable data={record.admin} />
          ),
        }}
        scroll={{ x: 1000 }}
        dataSource={props.data}
        columns={columns}
      />
      {showDrawer && (<DocumentSubmissionModal handleApprove={handleApprove} triggerRejectModal={triggerRejectModal} admin={selectedOwner} showModal={showDrawer} toggleModal={toggleDrawer}/>)}
      {showModal && (<RejectModal id={selectedOwner.adminId} getAllOwners={props.getAllOwners} toggleModal={triggerRejectModal} showModal={showModal} toggleDrawer={toggleDrawer} />)}
    </>
  );
};
OwnersTable.propTypes = {
  getAllOwners: PropType.func.isRequired,
  data: PropType.array.isRequired,
};
export default OwnersTable;
