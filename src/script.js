// 안전한 초기화: DOM이 준비되고 particles.js가 로드된 후에 초기화
document.addEventListener('DOMContentLoaded', function () {
  function initParticles() {
        console.log('initParticles: called');
        if (window.particlesJS) {
            console.log('particlesJS already available');
            particlesJS.load('particles-js', 'particles.json', function () {
                console.log('callback - particles.js config loaded');
            });
        } else {
            console.log('particlesJS not available yet, loading dynamically...');
      // particles.js가 아직 없으면 동적으로 로드
      var s = document.createElement('script');
      s.src = 'particles.js';
      s.onload = function () {
                console.log('particles.js script loaded via dynamic append');
                if (window.particlesJS) {
                    particlesJS.load('particles-js', 'particles.json', function () {
                        console.log('particles.js loaded and config loaded');
                    });
                } else {
                    console.error('particlesJS not available after loading particles.js');
                }
      };
      s.onerror = function () {
                console.error('Failed to load particles.js');
      };
      document.body.appendChild(s);
        }
  }

  initParticles();
});

// --- 대체: file:// 환경에서도 동작하도록 particles.json을 인라인 config로 사용 ---
// (원하시면 위의 기존 방식 대신 아래로 완전히 교체합니다)
document.addEventListener('DOMContentLoaded', function () {
    var particlesConfig = {
        "particles": {
            "number": { "value": 50, "density": { "enable": true, "value_area": 710.2328774690454 } },
            "color": { "value": "#ffffff" },
            "shape": {
                "type": "circle",
                "stroke": { "width": 0, "color": "#000000" },
                "polygon": { "nb_sides": 5 },
                "image": { "src": "img/github.svg", "width": 100, "height": 100 }
            },
            "opacity": { "value": 0.7375695479981405, "random": false, "anim": { "enable": false, "speed": 1, "opacity_min": 0.1, "sync": false } },
            "size": { "value": 4, "random": true, "anim": { "enable": false, "speed": 40, "size_min": 0.1, "sync": false } },
            "line_linked": { "enable": true, "distance": 173.61248115909999, "color": "#00ffd0", "opacity": 0.4, "width": 1 },
            "move": { "enable": true, "speed": 3, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false, "attract": { "enable": false, "rotateX": 600, "rotateY": 1200 } }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
            "modes": { "grab": { "distance": 400, "line_linked": { "opacity": 1 } }, "bubble": { "distance": 400, "size": 40, "duration": 2, "opacity": 8, "speed": 1 }, "repulse": { "distance": 200, "duration": 0.4 }, "push": { "particles_nb": 4 }, "remove": { "particles_nb": 2 } }
        },
        "retina_detect": true
    };

    function initInline() {
        console.log('initInline: initializing particles with inline config');
        if (window.particlesJS) {
            try {
                // particlesJS(tagId, paramsObject) 초기화
                particlesJS('particles-js', particlesConfig);
                console.log('particles initialized via particlesJS(tagId, config)');
                return;
            } catch (e) {
                console.warn('particlesJS init failed:', e);
            }
        }

        // particlesJS가 아직 없다면 동적으로 로드 후 초기화
        var s = document.createElement('script');
        s.src = 'particles.js';
        s.onload = function () {
            if (window.particlesJS) {
                try {
                    particlesJS('particles-js', particlesConfig);
                    console.log('particles.js loaded then initialized (inline config)');
                } catch (err) {
                    console.error('Failed to initialize particles after dynamic load:', err);
                }
            } else {
                console.error('particlesJS still not available after loading particles.js');
            }
        };
        s.onerror = function () {
            console.error('Failed to dynamically load particles.js');
        };
        document.body.appendChild(s);
    }

    // 실행
    initInline();
});

    // Tabs for prizes: horizontal tabs click handler
    document.addEventListener('DOMContentLoaded', function () {
        var tabs = document.querySelectorAll('.prize-tabs .tab');
        var panels = document.querySelectorAll('.prize-panels .panel');
        if (!tabs.length) return;

        function activate(i) {
            tabs.forEach(function (t, idx) {
                var active = idx === i;
                t.classList.toggle('active', active);
                t.setAttribute('aria-selected', active ? 'true' : 'false');
            });
            panels.forEach(function (p, idx) {
                p.classList.toggle('active', idx === i);
            });
        }

        tabs.forEach(function (t, i) {
            t.addEventListener('click', function () { activate(i); });
        });
    });

    // Toggle collapse sections (e.g. 중등교내대회 block)
    
    // Vanilla JS accordion to replace jQuery usage
    
// Make .projects .card clickable when they have a data-url attribute
document.addEventListener('DOMContentLoaded', function () {
    var cards = document.querySelectorAll('.projects .card');
    cards.forEach(function (card) {
        var url = card.getAttribute('data-url');
        if (!url) return;

        // make it keyboard accessible
        card.setAttribute('role', 'link');
        card.setAttribute('tabindex', '0');

        function openCard() {
            var target = card.getAttribute('data-target');
            if (target === '_blank') {
                window.open(url, '_blank');
            } else {
                window.location.href = url;
            }
        }

        card.addEventListener('click', openCard);
        card.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openCard();
            }
        });
    });
});

document.getElementById('sortOption').addEventListener('change', function () {
  const container = document.getElementById('projectContainer');
  const cards = Array.from(container.children);
  const sortBy = this.value;

  cards.sort((a, b) => {
    if (sortBy === 'size') {
      return Number(a.dataset.size) - Number(b.dataset.size);
    } else if (sortBy === 'date') {
      return new Date(b.dataset.date) - new Date(a.dataset.date);
    }
  });

  cards.forEach(card => container.appendChild(card));
});

const cards = document.querySelectorAll(".project-card");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
});
cards.forEach(card => observer.observe(card));

// --- 정렬 기능 ---
const projectList = document.getElementById("projectList");
const sortSizeBtn = document.getElementById("sort-size");
const sortTimeBtn = document.getElementById("sort-time");

function sortProjects(type) {
  const projects = Array.from(projectList.children);
  projects.sort((a, b) => {
    if (type === "size") return b.dataset.size - a.dataset.size;
    else if (type === "time") return new Date(b.dataset.time) - new Date(a.dataset.time);
  });
  projectList.innerHTML = "";
  projects.forEach(p => projectList.appendChild(p));
}

sortSizeBtn.addEventListener("click", () => sortProjects("size"));
sortTimeBtn.addEventListener("click", () => sortProjects("time"));

// 정렬 기능 (이미 있는 코드 뒤에 추가)
const sortSelect = document.getElementById('sortOption');
const projectContainer = document.getElementById('projectContainer');

sortSelect.addEventListener('change', () => {
  const cards = Array.from(projectContainer.querySelectorAll('.project-card'));
  const option = sortSelect.value;

  cards.sort((a, b) => {
    if (option === 'size') {
      return b.dataset.size - a.dataset.size;
    } else if (option === 'date') {
      return new Date(b.dataset.date) - new Date(a.dataset.date);
    }
  });

  cards.forEach(card => projectContainer.appendChild(card));
});
