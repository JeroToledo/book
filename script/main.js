function init_loading_animation(){
    window.loading_overlay = document.createElement("div")
    loading_overlay.setAttribute("class", "cargando")
    document.body.appendChild(loading_overlay)
    window.loading_int = setInterval(animate_loading, 50)
    window.loading_frame = 0
    window.total_loading_frames = 0
    window.loading_pos = -300
}

function animate_loading(){

    window.loading_overlay.style.backgroundImage = `url(/img/cargando/${window.loading_frame}.svg)`
    window.loading_overlay.style.backgroundPositionX = `${window.loading_pos}px`

    if (total_loading_frames == 20){
        if (document.readyState == "complete") stop_loading_animation()
    }
    else{
        window.loading_frame++
        window.loading_frame%=6
        window.loading_pos+=50
        window.loading_pos%=(window.outerWidth+300)
        if (window.loading_pos > window.outerWidth+150) window.loading_pos = -300
    }

    total_loading_frames++
}

function stop_loading_animation(){
    loading_overlay.style.opacity = 0
    setTimeout(()=>{
        loading_overlay.style.display = "none"
    },1000)
}
