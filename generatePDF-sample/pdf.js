const pdfEl = document.querySelector(".containerToDownload");

const btn = document.querySelector(".dBtn")

btn.addEventListener("click", ()=>{
  const opt = {
    image:        { type: 'jpeg', quality: 1 },
    // html2canvas:  { scale: 2 },
    // jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
  };
    html2pdf().set(opt).from(pdfEl).save();


})