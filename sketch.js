let lastPos = null;
let errMsg = "";
let requested = false;

function setup() {
  createCanvas(400, 400);
  textSize(18);
}

function draw() {
  background(220);

  if (!requested) {
    text("Tippe, um GPS zu erlauben", 10, 40);
    return;
  }

  if (errMsg) {
    text("GPS Fehler: " + errMsg, 10, 40);
  } else if (lastPos) {
    text("latitude: " + lastPos.coords.latitude, 10, 120);
    text("longitude: " + lastPos.coords.longitude, 10, 160);
  } else {
    text("Warte auf Position ...", 10, 40);
  }
}

// iOS Safari zählt touchStarted als User Gesture
function touchStarted() {
  requestGPS();
  return false;
}

function mousePressed() {
  requestGPS();
}

function requestGPS() {
  if (requested) return;
  requested = true;

  navigator.geolocation.getCurrentPosition(
    (position) => {
      lastPos = position;
      errMsg = "";
      // optional: regelmäßig nachladen, aber nicht im draw
      setInterval(() => {
        navigator.geolocation.getCurrentPosition(
          p => lastPos = p,
          e => errMsg = e.message,
          { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
      }, 5000);
    },
    (error) => {
      errMsg = error.message;
    },
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
  );
}