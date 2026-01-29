import { useMemo } from 'react'
import projects from './data/projects.json'
import './portfolio.css'

const CATEGORY_ORDER = [
    { key: 'web', label: 'Web' },
    { key: 'sw', label: 'Software' },
]

function ProjectCard ({ project }) {
    const { title, description, tech, image, url, date } = project

    return (
        <article className='project-card'>
            <div className='card-media'>
                <img src={image} alt={`${title} preview`} />
            </div>
            <div className='card-body'>
                <h3 className='card-title'>{title}</h3>
                <p className='card-desc'>{description}</p>
                {date && <p className='card-date'>{date}</p>}
                <ul className='card-tech'>
                    {tech?.map((item) => (
                        <li key={item}>{item}</li>
                    ))}
                </ul>
                {url ? (
                    <a className='card-link' href={url} target='_blank' rel='noreferrer'>
                        View project
                    </a>
                ) : (
                    <span className='card-link disabled'>Coming soon</span>
                )}
            </div>
        </article>
    )
}

function Portfolio () {
    const projectsByCategory = useMemo(() => {
        return projects.reduce((acc, project) => {
            const key = project.category || 'other'
            if (!acc[key]) acc[key] = []
            acc[key].push(project)
            return acc
        }, {})
    }, [])

    return (
        <>
            <div className='main-title'>
                <h1>Portfolio</h1>
                <p className='desc'>완료 및 진행 중인 프로젝트와 결과물들 입니다.</p>
            </div>
            <div className='project-grid'>
                {CATEGORY_ORDER.map((category) => {
                    const list = projectsByCategory[category.key] || []
                    return (
                        <section key={category.key} className={`${category.key}-grid`}>
                            <h2 className='category-title'>{category.label}</h2>
                            <div className='card-grid'>
                                {list.length === 0 ? (
                                    <p className='empty'>No projects yet.</p>
                                ) : (
                                    list.map((project) => (
                                        <ProjectCard key={project.id} project={project} />
                                    ))
                                )}
                            </div>
                        </section>
                    )
                })}
            </div>
        </>
    )
}

export default Portfolio