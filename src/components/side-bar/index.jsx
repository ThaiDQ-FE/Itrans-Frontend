import React, { useState } from "react";
import { Menu, Button } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from '@ant-design/icons';
import Images from "../../assets/images/images";
import "./styles.scss";
const { SubMenu } = Menu;
function Sidebar() {
  const [state, setState] = useState({
    collapsed: false,
  });

  const toggleCollapsed = () => {
    setState({
      ...state,
      collapsed: !state.collapsed,
    });
  };
  return (
    <div >
      <div className='side-bar-menu'>
        <Menu
          defaultSelectedKeys={['5']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
          inlineCollapsed={state.collapsed}
        >
          <div>
            <img className="ant-menu-item logo" src={Images.LOGO_GREY} />
          </div>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            Trang chủ
          </Menu.Item>
          <Menu.Item key="3" icon={<ContainerOutlined />}>
            Phê duyệt tài khoản
          </Menu.Item>
          <SubMenu key="sub1" icon={<MailOutlined />} title="Quản lý">
            <Menu.Item key="5">Vòng gọi vốn</Menu.Item>
            <Menu.Item key="6">Thỏa thuận</Menu.Item>
            <Menu.Item key="7">Nghành nghề</Menu.Item>
            <Menu.Item key="8">Giai đoạn</Menu.Item>
            <Menu.Item key="9">Khu vực</Menu.Item>
          </SubMenu>
        </Menu>
        <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
          {React.createElement(state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
        </Button>
      </div>
    </div>
  );
}
export default Sidebar;