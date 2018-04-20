
//=========  I - SET UP AUDIO CHAIN  =========//

const ac = new (window.AudioContext || window.webkitAudioContext)();

//=====1. Oscilators =====//
const osc1 = ac.createOscillator();
osc1.type = 'square'; //other values are 'square', 'sawtooth', 'triangle' and 'custom'
const osc2 = ac.createOscillator();
osc2.type = 'sawtooth'; //other values are 'square', 'sawtooth', 'triangle' and 'custom'
const oscBass = ac.createOscillator();
oscBass.type = 'sine'; //other values are 'square', 'sawtooth', 'triangle' and 'custom'

const oscArray = [osc1,osc2,oscBass];

//=====2. Effects =====//
const filter1 = ac.createBiquadFilter();
const filter2 = ac.createBiquadFilter();
const filterBass = ac.createBiquadFilter();

const gain1 = ac.createGain();
const gain2 = ac.createGain();
const gainBass = ac.createGain();
const gainMaster = ac.createGain();

const comp = ac.createDynamicsCompressor();
comp.threshold.value = -20;
comp.knee.value = 10;
comp.ratio.value = 4;
comp.attack.value = 0.1;
comp.release.value = 0.1;

const panner = ac.createPanner();

//=====3. Audio Chain =====//

gain1.connect(gain2);
gain2.connect(gainBass);
gainBass.connect(gainMaster);
gainMaster.connect(comp);
comp.connect(panner);
panner.connect(audioCtx.destination);

//=========  II - SET UP DEFAULT VARIABLES (/USER CONFIGURABLE?) =========//

(2 ** 25 => 7 digits) * 100 => 700 params with 0-9 range
                            => 70 params with 0-99 range
                            => 10 voices with 7 * 0-99 params each
1. Pitch, 2. Volume, 3. Filter, 4. Pan 5. Echo 6. Reverb 7. Distortion

//=======  III - AUTOMATE AUDIO CHANGES BASED ON GRID  =======//
function audioStart(){
  oscArray.forEach( osc => osc.start() );
}

function audioTick(flatGrid) {
  // 1. Do some work on the flatGrid array to get out some values

  // 2. Feed values into oscillator (and other node) variables
  osc1.frequency.value = pitchArr[index1];
  osc2.frequency.value = pitchArr[index2];
  oscBass.frequency.value = bassArr[indexBass];

  gain1.gain.value= Math.random();  // Change up for grid generated value.
  gain2.gain.value= Math.random();  // Gain values are 0-1
  gainBass.gain.value= Math.random();
  gainMaster.gain.value= Math.random();
}



//=======  III - MUTE FUNCTION (from MDN Web Audio page)=======//

var mute = document.querySelector('.mute');

mute.onclick = function() {
  if(mute.id == "") {
    gainNode.disconnect(audioCtx.destination);
    mute.id = "activated";
    mute.innerHTML = "Unmute";
  } else {
    gainNode.connect(audioCtx.destination);
    mute.id = "";
    mute.innerHTML = "Mute";
  }
}


// 1. A band / an orchestra of different sounds/instruments.

// The following list provides a simple, typical workflow for using the Web Audio API.
//
// Create an audio context
// Inside the context, create audio sources, such as <audio>, oscillator, stream
// Create effects nodes, such as reverb, biquad filter, panner, compressor
// Choose a final destination for the audio, such as your system speakers
// Connect the sources to the effects, and connect the effects to the destination




// The following list provides some examples of audio sources:
//
// 1. Generated directly by JavaScript from an audio node such as an oscillator. An OscillatorNode can be created using the AudioContext.createOscillator method.
//
// 2. Created from raw PCM data. The audio context has methods to decode supported audio formats. For more information, refer to AudioContext.createBuffer(), AudioContext.createBufferSource(), and AudioContext.decodeAudioData().
//
// 3. Taken from HTML media elements such as <video>, or <audio>. For more information, refer to AudioContext.createMediaElementSource().
//
// 4. Taken directly from a WebRTC MediaStream such as from a webcam or microphone. For more information, refer to AudioContext.createMediaStreamSource().

















// A powerful feature of the Web Audio API is that it does not have a strict "sound call limitation". For example, there is no ceiling of 32 or 64 sound calls at one time. Some processors may be capable of playing more than 1,000 simultaneous sounds without stuttering.




// get strings

// (25*4)*100 = 400 8 digit decimals
//
// const grid =
// const flatGrid = [].concat(...newGrid);
// const binaryString = flatGrid.map(bool => bool ? 1 : 0).join();
// //won't work as number to big for js
// //
// const decimal = parseInt(binary,2);
//
