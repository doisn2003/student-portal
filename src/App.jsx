import { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import StudentInfo from "./components/StudentInfo.jsx";
import Profile from "./components/Profile.jsx";
import Grades from "./components/Grades.jsx";

function App() {

  //state quản lý tab đang được chọn
  const [activeTab, setActiveTab] = useState("grades"); //bắt đầu với profile

  //state quản lý thông tin sinh viên, start by myself
  const [student, setStudent] = useState({
    sid: "20215348",
    name: "Sầm Ngọc Đối"
  });

  //Hàm render nội dung tab tương ứng
  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return <Profile />;
      case "grades":
        // Truyền hàm setStudent xuống để Grades có thể cập nhật info box
        return <Grades setStudentInfo={setStudent} />;
      case 'activities':
        return <div>Nội dung Hoạt Động Ngoại Khóa</div>;
      case 'scholarships':
        return <div>Nội dung Học bổng & Khen thưởng</div>;
      default:
        return <Grades setStudentInfo={setStudent} />;
    }
  }

  // Hàm xử lý khi click vào tab
  const handleTabClick = (tabName, e) => {
    e.preventDefault(); // Ngăn thẻ <a> tải lại trang
    setActiveTab(tabName);
  };

  return (
    <>
      <Navbar />

      <div className="web-body">
        {/* StudentInfo nhận state "student" và render */}
        <StudentInfo student={student} /> 

        <div className="card">
          <div className="navbar-list">
            <ul>
              <li style={activeTab === 'profile' ? { backgroundColor: 'rgb(203, 163, 163)' } : {}}
                  onClick={(e) => handleTabClick('profile', e)}>
                <a href="">Hồ sơ & Lý Lịch</a>
              </li>
              <li style={activeTab === 'grades' ? { backgroundColor: 'rgb(203, 163, 163)' } : {}}
                  onClick={(e) => handleTabClick('grades', e)}>
                <a href="">Kết quả học tập</a>
              </li>
              <li style={activeTab === 'activities' ? { backgroundColor: 'rgb(203, 163, 163)' } : {}}
                  onClick={(e) => handleTabClick('activities', e)}>
                <a href="">Hoạt Động Ngoại khóa</a>
              </li>
              <li style={activeTab === 'scholarships' ? { backgroundColor: 'rgb(203, 163, 163)' } : {}}
                  onClick={(e) => handleTabClick('scholarships', e)}>
                <a href="">Học bổng & khen thưởng</a>
              </li>
            </ul>
          </div>

          {/* Render nội dung tab tương ứng */}
          {renderTabContent()}
        </div>
      </div>
    </>
  );
}

export default App;