const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const togglePassword = document.getElementById('togglePassword');

// Tài khoản mẫu thử nghiệm
const adminEmail = "admin@gmail.com";
const adminPassword = "123";

// 1. Tính năng Ẩn / Hiện mật khẩu khi bấm vào con mắt
togglePassword.addEventListener('click', function() {
    // Kiểm tra type hiện tại của ô password
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    
    // Đổi icon hiển thị
    this.textContent = type === 'password' ? '👁️' : '🙈';
});

// 2. Xử lý sự kiện khi Submit Form Đăng Nhập
loginForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Chặn reload trang

    // Làm sạch các lỗi cũ trước khi kiểm tra lượt mới
    emailError.style.display = 'none';
    passwordError.style.display = 'none';
    emailInput.style.borderColor = '#ccc';
    passwordInput.style.borderColor = '#ccc';

    let hasError = false;
    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value.trim();

    // Kiểm tra ô Email
    if (emailValue === "") {
        emailError.textContent = "Email không được để trống!";
        emailError.style.display = 'block';
        emailInput.style.borderColor = '#dc3545';
        hasError = true;
    }

    // Kiểm tra ô Mật khẩu
    if (passwordValue === "") {
        passwordError.textContent = "Mật khẩu không được để trống!";
        passwordError.style.display = 'block';
        passwordInput.style.borderColor = '#dc3545';
        hasError = true;
    }

    // Nếu không có lỗi bỏ trống, tiến hành kiểm tra tài khoản đúng/sai
    if (!hasError) {
        if (emailValue === adminEmail && passwordValue === adminPassword) {
            alert("🎉 Đăng nhập thành công!");
        } else {
            // Hiển thị lỗi chung lên ô password nếu sai tài khoản
            passwordError.textContent = "Sai thông tin Email hoặc Mật khẩu!";
            passwordError.style.display = 'block';
            passwordInput.style.borderColor = '#dc3545';
            emailInput.style.borderColor = '#dc3545';
        }
    }
});