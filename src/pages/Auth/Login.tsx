import React, { useState, useContext } from "react";
import styles from "./style.module.scss";
import logo from "../../assets/logo.png";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Input, Button, Row, Checkbox } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { Countries } from "../../types/countries";
import { PhoneInput } from "react-international-phone";
import clsx from "clsx";
import { AppContext } from "../../context/hubContext";
import useLocalStorage from "../../hooks/useLocalStorage";
import { Navigate } from "react-router-dom";
import { routes } from "../../constantes/routes";

const pattern = /^[0-9]+$/;

export const Login = () => {
  const [value, setValue] = useState<any>();
  const [code, setCode] = useState("");
  const [authPhone, setAuthPhone] = useState("");
  const [defCountry, setDefCountry] = React.useState<Countries | null>();
  const { hubConnection, signIn, account } = useContext(AppContext);
  // const [repeat, setRepeat] = useLocalStorage("timer");
  const phone = authPhone.replaceAll(/[^0-9]/g, "");

  const onChange = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
  };

  const isAccount = async () => {
    if (!hubConnection || phone.length < 5) return;
    hubConnection
      .invoke("CheckAccount", phone)
      .then((res) => {
        if (!res) {
          requestOtp();
        } else {
          requestOtp();
        }
      })
      .catch((e) => console.log(e));
  };

  const requestOtp = async () => {
    try {
      await hubConnection?.invoke("RequestOtp", phone);
      // localStorage.setItem("timer", moment().add(30, "seconds").toISOString());
      // navigate(routes.code);
    } catch (e) {
      console.log(e);
    }
  };

  const onRegister = () => {
    signIn(phone, code);
  };

  const onChangeCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if ((value === "" || pattern.test(value)) && value.length < 7) {
      setCode(value);
    }
  };

  if (account) {
    return <Navigate to={routes.contracts} />;
  }

  return (
    <div className={styles.wrapper}>
      {/* <Timer data={repeat} formatNum over={() => setRepeat("")} />{" "} */}
      <div className={styles.container}>
        <div className={styles.logo}>
          <img className={styles.logo__icon} src={logo} alt="Plan B" />
          <span>PLANB BACKOFFICE</span>
        </div>

        <div className={clsx(styles.input, styles.focus, "mb28")}>
          <UserOutlined style={{ color: "#1890FF" }} />
          <PhoneInput
            className={styles.phone}
            placeholder="Enter phone number"
            value={authPhone}
            onChange={setAuthPhone}
          />
        </div>

        <Row wrap={false}>
          <Input
            size="large"
            placeholder="Code"
            prefix={<LockOutlined style={{ color: "#1890FF" }} />}
            className={clsx(styles.input, "mr7 mb22")}
            value={code}
            onChange={onChangeCode}
            type="tel"
          />
          <Button
            className={clsx(styles.button, styles.code)}
            onClick={requestOtp}
            disabled={phone.length < 6}
          >
            Get Code
          </Button>
        </Row>
        <div className="mb22">
          <Checkbox onChange={onChange}>Remember me</Checkbox>
        </div>
        <Button
          type="primary"
          disabled={!phone.length || code.length !== 6}
          className={clsx(styles.button, styles.signin)}
          onClick={onRegister}
        >
          Sign In
        </Button>
      </div>
    </div>
  );
};
