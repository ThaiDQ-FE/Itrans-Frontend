import React from "react";
import { Button, Input, Tooltip, Form, Space } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import "./styles.scss";
function FormCreateRound(props) {
  const { TextArea } = Input;
  return (
    <Form className="formCreateRound__wrapper" onFinish={props.onSubmit}>
      <div className="formCreateRound__container">
        <div className="formCreateRound__form">
          <Form.List name="form">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <Space
                    key={key}
                    style={{ display: "flex", marginBottom: 8 }}
                    align="baseline"
                  >
                    <Form.Item
                      {...restField}
                      name={[name, "title"]}
                      fieldKey={[fieldKey, "title"]}
                      rules={[
                        {
                          required: true,
                          message: "Tiêu đề không được bỏ trống",
                        },
                        { min: 50, message: "Độ dài tối thiểu là 50 ký tự" },
                        { max: 200, message: "Độ dài tối đa là 200 ký tự" },
                      ]}
                    >
                      <TextArea
                        placeholder="Tiêu đề"
                        style={{ resize: "none" }}
                      />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "content"]}
                      fieldKey={[fieldKey, "content"]}
                      rules={[
                        {
                          required: true,
                          message: "Nội dung không được bỏ trống",
                        },
                        {
                          min: 200,
                          message: "Độ dài tối thiểu là 200 ký tự",
                        },
                        { max: 5000, message: "Độ dài tối đa là 5000 ký tự" },
                      ]}
                    >
                      <TextArea
                        placeholder="Nội dung"
                        style={{ resize: "none" }}
                      />
                    </Form.Item>
                    <MinusCircleOutlined
                      className="formCreateRound__close"
                      onClick={() => remove(name)}
                    />
                  </Space>
                ))}
                <Form.Item className="formCreateRound__themTD">
                  <Button type="dashed" onClick={() => add()} block>
                    Thêm tiêu đề và nội dung
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </div>
      </div>
      <div style={{ textAlign: "right", marginTop: 20 }}>
        <Button
          size="large"
          type="primary"
          htmlType="submit"
          disabled={props.loading === true}
        >
          Tạo vòng gọi vốn
        </Button>
      </div>
    </Form>
  );
}

export default FormCreateRound;
