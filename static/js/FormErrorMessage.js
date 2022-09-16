const errorCard    = document.getElementById("FormErrorMessage");
const errorMessage = document.querySelector("#FormErrorMessage span");

function printErrorMessage(message){
    errorCard.classList.remove("d-none");
    errorMessage.innerHTML = message
}

errorCard.addEventListener("click", async ()=>{
    errorCard.classList.add("d-none");
})