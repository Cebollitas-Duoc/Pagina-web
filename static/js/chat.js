document.addEventListener('DOMContentLoaded', async () =>{
    msgContainer = document.getElementById("messageContainer")
    msgInput = document.getElementById("msg")

    messages = await GetMessagesRequest();
    messages.forEach(msg => {
        addMsgCard(msg.UserName, msg.Message, msg.Yours);
    });

    getNewMessages();
})


cardTemplate = `
    <div class="row">
        <div class="card msg col-md-8 col-sm-12 <<yours>>">
            <div class="card-body">
                <p class="username"><<name>></p>
                <p class="msg"><<msg>></p>
                <<img>>
            </div>
        </div>
    </div>
`

async function SendMessage(){
    const msg = msgInput.value;
    
    if (msg.length == 0){
        return;
    }

    const response = await this.SendMessagesRequest(msg);
    if ("Mensaje_Enviado" in response && response["Mensaje_Enviado"]){
        msgInput.value = ""
        addMsgCard(getCookie("UsrName"), msg, 1)
    }   
    else if ("Error" in response) 
        GlobalMessage.printGlobalErrorMessage(response["Error"]);
    else
        GlobalMessage.printGlobalErrorMessage("Error desconocido al enviar mensaje");
}

async function GetMessagesRequest(from=0){
    var formdata = new FormData();
    var r;
    formdata.append("SessionKey", getCookie("SessionKey"));
    formdata.append("Id_Reserve", getRsvId());
    formdata.append("From",       from);
    
    
    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    await fetch(`${apidomain}/chat/listmessages/`, requestOptions)
    .then(response => response.text())
    .then(result => r=result)
    .catch(error => console.log('error', error));
    
    return JSON.parse(r);
}

async function SendMessagesRequest(msg){
    var formdata = new FormData();
    var r;
    formdata.append("SessionKey", getCookie("SessionKey"));
    formdata.append("Id_Reserve", getRsvId());
    formdata.append("Message",       msg);


    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    await fetch(`${apidomain}/chat/sendmessage/`, requestOptions)
    .then(response => response.text())
    .then(result => r=result)
    .catch(error => console.log('error', error));

    return JSON.parse(r);
}

function getRsvId(){
    url = window.location.href.split("/")
    lastindex = url.length - 1
    return url[lastindex]
}

function addMsgCard(user, msg, yours){
    card = createSrvCard(user, msg, yours)
    msgContainer.innerHTML = msgContainer.innerHTML + card 
}

function createSrvCard(user, msg, yours){
    var card = this.cardTemplate;
    card = card.replace("<<name>>",  user)
    card = card.replace("<<msg>>",   msg)
    if (yours == 1)
        card = card.replace("<<yours>>", "send")
    else
        card = card.replace("<<yours>>", "recieved")
    
    const regex = /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])/g;
    const urls = msg.match(regex);

    if (urls != null){
        card = card.replace("<<img>>", `<img src="${urls[0]}" alt="">`)
    }
    else
        card = card.replace("<<img>>", "")

    return card.toString()
}

function getLastMsgDate(){
    if (messages.length == 0) return 0;
    lastindex = messages.length - 1
    return messages[lastindex].Date
}

async function getNewMessages(){
    while (1){
        await new Promise(r => setTimeout(r, 2000));
        newMsg = await GetMessagesRequest(from=getLastMsgDate())
        newMsg.forEach(msg => {
            if (msg.Yours == 1) return;
            addMsgCard(msg.UserName, msg.Message, msg.Yours);
        });
        messages = messages.concat(newMsg);
    }
}