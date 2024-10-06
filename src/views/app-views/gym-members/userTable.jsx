import { Table } from "antd";
const UserTable = (props)=>{
  console.log(props.data)
  const columns = [
    {
     key:"userName",
     title:"Name",
     dataIndex:"userName"
    },
    {
     key:"email",
     title:"Email",
     dataIndex:"email"
    },
    {
     key:"duration",
     title:"Plan Duration",
     dataIndex:"duration"
    },
    {
     key:"fees",
     title:"Fees Deposit",
     dataIndex:"fees"
    },
    {
     key:"joiningDate",
     title:"Joining Date",
     dataIndex:"joiningDate"
    },
    {
     key:"renewalDate",
     title:"Renewal Date",
     dataIndex:"renewalDate"
    },
    {
     key:"action",
     title:"Action",
     dataIndex:"action"
    }
  ];  
  return(
    <>
    <Table dataSource={props.data} columns={columns}/>
    </>
  );
}
export default UserTable;