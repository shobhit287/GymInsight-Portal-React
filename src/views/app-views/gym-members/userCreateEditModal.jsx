import {
  Form,
  Drawer,
  Input,
  Row,
  Col,
  Button,
  DatePicker,
  Select,
  InputNumber,
} from "antd";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import store from "../../../store";
import { useEffect } from "react";
dayjs.extend(customParseFormat);

const UserCreateEditModal = (props) => {
  const [form] = Form.useForm();
  const { loading } = store();
  const { Option } = Select;
  useEffect(() => {
    if (props.user && props.transaction === "edit") {
      const { user } = props;
      form.setFieldsValue({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        paymentMethod: user.paymentMethod,
        shift: user.shift,
        currentPlanDuration: user.currentPlanDuration,
        fees: user.fees,
        trainerName: user.trainerName,
        renewalDate: dayjs(user.renewalDate),
        lastFeesDate: dayjs(user.lastFeesDate),
      });
    }
  }, []);

  const calculateRenewalDate = (planDuration) => {
    const lastFeesDate = form.getFieldValue("lastFeesDate");
    return lastFeesDate
      ? dayjs(lastFeesDate).add(planDuration, "months")
      : null;
  };

  const onValuesChange = (changedValues) => {
    if (changedValues.currentPlanDuration) {
      const renewalDate = calculateRenewalDate(
        changedValues.currentPlanDuration
      );
      form.setFieldsValue({ renewalDate });
    }
  };
  async function beforSubmit(values) {
    const response = await props.handleSubmit(values);
    if (response) {
      form.resetFields();
    }
  }

  function beforeClose() {
    form.resetFields();
    props.toggleModal();
  }
  return (
    <>
      <Drawer
        title="Member Details"
        placement={"right"}
        closable={true}
        width={850}
        onClose={beforeClose}
        open={props.showModal}
        key={"right"}
        maskClosable={false}
      >
        <Form
          layout="vertical"
          name="userCreateEdit"
          form={form}
          onValuesChange={onValuesChange}
          onFinish={beforSubmit}
          initialValues={{
            lastFeesDate: dayjs(),
            currentPlanDuration: 1,
            trainerName: "No",
            renewalDate: dayjs().add(1, "months"),
          }}
          autoComplete="off" // Disable autocomplete for the entire form
        >
          <Row gutter={10}>
            <Col span={8}>
              <Form.Item
                name="firstName"
                label="Member First Name"
                rules={[
                  {
                    required: true,
                    message: "Member First Name is a required field",
                  },
                ]}
              >
                <Input
                  placeholder="Enter Member First Name"
                  autoComplete="off"
                />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                name="lastName"
                label="Member Last Name"
                rules={[
                  {
                    required: true,
                    message: "Member Last Name is a required field",
                  },
                ]}
              >
                <Input
                  placeholder="Enter Member Last Name"
                  autoComplete="off"
                />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                name="email"
                label="Member Email"
                rules={[
                  {
                    required: true,
                    message: "Member Email is a required field",
                  },
                  { type: "email", message: "Please enter a valid email!" },
                ]}
              >
                <Input placeholder="Enter Member Email" autoComplete="off" />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                name="trainerName"
                label="Trainer Assigned (Name)"
                rules={[
                  {
                    required: true,
                    message: "Trainer Name is a required field",
                  },
                ]}
              >
                <Input placeholder="Enter Trainer Name" autoComplete="off" />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                name="lastFeesDate"
                label="Fees Submission Date"
                rules={[
                  {
                    required: true,
                    message: "Fees Submission Date is a required field",
                  },
                ]}
              >
                <DatePicker
                  defaultValue={dayjs()}
                  format="DD/MM/YYYY"
                  className="w-100"
                  disabled={!props.user}
                  disabledDate={(current) => {
                    return (
                      props.user && current && current > dayjs().endOf("day")
                    );
                  }}
                />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                name="currentPlanDuration"
                label="Plan Duration (Months)"
                rules={[
                  {
                    required: true,
                    message: "Plan Duration is a required field",
                  },
                ]}
              >
                <InputNumber
                  className="w-100"
                  min={1}
                  placeholder="Enter Plan Duration (Months)"
                />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                name="renewalDate"
                label="Renewal Date"
                rules={[
                  {
                    required: true,
                    message: "Renewal Date is a required field",
                  },
                ]}
              >
                <DatePicker
                  value={form?.getFieldValue("renewalDate")}
                  format="DD/MM/YYYY"
                  className="w-100"
                  disabledDate={(current) => {
                    return current && current < dayjs().endOf("day");
                  }}
                />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                name="fees"
                label="Amount Deposit"
                rules={[
                  {
                    required: true,
                    message: "Amount Deposit is a required field",
                  },
                ]}
              >
                <InputNumber
                  className="w-100"
                  placeholder="Enter Amount Deposit"
                />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                name="paymentMethod"
                label="Payment Method"
                rules={[
                  {
                    required: true,
                    message: "Payment Method is a required field",
                  },
                ]}
              >
                <Select placeholder="Choose Payment Method">
                  <Option value="cash">Cash</Option>
                  <Option value="online">Online</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                name="shift"
                label="Shift"
                rules={[
                  { required: true, message: "Shift is a required field" },
                ]}
              >
                <Select placeholder="Choose Shift">
                  <Option value="morning">Morning</Option>
                  <Option value="evening">Evening</Option>
                  <Option value="night">Night</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={24} align="end">
              <Button type="primary" loading={loading} htmlType="submit">
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

UserCreateEditModal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default UserCreateEditModal;
