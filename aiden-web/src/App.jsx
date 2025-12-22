import { Suspense, useEffect, lazy } from 'react'
import {Outlet,Route,Routes,useLocation,useNavigate,} from 'react-router-dom'
import './App.css'
import GlobalClickSpark from './component/ClickSpark.jsx'
import projectData from './data/projects.json'
import prizes from './data/prizes.json'

const Home = lazy(() => import('./home.jsx'))

const particlesConfig = {
  particles: {
    number: { value: 25, density: { enable: true, value_area: 800 } },
    color: { value: '#ffffff' },
    shape: {
      type: 'circle',
      stroke: { width: 0, color: '#000000' },
      polygon: { nb_sides: 5 },
      image: { src: 'img/github.svg', width: 100, height: 100 },
    },
    opacity: { value: 0.6, random: false, anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false } },
    size: { value: 3, random: true, anim: { enable: false, speed: 40, size_min: 0.1, sync: false } },
    line_linked: { enable: true, distance: 200, color: '#00ffd0', opacity: 0.3, width: 0.8 },
    move: {
      enable: true,
      speed: 2,
      direction: 'none',
      random: false,
      straight: false,
      out_mode: 'out',
      bounce: false,
      attract: { enable: false, rotateX: 600, rotateY: 1200 },
    },
  },
  interactivity: {
    detect_on: 'canvas',
    events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'push' }, resize: true },
    modes: {
      grab: { distance: 400, line_linked: { opacity: 1 } },
      bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 1 },
      repulse: { distance: 200, duration: 0.4 },
      push: { particles_nb: 4 },
      remove: { particles_nb: 2 },
    },
  },
  retina_detect: true,
}

const skillData = [
  {
    id: 'c',
    name: 'C / C++',
    description: '기초 문법부터 자료구조, 알고리즘 구현까지 꾸준히 다루고 있습니다.',
    image: '/asset/c.png',
  },
  {
    id: 'python',
    name: 'Python',
    description: '데이터 처리, 자동화 스크립트, 챗봇 구현과 같은 빠른 프로토타이핑에 활용합니다.',
    image: '/asset/python.png',
  },
  {
    id: 'html',
    name: 'HTML',
    description: '정적 페이지부터 단순 랜딩 페이지까지 구조화에 익숙합니다.',
    image: '/asset/html.png',
  },
  {
    id: 'css',
    name: 'CSS',
    description: '다크 테마 기반의 레이아웃과 인터랙션 스타일링 경험이 있습니다.',
    image: '/asset/css.png',
  },
  {
    id: 'flutter',
    name: 'Flutter',
    description: '맵 기반 기능을 중심으로 한 크로스플랫폼 앱을 구현했습니다.',
    image: '/asset/flutter.png',
  },
  {
    id: 'aws',
    name: 'AWS',
    description: '간단한 배포, 서버리스 구성 등 소규모 서비스 운영 경험이 있습니다.',
    image: '/asset/aws.png',
  },
]

const { educationList, awardList, certList } = prizes

function useParticles(containerId) {
  useEffect(() => {
    let cancelled = false

    const initParticles = () => {
      if (cancelled) return
      if (window.particlesJS) {
        try {
          window.particlesJS(containerId, particlesConfig)
        } catch (err) {
          console.error('particles.js init failed', err)
        }
      }
    }

    if (typeof window === 'undefined') return undefined

    if (window.particlesJS) {
      initParticles()
      return undefined
    }

    const existing = document.querySelector('script[data-particles="true"]')
    if (existing) {
      existing.addEventListener('load', initParticles, { once: true })
      return () => {
        cancelled = true
      }
    }

    const script = document.createElement('script')
    script.src = '/particles.js'
    script.async = true
    script.dataset.particles = 'true'
    script.onload = initParticles
    document.body.appendChild(script)

    return () => {
      cancelled = true
    }
  }, [containerId])
}

function Layout() {
  const navigate = useNavigate()
  const location = useLocation()
  const handleContact = () => {
    if (location.pathname === '/') {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
      return
    }
    navigate('/', { state: { scrollTo: 'contact' } })
  }

  return (
    <>
      <main className="page-shell">
        <Outlet />
      </main>
      <footer>&copy; 2025 김건우. All rights reserved.</footer>
    </>
  )
}



function App() {
  return (
    <>
      <GlobalClickSpark sparkColor="#ffffffff" />
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={(
              <Suspense fallback={null}>
                <Home
                  useParticlesHook={useParticles}
                  projectData={projectData}
                  skillData={skillData}
                  educationList={educationList}
                  awardList={awardList}
                  certList={certList}
                />
              </Suspense>
            )}
          />
        </Route>
      </Routes>
    </>
  )
}

export default App
