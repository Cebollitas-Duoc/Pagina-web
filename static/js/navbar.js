function toggleDisplay(element_id){
    const element = document.querySelector(element_id)
    if (element.classList.contains("d-none")) return element.classList.remove("d-none");
    element.classList.add("d-none")
}