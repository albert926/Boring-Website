let isChinese = window.location.pathname.includes("/chinese/");
let toggle = document.getElementById("languageToggle");
toggle.checked = isChinese;
if (isChinese) {
    document.querySelector(".slider").style.backgroundColor = "#d32f2f";
}

toggle.addEventListener("change", function() {
    if (this.checked) {
        window.location.href = "/chinese/";
    } else {
        window.location.href = "/";
    }
});