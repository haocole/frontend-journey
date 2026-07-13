// ================= 1. DỮ LIỆU SẢN PHẨM MẪU =================
const products = [
    { id: 1, name: "iPhone 15 Pro Max", price: 29990000, category: "phone", image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500" },
    { id: 2, name: "Samsung Galaxy S24 Ultra", price: 26990000, category: "phone", image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500" },
    { id: 3, name: "MacBook Air M3", price: 27490000, category: "laptop", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500" },
    { id: 4, name: "Laptop ASUS ROG Strix", price: 32990000, category: "laptop", image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500" },
    { id: 5, name: "Tai nghe AirPods Pro 2", price: 5990000, category: "accessory", image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=500" },
    { id: 6, name: "Chuột Gaming Logitech G502", price: 1250000, category: "accessory", image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500" },
    { id: 7, name: "Bàn phím cơ AKKO", price: 1850000, category: "accessory", image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=500" },
    { id: 8, name: "iPad Pro M4", price: 28990000, category: "tablet", image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500" },
    { id: 9, name: "Dell XPS 13", price: 35000000, category: "laptop", image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500" },
    { id: 10, name: "Sạc dự phòng Anker", price: 650000, category: "accessory", image: "https://images.unsplash.com/photo-1609592424087-4aa7192b027b?w=500" }
];

// Mảng lưu trữ các sản phẩm trong giỏ hàng
let cart = [];

// DOM Elements - Lấy các phần tử từ HTML
const productsContainer = document.getElementById('productsContainer');
const searchInput = document.getElementById('searchInput');
const categoryButtons = document.querySelectorAll('.btn-category');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const cartItemsContainer = document.getElementById('cartItemsContainer');
const cartModal = document.getElementById('cartModal');
const openCartBtn = document.getElementById('openCartBtn');
const closeCartBtn = document.getElementById('closeCartBtn');

// ================= 2. HÀM HIỂN THỊ SẢN PHẨM (RENDER) =================
function renderProducts(productsList) {
    productsContainer.innerHTML = ''; // Xóa danh sách cũ đi

    if (productsList.length === 0) {
        productsContainer.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #888; padding: 40px;">Không tìm thấy sản phẩm nào!</p>`;
        return;
    }

    productsList.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-img">
            <div>
                <h4 class="product-name">${product.name}</h4>
                <p class="product-price">${product.price.toLocaleString('vi-VN')}đ</p>
            </div>
            <button class="btn-add-cart" onclick="addToCart(${product.id})">Thêm vào giỏ</button>
        `;
        productsContainer.appendChild(productCard);
    });
}

// ================= 3. BỘ LỌC & TÌM KIẾM SẢN PHẨM =================
let currentCategory = 'all';

function filterProducts() {
    const searchText = searchInput.value.toLowerCase().trim();

    const filtered = products.filter(product => {
        const matchesCategory = currentCategory === 'all' || product.category === currentCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchText);
        return matchesCategory && matchesSearch;
    });

    renderProducts(filtered);
}

// Lắng nghe sự kiện gõ ô tìm kiếm
searchInput.addEventListener('input', filterProducts);

// Lắng nghe sự kiện bấm nút Danh mục ở Sidebar
categoryButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Đổi class active cho nút được bấm
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        // Lọc theo danh mục mới chọn
        currentCategory = this.getAttribute('data-category');
        filterProducts();
    });
});

// ================= 4. LOGIC GIỎ HÀNG (CART) =================

// Hàm thêm sản phẩm vào giỏ
window.addToCart = function(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity += 1; // Nếu có rồi thì tăng số lượng
    } else {
        cart.push({ ...product, quantity: 1 }); // Nếu chưa có thì thêm mới vào mảng
    }

    updateCart();
};

// Hàm cập nhật giao diện giỏ hàng
function updateCart() {
    // 1. Cập nhật số lượng trên icon Navbar
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    // 2. Cập nhật danh sách món đồ trong hộp Modal Giỏ Hàng
    cartItemsContainer.innerHTML = '';
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `<p style="color: #888; text-align: center; padding: 20px;">Giỏ hàng trống</p>`;
    } else {
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <div>
                    <h4>${item.name}</h4>
                    <small>${item.price.toLocaleString('vi-VN')}đ x ${item.quantity}</small>
                </div>
                <button onclick="removeFromCart(${item.id})" style="background: none; border: none; color: #dc3545; cursor: pointer;">Xóa</button>
            `;
            cartItemsContainer.appendChild(itemElement);
        });
    }

    // 3. Tính tổng tiền
    const totalMoney = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = totalMoney.toLocaleString('vi-VN');
}

// Hàm xóa sản phẩm khỏi giỏ
window.removeFromCart = function(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
};

// Đóng / Mở Modal Giỏ hàng
openCartBtn.addEventListener('click', () => cartModal.classList.add('open'));
closeCartBtn.addEventListener('click', () => cartModal.classList.remove('open'));
// Bấm ra ngoài hộp thoại thì đóng modal
window.addEventListener('click', (e) => {
    if (e.target === cartModal) cartModal.classList.remove('open');
});

// Chạy lần đầu tiên để hiển thị toàn bộ sản phẩm khi tải trang
renderProducts(products);