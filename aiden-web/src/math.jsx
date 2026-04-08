import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import solutionsData from './solutions.json';
import './math.css';
function TypewriterText({ text, durationMs = 5000, tickMs = 30 }) {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        if (!text) return;

        let currentLength = 0;
        setDisplayedText('');

        const charsPerTick = Math.max(1, Math.ceil(text.length / (durationMs / tickMs)));

        const timer = setInterval(() => {
            currentLength += charsPerTick;
            if (currentLength >= text.length) {
                setDisplayedText(text);
                clearInterval(timer);
            } else {
                setDisplayedText(text.slice(0, currentLength));
            }
        }, tickMs);

        return () => clearInterval(timer);
    }, [text, durationMs, tickMs]);

    return (
        <div className="markdown-content" style={{ margin: 0 }}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeKatex]}
            >
                {displayedText}
            </ReactMarkdown>
        </div>
    );
}

function AiSolutionCard({ title, icon, content, type }) {
    return (
        <div className={`solution-card ai-card ${type}`}>
            <div className="solution-header ai-header">
                <div className="header-left">
                    <span className="solution-icon">{icon}</span>
                    <h3>{title}</h3>
                </div>
            </div>
            <div className="solution-body ai-body">
                <TypewriterText text={content} />
            </div>
        </div>
    );
}

function MathPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="math-page">
            <div className="math-container">
                <h1 className="math-title">정보처리수학 AI 활용 문제 풀이</h1>
                <div className="top-row">
                    <div className="problem-card">
                        <div className="problem-header">
                            <span className="problem-number">03</span>
                            <span className="problem-source">[2017학년도 11월 고2 학력평가 나형 30번]</span>
                        </div>
                        <div className="problem-content">
                            <p>
                                자연수 <em>m</em>에 대하여 집합 <em>A<sub>m</sub></em>을<br />
                                <span className="problem-equation">
                                    <em>A<sub>m</sub></em> = &#123; <em>ab</em> | log<sub>2</sub> <em>a</em> + log<sub>4</sub> <em>b</em>는 100 이하의 자연수, <br />
                                    <span className="equation-indent"><em>a</em> (1 &le; <em>a</em> &le; <em>m</em>)은 자연수, <em>b</em> = 2<sup><em>k</em></sup> (<em>k</em>는 정수) &#125;</span>
                                </span>
                                라 하자. <em>n</em>(<em>A<sub>m</sub></em>) = 205가 되도록 하는 <em>m</em>의 최댓값을 구하시오.
                            </p>
                        </div>
                        <div className="problem-score">
                            [4점]
                        </div>
                    </div>

                    <div className="student-side">
                        <div className="solution-card student">
                            <div className="solution-header">
                                <span className="solution-icon">🧑‍🎓</span>
                                <h3>학생 풀이</h3>
                            </div>
                            <div className="solution-body">
                                <div className="image-placeholder" onClick={() => setIsModalOpen(true)}>
                                    <img src="./asset/math.jpg" alt="학생 풀이 이미지 첨부 예정" style={{ width: '100%', minHeight: '150px', backgroundColor: '#f1f3f5', borderRadius: '8px', objectFit: 'contain' }} />
                                    <div className="image-hover-overlay">
                                        <span>🔍 클릭하여 확대</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="solutions-section">
                    <h2 className="solutions-title">AI 풀이 비교</h2>
                    <div className="ai-side">
                        <AiSolutionCard
                            type="gpt"
                            title={solutionsData.gpt.title}
                            icon={solutionsData.gpt.icon}
                            content={solutionsData.gpt.content}
                        />
                        <AiSolutionCard
                            type="gemini"
                            title={solutionsData.gemini.title}
                            icon={solutionsData.gemini.icon}
                            content={solutionsData.gemini.content}
                        />
                        <AiSolutionCard
                            type="claude"
                            title={solutionsData.claude.title}
                            icon={solutionsData.claude.icon}
                            content={solutionsData.claude.content}
                        />
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="image-modal-overlay" onClick={() => setIsModalOpen(false)}>
                    <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close-btn" onClick={() => setIsModalOpen(false)}>✕</button>
                        <img src="./asset/math.jpg" alt="학생 풀이 크게 보기" />
                    </div>
                </div>
            )}
        </div>
    )
}

export default MathPage