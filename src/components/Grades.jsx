import React, { useState } from "react";


//Hamf filter 
function checkGradeFilter(score, filter) {
  const scoreNum = parseFloat(score);
  switch (filter) {
    case 'all': return true;
    case 'A': return scoreNum >= 8.5;
    case 'B': return scoreNum >= 7.0;
    case 'C': return scoreNum >= 5.5;
    case 'D': return scoreNum >= 4.0;
    case 'F': return scoreNum < 4.0;
    default: return true;
  }
};

function Grades({ setStudentInfo }) {
    // state các ô input 
    const [sid, setSid] = useState('');
    const [term, setTerm] = useState('all');
    const [gradeFilter, setGradeFilter] = useState('all');

    // state cho dữ liệu kết quả và kết quả
    const [results, setResults] = useState([]);
    const [studentName, setStudentName] = useState('');

    // state cho trạng thái UI
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState('Vui lòng nhập MSSV và nhấn "Tra cứu"');

    // Hàm fetch data từ các file JSON. without cache
    const simpleFetch = async (filePath) => {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`Không thể tải ${filePath}. Status: ${response.status}`);
        }
        return response.json();
    }

    // Hàm xử lý khi nhấn nút Tra cứu
    const handleSearch = async () => {
        setLoading(true);
        setError(null);
        setResults([]);
        setStatus( 'Đang tải dữ liệu...' );

        if(!sid) {
            setError('Vui lòng nhập MSSV.');
            setLoading(false);
            return;
        }

        try {
            //Tải song song 3 file JSON
            const [students, courses, grades] = await Promise.all([
                simpleFetch('/data/sinhvien.json'),
                simpleFetch('/data/hocphan.json'),
                simpleFetch('/data/ketqua.json')
            ]);

            //Tìm sinh viên theo sid
            const student = students.find(s => s.sid === sid);
            if(!student) {
                throw new Error(`Không tìm thấy sinh viên có mã: ${sid}`);
            }
            // *** Cập nhật StudentInfo box bên trái ***
            // Bằng cách gọi hàm setter được truyền từ App.jsx
            setStudentInfo({ name: student.name, sid: student.sid });
            
            // Cập nhật tên sinh viên cho header của bảng
            setStudentName(student.name);

            // Xử lý và lọc kết quả
            const courseMap = new Map(courses.map(c => [c.cid, { name: c.name, credits: c.credits }]));

            const fullResults = grades
                .filter(res => res.sid === sid) // Lọc kết quả của sinh viên này
                .map(res => {
                const courseInfo = courseMap.get(res.cid) || { name: 'Không rõ', credits: '?' };
                return {
                    ...res,
                    name: courseInfo.name,
                    credits: courseInfo.credits
                };
                });

            const filteredResults = fullResults.filter(res => {
                const termMatch = (term === 'all') || (res.term.toString() === term);
                return termMatch && checkGradeFilter(res.score, gradeFilter);
            });

            setResults(filteredResults);
            if (filteredResults.length === 0) {
                setStatus('Không tìm thấy kết quả phù hợp.');
            } else {
                setStatus(`Tìm thấy ${filteredResults.length} kết quả.`);
            }
        } catch (err) {
            console.error("Lỗi khi tra cứu:", err);
            setError(err.message);
            setStatus(`Lỗi: ${err.message}`);
            // Reset thông tin sinh viên nếu lỗi
            setStudentInfo({ name: 'Không tìm thấy', sid: '---' });
            setStudentName('');
        } finally {
            setLoading(false);
        }
    };
    // Hàm xử lý nhấn Enter
    const handleKeyUp = (e) => {
        if (e.key === 'Enter') {
        handleSearch();
        }
    };

    // Render JSX (Giao diện)
  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px', margin: '20px', alignItems: 'flex-end' }}>
        
        {/* Ô nhập MSSV: Dùng "Controlled Component" */}
        <div style={{ gridColumn: '1 / -1' }}>
          <label htmlFor="sid" style={{ display: 'block', marginBottom: '5px', fontWeight: 600, color: '#555' }}>Mã số sinh viên:</label>
          <input 
            type="text" 
            id="sid" 
            placeholder="Nhập SID (ví dụ: 20215348)" 
            style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '5px', fontSize: '14px' }}
            value={sid}
            onChange={(e) => setSid(e.target.value)}
            onKeyUp={handleKeyUp}
            disabled={loading}
          />
        </div>

        {/* Nút chọn Học kỳ */}
        <div>
          <label htmlFor="term" style={{ display: 'block', marginBottom: '5px', fontWeight: 600, color: '#555' }}>Học kỳ:</label>
          <select 
            id="term" 
            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', background: '#fff', fontSize: '14px' }}
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            disabled={loading}
          >
            <option value="all">Tất cả kỳ</option>
            <option value="20241">20241</option>
            <option value="20242">20242</option>
            <option value="20243">20243</option>
          </select>
        </div>

        {/* Nút lọc điểm */}
        <div>
          <label htmlFor="gradeFilter" style={{ display: 'block', marginBottom: '5px', fontWeight: 600, color: '#555' }}>Lọc điểm:</label>
          <select 
            id="gradeFilter" 
            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', background: '#fff', fontSize: '14px' }}
            value={gradeFilter}
            onChange={(e) => setGradeFilter(e.target.value)}
            disabled={loading}
          >
            <option value="all">Tất cả điểm</option>
            <option value="A">= A (8.5+)</option>
            <option value="B">= B (7.0+)</option>
            <option value="C">= C (5.5+)</option>
            <option value="D">= D (4.0+)</option>
          </select>
        </div>

        {/* Nút Tra cứu */}
        <button 
          id="searchButton" 
          style={{ gridColumn: '1 / -1', padding: '12px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px', transition: 'background-color 0.2s' }}
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? 'Đang tra cứu...' : 'Tra cứu'}
        </button>
      </div>
      
      {/* KHỐI TRẠNG THÁI VÀ BẢNG KẾT QUẢ */}
      <div style={{ margin: '0 20px 20px 20px', height: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f4f4f4', padding: '0 15px', border_radius: '5px' }}>
         <div id="student-info-box-header" style={{ fontWeight: 'bold', color: '#0056b3' }}>
           {studentName && `Kết quả học tập của: ${studentName}`}
         </div> 
         <div id="status" style={{ fontStyle: 'italic', color: error ? '#dc3545' : '#888' }}>
           {error || status}
         </div>
      </div>
      
      <div style={{ overflowX: 'auto', padding: '0 20px 20px 20px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#007bff', color: 'white' }}>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #0056b3' }}>Mã học phần</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #0056b3' }}>Tên học phần</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #0056b3' }}>Số tín chỉ</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #0056b3' }}>Học kỳ</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #0056b3' }}>Điểm số</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #0056b3' }}>Điểm chữ</th>
            </tr>
          </thead>
          
          <tbody id="resultsBody">
            {/* Render dựa trên state */}
            {!loading && results.length > 0 && results.map(r => (
              <tr key={r.cid + r.term} style={{ borderBottom: '1px solid #f0f0f0' }}>
                <td style={{ padding: '10px' }}>{r.cid}</td>
                <td style={{ padding: '10px' }}>{r.name}</td>
                <td style={{ padding: '10px' }}>{r.credits}</td>
                <td style={{ padding: '10px' }}>{r.term}</td>
                <td style={{ padding: '10px', fontWeight: 500 }}>{r.score}</td>
                <td style={{ padding: '10px', fontWeight: 500 }}>{r.text_score}</td>
              </tr>
            ))}
            
            {/* Các trạng thái khác */}
            {loading && (
              <tr><td colSpan="6" style={{ textAlign: 'center', padding: '30px', color: '#777' }}>...</td></tr>
            )}
            
            {!loading && results.length === 0 && (
              <tr><td colSpan="6" style={{ textAlign: 'center', padding: '30px', color: '#777' }}>
                {status}
              </td></tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Nút Xóa Cache (tạm thời không cần vì chúng ta chưa cache) */}
    </>
  );
}
export default Grades;