import { Table, Modal, notification, Tooltip } from "antd";
import { colorStatus } from "../../../utils";
import {
  EditOutlined,
  DeleteOutlined,
  HistoryOutlined,
} from "@ant-design/icons";
import { userMetaDataService } from "../../../services/userMetaData";
import ExpandableTable from "./expandableTable";
import UserCreateEditModal from "./userCreateEditModal";
import PropType, { func } from "prop-types";
import { useState } from "react";
import { userService } from "../../../services/userService";
import store from "../../../store";
import { feesRenewalService } from "../../../services/feesRenewalService";
const UserTable = (props) => {
  const { confirm } = Modal;
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const {setLoading} = store();
  const columns = [
    {
      key: "userName",
      title: "Name",
      dataIndex: "userName",
    },
    {
      key: "duration",
      title: "Plan Duration",
      dataIndex: "duration",
    },
    {
      key: "fees",
      title: "Fees Deposit",
      dataIndex: "fees",
    },
    {
      key: "joiningDate",
      title: "Joining Date",
      dataIndex: "joiningDate",
      render: (_, record) => {
        const { bgColor, color } = colorStatus("joiningDate");
        return (
          <span
            className="statusLabel"
            style={{ backgroundColor: bgColor, color: color }}
          >
            {record.joiningDate}
          </span>
        );
      },
    },
    {
      key: "lastFeesDate",
      title: "Fees Submission Date",
      dataIndex: "lastFeesDate",
    },
    {
      key: "renewalDate",
      title: "Renewal Date",
      dataIndex: "renewalDate",
      render: (_, record) => {
        const isPlanExpired =
          new Date().toISOString().split("T")[0] >= record.user.renewalDate;

        if (isPlanExpired) {
          const { bgColor, color } = colorStatus("renewalDate");
          return (
            <span
              className="statusLabel"
              style={{ backgroundColor: bgColor, color: color }}
            >
              {record.renewalDate}
            </span>
          );
        } else {
          return <>{record.renewalDate}</>;
        }
      },
    },
    {
      key: "action",
      title: "Action",
      render: (_, record) => {
        const isPlanExpired =
          new Date().toISOString().split("T")[0] >= record.user.renewalDate;
        return (
          <div className="d-flex gap-3">

            {isPlanExpired && (
            <Tooltip title="Fees Renewal" className="cursor-pointer">
              <HistoryOutlined onClick={()=> handleNotifyUser(record.user.userId)}/>
            </Tooltip>
          )}

            <Tooltip title="Edit">
              <EditOutlined onClick={() => handleEdit(record.user)} />
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

  function toggleModal() {
    setShowModal(!showModal);
  }

  async function handleEdit(user) {
    setSelectedUser(user);
    toggleModal();
  }

  async function handleNotifyUser(id) {
    const response = await feesRenewalService.notifyById(id);
    if(response != null && response != undefined) {
      notification.success({message: response.message});
    }
    
  }

  async function handleEditSubmit(values) {
    setLoading(true);
    const userData = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
    };
    const userUpdateResponse = await userService.update(
      selectedUser.userId,
      userData
    );
    if (userUpdateResponse != null && userUpdateResponse != undefined) {
      const metaData = {
        trainerName: values.trainerName,
        lastFeesDate: new Date(values.lastFeesDate).toISOString().split("T")[0],
        renewalDate: new Date(values.renewalDate).toISOString().split("T")[0],
        paymentMethod: values.paymentMethod,
        currentPlanDuration: values.currentPlanDuration,
        fees: values.fees,
        shift: values.shift,
      };
      const userMetaResponse = await userMetaDataService.update(
        selectedUser.userId,
        metaData
      );
      if (userMetaResponse != null && userMetaResponse != undefined) {
        notification.success({
          message: "Member Updated Successfully",
        });
        props.getAllUsers();
        toggleModal();
      }
    }
    setLoading(false);
  }

  async function handleDelete(id) {
    confirm({
      title: "Are you sure you want to delete this member?",
      content: "This action cannot be undone.",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "No, cancel",
      onOk: async () => {
        const response = await userMetaDataService.delete(id);
        if (response != null && response != undefined) {
          notification.success({ message: "Memeber Successfully deleted" });
          props.getAllUsers();
        }
      },
    });
  }

  return (
    <>
      <Table
        expandable={{
          expandedRowRender: (record) => <ExpandableTable data={record} />,
        }}
        scroll={{ x: 1000 }}
        dataSource={props.data}
        columns={columns}
      />
      {selectedUser && showModal && (
        <UserCreateEditModal
          transaction="edit"
          user={selectedUser}
          toggleModal={toggleModal}
          showModal={showModal}
          handleSubmit={handleEditSubmit}
        />
      )}
    </>
  );
};
UserTable.propTypes = {
  getAllUsers: PropType.func.isRequired,
  data: PropType.array.isRequired,
};
export default UserTable;
