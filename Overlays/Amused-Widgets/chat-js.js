(async() => {

    var stagger = true;
    var animateParticles = true;
    var particlesColor = "#FFFFFF";
    var rotationAmount = 20; // min 0 max 30
    var paddingValue = 16; // not and option - get padding value
    var linesOrWords = "words"; // lines words - option dropdown
    var msgId = 0;
  	var count = 0;
    var chatLog = document.querySelector("#log");
  	var introHeight;

  	var enableCycle = "{useNameColor}";

    const resources = await NerdLoader.load([
        "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.5.0/gsap.min.js",
        "https://s3.amazonaws.com/cdn.nerdordie.com/gsap/3-5-1/CustomEase.min.js",
        "https://ext-assets.streamlabs.com/users/140067/SplitText.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"
    ]);

    gsap.registerPlugin(CustomEase, SplitText);

    CustomEase.create("spring", "M0,110.41c0,0,14.75-131.47,29.63-131.47c10.6,0,14.13,28.27,23.71,28.27C64.96,7.21,70.12-5.6,79.39-5.6s11.34,7.21,20.47,7.21c11.04,0,14.28-2.94,23.12-2.94s16.64,2.5,24.88,2.5S167.74,0,176.13,0");
    CustomEase.create("bounceSpring", "M0,110.41c0,0,62.22-128.47,79.63-128.47s25.93,40.27,39.71,40.27S139.12-4.6,148.39-4.6C157.67-4.6,167,0,176.13,0");

  	var cycleColors = gsap.utils.wrap(["{cycle1}", "{cycle2}", "{cycle3}", "{cycle4}", "{cycle5}"]);

    animateChat();

    const observer = new MutationObserver((mutationList) => {
        animateChat();
    });

    observer.observe(chatLog, {
        childList: true
    });

    function animateChat() {

        var elements = gsap.utils.toArray(".chatMsg:not([animated])");

        elements.forEach(element => {
            element.setAttribute("animated", true);
            createAnimation(element);
        });
    }

    function createAnimation(element) {
        $('#log .fullMessage:last-child').attr('id', 'id-' + msgId);

        var now = new Date();
        var hours = now.getHours();

        function getTime() {
            var d = new Date();
            var n = d.toLocaleString([], {
                hour: '2-digit',
                minute: '2-digit'
            });

            document.querySelector('#id-' + msgId + " .time").innerHTML = n;
        }
        getTime();

        if (linesOrWords === "lines") {
            var splitLines = new SplitText(document.querySelector('#id-' + msgId + " .message"), {
                type: "lines"
            }).lines;
        }
        if (linesOrWords === "words") {
            var splitLines = new SplitText(document.querySelector('#id-' + msgId + " .message"), {
                type: "words"
            }).words;
        }

        if (enableCycle === "cycleColors") {

          console.log("Cycle on");
          var usernameMeta = document.querySelector("#id-" + msgId + " .meta");
          var accentBg = document.querySelector("#id-" + msgId + " .accentBg");
          var accentSvg = document.querySelector("#id-" + msgId + " .accentBg svg");
          var accentShadow = document.querySelector("#id-" + msgId + " .accentShadowBg");
          var accentShadowSvg = document.querySelector("#id-" + msgId + " .accentShadowBg svg");
          gsap.set(usernameMeta, {
            color: cycleColors(count)
          });
          gsap.set([accentBg, accentSvg, accentShadow, accentShadowSvg], {
            color: cycleColors(count),
            background: cycleColors(count),
            fill: cycleColors(count)
          });

          count++;
        }

        var tl = new TimelineMax();

        var moveAmount = -1 * gsap.utils.random(50, 1200, 1);
        var scaleAmount = gsap.utils.random(1, 3, .1);

      	introHeight = $("#measureBox").outerHeight();

        gsap.to('#id-' + msgId + " .accentBg svg", {
            duration: 5,
            y: moveAmount,
            scaleY: scaleAmount
        })
        gsap.to('#id-' + msgId + " .accentShadowBg svg", {
            duration: 5,
            y: moveAmount,
            scaleY: scaleAmount
        })

        tl
            .to('#id-' + msgId + " .chatMsg", {
                duration: .1,
                opacity: 1,
                delay: .1
            })
            .from('#id-' + msgId + " .chatMsg", {
                duration: 1,
                ease: "spring",
                rotation: rotationAmount
            })
            .from('#id-' + msgId + " .dot", {
                duration: .6,
                opacity: 0,
                y: 80,
                ease: "bounceSpring",
                stagger: 0.1
            }, "-=1.2")
            .to('#id-' + msgId + " .showDot", {
                duration: .6,
                opacity: 0,
                stagger: 0.2
            }, "-=1.1")
            .from('#id-' + msgId + " .chatMsg", {
                height: introHeight,
                width: 200,
                autoRound: false
            }, "-=.6")
            .to('#id-' + msgId + " .accentBg", {
                duration: 1.6,
                x: 1050,
                transformOrigin: "left top",
                ease: "power2.inOut"
            }, "-=.6")
            .to('#id-' + msgId + " .particles", {
                opacity: 0,
                duration: 1.6,
                x: -100,
                y: -100,
                transformOrigin: "left top",
                ease: "power2.inOut"
            }, "-=1.6")
            .to('#id-' + msgId + " .accentShadowBg", {
                duration: 1.6,
                x: 1050,
                transformOrigin: "left top",
                ease: "power2.inOut"
            }, "-=1.6")
            .to('#id-' + msgId + " .chatBg", {
                duration: 1.6,
                x: 1050,
                transformOrigin: "left top",
                ease: "power2.inOut"
            }, "-=1.6")
            .from('#id-' + msgId + " .time", {
                duration: 0.6,
                opacity: 0
            }, "-=1")
            .from('#id-' + msgId + " .meta", {
                duration: 0.3,
                opacity: 0,
                stagger: .2
            }, "-=1")
            .from('#id-' + msgId + " .message", {
                duration: 0.3,
                opacity: 0,
                stagger: .2
            }, "-=.8")
            .from(splitLines, {duration: 0.3, opacity: 0, stagger: .05, ease: "power2.inOut"}, "-=1.2");

        ////////////////////////////////////////////////////////////

        var xmlns = "http://www.w3.org/2000/svg";
        var numParticles = 550;
        // var particlesSvg = $(".particles")[0];

        var particlesWidth = 900;
        var particlesHeight = 900;
        var endX = -200;
        var endY = -200;

        var canvas = document.querySelector('#id-' + msgId + " .particles");
        var ctx = canvas.getContext("2d");
        canvas.width = particlesWidth;
        canvas.height = particlesHeight;
        ctx.fillStyle = particlesColor;

        var randomX1 = gsap.utils.random(-particlesWidth, particlesWidth * 2, true);
        var randomX2 = gsap.utils.random(-particlesWidth, 0, true);
        var randomX3 = gsap.utils.random(particlesWidth, particlesWidth * 2, true);

        var randomY1 = gsap.utils.random(-particlesHeight, particlesHeight * 2, true);
        var randomY2 = gsap.utils.random(-particlesHeight, 0, true);
        var randomY3 = gsap.utils.random(particlesHeight, particlesHeight * 2, true);

        var randomScale1 = gsap.utils.random(0.25, 0.75, .001, true);
        var randomScale2 = gsap.utils.random(0.5, 1, .001, true);
        var randomAlpha = gsap.utils.random(0.25, 1, .001, true);
        var randomDuration = gsap.utils.random(40, 42, true);

        var radius = 6;
        // var size = radius * 2;

        var particlePath = new Path2D();
        particlePath.arc(0, 0, radius, 0, Math.PI * 2);

        var particles = [];
        var particleAnimations = [];

        for (var i = 0; i < numParticles; i++) {
            var particle = {
                x: 0,
                y: 0,
                scale: 0,
                alpha: 0
            };
            particles.push(particle);
            spawnParticle(particle, true);
        }

        // var texture = generateTexture();
        render();

        if (animateParticles) {
            gsap.to({}, {
                duration: 2, // timer to stop particles
                onUpdate: render,
                onComplete() {
                    particleAnimations.forEach(animation => animation.pause());
                }
            });
        }

        function spawnParticle(particle, firstRun) {

            var x, y;

            if (firstRun) {
                x = randomX1;
                y = randomY1;
            } else {
                x = Math.random() < 0.5 ? randomX2 : randomX3;
                y = Math.random() < 0.5 ? randomY2 : randomY3;
            }

            gsap.set(particle, {
                alpha: randomAlpha,
                scale: Math.random() < 0.5 ? randomScale1 : randomScale2,
                x,
                y
            });

            if (!animateParticles) {
                return;
            }

            var animation = gsap.to(particle, {
                duration: randomDuration,
                x: endX,
                y: endY,
                scale: 0,
                onComplete: spawnParticle,
                onCompleteParams: [particle],
                ease: "sine.in"
            });

            if (firstRun) {
                animation.progress(Math.random());
            }

            particleAnimations.push(animation);
        }

        function render() {

            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.clearRect(0, 0, particlesWidth, particlesHeight);

            for (var i = 0; i < particles.length; i++) {
                var p = particles[i];

                ctx.setTransform(p.scale, 0, 0, p.scale, p.x, p.y);
                ctx.globalAlpha = p.alpha;
                ctx.fill(particlePath);
            }
        }
        msgId++;
    }
})();
