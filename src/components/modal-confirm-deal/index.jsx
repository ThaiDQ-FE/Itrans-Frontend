import { Button, Tooltip, Modal, Input, DatePicker } from "antd";
import Images from "../../assets/images/images";
import "./styles.scss";
import "antd/dist/antd.css";
function ModalConfirmDeal(props) {
  const { TextArea } = Input;
  return (
    <>
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
        <h3 style={{ textAlign: "center" }}>Xác nhận lại deal</h3>
        <form className="cfr__form" id="cfr__form">
          <div className="cfr__lineOne">
            <div className="cfr__wrapperSTKG">
              <Input
                id="cfr__formSTKG"
                size="large"
                type="number"
                className="cfr__formSTKG"
                addonAfter=".000.000 VNĐ"
                placeholder="Số tiền đầu tư"
                onChange={props.handleChangeValue}
                name="soTienDauTu"
              />
            </div>
            <div className="cfr__wrapperPTCP">
              <Input
                size="large"
                type="number"
                className="cfr__formPTCP"
                addonAfter="%"
                placeholder="Phần trăm cổ phần"
                onChange={props.handleChangeValue}
                name="phanTramCoPhan"
              />
            </div>
          </div>
          <div className="cfr__lineArea">
            <TextArea
              className="cfr__formMT"
              size="large"
              rows={5}
              placeholder="Mô tả"
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
    </>
  );
}
export default ModalConfirmDeal;