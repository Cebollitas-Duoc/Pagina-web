const imageGallery = document.querySelector(".image-gallery");
const mainImage = document.querySelector(".main-image");

function setMainImage(imageSRC){
  mainImage.src = imageSRC;
}
document.addEventListener('DOMContentLoaded', function() {
  const firstMiniImage = document.querySelectorAll(".mini-image")[0];
 mainImage.src = firstMiniImage.getAttribute("src");
}, false);
