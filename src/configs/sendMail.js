/**
 * @name: title accept account
 */
export const titleAcceptAccount = () => {
  const title = "ITRAN - Thông báo xét duyệt tài khoản";
  return title;
};
/**
 * @name: title delete article
 */
export const titleDeleteArticle = () => {
  const title = "ITRAN - Thông báo tin tức không hợp lệ";
  return title;
};

/**
 * @name: content accept account
 */
export const contentAcceptAccount = (gmail, type, find) => {
  const content = `<p style='font-size: 24px; font-weight: 700;text-align: center;'>THÔNG BÁO</p><p style='font-size: 18px;font-weight: 600;text-align: center;font-style: italic;'>Phê duyệt tài khoản</p><p style='font-size: 24px; font-weight: 700;text-align: center;'>Quản trị viên ITRANS xin thông báo:</p><p style='font-size: 18px;font-weight: 600;font-style: italic;'>Tài khoản của bạn đã được xét duyệt thành công.</p> <p style='font-size: 18px;font-weight: 600;font-style: italic;'>Hiện tại bạn có thể đăng nhập vào ITRANS thông qua gmail: ${gmail}.</p><p style='font-size: 20px;font-weight: 600; color: red;font-style: italic;margin-bottom: 0px;'>Bạn có thể:</p><ul style='margin: 0px;'><li style='font-size: 16px;font-weight: 600;font-style: italic;'>${type}</li><li style='font-size: 16px;font-weight: 600;font-style: italic;'>Đăng tải tin tức</li><li style='font-size: 16px;font-weight: 600;font-style: italic;'>Tìm kiếm ${find}</li></ul><p style='font-size: 20px;font-weight: 600;margin: 0px;'>Mọi thắc mắc vui lòng liên hệ: itrans2021@gmail.com</p><p style='font-size: 18px;font-weight: 600;margin-top: 0px;'>Một lần nữa ban quản trị ITRANS xin cảm ơn bạn đã gia nhập vào cộng đồng ITRANS</p><i>Đây là thông báo tự động. Vui lòng không reply thư này.</i><p style='font-size: 18px'>Thân.</p>`;
  return content;
};

export const contentDeleteArticle = () => {
  const content =
    "<span>Xin chào,</span><br/><span>Chúng tôi muốn thông báo rằng tin tức của bạn đã bị xóa.<br/><span>Hãy chắc chắn rằng tín tức của bạn phù hợp và tuân thủ tiêu chuẩn cộng đồng.</span><br/><span >Mọi thắc mắc vui lòng liên hệ qua:<span style='color: blue'>itrans2021@gmail.com</span></span><br/><i >Đây là thông báo tự động.Vui lòng không reply mail này.</i>";
  return content;
};
