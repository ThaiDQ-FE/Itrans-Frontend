import React, { useEffect, useState } from "react";
import "./styles.scss";
import "antd/dist/antd.css";
import { Input, Select, Tooltip } from "antd";
import Messages from "../../../assets/message/text";
import Images from "../../../assets/images/images";
import { useDispatch, useSelector } from "react-redux";
import {
  getListIndustry,
  getListProvince,
  getListRegion,
  getListStage,
} from "../../../store/action/register.action";
import { storage } from "../../../configs/firebase";
function FormInvestor(props) {
  const { Option } = Select;
  const { TextArea } = Input;
  const dispatch = useDispatch();
  const { listProvince, listStage, listIndustry, listRegion } = useSelector(
    (state) => state.register
  );
  const [information, setInformation] = useState({
    name: "",
    industry: "",
    stage: "",
    foundedYear: "",
    numberOfEmployee: "",
    idProvince: "",
    link: "",
    description: "",
    region: "",
    province: "",
    min: "",
    max: "",
  });
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const handleChangeImage = (e) => {
    setImage(e.target.files[0]);
    const image = e.target.files[0];
    if (image != undefined) {
      const upload = storage.ref(`images/${image.name}`).put(image);
      upload.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              setUrl(url);
              localStorage.setItem("image", JSON.stringify(url));
            });
        }
      );
    } else {
      setUrl(Images.NO_IMAGE);
    }
  };
  // const getBase64 = (file) => {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.onload = () => resolve(reader.result);
  //     reader.onerror = error => reject(error);
  //     reader.readAsDataURL(file);
  //   });
  // }
  let check = 0;
  const regex = new RegExp("^[0-9]*$");
  const validate = (values) => {
    let errors = {};
    if (!values.name) {
      errors.name = "Tên nhà/quỹ đầu tư không được để trống";
    } else {
      errors.name = "";
      check++;
    }
    if (!values.foundedYear) {
      errors.foundedYear = "Năm thành lập không được để trống";
    } else if (values.foundedYear < 1900 || values.foundedYear > 2021) {
      errors.foundedYear = "Năm thành lập từ 1900 - 2021";
    } else if (!regex.test(values.foundedYear)) {
      errors.foundedYear = "Năm thành lập phải là số";
    } else {
      errors.foundedYear = "";
      check++;
    }
    if (!values.numberOfEmployee) {
      errors.numberOfEmployee = "Số lượng thành viên không được để trống";
    } else if (values.numberOfEmployee < 0) {
      errors.numberOfEmployee = "Số lượng thành viên phải lớn hơn 0";
    } else if (!regex.test(values.numberOfEmployee)) {
      errors.numberOfEmployee = "Số lượng thành viên phải là số";
    } else {
      errors.numberOfEmployee = "";
      check++;
    }
    if (!values.link) {
      errors.link = "Link web không được để trống";
    } else if (!validateEmail(values.link)) {
      errors.link = "Link web không đúng";
    } else {
      errors.link = "";
      check++;
    }
    if (!values.idProvince) {
      errors.idProvince = "Trụ sở chính không được để trống";
    } else {
      errors.idProvince = "";
      check++;
    }
    if (!values.stage) {
      errors.stage = "Giai đoạn muốn đầu tư không được để trống";
    } else {
      errors.stage = "";
      check++;
    }
    if (!values.industry) {
      errors.industry = "Linh vực kinh doanh muốn đầu tư không được để trống";
    } else {
      errors.industry = "";
      check++;
    }
    if (!values.province) {
      errors.province = "Khu vực đầu tư không được để trống";
    } else {
      errors.province = "";
      check++;
    }
    if (!values.region) {
      errors.region = "Vùng miền đầu tư không được để trống";
    } else {
      errors.region = "";
      check++;
    }
    if (!values.min) {
      errors.min = "Số tiền nhỏ nhất có thể đầu tư không được để trống";
    } else if (values.min >= values.max) {
      errors.min = "Số tiền nhỏ nhất phải nhỏ hơn số tiền lớn nhất";
    } else if (values.min < 0) {
      errors.min = "Số tiền nhỏ nhất phải lớn hơn hoặc bằng 0";
    } else if (!regex.test(values.min)) {
      errors.min = "Số tiền nhỏ nhất phải là số";
    } else {
      errors.min = "";
      check++;
    }
    if (!values.max) {
      errors.max = "Số tiền lớn nhất có thể đầu tư không được để trống";
    } else if (values.max <= 0) {
      errors.max = "Số tiền lớn nhất phải lớn hơn 0";
    } else if (!regex.test(values.max)) {
      errors.max = "Số tiền lớn nhất phải là số";
    } else {
      errors.max = "";
      check++;
    }
    return errors;
  };
  const validateColor = (values) => {
    let errors = {};
    if (!values.name) {
      errors.name = "1px solid red";
    } else {
      errors.name = "";
    }
    if (!values.foundedYear) {
      errors.foundedYear = "1px solid red";
    } else if (values.foundedYear < 1900 || values.foundedYear > 2021) {
      errors.foundedYear = "1px solid red";
    } else if (!regex.test(values.foundedYear)) {
      errors.foundedYear = "1px solid red";
    } else {
      errors.foundedYear = "";
    }
    if (!values.numberOfEmployee) {
      errors.numberOfEmployee = "1px solid red";
    } else if (values.numberOfEmployee < 0) {
      errors.numberOfEmployee = "1px solid red";
    } else if (!regex.test(values.numberOfEmployee)) {
      errors.numberOfEmployee = "1px solid red";
    } else {
      errors.numberOfEmployee = "";
    }
    if (!values.link) {
      errors.link = "1px solid red";
    } else if (!validateEmail(values.link)) {
      errors.link = "1px solid red";
    } else {
      errors.link = "";
    }
    if (!values.idProvince) {
      errors.idProvince = "1px solid red";
    } else {
      errors.idProvince = "";
    }
    if (!values.stage) {
      errors.stage = "1px solid red";
    } else {
      errors.stage = "";
    }
    if (!values.industry) {
      errors.industry = "1px solid red";
    } else {
      errors.industry = "";
    }
    if (!values.province) {
      errors.province = "1px solid red";
    } else {
      errors.province = "";
    }
    if (!values.region) {
      errors.region = "1px solid red";
    } else {
      errors.region = "";
    }
    if (!values.min) {
      errors.min = "1px solid red";
    } else if (values.min >= values.max) {
      errors.min = "1px solid red";
    } else if (values.min < 0) {
      errors.min = "1px solid red";
    } else if (!regex.test(values.min)) {
      errors.min = "1px solid red";
    } else {
      errors.min = "";
    }
    if (!values.max) {
      errors.max = "1px solid red";
    } else if (values.max <= 0) {
      errors.max = "1px solid red";
    } else if (!regex.test(values.max)) {
      errors.max = "1px solid red";
    } else {
      errors.max = "";
    }
    return errors;
  };
  const [errors, setErrors] = useState({
    name: "",
    industry: "",
    stage: "",
    foundedYear: "",
    numberOfEmployee: "",
    idProvince: "",
    link: "",
    description: "",
    region: "",
    province: "",
    min: "",
    max: "",
  });
  const [color, setColor] = useState({
    name: "",
    industry: "",
    stage: "",
    foundedYear: "",
    numberOfEmployee: "",
    idProvince: "",
    link: "",
    description: "",
    region: "",
    province: "",
    min: "",
    max: "",
  });
  function validateEmail(email) {
    var re = /\S+\.\S+/;
    return re.test(email);
  }

  const handleNext = () => {
    localStorage.setItem("Form2Investor", JSON.stringify(information));
    setErrors(validate(information));
    setColor(validateColor(information));
    if (check == 11) {
      props.handleNext();
    }
  };
  const handleChangeInput = (event) => {
    const { value, name } = event.target;
    setInformation({
      ...information,
      [name]: value,
    });
  };
  const handleChange = (value, action) => {
    if (!action.length) {
      setInformation({
        ...information,
        [action.name]: value,
      });
    } else {
      setInformation({
        ...information,
        [action[0].name]: value,
      });
    }
  };
  const renderListProvince = () => {
    return listProvince.map((item, index) => {
      return (
        <Option name="idProvince" value={item.idProvince} key={index}>
          {item.name}
        </Option>
      );
    });
  };
  const renderListProvinceOr = () => {
    return listProvince.map((item, index) => {
      return (
        <Option name="province" value={item.idProvince} key={index}>
          {item.name}
        </Option>
      );
    });
  };
  const renderListStage = () => {
    return listStage.map((item, index) => {
      return (
        <Option name="stage" value={item.idStage} key={index}>
          {item.name}
        </Option>
      );
    });
  };
  const renderListRegion = () => {
    return listRegion.map((item, index) => {
      return (
        <Option name="region" value={item.idRegion} key={index}>
          {item.name}
        </Option>
      );
    });
  };
  const renderListIndustry = () => {
    return listIndustry.map((item, index) => {
      return (
        <Option
          name="industry"
          value={item.idIndustry}
          key={index}
          disabled={item.active === false}
        >
          {item.name}
        </Option>
      );
    });
  };
  useEffect(() => {
    dispatch(getListProvince());
    dispatch(getListIndustry());
    dispatch(getListStage());
    dispatch(getListRegion());
    // localStorage.setItem("Form2Investor", JSON.stringify(information));
  }, []);
  return (
    <div className="fi__wrapper">
      <div className="fi__container">
        <h3>{Messages.INVESTOR_INFORMATION}</h3>
        <form className="fi__form">
          <div className="fi__lineOne">
            <div className="fi__tenNhaQuyDauTu">
              <small>Tên nhà/quỹ đầu tư</small>
              <Tooltip title={errors.name} placement="topRight" color="red">
                <Input
                  value={information.name}
                  style={{ border: color.name }}
                  name="name"
                  size="large"
                  onChange={handleChangeInput}
                />
              </Tooltip>
            </div>
            <div className="fi__namThanhLap">
              <small>Năm thành lập</small>
              <Tooltip
                title={errors.foundedYear}
                placement="topRight"
                color="red"
              >
                <Input
                  type="text"
                  maxLength="9"
                  style={{ border: color.foundedYear }}
                  name="foundedYear"
                  size="large"
                  onChange={handleChangeInput}
                />
              </Tooltip>
            </div>
            <div className="fi__soLuongThanhVien">
              <small>Số thành viên</small>
              <Tooltip
                title={errors.numberOfEmployee}
                placement="topRight"
                color="red"
              >
                <Input
                  type="text"
                  maxLength="9"
                  style={{ border: color.numberOfEmployee }}
                  name="numberOfEmployee"
                  size="large"
                  onChange={handleChangeInput}
                />
              </Tooltip>
            </div>
          </div>
          <div className="fi__lineTwo">
            <div className="fi__linkKhuUl">
              <div className="fi__linkWebsite">
                <small>Link website</small>
                <Tooltip title={errors.link} placement="topRight" color="red">
                  <Input
                    style={{ border: color.link }}
                    name="link"
                    size="large"
                    onChange={handleChangeInput}
                  />
                </Tooltip>
              </div>
              <div className="fi__khuUl">
                <div className="fi__khuVucHoatDong">
                  <small>Trụ sở chính</small>
                  <Tooltip
                    title={errors.idProvince}
                    placement="topRight"
                    color="red"
                  >
                    <Select
                      style={{ border: color.idProvince }}
                      name="idProvince"
                      onChange={handleChange}
                      size="large"
                    >
                      {renderListProvince()}
                    </Select>
                  </Tooltip>
                </div>
              </div>
            </div>
            <div className="fi__logo">
              <img
                src={url || Images.NO_IMAGE}
                alt=""
                className="fi__userLogo"
              />
              <input
                className="fi__file"
                type="file"
                id="file"
                onChange={handleChangeImage}
              />
              <label htmlFor="file" className="fi__span">
                <img src={Images.CAMERA} alt="camera" className="fi__camera" />
              </label>
            </div>
          </div>
          {/* <div className="fi__lineThree">
            <small>Mô tả về nhà/quỹ đầu tư</small>
            <Tooltip title={errors.description} placement='topRight' color='red' >
              <TextArea
                style={{ 'border': color.description }}
                name='description'
                rows={2}
                size="large"
                onChange={handleChangeInput}
              />
            </Tooltip>
          </div> */}
          <p className="fi__word">Thông tin về đầu tư</p>
          <div className="fi__lineFour">
            <div className="fi__giaiDoanMuonDauTu">
              <small>Giai đoạn muốn đầu tư</small>
              <Tooltip title={errors.stage} placement="topRight" color="red">
                <Select
                  style={{ border: color.stage }}
                  name="stage"
                  mode="multiple"
                  allowClear
                  onChange={handleChange}
                  size="large"
                >
                  {renderListStage()}
                </Select>
              </Tooltip>
            </div>
            <div className="fi__linhVucKinhDoanhMuonDauTu">
              <small>Lĩnh vực kinh doanh muốn đầu tư</small>
              <Tooltip title={errors.industry} placement="topRight" color="red">
                <Select
                  style={{ border: color.industry }}
                  name="industry"
                  mode="multiple"
                  allowClear
                  onChange={handleChange}
                  size="large"
                >
                  {renderListIndustry()}
                </Select>
              </Tooltip>
            </div>
          </div>
          <div className="fi__lineFive">
            <div className="fi__khuVucDauTu">
              <small>Khu vực đầu tư</small>
              <Tooltip title={errors.province} placement="topRight" color="red">
                <Select
                  style={{ border: color.province }}
                  name="province"
                  mode="multiple"
                  allowClear
                  onChange={handleChange}
                  size="large"
                >
                  {renderListProvinceOr()}
                </Select>
              </Tooltip>
            </div>
            <div className="fi__ul">
              <small>Vùng miền đầu tư</small>
              <Tooltip title={errors.region} placement="topRight" color="red">
                <Select
                  style={{ border: color.region }}
                  name="region"
                  mode="multiple"
                  allowClear
                  onChange={handleChange}
                  size="large"
                >
                  {renderListRegion()}
                </Select>
              </Tooltip>
            </div>
          </div>
          <div className="fi__lineSix">
            <div className="fi_min">
              <small>Số tiền nhỏ nhất có thể đầu tư</small>
              <Tooltip title={errors.min} placement="topRight" color="red">
                <Input
                  type="text"
                  maxLength="9"
                  addonAfter="Tỷ VNĐ"
                  style={{ border: color.min }}
                  name="min"
                  size="large"
                  onChange={handleChangeInput}
                />
              </Tooltip>
            </div>
            <div className="fi_max">
              <small>Số tiền lớn nhất có thể đầu tư</small>
              <Tooltip title={errors.max} placement="topRight" color="red">
                <Input
                  type="text"
                  maxLength="9"
                  addonAfter="Tỷ VNĐ"
                  style={{ border: color.max }}
                  name="max"
                  size="large"
                  onChange={handleChangeInput}
                />
              </Tooltip>
            </div>
          </div>
        </form>
        <div className="fi__button">
          <div className="fi__buttonBack" onClick={props.handleBack}>
            <img src={Images.RIGHT_ARROWS} alt="back" />
            <span>Quay lại</span>
          </div>
          <div className="fi__buttonNext" onClick={handleNext}>
            <img src={Images.RIGHT_ARROWS} alt="next" />
            <span>Tiếp theo</span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default FormInvestor;