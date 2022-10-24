
document.addEventListener('DOMContentLoaded', async () =>{
    GlobalMessage.setEleements();
    GlobalMessage.showSavedMsg();
})

class GlobalMessage{
    static messageCard; 
    static message;

    static setEleements(){
        this.messageCard = document.getElementById("GlobalMessage");
        this.message = document.querySelector("#GlobalMessage span");

        this.messageCard.addEventListener("click", async ()=>{
            this.messageCard.classList.add("d-none");
        })
    }

    static showSavedMsg(){
        const successMsg = getCookie("successMsg")
        if (successMsg != undefined && successMsg != ""){
            deleteCookie("successMsg")
            this.printGlobalSuccessMessage(successMsg)
        }

        const errorMsg   = getCookie("errorMsg")
        if (errorMsg != undefined && errorMsg != ""){
            deleteCookie("errorMsg")
            this.printGlobalErrorMessage(errorMsg)
        }
    }

    static printGlobalErrorMessage(message){
        console.log(`error printing ${message}`)
        this.messageCard.classList.add("error");
        this.messageCard.classList.remove("success");
        this.messageCard.classList.remove("d-none");
        this.message.innerHTML = message
        this.startAutoHide()
    }
    
    static printGlobalSuccessMessage(message){
        console.log(`success printing ${message}`)
        this.messageCard.classList.add("success");
        this.messageCard.classList.remove("error");
        this.messageCard.classList.remove("d-none");
        this.message.innerHTML = message
        this.startAutoHide()
    }
    
    static setGlobalErrorMessage(message){
        setCookie("errorMsg", message, 1, false)
    }
    
    static setGlobalSuccessMessage(message){
        setCookie("successMsg", message, 1, false)
    }

    static async startAutoHide(){
        await new Promise(r => setTimeout(r, 1500));
        this.messageCard.classList.add("d-none");
    }
}