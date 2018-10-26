Draw=()=>{
    for(let i = 0; i < canv.length; ++i) {
        canv[i].c.width |= 0
        let v = canv.length / 4
        let img = i >= v * 2 ? logo : logo_full
        let X = canv[i].c.width/2 - img.width/6
        let Y = 150
        canv[i].x.globalCompositeOperation = 'source-over'
        canv[i].x.drawImage(img, X, Y, img.width/3, img.height/3)
        
        // first 8
        if (i < v) {
            canv[i].x.fillStyle = '#888'
            canv[i].x.beginPath()
            for(let j = 0; j < t * 6 % 4; ++j) {
                X = canv[i].c.width / 2 + 3 + j * 13
                Y = 183
                canv[i].x.arc(X, Y, 2, 0, 7)
                canv[i].x.fill()
            }
        }
        
        // 8 - 15
        if (i >= v && i < v * 2) {
            canv[i].x.fillStyle = `hsl(0, 0%, ${50+S(t*9)*30}%)`
        }
        
        // 16 - 323
        if (i >= v * 2 && i < v * 3) {
            canv[i].x.fillStyle = `#888`
            for(let j = 0; j < 6; ++j) {
                let p = Math.PI * 2 / 6 * j + S(j + S(t * 6) * 2) / 2 + t * 6
                X = canv[i].c.width / 2 + S(p) * img.width / 3.3 /1.5
                Y = 168 + C(p) * img.width / 3.3 / 1.5
                canv[i].x.beginPath()
                canv[i].x.arc(X, Y, 3, 0, 7)
                canv[i].x.fill()
            }
        }
        
        // 24 - 31
        if (i >= v * 3) {
            canv[i].x.fillStyle = `hsl(0, 0%, ${50+S(t*16)*30}%)`
        }
        
        canv[i].x.globalCompositeOperation = 'source-in'
        canv[i].x.fillRect(0, 0, canv[i].c.width, canv[i].c.height)
    }
	t+=1/60;
	requestAnimationFrame(Draw);
}

let canv = []
for(let i = 0; i < 32; ++i) {
    let c = document.createElement('canvas')
    let bg = ''
    switch (i%8) {
        case 0: bg = 'coffee'; break;
        case 1: bg = 'dark'; break;
        case 2: bg = 'default'; break;
        case 3: bg = 'greyfox'; break;
        case 4: bg = 'nightswatch'; break;
        case 5: bg = 'osprey'; break;
        case 6: bg = 'radioactive'; break;
        case 7: bg = 'sky'; break;
    }
    c.style.background = `url(${bg}.png)`
    c.style.backgroundSize = `1084px 620px`
    c.style.width = '1084px'
    c.style.height = '620px'
    c.style.marginTop = '40px'
    c.style.marginBottom = '40px'
    c.width = 1084
    c.height = 620
    canv.push({c, x: c.getContext('2d')})
    document.body.appendChild(c)
}

logo = new Image()
logo.src = 'irc.png'
logo_full = new Image()
logo_full.src = 'irc_full.png'

t=0
Draw()