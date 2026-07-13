const btnFollow = document.querySelector('.btn-follow');
const btnMessage = document.querySelector('.btn-message');

// 1. Logic xử lý nút Follow
let isFollowing = false;

btnFollow.addEventListener('click', function() {
    isFollowing = !isFollowing; // Đảo trạng thái true/false
    
    if (isFollowing) {
        this.textContent = 'Following';
        this.style.backgroundColor = '#6c757d'; // Đổi sang màu xám
    } else {
        this.textContent = 'Follow';
        this.style.backgroundColor = '#007bff'; // Trả về màu xanh cũ
    }
});

// 2. Logic xử lý nút Message
btnMessage.addEventListener('click', function() {
    alert('📧 Tính năng nhắn tin với h.cole đang được phát triển!');
});