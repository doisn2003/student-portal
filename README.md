# Student Portal

## Cấu trúc dự án
- **public/**: Chứa các tệp JSON dữ liệu như `hocphan.json`, `ketqua.json`, `sinhvien.json`.
- **src/**: Chứa mã nguồn chính của ứng dụng, bao gồm các tệp JavaScript/JSX và CSS.
  - **components/**: Chứa các thành phần giao diện như `Grades.jsx`, `Navbar.jsx`, `Profile.jsx`, `StudentInfo.jsx`.

## Các components
- `Navbar.jsx`: Hiển thị thanh điều hướng.
- `Profile.jsx`: Hiển thị thông tin cá nhân sinh viên.
- `Grades.jsx`: Hiển thị bảng điểm.
- `StudentInfo.jsx`: Thẻ avatar và thông tin sinh viên (bên trái).

## Quản lý state
- Component `App.jsx` quản lý state chính của ứng dụng
# Bao gồm:
- Quản lý student state để truyền cho StudentInfo. Giúp cập nhật thông tin sinh viên tương ứng
Khi tra cứu mã số sinh viên khác, đồng bộ cả thông tin ở thẻ avatar bên trái nếu tìm thấy
- Quản lý activeTab state để quyết định hiển thị <Profile /> (Bài tập tuần 05) hay <Grades /> (Bài tập tuần 6).
- Truyền hàm setStudent xuống component <Grades /> để nó có thể cập nhật thông tin sinh viên ( aka. "lifting state up").

## Mã hóa bất đồng bộ
- Sử dụng `fetch` để giả lập lấy dữ liệu từ các tệp JSON trong thư mục `public/data`.

## Các hook được sử dụng
- `useState`: Quản lý state cục bộ trong các component.
- `useEffect`: Chưa được sử dụng trong dự án này
# Lý do em không sử dụng `useEffect`
- Logic của em là "Khi người dùng click nút Tra cứu, thì mới gọi API", do đó em code hàm handleSearch() để xử lý sự kiện onClick
- useEffect là hook "tác dụng phụ" liên quan đến vòng đời components. Chẳng hạn: "khi được render lần đầu, hãy tự động tải dữ liệu".
-> Trong logic của em, em chưa muốn tải dữ liệu khi components Grades được render, mà em muốn tải dữ liệu khi ấn nút "Tra cứu". Do đó useEffect chưa phù hợp với luồng logic này.


