import React, { useState, useContext, useEffect } from "react";
import { Space, Table, Tag, Modal } from "antd";
import type { ColumnsType } from "antd/es/table";
import styles from "./style.module.scss";
import { FileTextOutlined } from "@ant-design/icons";
import clsx from "clsx";
import type { RadioChangeEvent } from "antd";
import { Cascader, Radio } from "antd";
import { TableModal } from "../tableModal";
import { AppContext } from "../../context/hubContext";
import { ApiSServer } from "../../api/s-server";
import { HubConnection } from "@microsoft/signalr";
import ContractState from "../../api/types/ContractState";
import ContractModel from "../../api/types/ContractModel";
import moment from "moment";
const { success } = Modal;


export const TableComponent: React.FC = () => {
  const [placement, SetPlacement] = useState<ContractState>(
    ContractState.DocumentChecked +
      ContractState.AddressChecked +
      ContractState.IdentityChecked
  );
  const [open, setOpen] = useState(false);
  const [selectItem, setSelectItem] = useState<ContractModel | null>(null);

  const placementChange = (e: RadioChangeEvent) => {
    SetPlacement(e.target.value);
  };

  const { hubConnection, user, account } = useContext(AppContext);
  const [contractsChecked, setContractsChecked] = useState<ContractModel[]>([]);

  const [contractsRejected, setContractsRejected] = useState<ContractModel[]>(
    []
  );
  const [contractsStarted, setContractsStarted] = useState<ContractModel[]>([]);

  const showConfirm = () => {
    success({
      title: 'Successfully',
      content: 'Contract successfully confirmed',
      centered: true,
      onOk() {
       
      },

      okText:"Ok",
      cancelButtonProps: {
        children: "No"
      }
    });
  };


  const activeTable = (type: ContractState) => {
    if (
      type ===
      ContractState.DocumentChecked +
        ContractState.AddressChecked +
        ContractState.IdentityChecked
    ) {
      return contractsChecked;
    }  else if (type === ContractState.Rejected) {
      return contractsRejected;
    } else if (type === ContractState.Started) {
      return contractsStarted;
    }  else {
      return contractsChecked;
    }
  };

  const api = new ApiSServer(hubConnection as HubConnection);

  const getCheckedContracts = () => {
    getContracts(
      [
        ContractState.BasicInfoProvided + ContractState.PicturesProvided + ContractState.DocumentChecked + ContractState.IdentityChecked + ContractState.AddressChecked,
        
      ],
      setContractsChecked
    );
  }

  const getStartedContracts = () => {
    getContracts(
      [
        ContractState.BasicInfoProvided + ContractState.PicturesProvided + ContractState.DocumentChecked + ContractState.IdentityChecked + ContractState.AddressChecked +
        ContractState.Started,
      ],
      setContractsStarted
    );
  }

  const getRejectedContracts = () => {
    getContracts(
      [
        ContractState.Rejected +
        ContractState.BasicInfoProvided + ContractState.PicturesProvided + ContractState.DocumentChecked + ContractState.IdentityChecked + ContractState.AddressChecked,

        // ContractState.BasicInfoProvided + ContractState.PicturesProvided + ContractState.DocumentChecked + ContractState.IdentityChecked + ContractState.AddressChecked + ContractState.Rejected
      ],
      setContractsRejected
    );
  }

  useEffect(() => {
    if (!hubConnection) return;
    getCheckedContracts();
    getStartedContracts();
    getRejectedContracts();
  }, [hubConnection]);

  const getContracts = async (
    state: ContractState[],
    func: (v: ContractModel[]) => void
  ) => {
    try {
      const res = await api.getContracts(state, 0, 100);

      if (res.collection) {
        func(res.collection);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const setContractsState = async (safeId: string, state: ContractState) => {
    
    try {
      await api.setContractState(safeId, state);
      setOpen(false);
      getCheckedContracts();
      getStartedContracts();
      getRejectedContracts();
      success({
        title: 'Successfully',
        content: 'Contract successfully confirmed',
        centered: true,
        icon: null,
        onOk() {
         
        },
        okText:"Ok",
        okButtonProps: { 
          children: "No",
        },
        className: 'successModal'
      });
   
    } catch (e) {
      console.log(e);
    }
  };

  const getStatus = (state: number) => {
    
      if (
        ((state & ContractState.BasicInfoProvided) ==
          ContractState.BasicInfoProvided &&
          (state & ContractState.PicturesProvided) ==
            ContractState.PicturesProvided &&
          (state & ContractState.DocumentChecked) ==
            ContractState.DocumentChecked &&
          (state & ContractState.IdentityChecked) ==
            ContractState.IdentityChecked &&
          (state & ContractState.AddressChecked) ==
            ContractState.AddressChecked &&
          (state & ContractState.Rejected) ==
            ContractState.Rejected) ||
        (state & ContractState.Started) == ContractState.Started
      ) {
        return 'Started'
      }
      if (
        ((state & ContractState.BasicInfoProvided) ==
          ContractState.BasicInfoProvided &&
          (state & ContractState.PicturesProvided) ==
            ContractState.PicturesProvided &&
          (state & ContractState.DocumentChecked) ==
            ContractState.DocumentChecked &&
          (state & ContractState.IdentityChecked) ==
            ContractState.IdentityChecked &&
          (state & ContractState.AddressChecked) ==
            ContractState.AddressChecked &&
          (state & ContractState.Rejected) ==
            ContractState.Rejected) ||
        (state & ContractState.Rejected) == ContractState.Rejected
      ) {
        return 'Rejected'
      }
      if (
        (state & ContractState.BasicInfoProvided) ==
          ContractState.BasicInfoProvided &&
        (state & ContractState.PicturesProvided) ==
          ContractState.PicturesProvided &&
        (state & ContractState.DocumentChecked) ==
          ContractState.DocumentChecked &&
        (state & ContractState.IdentityChecked) ==
          ContractState.IdentityChecked &&
        (state & ContractState.AddressChecked) ==
          ContractState.AddressChecked
      ) {

        return "Address Checked"
      }
      // to step five
      if (
        (state & ContractState.BasicInfoProvided) ==
          ContractState.BasicInfoProvided &&
        (state & ContractState.PicturesProvided) ==
          ContractState.PicturesProvided &&
        (state & ContractState.DocumentChecked) ==
          ContractState.DocumentChecked &&
        (state & ContractState.IdentityChecked) ==
          ContractState.IdentityChecked
      ) {
        return "Identity Checked"
      }

      if (
        (state & ContractState.BasicInfoProvided) ==
          ContractState.BasicInfoProvided &&
        (state & ContractState.PicturesProvided) ==
          ContractState.PicturesProvided &&
        (state & ContractState.DocumentChecked) ==
          ContractState.DocumentChecked
      ) {
        return "Document Checked"
      }

      if (
        (state & ContractState.BasicInfoProvided) ==
          ContractState.BasicInfoProvided &&
        (state & ContractState.PicturesProvided) ==
          ContractState.PicturesProvided
      ) {
        return "Pictures Provided"
      }
      if (
        (state & ContractState.BasicInfoProvided) ==
        ContractState.BasicInfoProvided
      ) {
        return "Basic Info Provided"
      } else {
        return "Basic Info Provided"
      }
  }
  

  const columns: ColumnsType<ContractModel> = [
    {
      title: "ID",
      dataIndex: "safeId",
      key: "id",
      render: (text) => <div className={styles.td}>{text}</div>,
    },
    {
      title: "NAME",
      dataIndex: "firstName",
      key: "firstName",
      render: (text) => <div className={styles.td}>{text}</div>,
    },
    {
      title: "AGE",
      dataIndex: "user.age",
      key: "age",
      render: (_,{user}) => <div className={styles.td}>{user.age}</div>,
    },
    {
      title: "NATIONALITY",
      dataIndex: "nationality",
      key: "nationality",
      render: (_, { nationality }) => (
        <div>
          {nationality ? nationality?.toLocaleUpperCase() : "-"}&nbsp;
          <FileTextOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />
        </div>
      ),
    },
    {
      title: "CREATED AT",
      dataIndex: "user.creationTs",
      key: "user",
      render: (_,{user}) => <div className={styles.td}>{moment.utc(user.creationTs).format('YYYY.MM.DD')}</div>,
    },
    {
      title: "STATUS",
      dataIndex: "state",
      key: "state",
      render: (_, record) => (
        <div className={styles.td}>
          <div className={styles.checked}>
            <span
              className={clsx(
                styles.checked__dot,
                styles[
                  ContractState[record.state]
                    ? ContractState[record.state].toLowerCase()
                    : record.state ===
                      ContractState.New +
                        ContractState.DocumentChecked +
                        ContractState.AddressChecked +
                        ContractState.IdentityChecked
                    ? "new"
                    : record.state ===
                      ContractState.DocumentChecked +
                        ContractState.AddressChecked +
                        ContractState.IdentityChecked
                    ? "checked"
                    : "new"
                ]
              )}
            ></span>
            {getStatus(record.state)}
          </div>
        </div>
      ),
    },
    {
      title: "Action",
      key: "kycProvider",
      render: (_, record) => (
        <Space size="middle">
          {/* {
          record.state !== 63 as  ContractState
          ? (
            <span
              className={styles.action}
              onClick={() =>
                setContractsState(
                  record.safeId as string,
                  ContractState.Started
                )
              }
            >
              Confirm
            </span>
          ) : null} */}
          {/* {record.state !== 95 as ContractState ? (
            <span
              className={styles.action}
              onClick={() =>
                setContractsState(
                  record.safeId as string,
                  ContractState.Rejected
                )
              }
            >
              Reject
            </span>
          ) : null} */}
          <span
            className={styles.action}
            onClick={() => {
              setOpen(true);
              setSelectItem(record);
            }}
          >
            View
          </span>
        </Space>
      ),
    },
  ];

  return (
    <div className={styles["table-wrapper"]}>
      <Radio.Group
        value={placement}
        onChange={placementChange}
        className={styles.group}
      >
  
        <Radio.Button
          className={styles.group__item}
          value={
            ContractState.DocumentChecked +
            ContractState.AddressChecked +
            ContractState.IdentityChecked
          }
          onClick={getCheckedContracts}
        >
          Checked ({contractsChecked.length})
        </Radio.Button>
        <Radio.Button
          className={styles.group__item}
          value={ContractState.Started}
          onClick={getStartedContracts}
        >
          Started ({contractsStarted.length})
        </Radio.Button>
        <Radio.Button
          className={styles.group__item}
          value={ContractState.Rejected}
          onClick={getRejectedContracts}
        >
          Rejected ({contractsRejected.length})
        </Radio.Button>
      </Radio.Group>
      <TableModal
        open={open}
        setOpen={setOpen}
        setContractsState={setContractsState}
        item={selectItem}
        setSelectItem={setSelectItem}
      />
      <Table
        columns={columns}
        dataSource={activeTable(placement)}
        className={styles.table}
        pagination={{
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} items`,
        }}
      />
    </div>
  );
};
