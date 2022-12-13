document.addEventListener('DOMContentLoaded', async () =>{
    documentContainer = document.getElementById("documentContainer")

    documents = await getDocuments();
    documents.forEach(doc => {
        const card = createDocCard(doc);
        documentContainer.innerHTML += card;
    });
})

cardTemplate = `
    <div class="card" onclick="window.open('<<url>>','_blank')">
        <<category>>
    </div>
`

function getRsvId(){
    url = window.location.href.split("/")
    lastindex = url.length - 1
    return url[lastindex]
}

function createDocCard(doc){
    var card = this.cardTemplate;
    const url = `${apidomain}/files/getdoc/${doc.Id_Document}/`
    card = card.replace("<<url>>", url)
    card = card.replace("<<category>>", doc.Category)

    return card.toString()
}

async function getDocuments(){
    var formdata = new FormData();
    
    formdata.append("SessionKey", getCookie("SessionKey"));
    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };
    
    var r
    await fetch(`${apidomain}/files/listdocs/${getRsvId()}/`, requestOptions)
    .then(response => response.text())
    .then(result => r=result)
    .catch(error => console.log('error', error));

    return JSON.parse(r);
}