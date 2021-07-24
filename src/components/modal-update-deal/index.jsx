import { Button, Tooltip, Modal, Input, DatePicker } from "antd";
import Images from "../../assets/images/images";
import "./styles.scss";
import "antd/dist/antd.css";
import { getLocalStorage } from "../../assets/helper/helper";
function ModalUpdateDeal(props) {
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
        visible={props.openModalUpdate}
        onCancel={props.closeModalUpdate}
      >
        <h3 style={{ textAlign: "center" }}>Thông tin muốn đầu tư</h3>
        <form className="cfr__form" id="cfr__form">
          <div className="cfr__lineOne">
            <div className="cfr__wrapperSTKG">
              <Input
                id="cfr__formSTKG"
                size="large"
                type="number"
                className="cfr__formSTKG"
                addonAfter="Tỷ VNĐ"
                placeholder="Số tiền đầu tư"
                onChange={props.handleChangeValueUpdate}
                defaultValue={
                  props.openModalUpdate === true
                    ? getLocalStorage("listDealByRound").capitalInvestment
                    : ``
                }
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
                defaultValue={
                  props.openModalUpdate === true
                    ? getLocalStorage("listDealByRound").shareRequirement
                    : ``
                }
                onChange={props.handleChangeValueUpdate}
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
              onChange={props.handleChangeValueUpdate}
              defaultValue={
                props.openModalUpdate === true
                  ? getLocalStorage("listDealByRound").description
                  : ``
              }
              name="moTa"
            />
          </div>
          <div className="cfr__submitForm">
            <Button
              onClick={props.handleUpdateDealForm}
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
export default ModalUpdateDeal;