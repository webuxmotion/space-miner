const canvas = document.getElementById("app");
const ctx = canvas.getContext("2d");


const ship = new Ship();
ship.x = canvas.width / 2;
ship.y = canvas.height / 2;

let vr = 0.05;

(function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ship.draw(ctx);
    ship.rotation += vr;

    window.requestAnimationFrame(animate);
})();

