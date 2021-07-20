export const checkTitle = (title, setTitle) => {
  if (title === "") {
    return setTitle("Tiêu đề không được bỏ trống");
  } else {
    setTitle("");
  }
  if (title.length < 40) {
    return setTitle("Tiêu đề tối thiểu 40 ký tự");
  } else {
    setTitle("");
  }
  if (title.length > 200) {
    return setTitle("Tiêu đề tối đa 200 ký tự");
  } else {
    setTitle("");
  }
};

export const checkSummary = (sum, setSum) => {
  if (sum === "") {
    return setSum("Tóm tắt không được bỏ trống");
  } else {
    setSum("");
  }
  if (sum.length < 40) {
    return setSum("Tóm tắt tối thiểu 40 ký tự");
  } else {
    setSum("");
  }
  if (sum.length > 400) {
    return setSum("Tóm tắt tối đa 400 ký tự");
  } else {
    setSum("");
  }
};

export const checkHash = (hash, setHash) => {
  if (hash.length > 3) {
    return setHash("Chỉ được chọn tối đa 3 hashtag");
  } else {
    setHash("");
  }
};

export const checkThumbnail = (thum, setThum) => {
  if (thum === "") {
    return setThum("Hình mô tả không được bỏ trống");
  } else {
    setThum("");
  }
};
