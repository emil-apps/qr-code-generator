var inputField = document.getElementById("source");
var resultImage = document.getElementById("result");
var ctxMenu = document.getElementById("context-menu");
var dialogParent = document.getElementById("dlg-parent");
var imgSize_slider = document.getElementById("imgSize_slider");

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

    if(!dialogParent.classList.contains("hidden")){
        return;
    }

    ctxMenu.style.left = e.clientX + "px";
    ctxMenu.style.top = e.clientY + "px";
    ctxMenu.style.display = "flex";
});

for(let i = 1;i< document.getElementsByClassName("bg-selection")[0].childNodes.length ;i++)
{
    document.getElementById("img"+i).addEventListener("click", ()=>{
        document.getElementsByClassName("background")[0].style.backgroundImage = "url('"+document.getElementById("img"+i).src+"')";
    });
}

document.getElementById("ctx-image-size").addEventListener("click", ()=>{
   dialogParent.classList.remove("hidden");

   document.getElementById("dlg-img-size").classList.remove("hidden");
   document.getElementById("dlg-about").classList.add("hidden");
   
   ctxMenu.style.display = "none";
});

document.getElementById("ctx-about").addEventListener("click", ()=>{
    dialogParent.classList.remove("hidden");
 
    document.getElementById("dlg-img-size").classList.add("hidden");
    document.getElementById("dlg-about").classList.remove("hidden");
    
    ctxMenu.style.display = "none";
});

document.getElementById("ctx-print").addEventListener("click", ()=>{
    ctxMenu.style.display = "none";

    print();
});

imgSize_slider.value = parseInt(localStorage.getItem("imgSize") || 200);

imgSize_slider.addEventListener("mousemove", ()=>{
    document.getElementById("imgSize_lbl").innerHTML = "<b>Size:</b> "+imgSize_slider.value+"px";

    localStorage.setItem("imgSize", imgSize_slider.value);

    inputField.dispatchEvent(new Event("change"));
});

function closeDialog()
{
    dialogParent.classList.add("hidden");
}