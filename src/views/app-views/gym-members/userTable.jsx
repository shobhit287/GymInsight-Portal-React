import { Table } from "antd";
import { colorStatus } from "../../../utils";
const UserTable = (props)=>{
  console.log(props.data)
  const columns = [
    {
     key:"userName",
     title:"Name",
     dataIndex:"userName",
    },
    {
     key:"duration",
     title:"Plan Duration",
     dataIndex:"duration",
    },
    {
     key:"fees",
     title:"Fees Deposit",
     dataIndex:"fees"
    },
    {
     key:"joiningDate",
     title:"Joining Date",
     dataIndex:"joiningDate",
     render: (_, record) => {
      const { bgColor, color } = colorStatus("joiningDate");
      return (
        <span className="statusLabel" style={{ backgroundColor: bgColor, color: color }}>
          {record.joiningDate}
        </span>
      );
    },
    },
    {
     key:"lastFeesDate",
     title:"Fees Submission Date",
     dataIndex:"lastFeesDate"
    },
    {
     key:"renewalDate",
     title:"Renewal Date",
     dataIndex:"renewalDate",
    },
    {
     key:"action",
     title:"Action",
     dataIndex:"action"
    }
  ];  
  return(
    <>
    <Table scroll={{ x: 1000 }} dataSource={props.data} columns={columns}/>
    </>
  );
}
export default UserTable;