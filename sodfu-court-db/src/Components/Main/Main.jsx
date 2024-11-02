import { useState, useEffect, useRef } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Image } from "primereact/image";
import { Avatar } from 'primereact/avatar';
import styles from "./Main.module.css"
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  FileTextOutlined,
  PieChartOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { GiInjustice } from "react-icons/gi";
import { GoTasklist } from "react-icons/go";
import { MdOutlineAddTask, MdOutlineTaskAlt } from "react-icons/md";
import { GoLaw } from "react-icons/go";
import { TbProgressCheck } from "react-icons/tb";
import { GrTask } from "react-icons/gr";
import { Layout, Switch, Menu, Button, ConfigProvider, theme as mainTheme } from "antd";
import { Menu as PrimeMenu } from "primereact/menu";
import { Badge } from 'primereact/badge';
import { Button as PrimeButton } from "primereact/button";
import { classNames } from "primereact/utils";
import { changeTheme, applyTheme } from "../../function-helpers/changeTheme";
import { createLocale } from "../../function-helpers/addLocale";
import { locale } from "primereact/api";

const { Header, Content, Sider } = Layout;

const getItem = (label, key, icon, children, type, danger) => {
  return { key, icon, children, label, type, danger };
}

const getSideBarItems = (theme = 'light', totalNewRecords = 0, totalInWorkRecords = 0, userRole) => {
  return [
    userRole == "admin" && getItem(<NavLink to="statistics">Статистика</NavLink>, "sub1", <PieChartOutlined />),
    userRole == "admin" && getItem(<NavLink to="courtdocs">Входящие документы</NavLink>, "sub2", <FileTextOutlined />),
    getItem(<span className={"flex align-items-center justify-content-between"} style={{width: "calc(100% - 34px)"}}>
      Задачи
      { 
        userRole == "admin" ? (totalNewRecords != 0 || totalInWorkRecords != 0) && <Badge style={{backgroundColor: `${theme === "dark" ? "#FFFFFF" : "#1677FF"}`}}></Badge> :
        totalInWorkRecords != 0 && <Badge style={{backgroundColor: `${theme === "dark" ? "#FFFFFF" : "#1677FF"}`}}></Badge>
      }
      </span>, "sub3", <GoTasklist />, [
      getItem(<NavLink to="tasks/my/inwork" className={"flex align-items-center justify-content-between"}>
                В работе
                {totalInWorkRecords != 0 && <Badge
                  value={totalInWorkRecords}
                  style={{
                    backgroundColor: `${theme === "dark" ? "#FFFFFF" : "#1677FF"}`, 
                    color: `${theme === "dark" ? "#1677FF" : "#FFFFFF"}`
                  }}>
                </Badge>}
              </NavLink>, "3.1", <TbProgressCheck />),
      getItem(<NavLink to="tasks/my">Завершенные</NavLink>, "3.2", <MdOutlineTaskAlt />),
      userRole == "admin" && getItem(<NavLink to="tasks/new" className={"flex align-items-center justify-content-between"}>
                Новые
                {totalNewRecords != 0 && <Badge
                  value={totalNewRecords}
                  style={{
                    backgroundColor: `${theme === "dark" ? "#FFFFFF" : "#1677FF"}`, 
                    color: `${theme === "dark" ? "#1677FF" : "#FFFFFF"}`
                  }}>
                </Badge>}
              </NavLink>, "3.3", <MdOutlineAddTask />),
      userRole == "admin" && getItem(<NavLink to="tasks/total">Все</NavLink>, "3.4", <GrTask />),
    ]),
    userRole == "admin" && getItem(<NavLink to="courts">Список судов</NavLink>, "sub4", <GoLaw />),
    userRole == "admin" && getItem(<NavLink to="courtdocs/upload">Загрузка документов</NavLink>, "sub5", <UploadOutlined />),
  ];
}

//Массив ключей для скрытия sideMenu
const rootSubmenuKeys = getSideBarItems('light', 0, 0, null).map((subItem) => subItem.key)

const topMenu = [
  getItem(<NavLink to="courtcases">Судебные дела</NavLink>, "3", <GiInjustice />),
];

const Main = (props) => {

  const { theme, updateTheme, getTotalInWorkRecords, logout, totalNewRecords, totalInWorkRecords, userAuth } = props
  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState(['sub1']);
  const userMenu = useRef(null);
  let userRole = userAuth && userAuth.role

  useEffect(() => {
    applyTheme(theme);
    createLocale();
    locale("ru");
  });

  getTotalInWorkRecords(userAuth.fullName)

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const userMenuItems = [
    {
      command: () => {

      },
      template: (item, options) => {
        return (
          <div className="flex align-items-center p-1 pl-2 hover:surface-hover cursor-pointer" onClick={(e) => options.onClick(e)}>
            <Avatar
              image={require("../../img/avatar/IMG_4539.jpg")}
              className="mr-2"
              icon="pi pi-user"
              shape="circle"
            />
            <div className="flex flex-column align">
              <span className="font-bold">{`${
                props.userAuth.fullName.split(" ")[0]
              } ${Array.from(props.userAuth.fullName.split(" ")[1])[0]}.${
                Array.from(props.userAuth.fullName.split(" ")[2])[0]
              }.`}</span>
            </div>
          </div>
        );
      },
    },
    {
      label: "Сформировать QR-коды",
      icon: "pi pi-qrcode",
      // command: makeQRCodeHelper,
    },
    {
      label: "Сформировать EXCEL",
      icon: "pi pi-file-excel",
      // command: exportExcel,
    },
    { separator: true},
    {
      label: "Выйти",
      icon: "pi pi-sign-out",
      command: () => logout(),
    },
  ];

  return (
    <ConfigProvider
      theme={{
        algorithm:
          theme === "dark"
            ? mainTheme.darkAlgorithm
            : mainTheme.defaultAlgorithm,
      }}
    >
      <Layout className="h-screen">
        <Sider
          theme={theme}
          trigger={null}
          collapsible
          collapsed={collapsed}
          width="250px"
          style={{backgroundColor: `${theme === "dark" ? "#1E1E1E" : "#FFFFFF"}`}}
        >
          <div className="flex flex-column">
            <div className="flex justify-content-between align-items-center">
              <div>
                <Image
                  className={`ml-3 animation-duration-500 ${
                    !collapsed && "fadein"
                  }`}
                  src={require(theme === "dark"
                    ? `../../img/logo-lite.png`
                    : `../../img/logo-dark.png`)}
                  width="40"
                  style={{ display: `${collapsed ? "none" : ""}` }}
                />
              </div>
              <div>
                <Button
                  type="text"
                  icon={
                    collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                  }
                  onClick={() => setCollapsed(!collapsed)}
                  style={{
                    fontSize: "16px",
                    width: 80,
                    height: 64,
                  }}
                />
              </div>
            </div>
            <div
              className="flex flex-column justify-content-between flex-grow-1 overflow-y-auto"
              style={{ height: "calc(100vh - 64px - 38px)", backgroundColor: `${theme === "dark" ? "#1E1E1E" : "#FFFFFF"}` }}
            >
              <Menu
                className={theme === "dark" ? styles.menuItemsDark : styles.menuItemsLight}
                theme={theme}
                mode="inline"
                defaultSelectedKeys={["1"]}
                items={getSideBarItems(theme, totalNewRecords, totalInWorkRecords, userRole)}
                openKeys={openKeys}
                onOpenChange={onOpenChange}
              />
            </div>
            <div className="text-center p-2">
              <Switch
                checked={theme === "dark"}
                onChange={changeTheme(updateTheme)}
                checkedChildren="Dark"
                unCheckedChildren="Light"
              />
            </div>
          </div>
        </Sider>
        <Layout>
          <Header
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 0,
              backgroundColor: `${theme === "dark" ? "#1E1E1E" : "#FFFFFF"}`,
            }}
          >
            {/* <Menu
              theme={theme}
              mode="horizontal"
              defaultSelectedKeys={["1"]}
              items={topMenu}
              style={{ flex: 1, minWidth: 0, backgroundColor: `${theme === "dark" ? "#1E1E1E" : "#FFFFFF"}` }}
            /> */}
            <div></div>
            <div className="col-fixed flex align-items-center">
              <PrimeMenu model={userMenuItems} popup ref={userMenu} style={{width: "max-content"}}/>
              <PrimeButton
                className={classNames("px-2 py-1",theme === "dark" ? styles.logoDark : styles.logoLight)}
                onClick={(e) => userMenu.current.toggle(e)}
              >
                <Avatar
                  image={require("../../img/avatar/IMG_4539.jpg")}
                  icon="pi pi-user"
                  size="large"
                  shape="circle"
                />
                <i
                  className="pi pi-angle-down ml-2"
                  style={{ color: "#4a4a4a" }}
                ></i>
              </PrimeButton>
            </div>
          </Header>
          <Layout style={{backgroundColor: `${theme === "dark" ? "#161616" : "#F5F5F5"}`}}>
            <Content
              style={{
                padding: 0,
                margin: 16,
                minHeight: 280,
              }}
            >
              <div id="detail">
                <Outlet />
              </div>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default Main;
