const showCertificateBtn = document.querySelector(".certificate-show");
const certificateMainScreen = document.querySelector(".certificate");
const certificateWrapper = document.querySelector(".certificate__wrapper");
const downloadBtn = document.querySelector(".certificate__download");
const certificateTemplate = document.querySelector(".certificate__window");
let certificateTemplateForSmallScreen;
let landscapePadding;

function setBtnPortraitPosition() {
    if (window.screen.height >= window.screen.width) {
        if (window.screen.width > 600) {
            downloadBtn.style.top = `calc((100% - ${certificateTemplate.offsetHeight}px) / 2 - 20px - 48px)`;
        } else {
            downloadBtn.style.top = null;
        }
        certificateWrapper.style.paddingLeft = null
        certificateWrapper.style.paddingRight = null
    }
}
setBtnPortraitPosition();
window.addEventListener("resize", setBtnPortraitPosition, true);

function setBtnLandscapePosition() {
    if (window.screen.height < window.screen.width) {
        if (window.screen.height < 768) {
            if ((window.screen.height < certificateTemplate.offsetHeight + 48)) {
                landscapePadding = (window.screen.width - certificateTemplate.offsetWidth / (certificateTemplate.offsetHeight / (certificateTemplate.offsetHeight - 48 - (certificateTemplate.offsetHeight - window.screen.height)))) / 2;
                certificateWrapper.style.paddingLeft = `calc(${landscapePadding}px)`
                certificateWrapper.style.paddingRight = `calc(${landscapePadding}px)`
            } else {
                window.addEventListener('resize', function () {
                    landscapePadding = (window.screen.width - certificateTemplate.offsetWidth / (certificateTemplate.offsetHeight / (certificateTemplate.offsetHeight - 48 - (certificateTemplate.offsetHeight - window.screen.height)))) / 2;
                    if (this.window.screen.height < this.window.screen.width) {
                        if (landscapePadding > 100) {
                            certificateWrapper.style.paddingLeft = `calc(${landscapePadding}px)`
                            certificateWrapper.style.paddingRight = `calc(${landscapePadding}px)`
                        }
                    }
                });
            }
            downloadBtn.style.top = `calc((100vh - 40px) - (${window.screen.height - certificateTemplate.offsetHeight}px / 2))`;
            downloadBtn.style.left = `calc(${certificateWrapper.offsetWidth - certificateTemplate.offsetWidth}px / 2 + ${certificateTemplate.offsetWidth}px + 13px)`;
        } else {
            downloadBtn.style.top = `calc((100% - ${certificateTemplate.offsetHeight}px) / 2 - 20px - 48px)`;
            downloadBtn.style.left = "50%";
        }
    } else {
        downloadBtn.style.left = "50%";
    }
}
setBtnLandscapePosition()
window.addEventListener("resize", setBtnLandscapePosition, true);
showCertificateBtn.addEventListener("click", function () {
    certificateMainScreen.classList.add("certificate__visible");
    let modalPicButtonA = document.createElement('a');
    let modalPicButtonSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    let modalPicButtonLine1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    let modalPicButtonLine2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    function SvgExit() {
        modalPicButtonA.setAttribute("href", "#!");
        modalPicButtonA.className = "a-svg-line-x";
        certificateMainScreen.appendChild(modalPicButtonA);
        modalPicButtonA.appendChild(modalPicButtonSvg);
        modalPicButtonSvg.setAttribute("class", "svg-line-x");
        modalPicButtonSvg.setAttribute("viewBox", "0 0 100 100");
        modalPicButtonSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        modalPicButtonSvg.appendChild(modalPicButtonLine1);
        modalPicButtonLine1.setAttribute("class", "svg-line-x");
        modalPicButtonLine1.setAttribute("x1", "0");
        modalPicButtonLine1.setAttribute("x2", "100");
        modalPicButtonLine1.setAttribute("y1", "0");
        modalPicButtonLine1.setAttribute("y2", "100");
        modalPicButtonSvg.appendChild(modalPicButtonLine2);
        modalPicButtonLine2.setAttribute("class", "svg-line-x");
        modalPicButtonLine2.setAttribute("x1", "0");
        modalPicButtonLine2.setAttribute("x2", "100");
        modalPicButtonLine2.setAttribute("y1", "100");
        modalPicButtonLine2.setAttribute("y2", "0");
        modalPicButtonA.style.left = `calc(${certificateWrapper.offsetWidth - certificateTemplate.offsetWidth}px / 2 + ${certificateTemplate.offsetWidth}px)`;
        modalPicButtonA.style.top = `calc((100vh - ${certificateTemplate.offsetHeight}px) / 2 - 38px)`;
    }
    SvgExit();
    window.addEventListener("resize", SvgExit, true);
});
document.body.addEventListener("click", function (e) {
    if (e.path[0].className == "certificate__wrapper" || e.path[0].className == "a-svg-line-x" || e.path[0].className.baseVal == "svg-line-x") {
        certificateMainScreen.classList.remove("certificate__visible");
        if (certificateTemplateForSmallScreen != undefined) {
            certificateMainScreen.removeChild(certificateTemplateForSmallScreen)
        }
    }
});
downloadBtn.addEventListener("click", function () {
    return html2canvas($('#load-window'), {
        onrendered: function (canvas) {
            let myImage = canvas.toDataURL("image/jpeg,1.0");
            let pdf = new jsPDF({
                unit: 'px',
                orientation: 'landscape',
                format: [595, 842],
                userUnit: 72
            });
            pdf.addImage(myImage, 'png', 0, 0, 842, 595);
            // pdf.compression('none')
            pdf.save(`Certificate.pdf`);
        }
    });
    // let opt = {
    //     filename: 'Certificate.pdf',
    //     image: { type: 'jpeg', quality: 1 },
    //     html2canvas: { scale: 6, useCORS: true },
    //     jsPDF: { unit: 'px', format: [595, 842], orientation: 'landscape' },
    // };
    // if (window.screen.width < 922) {
    //     certificateMainScreen.appendChild(certificateTemplate.cloneNode(true))
    //     certificateTemplateForSmallScreen = certificateMainScreen.childNodes[certificateMainScreen.childNodes.length - 1];
    //     certificateTemplateForSmallScreen.classList.add("small-screen");
    //     html2pdf().set(opt).from(certificateTemplateForSmallScreen).save();
    //     setTimeout(() => certificateMainScreen.removeChild(certificateTemplateForSmallScreen), 1000);
    // } else {
    //     html2pdf().set(opt).from(certificateTemplate).save();
    // }
});
// function getPDF() {
//     return html2canvas($('#load-window'), {
//         background: "#ffffff",
//         onrendered: function (canvas) {
//             var myImage = canvas.toDataURL("image/jpeg,1.0");
//             var imgWidth = (canvas.width * 60) / 120;
//             var imgHeight = (canvas.height * 70) / 60;
//             var pdf = new jsPDF('l', 'px', 'a4');
//             pdf.addImage(myImage, 'png', 15, 2, imgHeight, imgWidth); // 2: 19
//             pdf.save(`Budgeting ${$('.pdf-title').text()}.pdf`);
//         }
//     });
// }