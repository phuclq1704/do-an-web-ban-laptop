const formTimKiem=document.getElementById("tim-kiem");
const TenLapTop= document.getElementById("ten-laptop");
const cacSanPham= document.querySelectorAll("#san-pham article");
formTimKiem.addEventListener("submit", function (suKien) {
    suKien.preventDefault();
    const tuKhoa=TenLapTop.value.trim().toLowerCase();
    for(const sanPham of cacSanPham){
        const tieuDe=sanPham.querySelector("h3");
        const tenSanPham=tieuDe.textContent.toLowerCase();
        if(tenSanPham.includes(tuKhoa)){
            sanPham.hidden=false;
        }else{
            sanPham.hidden=true;
        }
    }
});
