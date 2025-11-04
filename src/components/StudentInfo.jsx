import React from 'react';

function StudentInfo() {

    //generate email from student id
    const generateEmail = (name, sid) => {
        if(!name || !sid) return "";
        if(sid === '20215348') return 'Doi.sn215348@sis.hust.edu.vn';

        const nomalizedName = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().split(" ");
        const lastName = nomalizedName[nomalizedName.length - 1];
        const middleNameInitial = normalizedName.length > 1 ? normalizedName[0].charAt(0) : '';
        return `${lastName}.${middleNameInitial}${sid.slice(-6)}@sis.hust.edu.vn`;
    };

    return (
        <div className="left-info-box">
            <div id="avatar-box">
                <img src="/avatar.jpg" alt="Ảnh đại diện" />
            </div>
      
            <div id="student-info-box">
                <p><strong>MSSV:</strong> <span id="student-mssv-display">{student.sid}</span></p>
                <p><strong>Họ tên:</strong> <span id="student-name-display">{student.name}</span></p>
                <p><strong>Lớp:</strong> IT1: Khoa học máy tính 07</p>
                <p><strong>Email:</strong> <span id="student-email-display">{generateEmail(student.name, student.sid)}</span></p>
            </div>
        </div>
    );
}
export default StudentInfo;