const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const params = {
    x: 0,
    y: 0,
    flag: false
};

function setCoordinate(e){
    params.x = e.clientX;
    params.y = e.clientY;
}

function setFlag(e){
    const type = e.type;
    if(type === 'mousedown'){
        params.flag = true;
    }else{
        params.flag = false;
    }
}

const radiusGenerator = (function(){
    let reverse = false;
    let radius = initRadius();
    const amount = 0.2;
    return function(){
        if(params.flag === false){
            radius = initRadius();
        }
        if(Math.floor(radius) === 30){
            reverse = true;
        }else if(Math.floor(radius) === 1){
            reverse = false;
        }
        if(reverse){
            radius -= amount;
        }else{
            radius += amount;
        }
        return radius;
    }
})();

function initRadius(){
    return radius = 1;
}

function drawCircle(){
    const x = params.x;
    const y = params.y;
    const flag = params.flag;
    const generatedRadius = radiusGenerator();
    if(flag){
        context.clearRect(x - generatedRadius - 1, y - generatedRadius - 1, generatedRadius * 2 + 2, generatedRadius * 2 + 2);
    }
    context.beginPath();
    context.arc(x, y, generatedRadius, 0, Math.PI*2, true);
    context.fillStyle = 'white';
    context.fill();
    if(flag){
        requestAnimationFrame(drawCircle);
    }else{
        cancelAnimationFrame(drawCircle);
    }
}

function mousedown(e){
    setCoordinate(e);
    setFlag(e);
    drawCircle();
}

function mouseup(e){
    setFlag(e);
    drawCircle();
}

canvas.addEventListener('mousedown', mousedown);
canvas.addEventListener('mouseup', mouseup);
