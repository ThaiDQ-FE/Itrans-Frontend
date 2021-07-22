import React from "react";
import { Button, Modal, DatePicker, Input, Tooltip } from "antd";
import "antd/dist/antd.css";
import "./styles.scss";
import { getLocalStorage } from "../../assets/helper/helper";
import moment from "moment";
function ModalUpdateRound(props) {
    const { TextArea } = Input;
    return (
        <Modal
            className="modal__update__round"
            visible={props.urModal}
            maskClosable={true}
            footer={null}
            closable={true}
            destroyOnClose={true}
            onCancel={props.closeModal}
        >
            <h3 style={{ textAlign: "center" }}>
                Chỉnh sửa vòng gọi vốn
            </h3>
            <form className="ur__form">
                <div className="ur__line1">
                    <div className="ur__title">
                        <small>Số tiền kêu gọi</small>
                        <Tooltip title={props.titleError} color="red" placement="topRight">

                            <Input
                                type="text"
                                  defaultValue={getLocalStorage("fundingAmount")}
                                onChange={props.handleChangeValue}
                                name="fundingAmount"
                                addonAfter="tỷ"
                            />
                        </Tooltip>
                    </div>
                    <div className="ur__date">
                        <small>Ngày bắt đầu</small>
                        <Tooltip>
                            <DatePicker
                                dropdownClassName="ur__dropdown"
                                defaultValue={moment(
                                    getLocalStorage("dateStart"),
                                    props.dateFormat
                                )}
                                allowClear={false}
                                onChange={props.setDateStart}
                                format={props.dateFormat}
                            />
                        </Tooltip>
                    </div>
                </div>
                <div className="ur__line1">
                    <div className="ur__title">
                        <small>Phần trăm cổ phần</small>
                        <Tooltip>

                            <Input
                                type="text"
                                  defaultValue={getLocalStorage("shareRequirement")}
                                onChange={props.handleChangeValue}
                                name="shareRequirement"
                                addonAfter="%"
                            />
                        </Tooltip>
                    </div>
                    <div className="ur__date">
                        <small>Ngày kết thúc</small>
                        <Tooltip>
                            <DatePicker
                                dropdownClassName="ur__dropdown"
                                defaultValue={moment(
                                    getLocalStorage("dateEnd"),
                                    props.dateFormat
                                )}
                                allowClear={false}
                                onChange={props.setDateEnd}
                                format={props.dateFormat}
                            />
                        </Tooltip>
                    </div>
                </div>
                <div className="ur__content">
                    <small>Tổng quan</small>
                    <TextArea
                        style={{ resize: "none" }}
                        rows={5}
                        onChange={props.handleChangeValue}
                        name="contentSumary"
                        defaultValue={getLocalStorage("contentSumary")}
                    />
                </div>
                <div className="ur__button">
                    <Button type="primary" onClick={props.handleUpdate}>
                        Cập nhật
                    </Button>
                </div>
            </form>
        </Modal>
    );
}

export default ModalUpdateRound;
