var inputField = document.getElementById("source");
var resultImage = document.getElementById("result");
var ctxMenu = document.getElementById("context-menu");

inputField.addEventListener("keyup", ()=>{

    if(inputField.value == "")
    {
        resultImage.removeAttribute("src"); // no image
        return;
    }

    let size = localStorage.getItem("imgSize") || 200;
    resultImage.src = "https://api.qrserver.com/v1/create-qr-code/?size="+size+"x"+size+"&data="+inputField.value;
});

// context menu
document.addEventListener("contextmenu", (e)=>{
    e.preventDefault();

    ctxMenu.style.left = e.clientX + "px";
    ctxMenu.style.top = e.clientY + "px";
    ctxMenu.style.display = "flex";
});

for(let i = 1;i< 4;i++)
{
    document.getElementById("img"+i).addEventListener("click", ()=>{
        document.getElementsByClassName("background")[0].style.backgroundImage = "url('"+document.getElementById("img"+i).src+"')";
    });

    document.getElementById("img1").classList.remove("selected");
    document.getElementById("img2").classList.remove("selected");
    document.getElementById("img3").classList.remove("selected");

    document.getElementById("img"+i).classList.add("selected");
}