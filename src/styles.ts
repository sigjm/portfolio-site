import { createGlobalStyle, styled } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  :root {
    --bg: #070707;
    --surface: rgba(255, 255, 255, 0.06);
    --surface-strong: rgba(255, 255, 255, 0.1);
    --line: rgba(255, 255, 255, 0.12);
    --text: #f8fafc;
    --muted: #b7bbc5;
    --dim: #7d8491;
    --accent: #d9f99d;
    --accent-2: #5eead4;
    --accent-3: #fca5a5;
    --radius: 8px;
    --header-offset: 96px;
    color-scheme: dark;
  }

  html {
    scroll-behavior: smooth;
    scroll-padding-top: var(--header-offset);
  }

  body {
    margin: 0;
    min-height: 100vh;
    background:
      linear-gradient(135deg, rgba(8, 8, 8, 0.96), rgba(31, 16, 28, 0.9) 48%, rgba(7, 24, 19, 0.92)),
      #070707;
    color: var(--text);
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    letter-spacing: 0;
    overflow-x: hidden;
  }

  body::before {
    content: "";
    position: fixed;
    inset: 0;
    z-index: -3;
    background:
      linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px),
      linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px);
    background-size: 44px 44px;
    mask-image: linear-gradient(to bottom, #fff 0%, transparent 84%);
  }

  #root {
    min-height: 100vh;
  }

  #signal-canvas {
    position: fixed;
    inset: 0;
    z-index: -2;
    width: 100%;
    height: 100%;
    opacity: 0.55;
  }

  h1,
  h2,
  h3,
  p {
    letter-spacing: 0;
  }

  [data-reveal] {
    opacity: 0;
    transform: translateY(22px);
    transition: opacity 600ms ease, transform 600ms ease;
  }

  [data-reveal].visible {
    opacity: 1;
    transform: translateY(0);
  }

  @keyframes textFlow {
    0% { background-position: 0% 50%; }
    100% { background-position: 100% 50%; }
  }

  @media (max-width: 680px) {
    :root {
      --header-offset: 128px;
    }
  }
`;

export const SiteHeader = styled.header`
  position: fixed;
  top: 16px;
  left: 50%;
  z-index: 20;
  display: flex;
  width: min(1120px, calc(100vw - 28px));
  min-height: 58px;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 0 14px 0 18px;
  transform: translateX(-50%);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: rgba(8, 8, 9, 0.76);
  box-shadow: 0 18px 48px rgba(0, 0, 0, 0.28);
  backdrop-filter: blur(18px);

  @media (max-width: 680px) {
    top: 8px;
    width: calc(100vw - 16px);
    min-height: auto;
    align-items: stretch;
    flex-direction: column;
    gap: 8px;
    padding: 9px;
  }
`;

export const Brand = styled.a`
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  gap: 10px;
  color: #fff;
  font-size: 14px;
  font-weight: 900;
  text-decoration: none;

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 3px;
  }

  @media (max-width: 680px) {
    justify-content: center;
  }
`;

export const BrandMark = styled.span`
  display: grid;
  width: 32px;
  height: 32px;
  place-items: center;
  border-radius: var(--radius);
  background: var(--accent);
  color: #12160c;
  font-size: 13px;
`;

export const NavLinks = styled.nav`
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 4px;

  @media (max-width: 680px) {
    width: 100%;
    justify-content: center;
    overflow-x: auto;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const NavLink = styled.a<{ $active: boolean }>`
  display: inline-flex;
  flex: 0 0 auto;
  min-height: 34px;
  align-items: center;
  padding: 0 11px;
  border-radius: var(--radius);
  background: ${({ $active }) => ($active ? 'rgba(255, 255, 255, 0.08)' : 'transparent')};
  color: ${({ $active }) => ($active ? '#fff' : '#d8dbe2')};
  font-size: 13px;
  font-weight: 800;
  text-decoration: none;
  white-space: nowrap;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    color: #fff;
  }

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 3px;
  }

  @media (max-width: 680px) {
    min-height: 32px;
    padding: 0 9px;
    font-size: 12px;
  }
`;

export const PageMain = styled.main`
  width: min(1120px, calc(100vw - 32px));
  margin: 0 auto;
`;

export const Section = styled.section`
  position: relative;
  scroll-margin-top: var(--header-offset);
  min-height: 100vh;
  padding: 118px 0 96px;

  @media (max-width: 680px) {
    padding: 136px 0 72px;
  }
`;

export const IntroSection = styled(Section)`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 370px;
  gap: 54px;
  align-items: center;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

export const Eyebrow = styled.p`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 20px;
  color: var(--accent);
  font-size: 13px;
  font-weight: 900;
  letter-spacing: 0.14em;
  text-transform: uppercase;

  &::before {
    content: "";
    display: block;
    width: 34px;
    height: 2px;
    background: var(--accent);
  }
`;

export const HeroTitle = styled.h1`
  margin: 0;
  color: #fff;
  font-size: 7.5rem;
  font-weight: 950;
  line-height: 0.88;

  span {
    display: block;
    color: transparent;
    background: linear-gradient(90deg, #fff 0%, var(--accent) 38%, var(--accent-2) 72%, var(--accent-3) 100%);
    background-size: 220% 100%;
    background-clip: text;
    -webkit-background-clip: text;
    animation: textFlow 8s ease-in-out infinite alternate;
  }

  @media (max-width: 980px) {
    font-size: 5.25rem;
  }

  @media (max-width: 560px) {
    font-size: 3.35rem;
  }
`;

export const Lead = styled.p`
  max-width: 720px;
  margin: 28px 0 0;
  color: #d7d9df;
  font-size: 1.375rem;
  line-height: 1.72;
  word-break: keep-all;

  @media (max-width: 560px) {
    font-size: 1.05rem;
  }
`;

export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 32px;
`;

export const Button = styled.a<{ $primary?: boolean }>`
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  border: 1px solid ${({ $primary }) => ($primary ? 'transparent' : 'var(--line)')};
  border-radius: var(--radius);
  background: ${({ $primary }) => ($primary ? 'var(--accent)' : 'rgba(255,255,255,0.06)')};
  color: ${({ $primary }) => ($primary ? '#11140b' : 'var(--text)')};
  font-size: 14px;
  font-weight: 900;
  text-decoration: none;

  &:hover {
    border-color: rgba(217,249,157,0.42);
    background: ${({ $primary }) => ($primary ? 'var(--accent)' : 'rgba(255,255,255,0.1)')};
  }

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 3px;
  }
`;

export const HeroPanel = styled.aside`
  position: relative;
  min-height: 440px;
  padding: 22px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  overflow: hidden;
  background: linear-gradient(180deg, rgba(255,255,255,0.09), rgba(255,255,255,0.025)), rgba(16,16,18,0.88);
  box-shadow: 0 28px 70px rgba(0, 0, 0, 0.42);

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background:
      linear-gradient(90deg, transparent 0 22%, rgba(217,249,157,0.08) 22% 23%, transparent 23% 100%),
      linear-gradient(0deg, transparent 0 34%, rgba(94,234,212,0.08) 34% 35%, transparent 35% 100%);
    background-size: 120px 120px;
    opacity: 0.56;
  }

  @media (max-width: 980px) {
    min-height: 340px;
  }
`;

export const PanelHeader = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  gap: 7px;
  margin-bottom: 30px;

  span {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--accent-3);
  }

  span:nth-child(2) {
    background: var(--accent);
  }

  span:nth-child(3) {
    background: var(--accent-2);
  }
`;

export const TerminalLines = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  gap: 15px;
  color: #e9edf3;
  font-family: "SFMono-Regular", Consolas, "Liberation Mono", monospace;
  font-size: 14px;

  p {
    margin: 0;
  }

  b {
    color: var(--accent);
  }
`;

export const MetricGrid = styled.div`
  position: absolute;
  right: 22px;
  bottom: 22px;
  left: 22px;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;

  div {
    min-width: 0;
    padding: 16px 14px;
    border: 1px solid var(--line);
    border-radius: var(--radius);
    background: rgba(0,0,0,0.28);
  }

  span {
    display: block;
    color: var(--dim);
    font-size: 12px;
    font-weight: 800;
  }

  strong {
    display: block;
    margin-top: 8px;
    overflow-wrap: anywhere;
    color: #fff;
    font-size: 16px;
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

export const ScrollCue = styled.a`
  position: absolute;
  bottom: 28px;
  left: 0;
  color: var(--muted);
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 0.14em;
  text-decoration: none;
  text-transform: uppercase;
`;

export const SectionTitle = styled.div`
  p {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    margin: 0 0 20px;
    color: var(--accent);
    font-size: 13px;
    font-weight: 900;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  p::before {
    content: "";
    display: block;
    width: 34px;
    height: 2px;
    background: var(--accent);
  }

  h2 {
    max-width: 780px;
    margin: 0 0 38px;
    color: #fff;
    font-size: 3.5rem;
    line-height: 1.05;
  }

  @media (max-width: 680px) {
    h2 {
      font-size: 2.25rem;
    }
  }
`;

export const AboutLayout = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: 16px;

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
  }
`;

export const TextBlock = styled.article<{ $accent?: boolean }>`
  padding: 30px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: ${({ $accent }) => ($accent ? 'rgba(217,249,157,0.08)' : 'var(--surface)')};

  h3 {
    margin: 0 0 18px;
    font-size: 1.2rem;
  }

  p {
    margin: 0;
    color: var(--muted);
    font-size: 1rem;
    line-height: 1.78;
    word-break: keep-all;
  }
`;

export const ProfileList = styled.dl`
  display: grid;
  gap: 12px;
  margin: 28px 0 0;

  div {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    padding-top: 12px;
    border-top: 1px solid var(--line);
  }

  dt {
    color: var(--dim);
    font-size: 13px;
    font-weight: 900;
  }

  dd {
    margin: 0;
    color: #fff;
    font-size: 13px;
    font-weight: 900;
    text-align: right;
  }
`;

export const SkillGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;

  @media (max-width: 1020px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const Card = styled.article`
  min-width: 0;
  padding: 24px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--surface);

  h3 {
    margin: 18px 0 18px;
    color: #fff;
    font-size: 1.15rem;
  }

  p {
    margin: 0;
    color: var(--muted);
    line-height: 1.7;
    word-break: keep-all;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li {
    max-width: 100%;
    padding: 7px 10px;
    border: 1px solid rgba(255,255,255,0.11);
    border-radius: var(--radius);
    color: #e6eaf0;
    font-size: 12px;
    font-weight: 800;
    overflow-wrap: anywhere;
  }
`;

export const SkillIndex = styled.span`
  color: var(--accent);
  font-size: 12px;
  font-weight: 950;
  letter-spacing: 0.12em;
`;

export const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

export const ProjectCard = styled(Card)<{ $empty?: boolean }>`
  min-height: 280px;
  background: ${({ $empty }) => ($empty ? 'rgba(255,255,255,0.035)' : 'var(--surface)')};

  a {
    display: inline-flex;
    margin-top: 22px;
    color: var(--accent);
    font-size: 13px;
    font-weight: 900;
    text-decoration: none;
  }
`;

export const ContactSection = styled(Section)`
  min-height: auto;
`;

export const ContactCard = styled.article`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 28px;
  padding: 30px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: rgba(255,255,255,0.07);

  h3 {
    margin: 0 0 12px;
    color: #fff;
    font-size: 1.3rem;
  }

  p {
    margin: 0;
    color: var(--muted);
    line-height: 1.72;
    word-break: keep-all;
  }

  @media (max-width: 720px) {
    align-items: flex-start;
    flex-direction: column;
  }
`;

export const ContactLinks = styled(Actions)`
  margin-top: 0;
  flex: 0 0 auto;
`;
