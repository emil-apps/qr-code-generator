var inputField = document.getElementById("source");
var resultImage = document.getElementById("result");
var ctxMenu = document.getElementById("context-menu");
var dialogParent = document.getElementById("dlg-parent");
var imgSize_slider = document.getElementById("imgSize_slider");

inputField.addEventListener("keyup", ()=>{ generateImage() });

// context menu
document.addEventListener("click", ()=>{ ctxMenu.style.display = "none" });
document.addEventListener("contextmenu", (e)=>{
    e.preventDefault();

    if(!dialogParent.classList.contains("hidden")){
        return;
    }

    ctxMenu.style.left = e.clientX + "px";
    ctxMenu.style.top = e.clientY + "px";
    ctxMenu.style.display = "flex";
});

document.getElementById("ctx-image-size").addEventListener("click", ()=>{
   dialogParent.classList.remove("hidden");

   document.getElementById("dlg-img-size").classList.remove("hidden");
   document.getElementById("dlg-about").classList.add("hidden");
});

document.getElementById("ctx-about").addEventListener("click", ()=>{
    dialogParent.classList.remove("hidden");
 
    document.getElementById("dlg-img-size").classList.add("hidden");
    document.getElementById("dlg-about").classList.remove("hidden");
});

document.getElementById("ctx-print").addEventListener("click", ()=>{ print() });

imgSize_slider.value = parseInt(localStorage.getItem("imgSize") || 200);

document.getElementById("imgSize_lbl").innerHTML = "<b>Size:</b> "+imgSize_slider.value+"px";

imgSize_slider.addEventListener("input", ()=>{
    document.getElementById("imgSize_lbl").innerHTML = "<b>Size:</b> "+imgSize_slider.value+"px";

    localStorage.setItem("imgSize", imgSize_slider.value);

    generateImage()
});

function changeImg(url)
{
    document.getElementsByClassName("background")[0].style.backgroundImage = "url('"+url.src+"')";
}

function closeDialog()
{
    dialogParent.classList.add("hidden");
}

function generateImage()
{
    if(inputField.value == "")
    {
        document.getElementById("ctx-print").disabled = true;
        resultImage.removeAttribute("src"); // no image
        return;
    }
    
    document.getElementById("ctx-print").disabled = false;
    
    let size = localStorage.getItem("imgSize") || 200;
    resultImage.src = "https://api.qrserver.com/v1/create-qr-code/?size="+size+"x"+size+"&data="+inputField.value;
}