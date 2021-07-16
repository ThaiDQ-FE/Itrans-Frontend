import React, { useEffect } from "react";
import "./styles.scss";
import AdminManagementAccountTabs from "../../../components/admin/admin-management-account-component/amac-tabs";
import { useDispatch, useSelector } from "react-redux";
import { getListAccountNotConfirm } from "../../../store/action/user.action";
function AdminManagementAccount() {
  const { listAccountNotConfirm } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListAccountNotConfirm());
  }, []);
  return (
    <div className="adminManagementAccount__warpper">
      <AdminManagementAccountTabs
        listAccount={listAccountNotConfirm}
        loading={loading}
      />
    </div>
  );
}

export default AdminManagementAccount;
