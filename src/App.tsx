import { useEffect, useMemo, useState } from 'react';
import { useRecoilState } from 'recoil';

import { CanvasBackground } from './CanvasBackground';
import { activeSectionState, projectsState } from './state';
import type { Project, SectionId } from './types';
import {
  AboutLayout,
  Actions,
  Brand,
  BrandMark,
  Button,
  Card,
  ContactCard,
  ContactLinks,
  ContactSection,
  Eyebrow,
  GlobalStyle,
  HeroPanel,
  HeroTitle,
  IntroSection,
  Lead,
  MetricGrid,
  NavLink,
  NavLinks,
  PageMain,
  PanelHeader,
  ProfileList,
  ProjectCard,
  ProjectGrid,
  ScrollCue,
  Section,
  SectionTitle,
  SiteHeader,
  SkillGrid,
  SkillIndex,
  TerminalLines,
  TextBlock,
} from './styles';

const navItems: Array<{ id: SectionId; label: string }> = [
  { id: 'intro', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Links' },
];

const skillGroups = [
  {
    title: 'Frontend',
    items: ['React', 'TypeScript', 'Styled Components', 'Recoil'],
  },
  {
    title: 'Backend / Data',
    items: ['Node.js', 'Express', 'MariaDB', 'REST API'],
  },
  {
    title: 'Infrastructure',
    items: ['Docker', 'Docker Compose', 'Cloudflare Tunnel', 'Nginx Proxy Manager', 'Portainer'],
  },
  {
    title: 'Android / IoT',
    items: ['Java', 'MQTT', 'Python', 'MicroPython', 'CAD (SolidWorks)'],
  },
];

function isSectionId(value: string | null): value is SectionId {
  return navItems.some((item) => item.id === value);
}

function isProject(value: unknown): value is Project {
  if (!value || typeof value !== 'object') return false;
  const project = value as Project;
  return (
    typeof project.title === 'string' &&
    typeof project.description === 'string' &&
    Array.isArray(project.tags) &&
    project.tags.every((tag) => typeof tag === 'string') &&
    typeof project.href === 'string'
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useRecoilState(activeSectionState);
  const [projects, setProjects] = useRecoilState(projectsState);
  const [projectStatus, setProjectStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    let cancelled = false;

    fetch('/api/projects', { cache: 'no-store' })
      .then((response) => {
        if (!response.ok) throw new Error(`Project API returned ${response.status}`);
        return response.json();
      })
      .then((data: unknown) => {
        if (cancelled) return;
        const nextProjects = Array.isArray(data) ? data.filter(isProject) : [];
        setProjects(nextProjects);
        setProjectStatus('ready');
      })
      .catch(() => {
        if (cancelled) return;
        setProjects([]);
        setProjectStatus('error');
      });

    return () => {
      cancelled = true;
    };
  }, [setProjects]);

  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.16 },
    );

    document.querySelectorAll('[data-reveal]').forEach((node) => revealObserver.observe(node));
    return () => revealObserver.disconnect();
  }, [projects.length, projectStatus]);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('main section[id]'));
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveSection(visible.target.id as SectionId);
        }
      },
      { threshold: [0.28, 0.48, 0.68] },
    );

    sections.forEach((section) => sectionObserver.observe(section));
    return () => sectionObserver.disconnect();
  }, [setActiveSection]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requestedSection = params.get('section');

    if (!isSectionId(requestedSection)) return;
    const target = document.getElementById(requestedSection);
    if (!target) return;

    setActiveSection(requestedSection);
    window.requestAnimationFrame(() => target.scrollIntoView({ block: 'start' }));
  }, [setActiveSection]);

  const projectCards = useMemo(() => {
    if (projectStatus === 'loading') {
      return [1, 2, 3].map((index) => (
        <ProjectCard key={`loading-${index}`} $empty data-reveal>
          <SkillIndex>{String(index).padStart(2, '0')}</SkillIndex>
          <h3>Loading</h3>
          <p>프로젝트 정보를 불러오고 있습니다.</p>
        </ProjectCard>
      ));
    }

    const cards = projects.map((project, index) => (
      <ProjectCard key={project.title} data-reveal>
        <SkillIndex>{String(index + 1).padStart(2, '0')}</SkillIndex>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <ul>
          {project.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        {project.href ? (
          <a href={project.href} target="_blank" rel="noreferrer">
            프로젝트 보기
          </a>
        ) : null}
      </ProjectCard>
    ));

    while (cards.length < 3) {
      const index = cards.length + 1;
      cards.push(
        <ProjectCard key={`empty-${index}`} $empty data-reveal>
          <SkillIndex>{String(index).padStart(2, '0')}</SkillIndex>
          <h3>Coming Soon</h3>
          <p>다음 프로젝트를 준비 중입니다.</p>
        </ProjectCard>,
      );
    }

    return cards;
  }, [projectStatus, projects]);

  return (
    <>
      <GlobalStyle />
      <CanvasBackground />

      <SiteHeader>
        <Brand href="#intro" aria-label="JMLLEM home">
          <BrandMark>JL</BrandMark>
          <span>JMLLEM</span>
        </Brand>
        <NavLinks aria-label="Section navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.id}
              href={`#${item.id}`}
              $active={activeSection === item.id}
              aria-current={activeSection === item.id ? 'page' : undefined}
              onClick={() => setActiveSection(item.id)}
            >
              {item.label}
            </NavLink>
          ))}
        </NavLinks>
      </SiteHeader>

      <PageMain>
        <IntroSection id="intro">
          <div data-reveal>
            <Eyebrow>Portfolio</Eyebrow>
            <HeroTitle>
              JMLLEM<span>Portfolio</span>
            </HeroTitle>
            <Lead>React 기반 포트폴리오로 인프라, 자동화, Android IoT 작업을 정리했습니다.</Lead>
            <Actions>
              <Button $primary href="#projects">
                Projects
              </Button>
              <Button href="#contact">Links</Button>
            </Actions>
          </div>

          <HeroPanel data-reveal aria-label="Portfolio status panel">
            <PanelHeader>
              <span />
              <span />
              <span />
            </PanelHeader>
            <TerminalLines>
              <p>
                <b>$</b> profile summary
              </p>
              <p>frontend: react / typescript</p>
              <p>state: recoil</p>
              <p>data: mariadb / api</p>
              <p>deploy: docker compose</p>
            </TerminalLines>
            <MetricGrid>
              <div>
                <span>Stack</span>
                <strong>React</strong>
              </div>
              <div>
                <span>DB</span>
                <strong>MariaDB</strong>
              </div>
              <div>
                <span>Deploy</span>
                <strong>Docker</strong>
              </div>
            </MetricGrid>
          </HeroPanel>

          <ScrollCue href="#about" aria-label="Scroll to about">
            Scroll
          </ScrollCue>
        </IntroSection>

        <Section id="about">
          <SectionTitle data-reveal>
            <p>About</p>
            <h2>직접 만들고 운영한 것들</h2>
          </SectionTitle>
          <AboutLayout>
            <TextBlock data-reveal>
              <h3>Profile</h3>
              <p>Docker 서비스 운영, 자동화 스크립트, Android IoT 앱 개발 경험을 프로젝트 중심으로 정리했습니다.</p>
            </TextBlock>
            <TextBlock $accent data-reveal>
              <h3>Working Style</h3>
              <p>체계적인 구조를 선호합니다. 배포와 운영 흐름은 명확하고 유지보수하기 쉽게 설계합니다.</p>
              <ProfileList>
                <div>
                  <dt>Focus</dt>
                  <dd>Automation / IoT</dd>
                </div>
                <div>
                  <dt>Runtime</dt>
                  <dd>React / MariaDB</dd>
                </div>
                <div>
                  <dt>Direction</dt>
                  <dd>Practical Projects</dd>
                </div>
              </ProfileList>
            </TextBlock>
          </AboutLayout>
        </Section>

        <Section id="skills">
          <SectionTitle data-reveal>
            <p>Skills</p>
            <h2>사용 기술</h2>
          </SectionTitle>
          <SkillGrid>
            {skillGroups.map((group, index) => (
              <Card key={group.title} data-reveal>
                <SkillIndex>{String(index + 1).padStart(2, '0')}</SkillIndex>
                <h3>{group.title}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Card>
            ))}
          </SkillGrid>
        </Section>

        <Section id="projects">
          <SectionTitle data-reveal>
            <p>Projects</p>
            <h2>프로젝트 목록</h2>
          </SectionTitle>
          <ProjectGrid aria-live="polite">{projectCards}</ProjectGrid>
        </Section>

        <ContactSection id="contact">
          <SectionTitle data-reveal>
            <p>Links</p>
          </SectionTitle>
          <ContactCard data-reveal>
            <div>
              <h3>GitHub / Gmail</h3>
              <p>프로젝트 기록은 GitHub에서 확인할 수 있습니다. 연락은 Gmail로 부탁드립니다.</p>
            </div>
            <ContactLinks>
              <Button $primary href="https://github.com/sigjm" target="_blank" rel="noreferrer">
                GitHub
              </Button>
              <Button href="mailto:sigheartjm@gmail.com">Gmail</Button>
            </ContactLinks>
          </ContactCard>
        </ContactSection>
      </PageMain>
    </>
  );
}
