function getImgData(imgPreview,filePicker) {   
    imgPreview.innerHTML = "";
    if (!filePicker || !filePicker.files || filePicker.files.length <= 0) 
        {}
    else{
        
        for(let i=0; i<filePicker.files.length;i++){    
            const fileReader = new FileReader(); 
            const files = filePicker.files[i];      
            fileReader.readAsDataURL(files);
            fileReader.addEventListener("load", function () {
            imgPreview.style.display = "flex";
            imgPreview.innerHTML += '<img src="' + this.result + '" />';
          });  
        }        
     }
}