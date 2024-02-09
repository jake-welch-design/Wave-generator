let gui;
let phase = 0;

let params = {
  Background_Color: "#000000", 
  Stroke_Color: "#ffffff", 
  Stroke_Weight: 1,
  Stroke_WeightMin: 1,
  Stroke_WeightMax: 20,
  Stroke_WeightStep: 1,
  Amplitude: 60,
  AmplitudeMin: 0,
  Frequency: 0.1,
  FrequencyMin: 0,
  FrequencyMax: 0.5,
  FrequencyStep: 0.001,
  Modulation: 0.0001,
  ModulationMin: 0,
  ModulationMax: 0.001,
  ModulationStep: 0.00001
};

function setup() {
  createCanvas(windowWidth, windowHeight, SVG);

  params.AmplitudeMax = windowHeight;
  params.Modulation_Start = windowWidth / 2;
  params.Modulation_StartMax = windowWidth;
  params.Modulation_on_off = false;

  gui = createGui('Settings:');
  gui.addObject(params);
  noLoop();
}

function draw() {
  background(params.Background_Color);
  strokeWeight(params.Stroke_Weight);
  stroke(params.Stroke_Color);
  strokeJoin(ROUND);
  noFill();
  beginShape();
  for (let x = 0; x < width; x++) {
    let freq = params.Frequency;
    if (params.Modulation_on_off) {
      let modulationPoint = width - params.Modulation_Start;
      if (x > modulationPoint) {
        let easeFactor = easeInOut((x - modulationPoint) / (width - modulationPoint));
        freq += params.Modulation * easeFactor * (width - modulationPoint);
      }
    }
    let angle = x * freq + phase;
    let y = sin(angle) * params.Amplitude + height / 2;
    vertex(x, y);
  }
  endShape();
}

function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}


function keyPressed() {
  if (key === 's') {
    save("wave.svg");
  }
}
