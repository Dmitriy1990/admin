import React, { useContext, useState } from "react";
import { Button, Modal, Carousel, Input, Tag, Slider, Radio} from "antd";
import clsx from "clsx";
import styles from "./style.module.scss";
import { ClockCircleOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import ContractModel from "../../api/types/ContractModel";
import ContractState from "../../api/types/ContractState";
import { flags as flagIcon } from "../../assets/flags";
import { AppContext } from "../../context/hubContext";
import type { SliderMarks } from 'antd/es/slider';
import type { RadioChangeEvent } from "antd";
import { ModalConfirm } from "../modalConfirm";


type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  item: ContractModel | null;
  setContractsState: (safeId: string, state: ContractState) => void;
  setSelectItem: (item: ContractModel | null) => void;
};

enum Tabs {
  BasicInfo,
  Documents,
  Address
}

const { confirm } = Modal;

export const TableModal: React.FC<Props> = ({
  open,
  setOpen,
  item,
  setContractsState,
  setSelectItem,
}) => {
  const {countries,langs} = useContext(AppContext)
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<Tabs>(
    Tabs.BasicInfo
  );


  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };

  const handleCancel = () => {
    setOpen(false);
    setSelectItem(null);
  };

  const contentStyle: React.CSSProperties = {
    margin: 0,
    height: "100%",
    color: "#fff",

    textAlign: "center",
    background: "#364d79",
  };

  if (!item) {
    setOpen(false);
    return null;
  }

  const placementChange = (e: RadioChangeEvent) => {
    setPlacement(e.target.value);
  };

  const nationality = countries.find((c) => c.code === item.nationality);
  const country = countries.find((c) => c.code === item.country);

  const handleOk1 = () => {
    setIsModalOpen(false);
  };

  const handleCancel1 = () => {
    setIsModalOpen(false);
  };

  const showConfirm = () => {
    confirm({
      title: 'Contract confirmation',
      icon: <ExclamationCircleOutlined />,
      content: 'Are you sure you want to confirm the contract? It will not be possible to undo this action.',
      centered: true,
      onOk() {
         setContractsState(item.safeId as string, ContractState.Started)
      },
      onCancel() {
        console.log('Cancel');
      },
      cancelText:"No",
      okText:"Yes",
      cancelButtonProps: {
        children: "No"
      }
    });
  };
  const showReject = () => {
    confirm({
      title: 'Rejection of contract',
      icon: <ExclamationCircleOutlined />,
      content: 'Are you sure you want to reject the contract? It will not be possible to undo this action.',
      centered: true,
      onOk() {
         setContractsState(item.safeId as string, ContractState.Rejected)
      },
      onCancel() {
        console.log('Cancel');
      },
      cancelText:"No",
      okText:"Yes",
      cancelButtonProps: {
        children: "No"
      }
    });
  };

  const marks: SliderMarks = {
    40: '40',
    50: '50',
    75: '75',
    100: '100'
  };
  const marksHeight: SliderMarks = {
    140: '140',
    175: '175',
    200: '200'
  };

  return (
    <>
    <ModalConfirm isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
      <Modal
        open={open}
        onOk={handleOk}
        className={styles.modal}
        onCancel={handleCancel}
        footer={
          item.state === 63 as ContractState ? 
          [
            <Button
              className={clsx(styles.btn, styles.cancel)}
              key="Cancel"
              onClick={handleCancel}
            >
              Cancel
            </Button>,
            <Button
              key="Reject"
              className={clsx(styles.btn, styles.reject)}
              loading={loading}
              onClick={showReject}
            >
              Reject
            </Button>,
          ]
          : item.state === 95 as ContractState ?
          [
          <Button
            className={clsx(styles.btn, styles.cancel)}
            key="Cancel"
            onClick={handleCancel}
          >
            Cancel
          </Button>,
          <Button
            key="Confirm"
            className={clsx(styles.btn, styles.confirm)}
            loading={loading}
            onClick={showConfirm}
          >
            Confirm
          </Button>,
        ] : 
        [
          <Button
            className={clsx(styles.btn, styles.cancel)}
            key="Cancel"
            onClick={handleCancel}
          >
            Cancel
          </Button>,
          <Button
            key="Reject"
            className={clsx(styles.btn, styles.reject)}
            loading={loading}
            onClick={showReject}
          >
            Reject
          </Button>,
          <Button
            key="Confirm"
            className={clsx(styles.btn, styles.confirm)}
            loading={loading}
            onClick={showConfirm}
          >
            Confirm
          </Button>,
        ]

      
      }
      >
        <div className={styles.header}>{item.firstName}</div>
     
        <div className={styles.tabs}>
        <Radio.Group
        value={placement}
        onChange={placementChange}
        className={styles.group}
      >
        
        <Radio.Button
          className={styles.group__item}
          value={
            Tabs.BasicInfo
          }
          // onClick={}
        >
          Basic info
        </Radio.Button>
        {/* <Radio.Button
          className={styles.group__item}
          value={Tabs.Documents}
          // onClick={}
        >
          Document
        </Radio.Button> */}
        <Radio.Button
          className={styles.group__item}
          value={Tabs.Address}
          // onClick={}
        >
          Adress
        </Radio.Button>
      </Radio.Group>
      </div>
        {/* <img src={item.documentSource as string} alt="" /> */}
        <div className={styles.content}>
          <div className={styles.content__left}>
            {placement === Tabs.BasicInfo || placement === Tabs.Documents ?
            <div className={styles.form}>
              <div className={styles.form__item}>
                <p className={styles.form__label}>First name:</p>
                <Input
                  readOnly
                  value={item.firstName as string}
                  className={styles.field}
                  placeholder="First name"
                />
              </div>
              <div className={styles.form__item}>
                <p className={styles.form__label}>Last name:</p>
                <Input
                  readOnly
                  value={item.lastName as string}
                  className={styles.field}
                  placeholder="Last name"
                />
              </div>
              <div className={styles.form__item}>
                <p className={styles.form__label}>Age:</p>
                <Input
                  readOnly
                  value={item.user.age as number}
                  className={styles.field}
                  placeholder="Age"
                />
              </div>
              <div className={styles.form__item}>
                <p className={styles.form__label}>Nationality:</p>
                <div className={styles.block}>
                  <Tag className={styles.tag}>
                  <img style={{width: 18, marginRight: 8}} src={nationality && nationality.code ? flagIcon[nationality.code.toUpperCase() as keyof typeof flagIcon]: ''} alt="" />
                    {nationality ? nationality.text.text : '-'}
                  </Tag>
                </div>
              </div>
              <div className={styles.form__item}>
                <p className={styles.form__label}>Languages:</p>
                <div className={styles.block}>
                  {item.user.languages
                    ? item.user.languages.map((i, id) => {
                      const countryName = langs.find((c) => c.code === i);
                      return(
                        <Tag key={id} className={styles.tag}>
                          <img style={{width: 18, marginRight: 8}} src={countryName && countryName.code ? flagIcon[countryName.code.toUpperCase() as keyof typeof flagIcon]: ''} alt="" />
                          {countryName ? countryName!.text!.text!.toLocaleUpperCase(): null}
                        </Tag>
                      )})
                    : null}
                </div>
              </div>
              <div className={styles.form__item}>
                <p className={styles.form__label}>Weight:</p>
                <div className={styles.block}>
                  <Slider disabled min={40} max={100} marks={marks} defaultValue={item.user && item.user.weight ? item.user.weight : 0} />
                </div>
              </div>
              <div className={styles.form__item}>
                <p className={styles.form__label}>Height:</p>
                <div className={styles.block}>
                  <Slider disabled min={140} max={200} marks={marksHeight} defaultValue={item.user && item.user.height ? item.user.height : 0} />
                </div>
              </div>
            </div>
           :
          <div className={styles.form}>
              <div className={styles.form__item}>
                <p className={styles.form__label}>Address:</p>
                <Input
                  readOnly
                  value={item.address ? item.address: ''}
                  className={styles.field}
                  placeholder="Address"
                />
              </div>
              <div className={styles.form__item}>
                <p className={styles.form__label}>City:</p>
                <Input
                  readOnly
                  value={item.city ? item.city: ''}
                  className={styles.field}
                  placeholder="City"
                />
              </div>
              <div className={styles.form__item}>
                <p className={styles.form__label}>State/province:</p>
                <Input
                  readOnly
                  value={item.province ? item.province: ''}
                  className={styles.field}
                  placeholder="State/province"
                />
              </div>
              <div className={styles.form__item}>
                <p className={styles.form__label}>Postal code:</p>
                <Input
                  readOnly
                  value={item.postalCode ? item.postalCode: ''}
                  className={styles.field}
                  placeholder="Postal code"
                />
              </div>
              <div className={styles.form__item}>
                <p className={styles.form__label}>Country:</p>
                <Input
                  readOnly
                  value={country ? country.text.text: ''}
                  className={styles.field}
                  placeholder="Country"
                />
              </div>

          </div>
        }

          </div>
          <div className={styles.content__right}>
            <Carousel draggable style={{ height: "100%" }}>
              {item.user.media && item.user.media.length
                ? item.user.media.map((i, id) => (
                    <div key={id} className={styles.carousel__item}>
                      <h3 style={contentStyle}>
                        <img className="img-absolute" src={i.alias ? i.alias : ''} />
                      </h3>
                    </div>
                  ))
                : null}
            </Carousel>
          </div>
        </div>
      </Modal>
    </>
  );
};
