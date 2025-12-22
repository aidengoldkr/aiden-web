import { useEffect, useMemo, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import LogoLoop from './component/LogoLoop.jsx'
import TextType from './component/textType.jsx'
import Dock from './component/Dock.jsx';
import AnimatedList from './component/AnimatedList.jsx';



function Home({ useParticlesHook, projectData, skillData, educationList, awardList, certList }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('education')
  const [heroVisible, setHeroVisible] = useState(false)
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
    { src: "/asset/skill-logo/flutter-logo.svg", alt: "Flutter" },
    { src: "/asset/skill-logo/aws-2.svg", alt: "AWS" },

    { src: "/asset/skill-logo/blender-2.svg", alt: "Blender" },
    { src: "/asset/skill-logo/figma-icon.svg", alt: "Figma" },

    { src: "/asset/skill-logo/adobe-photoshop-2.svg", alt: "Adobe Photoshop" },
    { src: "/asset/skill-logo/adobe-illustrator-cc-3.svg", alt: "Adobe Illustrator" },
    { src: "/asset/skill-logo/adobe-photoshop-lightroom-cc-icon.svg", alt: "Adobe Lightroom" },
    { src: "/asset/skill-logo/premiere-pro-cc.svg", alt: "Adobe Premiere Pro" },
    { src: "/asset/skill-logo/after-effects-1.svg", alt: "Adobe After Effects" },
  ];


  return (
    <>
      <section id="home" className="hero">
        <div id="particles-home" className="particles-layer" aria-hidden="true" />
        <div className={`hero-content ${heroVisible ? 'hero-visible' : ''}`}>
          <div className='main-content'>
            <h1>
              안녕하세요! 저는 
    
              <TextType
                as="span"
                text={[' 혁신을 추구하는', ' 코드짜는 걸 즐기는', ' 새로운 BM을 찾는']}
                typingSpeed={100}
                deletingSpeed={60}
                pauseDuration={3000}
                loop={true}
                showCursor
                cursorCharacter="|"
                className="hero-typed"
              />
              사람입니다.
            </h1>
            <p>김건우, 단국대학교부속소프트웨어고등학교 6기</p>
          </div>
        </div>
        <div className={`hero-dock dock-appear ${heroVisible ? 'dock-visible' : ''}`}>
          <Dock 
            items={snsItems}
            panelHeight={56}
            baseItemSize={40}
            magnification={60}
            distance={160}
          />
        </div>
      </section>

      <section className='aboutme'>
        <h2>About Me</h2>
        <div className='about-contants'>
          <img src='asset/profile.jpg' className='profile_img'></img>
          <div className='about-desc'>
            <p className='about-title'>안녕하세요! 주니어 개발자 김건우입니다.</p>
            <p className='about-subtitle'>혁신적인 BM을 설계하고 이를 소프트웨어로 구현하는 것을 즐깁니다</p>
            <div className='about-tags'>
              <a className='birth-tag'># 2009.11.09</a>
              <a className='mbti-tag'># INTJ</a>
              <a href="https://dankook.sen.hs.kr/index.do" className='school-tag' target="_blank" rel="noreferrer"># DKSH 6th</a>
              <a href="https://ipceo.kaist.ac.kr/" className='ipceo-tag' target="_blank" rel="noreferrer"># IP-CEO 14th</a>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="skill">
        <h2>Skill-Set</h2>
        <div className="skill-grid">
          <LogoLoop
            logos={logos}
            speed={60}          // 100 → 60
            logoHeight={48}
            gap={56}
            pauseOnHover
          />
        </div>
        <p>프론트엔드 부터 클라우드 컴퓨팅, 미디어까지 다양한 기술에 관심이 많습니다</p>
      </section>

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

      <section id="prizes" className="prizes">
        <div className="prizes-wrap">
          <nav className="prize-tabs" role="tablist" aria-label="Profile tabs">
            <button
              className={`tab ${activeTab === 'education' ? 'active' : ''}`}
              onClick={() => setActiveTab('education')}
              role="tab"
              aria-selected={activeTab === 'education'}
            >
              학력·이수
            </button>
            <button
              className={`tab ${activeTab === 'awards' ? 'active' : ''}`}
              onClick={() => setActiveTab('awards')}
              role="tab"
              aria-selected={activeTab === 'awards'}
            >
              수상 경력
            </button>
            <button
              className={`tab ${activeTab === 'cert' ? 'active' : ''}`}
              onClick={() => setActiveTab('cert')}
              role="tab"
              aria-selected={activeTab === 'cert'}
            >
              자격·기타
            </button>
          </nav>

          <div className="prize-panels">
            <div id="tab-education" className={`panel ${activeTab === 'education' ? 'active' : ''}`} role="tabpanel">
              <AnimatedList
                items={educationList}
                displayScrollbar={false}
                showGradients={false}
                enableArrowNavigation={false}
              />
            </div>

            <div id="tab-awards" className={`panel ${activeTab === 'awards' ? 'active' : ''}`} role="tabpanel">
              <AnimatedList
                items={awardList}
                displayScrollbar={false}
                showGradients={false}
                enableArrowNavigation={false}
              />
            </div>

            <div id="tab-cert-other" className={`panel ${activeTab === 'cert' ? 'active' : ''}`} role="tabpanel">
              <AnimatedList
                items={certList}
                displayScrollbar={false}
                showGradients={false}
                enableArrowNavigation={false}
              />
            </div>
          </div>
        </div>
      </section>

      {selectedProject && (
        <div className="project-modal" role="dialog" aria-modal="true">
          <div className="project-modal__backdrop" onClick={() => setSelectedProjectIndex(null)} />
          <div className="project-modal__content">
            <button className="project-modal__close" onClick={() => setSelectedProjectIndex(null)} aria-label="Close modal">×</button>
            {featuredProjects.length > 1 && (
              <>
                <button
                  className="project-modal__nav project-modal__nav--prev"
                  onClick={() => goToProject(-1)}
                  aria-label="Previous project"
                >
                  {'<'}
                </button>
                <button
                  className="project-modal__nav project-modal__nav--next"
                  onClick={() => goToProject(1)}
                  aria-label="Next project"
                >
                  {'>'}
                </button>
              </>
            )}
            <div className="project-modal__header">
              <div>
                <p className="project-modal__eyebrow">Software Project</p>
                <h2>{selectedProject.title}</h2>
                <p className="project-modal__description">{selectedProject.description}</p>
                <div className="project-tags modal-tags">
                  {projectTechs(selectedProject).map((tag) => (
                    <span className="project-tag" key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
              <div className="project-modal__thumb">
                <img src={(selectedProject.detailImages && selectedProject.detailImages[0]) || selectedProject.image} alt={selectedProject.title} />
              </div>
            </div>

            {selectedProject.details && <p className="project-modal__details">{selectedProject.details}</p>}

            {selectedProject.detailImages && selectedProject.detailImages.length > 0 && (
              <div className="project-modal__images">
                {selectedProject.detailImages.map((src) => (
                  <img src={src} alt={`${selectedProject.title} detail`} key={src} />
                ))}
              </div>
            )}

            {selectedProject.url && (
              <a className="btn" href={selectedProject.url} target="_blank" rel="noreferrer">
                프로젝트 보기
              </a>
            )}
          </div>
        </div>
      )}
    </>
  )
}
export default Home
