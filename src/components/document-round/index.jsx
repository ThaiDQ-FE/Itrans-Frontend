import React from "react";
import "./styles.scss";
import Images from "../../assets/images/images";
import { Tooltip } from "antd";
import { useSelector } from "react-redux";
function DocumentRound() {
    const { listDocumentByRound } = useSelector(
        (state) => state.introduce
    );
    return (
        <div className="ir__introduceWrapper" >
            <div className="ir__title">Tài liệu</div>
            {
                listDocumentByRound.map((value) =>
                    <div>
                      <a href={value.linkResource} target="_blank" className="ir__content"><img style={{width:20 , height:20, marginRight:10}} src={Images.DOCUMENT}/>{value.name}</a>
                    </div>
                )}
        </div>
    );
}
export default DocumentRound;