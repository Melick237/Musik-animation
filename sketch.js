// M_1_2_01
//
// Generative Gestaltung – Creative Coding im Web
// ISBN: 978-3-87439-902-9, First Edition, Hermann Schmidt, Mainz, 2018
// Benedikt Groß, Hartmut Bohnacker, Julia Laub, Claudius Lazzeroni
// with contributions by Joey Lee and Niels Poldervaart
// Copyright 2018
//
// http://www.generative-gestaltung.de
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

    /**
     * order vs random!
     * how to interpolate beetween a free composition (random) and a circle shape (order)
     *
     * MOUSE
     * position x          : fade between random and circle shape
     *
     * KEYS
     * s                   : save png
     */
    'use strict';

let mySound;
let fft;
function preload() {
    soundFormats('mp3');
    mySound = loadSound('music.mp3');
}


function canvasPressed() {
    // playing a sound file on a user gesture
    // is equivalent to `userStartAudio()`
    mySound.play();
}



var actRandomSeed = 0;
var count = 150;

function setup() {
    createCanvas(800,800);
    cursor(CROSS);
    noStroke();
    fill(0,130,164);

    fft = new p5.FFT();
    fft.setInput(mySound);
}

function draw() {
    background(255);
    if(!mySound.isPlaying()) {
        mySound.play();

    }
    let spectrum = fft.analyze();

    var faderX = 4 * (spectrum[0] / width);

    randomSeed(actRandomSeed);
    var angle = radians(360 / count);
    for (var i = 0; i < count; i++) {
        // positions
        var randomX = random(300,500);
        var randomY = random(300,500);
        var circleX = width / 2 + cos(angle * i) * random(250,300);
        var circleY = height / 2 + sin(angle * i) * random(250 , 300);

        var x = lerp(randomX,circleX,faderX);
        var y = lerp(randomY,circleY,faderX);

        ellipse(x,y,11,11);
    }
}

function mousePressed() {
    actRandomSeed = random(100000);
}

function keyReleased(){
    if (key == 's' || key == 'S')
    {
        saveCanvas(gd.timestamp(), 'png');
    }
}
