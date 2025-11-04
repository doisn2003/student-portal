import React from "react";

function Profile() {
    return (
        <div class="content">
          <h3>Thông tin cá nhân</h3>
          <div class="grid">
            <p>Ngày sinh: 01/06/2003</p>
            <p>Nơi sinh: Việt Nam</p>
            <p>Giới tính: Nam</p>
            <p>Số CMND: 002203******34</p>
            <p>Nơi cấp: Việt Nam</p>
            <p>Ngày cấp: 21/03/2021</p>
            <p>Dân tộc: Kinh</p>
            <p>Tôn giáo: Không</p>
          </div>

          <h3>Thông tin gia đình</h3>
          <div class="grid">
            <p>Họ và tên bố: Sầm Xô Viết</p>
            <p>Quốc tịch: Việt Nam</p>
            <p>Nghề nghiệp: Data Analyser</p>
            <p>Họ và tên mẹ: Hoàng Hoa Thư</p>
            <p>Quốc tịch: Việt Nam</p>
            <p>Nghề nghiệp: Tester</p>
          </div>
            <h3>Địa chỉ liên hệ</h3>
            <p>Địa chỉ thường trú: Số 1 - Đại Cồ Việt, phường Bạch Mai, thành phố Hà Nội</p>
            <p>Số điện thoại: 0365409910</p>
            
            <h3>Project</h3>
            <p>Project cá nhân: Website bán hàng, Website quản lý sinh viên</p>
            <p>Project nhóm: Phần mềm di động Đi Chợ Tiện Lợi, Đánh giá rủi ro tín dụng khách hàng</p>
            
            <h3>Kỹ năng</h3>
            <p>Ngôn ngữ lập trình: Python, Java, C, C++ </p>
            <p>Công cụ: Git, Docker, Postman, MySQL, MongoDB </p>
            <p>Khác: Kỹ năng làm việc nhóm, Kỹ năng thuyết trình, Kỹ năng quản lý thời gian</p>
    
        </div>
    );
}
export default Profile;