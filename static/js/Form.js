function getValue(element){
    return element.value.trim()
}

if (window.location.hostname == "localhost")
    apidomain = "http://localhost:8081"
else
    apidomain = "http://api.mrmeme.cl"