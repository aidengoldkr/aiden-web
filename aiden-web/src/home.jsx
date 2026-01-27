import { useEffect, useMemo, useState } from 'react'
import { NavLink, useLocation, useNavigate, useOutletContext } from 'react-router-dom'
import LogoLoop from './component/LogoLoop.jsx'
import TextType from './component/textType.jsx'
import Dock from './component/Dock.jsx';
import AnimatedList from './component/AnimatedList.jsx';



function Home({ useParticlesHook, projectData, skillData, educationList, awardList, certList }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { lang = 'ko', toggleLang } = useOutletContext() ?? {}
  const [activeTab, setActiveTab] = useState('education')
  const [heroVisible, setHeroVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(null)
  const featuredProjects = useMemo(() => projectData.slice(0, 6), [projectData])
  const selectedProject = selectedProjectIndex !== null ? featuredProjects[selectedProjectIndex] : null
  const snsItems = [
    { icon: <img width="26" height="26" src="https://img.icons8.com/metro/26/FFFFFF/instagram-new.png" alt="instagram-new"/>, label: 'Instagram', onClick: () => {window.open("https://www.instagram.com/kw_k.9119/","_blank")} },
    { icon: <img width="30" height="30" src="https://img.icons8.com/ios-filled/100/FFFFFF/gmail-new.png" alt="gmail-new"/>, label: 'E-mail', onClick: () => {window.location.href = "mailto:aidengoldkr@gmail.com";} },
    { icon: <img width="32" height="32" src="https://img.icons8.com/glyph-neue/64/FFFFFF/github.png" alt="github"/>, label: 'Github', onClick: () => {window.open("https://github.com/aidengoldkr", "_blank")} },
    { icon: <img width="30" height="30" src="https://img.icons8.com/ios-filled/50/FFFFFF/linkedin.png" alt="linkedin"/>, label: 'Linkedin', onClick: () => {window.open("https://www.linkedin.com/in/kunwoo-kim-62a9b0284/", "_blank")} },
  ];

  useParticlesHook('particles-home')

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [selectedProject])

  useEffect(() => {
    if (location.state?.scrollTo === 'contact') {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
      navigate(location.pathname, { replace: true, state: {} })
    }
  }, [location, navigate])

  useEffect(() => {
    const timer = window.setTimeout(() => setHeroVisible(true), 50)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 800px)')
    const handleChange = () => setIsMobile(mediaQuery.matches)
    handleChange()
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    }
    mediaQuery.addListener(handleChange)
    return () => mediaQuery.removeListener(handleChange)
  }, [])

  const projectTechs = (project) => {
    if (!project?.tech) return []
    if (Array.isArray(project.tech)) return project.tech.filter(Boolean)
    return String(project.tech)
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)
  }
  const goToProject = (offset) => {
    setSelectedProjectIndex((prev) => {
      if (prev === null) return prev
      const total = featuredProjects.length
      return (prev + offset + total) % total
    })
  }
  const logos = [
    { src: "/asset/skill-logo/c-1.svg", alt: "C" },
    { src: "/asset/skill-logo/c.svg", alt: "C++" },
    { src: "/asset/skill-logo/python-5.svg", alt: "Python" },
    { src: "/asset/skill-logo/html-1.svg", alt: "HTML" },
    { src: "/asset/skill-logo/css-3.svg", alt: "CSS" },
    { src: "/asset/skill-logo/javascript-1.svg", alt: "JavaScript" },
    { src: "/asset/skill-logo/react-2.svg", alt: "React" },
    { src: "/asset/skill-logo/redux.svg", alt: "Redux" },
    { src: "/asset/skill-logo/next-js.svg", alt: "Nextjs" },
    { src: "/asset/skill-logo/flutter-logo.svg", alt: "Flutter" },
    { src: "/asset/skill-logo/aws-2.svg", alt: "AWS" },

    { src: "/asset/skill-logo/blender-2.svg", alt: "Blender" },
    { src: "/asset/skill-logo/figma-icon.svg", alt: "Figma" },

    { src: "/asset/skill-logo/adobe-photoshop-2.svg", alt: "Adobe Photoshop" },
    { src: "/asset/skill-logo/adobe-photoshop-lightroom-cc-icon.svg", alt: "Adobe Lightroom" },
    { src: "/asset/skill-logo/premiere-pro-cc.svg", alt: "Adobe Premiere Pro" },
    { src: "/asset/skill-logo/after-effects-1.svg", alt: "Adobe After Effects" },
  ];

  const copy = {
    ko: {
      aboutTitle: '안녕하세요! 주니어 개발자 김건우 입니다.',
      aboutSubtitle: '혁신적인 아이디어를 내고 소프트웨어로 구현하는 것을 즐깁니다',
      aboutHeading: 'About Me',
      skillHeading: 'Skill-Set',
      skillDesc: '프론트엔드부터 클라우드 컴퓨팅, 미디어까지 다양한 분야에 관심이 많습니다.',
      subHero: '김건우, 단국대학교부속소프트웨어고등학교 (6기)',
      prizeHeading: 'Education & Awards',
      eduTitle: 'Education',
      awardTitle: 'Awards',
      certTitle: 'Certificates',
      contactHeading: 'Contact & External',
      portfolioTitle: 'Portfolio',
      portfolioDesc: '제가 진행한 프로젝트와 결과물들을 정리한 페이지 입니다.',
      blogTitle: 'Blog',
      blogDesc: '제가 배우고 경험한 것을 정리, 분석한 테크블로그 입니다.'
    },
    en: {
      aboutTitle: "Hello! I'm Kunwoo Kim, A junior developer.",
      aboutSubtitle: 'I enjoy designing innovative ideas and implementing them in software.',
      aboutHeading: 'About Me',
      skillHeading: 'Skill-Set',
      skillDesc: 'From platforms to mobile and media, I handle a broad range of tech.',
      subHero: 'Kunwoo Kim, Dankook Software High School (6th)',
      prizeHeading: 'Education & Awards',
      eduTitle: 'Education',
      awardTitle: 'Awards',
      certTitle: 'Certificates',
      contactHeading: 'Contact & External',
      portfolioTitle: 'Portfolio',
      portfolioDesc: 'A portfolio page with my projects and outcomes.',
      blogTitle: 'Blog',
      blogDesc: 'A blog for my learning notes and experiences.'
    }
  }

  const t = copy[lang] ?? copy.ko



  return (
    <>
        <section id="home" className="hero">
        <button
          type="button"
          className="lang-toggle"
          onClick={toggleLang}
          aria-label="Toggle language"
        >
          {lang === 'ko' ? 'KR' : 'EN'}
        </button>
        <div id="particles-home" className="particles-layer" aria-hidden="true" />
        <div className={`hero-content ${heroVisible ? 'hero-visible' : ''}`}>
          <div className='main-content'>
            <div className='main-hero'>
              <TextType
                as="span"
                text="Innovative Coding"
                typingSpeed={100}
                pauseDuration={3000}
                loop={false}
                showCursor
                cursorCharacter={isMobile ? "" : "_"}
                className="hero-typed"
              />
            </div>
            <p className='sub-hero'>{t.subHero}</p>
          </div>
        </div>
        </section>

        <section className='aboutme'>
          <div className='subtitle'>{t.aboutHeading}</div>
          <div className='about-contants'>
            <img className='about-img' src='/asset/profile.png'></img>
            <div className='about-desc'>
              <p className='about-title'>{t.aboutTitle}</p>
              <p className='about-subtitle'>{t.aboutSubtitle}</p>
              <div className='about-tags'>
                <a className='birth-tag'># 2009.11.09</a>
                <a className='mbti-tag'># INTJ</a>
                <a href="https://dankook.sen.hs.kr/index.do" className='school-tag' target="_blank" rel="noreferrer"># DKSH 6th</a>
                <a href="https://ipceo.kaist.ac.kr/" className='ipceo-tag' target="_blank" rel="noreferrer"># IP-CEO 14th</a>
              </div>
            </div>
          </div>

        <div className="skill-grid">
          <div className='subtitle'>{t.skillHeading}</div>
          <LogoLoop
            logos={logos}
            speed={60}        
            logoHeight={48}
            gap={56}
            className="logoloop"
          />
          <p>{t.skillDesc}</p>
        </div>
        </section>

        <section className='prize'>
          <div className='subtitle'>{t.prizeHeading}</div>
          <div className='prize-grid'>
            <div className='prize-card'>
              <h3>{t.eduTitle}</h3>
              <ul className='prize-list'>
                {educationList?.map((item, index) => (
                  <li key={`edu-${index}`}>{item?.[lang] ?? item?.kr ?? item?.en ?? ''}</li>
                ))}
              </ul>
            </div>
            <div className='prize-card'>
              <h3>{t.awardTitle}</h3>
              <ul className='prize-list'>
                {awardList?.map((item, index) => (
                  <li key={`award-${index}`}>{item?.[lang] ?? item?.kr ?? item?.en ?? ''}</li>
                ))}
              </ul>
            </div>
            <div className='prize-card'>
              <h3>{t.certTitle}</h3>
              <ul className='prize-list'>
                {certList?.map((item, index) => (
                  <li key={`cert-${index}`}>{item?.[lang] ?? item?.kr ?? item?.en ?? ''}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className='contact'>
          <div className='subtitle'>{t.contactHeading}</div>
          <div className='exter-grid'>
            <div
              className='exter-card exter-card--portfolio'
              onClick={() => alert(lang === 'ko' ? '준비 중 입니다' : 'Coming soon')}
            >
              <div className='exter-card-title'>{t.portfolioTitle}</div>
              <div className='exter-card-desc'>{t.portfolioDesc}</div>
            </div>
            <div
              className='exter-card exter-card--blog'
              onClick={() => alert(lang === 'ko' ? '준비 중 입니다' : 'Coming soon')}
            >
              <div className='exter-card-title'>{t.blogTitle}</div>
              <div className='exter-card-desc'>{t.blogDesc}</div>
            </div>
          </div>
          <div className={`contact-dock dock-appear ${heroVisible ? 'dock-visible' : ''}`}>
            <Dock 
              items={snsItems}
              panelHeight={56}
              baseItemSize={40}
              magnification={60}
              distance={160}
              lockHeight
            />
          </div>
        </section>

      {/*
      <section id="project" className="projects-section">
        <h2>
          Projects - Software
        </h2>
        <div className="grid">
          {featuredProjects.map((project, index) => (
            <div
              key={project.id}
              className="card"
              onClick={() => setSelectedProjectIndex(index)}
              role="button"
            >
              <h3>{project.title}</h3>
              <p>
                {project.description}
              </p>
              <div className="project-tags">
                {projectTechs(project).map((tag) => (
                  <span className="project-tag" key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      */}

      

    </>
  )
}
export default Home
