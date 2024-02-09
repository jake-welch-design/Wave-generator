let gui;
let phase = 0;

let params = {
  Background_Color: "#000000", 
  Stroke_Color: "#ffffff", 
  Stroke_Weight: 1,
  Stroke_WeightMin: 1,
  Stroke_WeightMax: 20,
  Stroke_WeightStep: 1,
  Waveform: 0, 
  WaveformMin: 0,
  WaveformMax: 3,
  WaveformStep: 0.1,
  Amplitude: 60,
  AmplitudeMin: 0,
  AmplitudeMax: 0, // Will be set dynamically in setup()
  Frequency: 0.1,
  FrequencyMin: 0,
  FrequencyMax: 0.5,
  FrequencyStep: 0.001,
  Modulation: 0.0001,
  ModulationMin: 0,
  ModulationMax: 0.001,
  ModulationStep: 0.00001,
  Modulation_Start: 0, 
  Modulation_StartMax: 0, 
  Modulation_on_off: false,
  Modulation_Easing: true, 
};

function setup() {
  createCanvas(windowWidth, windowHeight, SVG);

  params.AmplitudeMax = windowHeight;
  params.Modulation_Start = windowWidth / 2;
  params.Modulation_StartMax = windowWidth;

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
    let waveformValue = params.Waveform;
    let y;

    let modulationPoint = width - params.Modulation_Start;
    if (params.Modulation_on_off && x > modulationPoint) {
      let easeFactor = params.Modulation_Easing ? easeInOut((x - modulationPoint) / (width - modulationPoint)) : 1;
      freq += params.Modulation * easeFactor * (width - modulationPoint);
    }

    let angle = x * freq + phase;

    y = sin(angle) * params.Amplitude; 
    if (waveformValue > 0 && waveformValue <= 3) {
      let triangleWave = asin(sin(angle)) / (PI / 2) * params.Amplitude; 
      let blend = map(waveformValue, 0, 1, 0, 1); 
      y = lerp(y, triangleWave, blend);
    } else if (waveformValue > 1 && waveformValue <= 2) {
      // For future implementations to add more waveform transitions
    }

    vertex(x, y + height / 2);
  }
  endShape();
  fill(params.Stroke_Color);
  noStroke();
  textSize(18);
  text('TYPE "S" TO SAVE AN .SVG FILE OF YOUR WAVE', 20, windowHeight - 20);
}

function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function keyPressed() {
  if (key === 's') {
    save("wave.svg");
  }
}
