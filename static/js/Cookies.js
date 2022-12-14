function setCookie(cname, cvalue, exdays, remember) {
    var expires;
    if (remember){
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        expires = "expires="+d.toUTCString();
    }
    else{
        expires = "expires=Session";
    }
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/" + ";samesite=lax";
}
  
function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
        c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
        }
    }
    return "";
}

function deleteCookie(cname){
    setCookie(cname, "", -1)
}