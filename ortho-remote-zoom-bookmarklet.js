
javascript:(function(){ 
navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
let zoomAmount = 100; // default
let lastUpdate = 0;
const upperThreshold = 1000;

function onMIDISuccess(midiAccess) {
  console.log('MIDI Access Object', midiAccess);
  const inputs = midiAccess.inputs.values();
  for (let input = inputs.next(); input && !input.done; input = inputs.next()) {
    input.value.onmidimessage = handleMIDIMessage;
  }
}

function handleMIDIMessage(event) {
  const data2 = event.data[2];
  const now = Date.now();

  if (data2 === 1 && now - lastUpdate < upperThreshold) {
    zoomAmount -= 1;
  } else if (data2 === 127 && now - lastUpdate < upperThreshold) {
    zoomAmount += 1;
  }

  // 5-500 range
  zoomAmount = Math.max(5, Math.min(500, zoomAmount));
  lastUpdate = now;

  document.body.style.zoom = `${zoomAmount}%`; 
  console.log(zoomAmount);
}

})();

function onMIDIFailure() {
  console.error('Failed to connect');
}
