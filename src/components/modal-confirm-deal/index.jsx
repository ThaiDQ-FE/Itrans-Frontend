import { Button, Tooltip, Modal, Input, DatePicker, Popover } from "antd";
import Images from "../../assets/images/images";
import "./styles.scss";
import "antd/dist/antd.css";
function ModalConfirmDeal(props) {
  const { TextArea } = Input;
  const content = (
    <div>
      <span>Hệ thống sẽ tự làm tròn số.</span>
      <br />
      <span>Ví dụ:</span>
      <br />
      <span>15.156 {"-->"} 15.16</span>
      <br />
      <span>0.001 {"-->"} 0.00</span>
      <br />
      <span>15. {"-->"} 15</span>
    </div>
  );
  return (
    <Modal
      className="cfr__modal"
      title="Basic Modal"
      maskClosable={true}
      footer={null}
      closable={true}
      destroyOnClose={true}
      visible={props.openModal}
      onCancel={props.closeModal}
    >
      <h3 style={{ textAlign: "center" }}>Thông tin muốn đầu tư</h3>
      <form className="cfr__form" id="cfr__form">
        <div className="cfr__lineOne">
          <div className="cfr__wrapperSTKG">
            <label className="label__fontWeight">
              Số tiền đầu tư{" "}
              <Popover content={content} title={null}>
                {" "}
                (i)
              </Popover>
            </label>
            <Input
              id="cfr__formSTKG"
              size="large"
              type="number"
              className="cfr__formSTKG input-right-alight"
              addonAfter="Tỷ VNĐ"
              onChange={props.handleChangeValue}
              name="soTienDauTu"
            />
          </div>
          <div className="cfr__wrapperPTCP">
            <label className="label__fontWeight">
              Phần trăm cổ phần{" "}
              <Popover content={content} title={null}>
                {" "}
                (i)
              </Popover>
            </label>
            <Input
              size="large"
              type="number"
              className="cfr__formPTCP input-right-alight"
              addonAfter="%"
              onChange={props.handleChangeValue}
              name="phanTramCoPhan"
            />
          </div>
        </div>
        <div className="cfr__lineArea">
          <label className="label__fontWeight">Mô tả</label>
          <TextArea
            className="cfr__formMT"
            size="large"
            rows={5}
            onChange={props.handleChangeValue}
            name="moTa"
          />
        </div>
        <div className="cfr__submitForm">
          <Button
            onClick={props.handleCreateDealForm}
            className="cfr__sfTao"
            type="primary"
            size="large"
          >
            Xác nhận
          </Button>
        </div>
      </form>
    </Modal>
  );
}
export default ModalConfirmDeal;
