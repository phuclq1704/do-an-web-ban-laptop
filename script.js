const formTimKiem = document.getElementById("tim-kiem");
const TenLapTop = document.getElementById("ten-laptop");
const loaiLapTop = document.getElementById("loai-laptop");
const giaTu = document.getElementById("gia-tu");
const giaDen = document.getElementById("gia-den");
const cacSanPham = document.querySelectorAll("#san-pham article");
const thongBao = document.getElementById("khong-tim-thay");
const trangTruoc = document.getElementById("trang-truoc");
const soTrang = document.getElementById("so-trang");
const trangSau = document.getElementById("trang-sau");
const khungPhanTrang = document.getElementById("phan-trang");
const nutXoaBoLoc=document.getElementById("xoa-bo-loc");
let trangHienTai = 1;
const soSanPhamMoiTrang = 3;
let ketQuaLoc = Array.from(cacSanPham);
formTimKiem.addEventListener("submit", function (suKien) {
    suKien.preventDefault();
    const tuKhoa = TenLapTop.value.trim().toLowerCase();
    const giaTuNhap = giaTu.value;
    const giaDenNhap = giaDen.value;
    const loaiDuocChon = loaiLapTop.value;
    ketQuaLoc = [];
    let timKiem = 0;
    for (const sanPham of cacSanPham) {
        const tieuDe = sanPham.querySelector("h3");
        const tenSanPham = tieuDe.textContent.toLowerCase();
        const giaSanPham = Number(sanPham.dataset.gia);
        let dungKhoangGia = true;
        const loaiSanPham = sanPham.dataset.loai;
        const dungLoai = loaiDuocChon === "" || loaiSanPham === loaiDuocChon;
        if (giaTuNhap !== "" && giaSanPham < Number(giaTuNhap)) {
            dungKhoangGia = false
        }
        if (giaDenNhap !== "" && giaSanPham > Number(giaDenNhap)) {
            dungKhoangGia = false;
        }
        if (tenSanPham.includes(tuKhoa) && dungKhoangGia && dungLoai) {
            sanPham.hidden = false;
            ketQuaLoc.push(sanPham);
            timKiem = timKiem + 1;
        } else {
            sanPham.hidden = true;
        }
    }
    if (timKiem == 0) {
        thongBao.hidden = false;
    } else {
        thongBao.hidden = true;
    }
    trangHienTai = 1;
    hienThiTrang();
    hienDanhSach();
    document.getElementById("san-pham").scrollIntoView();
});
nutXoaBoLoc.addEventListener("click",function(){
    formTimKiem.reset();
    ketQuaLoc=Array.from(cacSanPham);
    trangHienTai=1;
    thongBao.hidden=true;
    hienThiTrang();
});
function hienThiTrang() {
    const viTriBatDau = (trangHienTai - 1) * soSanPhamMoiTrang;
    const viTriKetThuc = viTriBatDau + soSanPhamMoiTrang;
    const tongSoTrang = Math.ceil(ketQuaLoc.length / soSanPhamMoiTrang);
    let viTri = 0;
    for (const sanPham of ketQuaLoc) {
        if (viTri >= viTriBatDau && viTri < viTriKetThuc) {
            sanPham.hidden = false;
        } else {
            sanPham.hidden = true;
        }
        viTri = viTri + 1;
    }
    soTrang.textContent = "Trang " + trangHienTai + " / " + tongSoTrang;
    trangTruoc.disabled = trangHienTai === 1;
    trangSau.disabled = viTriKetThuc >= ketQuaLoc.length;
    khungPhanTrang.hidden = tongSoTrang <= 1;
}
trangTruoc.addEventListener("click", function () {
    trangHienTai = trangHienTai - 1;
    hienThiTrang();
});
trangSau.addEventListener("click", function () {
    trangHienTai = trangHienTai + 1;
    hienThiTrang();
});
hienThiTrang();

// Chuyển giữa danh sách và chi tiết sản phẩm trong cùng trang index.html.
const khuVucSanPham = document.getElementById("san-pham");
const khuVucGioiThieu = document.getElementById("gioi-thieu");
const cacKhuVucChiTiet = document.querySelectorAll(".chi-tiet-san-pham");
const cacLienKetChiTiet = document.querySelectorAll(".xem-chi-tiet");
const cacNutQuayLai = document.querySelectorAll(".quay-lai-danh-sach");

function hienDanhSach() {
    for (const khuVucChiTiet of cacKhuVucChiTiet) {
        khuVucChiTiet.hidden = true;
    }
    khuVucSanPham.hidden = false;
    khuVucGioiThieu.hidden = false;
}

for (const lienKetChiTiet of cacLienKetChiTiet) {
    lienKetChiTiet.addEventListener("click", function (suKien) {
        suKien.preventDefault();
        const idChiTiet = lienKetChiTiet.getAttribute("href").slice(1);
        const khuVucChiTiet = document.getElementById(idChiTiet);
        khuVucSanPham.hidden = true;
        khuVucGioiThieu.hidden = true;
        khuVucChiTiet.hidden = false;
        khuVucChiTiet.scrollIntoView();
    });
}

for (const nutQuayLai of cacNutQuayLai) {
    nutQuayLai.addEventListener("click", function () {
        hienDanhSach();
        khuVucSanPham.scrollIntoView();
    });
}

for (const lienKetMenu of document.querySelectorAll("nav a")) {
    lienKetMenu.addEventListener("click", hienDanhSach);
}
