import {Row, Col} from "antd";
import PropType from "prop-types";
const ExpandableTable = ({data})=>{
    return (<div className="px-4">
       <Row gutter={[10,10]}>
         <Col span={6}><strong className="px-1">Trainer Assigned:</strong> {data.user.trainerName}</Col>
         <Col span={6}><strong className="px-1">Payment Method:</strong> {data.user.paymentMethod}</Col>
         <Col span={6}><strong className="px-1">Shift:</strong> {data.user.shift}</Col>
         <Col span={6}><strong className="px-1">Fees Deposited:</strong> {data.user.fees}</Col>
         <Col span={10}><strong className="px-1">Email:</strong> {data.user.email}</Col>
       </Row>
    </div>);
}
ExpandableTable.propTypes = {
    data: PropType.object.isRequired
}
export default ExpandableTable;