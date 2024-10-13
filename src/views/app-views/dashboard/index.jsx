import store from "../../../store";

const Dashboard= () => {
  const {user}= store();
  return(<>
    <h1>{`${user.firstName} ${user.lastName}`}</h1>
  </>)
}
export default Dashboard;