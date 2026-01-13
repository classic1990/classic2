// lucide icons
lucide.createIcons();

// Sticky header scroll effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('main-header');
    if (window.scrollY > 30) {
        header.classList.add('bg-black/60', 'py-2', 'shadow-2xl');
        header.classList.remove('py-3', 'lg:py-4');
    } else {
        header.classList.remove('bg-black/60', 'py-2', 'shadow-2xl');
        header.classList.add('py-3', 'lg:py-4');
    }
});

// Sample Products
const products = [
    { id: 1, cat: 'hair', name: "Goat Milk Keratin", price: "69", img: "images/a1.jpg", desc: "บำรุงผมล้ำลึกด้วยนมแพะ" },
    { id: 2, cat: 'inner', name: "Woma Balance", price: "590", img: "images/a4.jpg", desc: "สมดุลภายในสำหรับผู้หญิง" },
    { id: 3, cat: 'face', name: "แป้งพัฟเจ้านาง", price: "350", img: "images/a7.jpg", desc: "ผิวเนียนกริบ คุมมัน 24 ชม." },
    { id: 4, cat: 'body', name: "Kojic Acid Dose", price: "150", img: "images/a11.jpg", desc: "เร่งผิวขาวกระจ่างใส" }
];

// เพิ่มสินค้า demo เพิ่ม
for(let i=17; i<=28; i++){
    products.push({ id: i, cat: 'body', name: `Premium Item A${i}`, price: "Call", img: `images/a${i}.jpg`, desc: "Aura Premium Collection" });
}

// Display Products
function displayProducts(cat = 'all'){
    const container = document.getElementById('product-container');
    container.innerHTML = '';
    const filtered = cat === 'all' ? products : products.filter(p => p.cat === cat);
    filtered.forEach((p, idx) => {
        const card = document.createElement('div');
        card.className = "group bg-white/5 backdrop-blur-md rounded-[1.5rem] overflow-hidden border border-white/5 shadow-sm hover:shadow-2xl hover:border-pink-500/20 transition-all duration-500 cursor-pointer animate-up";
        card.style.animationDelay = `${idx * 0.03}s`;
        card.onclick = () => openModal(p);
        card.innerHTML = `
            <div class="relative aspect-[3/4] overflow-hidden">
                <img src="${p.img}" onerror="this.src='https://ui-avatars.com/api/?name=${p.id}&background=1e293b&color=db2777'" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90">
                <div class="absolute top-3 left-3 bg-pink-600/90 backdrop-blur-md px-2 py-0.5 rounded-full text-[8px] font-black text-white uppercase tracking-widest">${p.cat}</div>
            </div>
            <div class="p-4">
                <h4 class="font-bold text-slate-100 text-xs mb-1 group-hover:text-pink-400 transition-colors">${p.name}</h4>
                <div class="flex justify-between items-center">
                    <span class="font-black text-sm text-white">${p.price === 'Call' ? 'สอบถาม' : '฿'+p.price}</span>
                    <div class="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-pink-400 border border-white/5 group-hover:bg-pink-600 group-hover:text-white"><i data-lucide="plus" class="w-3.5 h-3.5"></i></div>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
    lucide.createIcons();
}

// Modal
const modal = document.getElementById('contact-modal');
const modalContent = document.getElementById('modal-content');
function openModal(p){
    document.getElementById('modal-product-name').innerText = p.name;
    document.getElementById('modal-product-price').innerText = p.price === 'Call' ? 'กรุณาสอบถามราคา' : `฿${p.price}`;
    modal.classList.remove('hidden');
    setTimeout(()=>{ modal.classList.add('opacity-100'); modalContent.classList.replace('scale-95','scale-100'); }, 10);
}
function closeModal(){
    modal.classList.remove('opacity-100'); 
    modalContent.classList.replace('scale-100','scale-95');
    setTimeout(()=>modal.classList.add('hidden'),300);
}
document.getElementById('close-modal').onclick = closeModal;

// Category Tabs
document.querySelectorAll('.tab-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
        document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('tab-active'));
        btn.classList.add('tab-active'); displayProducts(btn.dataset.category);
    });
});

// Mobile menu toggle
const menu = document.getElementById('mobile-menu');
const toggleMenu = ()=>{
    if(menu.classList.contains('hidden')){
        menu.classList.remove('hidden');
        setTimeout(()=>menu.classList.add('opacity-100'),10);
    } else {
        menu.classList.remove('opacity-100');
        setTimeout(()=>menu.classList.add('hidden'),500);
    }
};
document.getElementById('menu-btn').onclick = toggleMenu;
document.getElementById('close-menu').onclick = toggleMenu;

displayProducts();
