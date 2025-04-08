var inputBox = document.getElementById("inputBox");
var outputBox = document.getElementById("outputBox");
var scaleChanger = document.getElementById("scale-changer");
var colorChooser = document.getElementById("inputColor");
var btnDownload = document.getElementById("download-btn");

scaleChanger.addEventListener("change", ()=>{
    inputBox.dispatchEvent(new Event("keyup"));
});
colorChooser.addEventListener("input", ()=>{
    inputBox.dispatchEvent(new Event("keyup"));
});

inputBox.addEventListener("keyup", ()=>{
    outputBox.innerHTML = "";

    if(inputBox.value == "") return;

    let size = scaleChanger.value * 100;

    new QRCode(
        outputBox,
        {
            text: inputBox.value,
            width: size,
            height: size,
            colorDark: colorChooser.value
        }
    );
});

btnDownload.addEventListener("click", ()=>{
    if(inputBox.value == "") return;

    var link = document.createElement("a");
    link.target="_blank";
    link.href = outputBox.childNodes[1].src;
    link.click();
});
