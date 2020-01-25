function init_loading_animation(){

    window.loaded_imgs = 0

    window.load_imgs = () => {
        if (loaded_imgs < 6) 
            fetch(`/img/cargando/${window.loaded_imgs}.png`).then(()=>{
                window.loaded_imgs++
                window.load_imgs()
            }); else {
                window.loading_overlay = document.querySelector("div.cargando")
                document.body.appendChild(loading_overlay)
                window.loading_int = setInterval(animate_loading, 50)
                window.loading_frame = 0
                window.total_loading_frames = 0
                window.loading_pos = -300
            }
    }

    load_imgs()
    

   
}

function show_instructions(){
    document.querySelector("#instructions").style.display = "block"
}

function hide_instructions(){
    document.querySelector("#instructions").style.display = "none"
}

function animate_loading(){

    window.loading_overlay.style.backgroundImage = `url(/img/cargando/${window.loading_frame}.png)`
    window.loading_overlay.style.backgroundPositionX = `${window.loading_pos}px`

    if (document.cookie.includes("ojo=ya") || total_loading_frames > 20){
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
    if (!document.cookie.includes("ojo=ya"))  document.cookie = "ojo=ya"
    loading_overlay.style.opacity = 0
    setTimeout(()=>{
        loading_overlay.style.display = "none"
    },1000)
}


function cache_page_imgs(){

    if (document.cookie.includes("cache=ya")) return

    function load_imgs(i,ext){
        fetch("paginas/"+i+ext).then(r=> r.status == 200 ? load_imgs(i+1,ext) : document.cookie = "cache=ya")
    }
    fetch("paginas/0.svg",{method:'HEAD'})
        .then(r=>{
            if (r.status == 200){
                //page uses svg
                load_imgs(0,".svg")
            }
            else{
                //page uses png
                load_imgs(0,".png")
            }
        })
}