import React, { useState, useContext, useEffect } from "react";
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from "antd";
import { ProfileTwoTone, MenuFoldOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme, Avatar } from "antd";
import styles from "./style.module.scss";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { TableComponent } from "../../components/table";
import { Navigate } from "react-router-dom";
import { routes } from "../../constantes/routes";
import { AppContext } from "../../context/hubContext";
const { Header, Content, Sider } = Layout;

export const Contracts = () => {
  const { user, account } = useContext(AppContext);

  if (user === null) { 
    return null;
  }
  if (user === false) {
    return <Navigate to={routes.login} replace />;
  }
  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.logo}>PLAN B BACKOFFICE</div>
        <div className={styles.avatar}>
          <Avatar
            style={{ backgroundColor: "aqua", verticalAlign: "middle" }}
            size="large"
            className={styles.avatar__img}
          >
            {account && account.media && account.media.length && account.media[0].alias  ? (
              <img src={account.media[0].alias || ""} alt="" />
            ) : null}
          </Avatar>
          <h4 className={styles.avatar__name}>
            {account ? account.userName : ""}
          </h4>
        </div>
      </Header>
      <Layout>
        <Sider className={styles.navbar}>
          <Menu mode="inline">
            <Menu.Item className={styles.navbar__item}>
              <NavLink
                to={routes.contracts}
                className={clsx(styles.navbar__link, styles.active)}
              >
                <ProfileTwoTone /> Contracts
              </NavLink>
            </Menu.Item>
          </Menu>
          <div className={styles.navbar__bottom}>
            <MenuFoldOutlined />
          </div>
        </Sider>

        <div className={styles.content}>
          <div className={styles.contentHeader}>
            <h3 className={styles.contentHeader__title}>Contracts</h3>
          </div>
          <div className={styles.content__inner}>
            <TableComponent />
          </div>
        </div>
      </Layout>
    </Layout>
  );
};
