var msgId = 0;

var barsAnimation = "{barsAnimation}", // fromLeft fromTop fromRight fromBot
  msgDirection = "{msgDirection}", // fromLeft fromTop fromRight fromBot none
  stagger = true, // true or false
  msgDirection = "{msgDirection}"; // fromLeft fromTop fromRight fromBot none

var barInX, barInY, msgX, msgY;

if (barsAnimation == "fromLeft") {
  barInX = "-10px";
  barInY = "0%";
} else if (barsAnimation == "fromTop") {
  barInX = "0%";
  barInY = "-10px";
} else if (barsAnimation == "fromRight") {
  barInX = "10px";
  barInY = "0%";
} else if (barsAnimation == "fromBot") {
  barInX = "0%";
  barInY = "10px";
}

if (msgDirection == "fromLeft") {
  msgX = "5px";
  msgY = "0%";
} else if (msgDirection == "fromTop") {
  msgX = "0%";
  msgY = "-5px";
} else if (msgDirection == "fromRight") {
  msgX = "5px";
  msgY = "0%";
} else if (msgDirection == "fromBot") {
  msgX = "0%";
  msgY = "5px";
} else if (msgDirection == "none") {
  msgX = "0%";
  msgY = "0%";
}

// Please use event listeners to run functions.
document.addEventListener('onLoad', function(obj) {
  // obj will be empty for chat widget
  // this will fire only once when the widget loads
  loadScript('https://ext-assets.streamlabs.com/users/140067/gsap2-1-2.js').then(function() {
    loadScript('https://ext-assets.streamlabs.com/users/140067/SplitText-2-1-2.min.js').then(function() {});
  })
});

document.addEventListener('onEventReceived', function(obj) {
  // obj will contain information about the event
  $('#log .chatMsg:last-child').attr('id', 'id-' + msgId);
  TweenMax.set('#id-' + msgId, {
    opacity: 1
  });
  TweenMax.from('#id-' + msgId + ' .chatBg', .2, {
    delay: .1,
    ease: Power1.easeInOut,
    opacity: 0,
    x: barInX,
    y: barInY
  });
  splitAndAnimate(msgId);
  console.log(msgId);
  msgId++;
});

function splitAndAnimate(msgId) {
  splitWords = new SplitText('#id-' + msgId + " .inner", {
    type: "words"
  });
  TweenMax.staggerFrom('#id-' + msgId + " .inner *", 0.3, {
    opacity: 0,
    x: msgX,
    y: msgY,
    ease: Power1.easeInOut,
    stagger: {
      from: 0,
      amount: .5
    }
  }, null)

}


function loadScript(url) {
  return new Promise(function(resolve, reject) {
    const script = document.createElement('script')
    script.onload = resolve
    script.onerror = reject

    script.src = url

    document.head.appendChild(script)
  })
}