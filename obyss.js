function locomotiveAnimation() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
function loading_animation() {
  var tl = gsap.timeline();
  tl.from(".line h1 , .line h2", {
    y: 250,
    opacity: 0,
    delay: 1,
    stagger: 0.1,
    duration: 0.5,
  });
  tl.from("#line1-part1,.line h2", {
    opacity: 0,
    onStart: function () {
      var time = document.querySelector("#line1-part1 h5");
      var si = setInterval(function () {
        var count = time.textContent;
        count++;
        time.textContent = count;
        if (count == 100) {
          clearInterval(si);
        }
      }, 20);
    },
  });
  tl.to("#loader", {
    opacity: 0,
    duration: 0.4,
    delay: 3,
  });
  tl.from("#page1, #page2", {
    y: 1600,
    opacity: 0,
    ease: Power4,
    onStart: function () {
      tl.from("#nav", {
        opacity: 0,
      });
      tl.from(".page1midanim h1 , .page1midanim h2, .page1midanim h3", {
        y: 150,
        stagger: 0.1,
      });
      tl.from("#vid ,#vid-crsr ", {
        y:150,
      },"-=1.2");
      tl.to("#vid ,#vid-crsr ",{
          opacity:1,
        },"-=1.2");
    },
  });
  tl.to("#loader", {
    display: "none",
  });
}
function cursor_animation() {
//   document.addEventListener("mousemove", function (temp) {
//     gsap.to("#crsr", {
//       left: temp.x,
//       top: temp.y,
//     });
//   });
//   Shery.makeMagnet("#nav-part2 h4" /* Element to target.*/, {});
    Shery.mouseFollower({
        skew:true,
        duration:1,
        ease:"cubic-bezier(0.23,1,0.320,1)",
    })
    Shery.makeMagnet("#nav-part2 h4" /* Element to target.*/, {});
}
function sheryanim(){
    Shery.imageEffect(".img-div",{
        style:5,
        config:{"a":{"value":2,"range":[0,30]},"b":{"value":0.75,"range":[-1,1]},"zindex":{"value":-9996999,"range":[-9999999,9999999]},"aspect":{"value":0.7272727272727273},"ignoreShapeAspect":{"value":true},"shapePosition":{"value":{"x":0,"y":0}},"shapeScale":{"value":{"x":0.5,"y":0.5}},"shapeEdgeSoftness":{"value":0,"range":[0,0.5]},"shapeRadius":{"value":0,"range":[0,2]},"currentScroll":{"value":0},"scrollLerp":{"value":0.07},"gooey":{"value":true},"infiniteGooey":{"value":false},"growSize":{"value":4,"range":[1,15]},"durationOut":{"value":1,"range":[0.1,5]},"durationIn":{"value":1.5,"range":[0.1,5]},"displaceAmount":{"value":0.5},"masker":{"value":false},"maskVal":{"value":1,"range":[1,5]},"scrollType":{"value":0},"geoVertex":{"range":[1,64],"value":1},"noEffectGooey":{"value":true},"onMouse":{"value":0},"noise_speed":{"value":0.2,"range":[0,10]},"metaball":{"value":0.46,"range":[0,2]},"discard_threshold":{"value":0.5,"range":[0,1]},"antialias_threshold":{"value":0,"range":[0,0.1]},"noise_height":{"value":0.5,"range":[0,2]},"noise_scale":{"value":10,"range":[0,100]}},
        gooey:true,
    })

}
function vidanim(){
    var vidcont=document.querySelector("#vid");
    // vidcont.addEventListener("mouseenter",function(){
    //     vidcont.addEventListener("mousemove",function(dets){
    //         gsap.to("#vid-crsr",{
    //             x:dets.x-1500,
    //             y:dets.y-350,
    //         })
    //     })
    // })
    // vidcont.addEventListener("mouseleave",function(){
    //     gsap.to("#vid-crsr",{
    //         x:"5vw",
    //         y:"3vw",
    //     })
    // })
    var vid=document.querySelector("#vid-crsr");
    var video=document.querySelector("#vid video");
    var image=document.querySelector("#vid img");
    var flag=0;
    vidcont.addEventListener("click",function(){
        if(flag==0){
            video.play();
            image.style.opacity = 0;
            vid.innerHTML = `<i class="ri-pause-line"></i>`;
            flag=1;
        }else if(flag==1){
            video.pause();
            image.style.opacity = 1;
            vid.innerHTML = `<i class="ri-play-large-fill"></i>`;
            flag=0;
        }
        
    })
}
document.addEventListener("mousemove",function(dets){
    gsap.to("#flag", {
      x: dets.x,
      y: dets.y,
    });
})
var slash = document.querySelector("#slash");
slash.addEventListener("mouseenter",function(){
    gsap.to("#flag",{
        opacity:1,
    })
})
slash.addEventListener("mouseleave", function () {
  gsap.to("#flag", {
    opacity: 0,
  });
});


loading_animation();
// cursor_animation();
locomotiveAnimation();
sheryanim();
vidanim();
