import PropType from "prop-types";
import {Row, Col} from "antd";
const ExpandableTable = (props) =>{
    const admin = props.data;
    return (<div className="px-4">
       <Row gutter={[10,10]}>
          <Col span={8}><strong className="px-1">Gym Name:</strong>{admin.gymName}</Col>
          <Col span={8}><strong className="px-1">Gym City:</strong>{admin.gymCity}</Col>
          <Col span={8}><strong className="px-1">Gym GST No:</strong>{admin.gymGstNo}</Col>
          <Col span={8}><strong className="px-1">Gym Address:</strong>{admin.gymAddress}</Col>
          <Col span={8}><strong className="px-1">Phone Number:</strong>{admin.gymPhoneNo}</Col>
          <Col span={8}><strong className="px-1">Status:</strong>{admin.status}</Col>
          <Col span={8}><strong className="px-1">Rejected Reason:</strong>{admin.documentData.rejectedReason || "-"}</Col>
          <Col span={8}><strong className="px-1">Rejected Summary:</strong>{admin.documentData.rejectedSummary || "-"}</Col>
       </Row>
    </div>)
}
ExpandableTable.propTypes = {
    data: PropType.object.isRequired,
};
export default ExpandableTable;