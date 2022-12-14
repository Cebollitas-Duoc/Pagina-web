function redirect(id){
    var url = window.location.href
    url = url.split('/r')[0]+"/chat/"+id
    window.location.replace(url)
}