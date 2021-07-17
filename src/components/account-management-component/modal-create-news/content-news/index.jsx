import React, { useState } from "react";
import { Button, Spin } from "antd";
import "antd/dist/antd.css";
import "./styles.scss";
import { Editor } from "@tinymce/tinymce-react";
import { storage } from "../../../../configs/firebase";
import { keyTinyMCE } from "../../../../configs/tinyMCE";
function ContentNews(props) {
  const [loading, setLoading] = useState(true);
  const handleEditorChange = (e) => {
    console.log(e.target.getContent());
    props.setContent(e.target.getContent());
  };
  return (
    <>
      <div id="loading_gfx" className="modal__contentNewsLoading">
        <Spin className="spin" />
      </div>
      <Editor
        apiKey={keyTinyMCE}
        init={{
          setup: function (ed) {
            ed.on("init", function (args) {
              document.getElementById("loading_gfx").style.display = "none";
              setLoading(false);
            });
          },
          image_dimensions: false,
          image_class_list: [{ title: "Tự động", value: "img-responsive" }],
          width: 980,
          height: 350,
          menubar: false,
          fontsize_formats:
            "8pt 9pt 10pt 11pt 12pt 14pt 18pt 24pt 30pt 36pt 48pt 60pt 72pt 96pt",
          selector: "textarea",
          image_title: true,
          /* enable automatic uploads of images represented by blob or data URIs*/
          automatic_uploads: true,
          plugins: [
            "advlist autolink lists link image",
            "charmap print preview anchor help",
            "searchreplace visualblocks code",
            "insertdatetime media table paste wordcount",
          ],
          toolbar:
            // eslint-disable-next-line no-multi-str
            "undo redo | formatselect | fontsizeselect | bold italic | \
    alignleft aligncenter alignright |forecolor backcolor| link image |\
    bullist numlist outdent indent | help | media",
          toolbar_mode: "floating",
          tinycomments_mode: "embedded",
          tinycomments_author: "Author name",
          // eslint-disable-next-line no-dupe-keys
          image_title: true,
          // eslint-disable-next-line no-dupe-keys
          automatic_uploads: true,
          file_picker_types: "image media",
          file_picker_callback: function (cb, value, meta) {
            var input = document.createElement("input");
            input.setAttribute("type", "file");
            input.setAttribute("accept", "image/*,video/*");
            input.onchange = function () {
              var file = input.files[0];
              var reader = new FileReader();
              console.log(file);
              reader.onload = function (e) {
                const uploadTask = storage.ref(`images/${file.name}`).put(file);
                uploadTask.on(
                  "state_changed",
                  (snapshot) => {},
                  (error) => {
                    console.log(error);
                  },
                  () => {
                    storage
                      .ref("images")
                      .child(file.name)
                      .getDownloadURL()
                      .then((url) => {
                        cb(url, {
                          alt: file.name,
                        });
                      });
                  }
                );
              };
              reader.readAsDataURL(file);
            };
            input.click();
          },
        }}
        onChange={handleEditorChange}
      />
      <div
        className={loading === false ? "button__notDis" : "button__dis"}
        style={{ textAlign: "right", marginTop: 20 }}
      >
        <Button type="primary" size="large" onClick={props.handleCreate}>
          Tạo bài đăng
        </Button>
      </div>
    </>
  );
}

export default ContentNews;
