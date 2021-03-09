// HTMLを読み込んだら発火
window.addEventListener('load', function () {
    // setTimeout(function () {//HTMLコード読み込んでから何秒後に稼働するか
    var obj = document.getElementById('title');//四角形のCSS
    obj.style.cssText = 'font-weight:bold;text-Shadow:4px 3px 0px rgb(0 0 0) ,9px 8px 0px rgba(0,0,0,0.15);';
    
    var blink = function () {
        var inFrameWidth = window.innerWidth;
        const canvas1 = document.getElementById('canvas1');
        const randomX = Math.floor(Math.random() * inFrameWidth); 
        console.log(randomX);
        var reloadTime = 4000;
        canvas1.style.right = randomX + 'px';
        canvas1.animate([
            {transform: 'translateY(1018px)rotate(360deg)',opacity: '1'},
            {transform: 'translateY(200px)rotate(0deg)',opacity: '0'},
        ],{
            duration: reloadTime,//●秒で処理を終わらせる
            iterations: Infinity,
        });
        setTimeout(blink, reloadTime);
    }
    
    blink();
    //setInterval("location.reload()", 4000);
    // }, 500)//HTMLコード読み込んでから何秒後に稼働するか
});

window.requestAnimFrame = (function () {
    return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback, time) {
            var time = time ? time : 1000 / 6;
            window.setTimeout(callback, time);
        }
    );
})();

window.onload = function() {
    var canvasWrap = document.querySelector('#canvas-wrap');
    var canvas = document.querySelector('#canvas-container');
    var ctx = canvas.getContext('2d');

    var center = {};    // Canvas中央
    var dots = [];      // パーティクル配列
    var density = 40;  //パーティクルの数
    var colors = ['#eeb900', '#6DD0A5', '#f799db'];
    var baseSize = 3;   // 大きさ
    var baseSpeed = 20; // スピード


    var Dot = function () {
        this.size = Math.floor( Math.random() * 6 ) + baseSize; //大きさ
        this.color = colors[~~(Math.random() * 3)]; //色
        this.speed = this.size / baseSpeed; // 大きさによって速度変更
        this.pos = {   // 位置
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height
        };
        var rot = Math.random() * 360;  // ランダムな角度
        var angle = rot * Math.PI / 180;
        this.vec = {    // 移動方向
            x: Math.cos(angle),
            y: Math.sin(angle)
        };
    };


    Dot.prototype = {
        update: function() {
            this.draw();

            this.pos.x += this.vec.x;
            this.pos.y += this.vec.y;

            // 画面外に出たら反対へ再配置
            if(this.pos.x > canvas.width + 10) {
                this.pos.x = -5;
            } else if(this.pos.x < 0 - 10) {
                this.pos.x = canvas.width + 5;
            } else if(this.pos.y > canvas.height + 10) {
                this.pos.y = -5;
            } else if(this.pos.y < 0 - 10) {
                this.pos.y = canvas.height + 5;
            }
        },

        draw: function() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.pos.x, this.pos.y, this.size, 0, 2 * Math.PI, false);
            ctx.fill();
        }
    };

    function update() {
        requestAnimFrame(update);
        // 描画をクリアー
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        for (var i = 0; i < density; i++) {
            dots[i].update();
        }
    }

    function init() {
        // canvasにコンテンツサイズをセット
        canvas.setAttribute("width", canvasWrap.offsetWidth);
        canvas.setAttribute("height", canvasWrap.offsetHeight);

        // canvas中央をセット
        center.x = canvas.width / 2;
        center.y = canvas.height / 2;

        // densityの数だけパーティクルを生成
        for (var i = 0; i < density; i++) {
            dots.push(new Dot());
        }

        update();
    }
    init();
}