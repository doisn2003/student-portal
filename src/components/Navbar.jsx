// src/components/Navbar.jsx
import React from 'react';

function Navbar() {
  return (
    <div id="navbar">
      {/* Logo and title */}
      <div id="navbar-top">
        <div className="box-logo" id="left-logo">
          <div id="title">ĐẠI HỌC BÁCH KHOA HÀ NỘI</div>
          <div id="ces">Cổng Thông Tin Sinh Viên</div>
          <div id="logo">
            {/* Ảnh trong public/ gọi bằng đường dẫn tuyệt đối */}
            <img src="/logo.png" alt="Logo Đại học Bách Khoa Hà Nội" />
          </div>
        </div>
        <div className="box-logo" id="right-logo">
          <div id="ces-ctsv">XIN CHÀO BẠN!</div>
          <div id="ctsv-logo">
            <img src="/ctsv.png" alt="Logo CTSV" />
          </div>
        </div>
      </div>

      {/* List of page */}
      <nav className="navbar-list">
        <ul>
          <li><a href="#">Trang chủ</a></li>
            <li><a href="#">Ngoại Khóa</a></li>
            <li><a href="#">Hướng Nghiệp</a></li>
            <li><a href="#">Học Bổng</a></li>
            <li><a href="#">Chấm Điểm</a></li>
            <li><a href="#">Hành Chính</a></li>
            <li><a href="#">Q&A</a></li>
            <li><a href="#">Hồ Sơ</a></li>
            <li><a href="#">Nhập Học</a></li>
        </ul>
      </nav>
      <div id="navbar-current-page">Kết Quả Học Tập</div>
    </div>
  );
}

export default Navbar;