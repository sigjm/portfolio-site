# 📄 JMLLEM Portfolio

인프라 운영, 자동화, Android IoT 프로젝트를 정리한 개인 포트폴리오 웹사이트입니다.  
React 기반 화면, MariaDB 프로젝트 데이터, Docker 배포 구성을 적용해 운영 가능한 형태로 구성했습니다.

🔗 [사이트 바로가기](https://jmllem.com/)

## ✨ 주요 기능

- 🎯 한 화면 흐름으로 구성한 개인 포트폴리오
- 📌 고정형 상단 내비게이션과 섹션 active 표시
- 📱 모바일과 데스크톱을 고려한 반응형 레이아웃
- 🧩 MariaDB 기반 프로젝트 카드 렌더링
- 💫 스크롤 기반 reveal 애니메이션
- 🔐 Express 보안 헤더와 제한된 Docker 실행 설정

## 🛠 기술 스택

- **Frontend**: React, TypeScript, Styled Components
- **상태 관리**: Recoil
- **Backend / API**: Node.js, Express, mysql2
- **데이터베이스**: MariaDB
- **배포**: Docker, Docker Compose
- **UI / Interaction**: CSS Grid, Responsive Layout, Intersection Observer, Canvas
- **Network / Ops**: Cloudflare Tunnel, Nginx Proxy Manager, Portainer
- **Project Stack**: Android, Java, MQTT, Python, MicroPython, CAD (SolidWorks)

## 💡 핵심 기능 설명

### 인터랙티브 포트폴리오

- 섹션 진입 시 자연스럽게 표시되는 reveal 애니메이션
- 상단 메뉴 클릭 시 해당 섹션으로 부드럽게 이동
- 현재 보고 있는 섹션을 내비게이션 active 상태로 표시
- 배경 Canvas 애니메이션으로 포트폴리오 분위기 구성
- Recoil 상태로 현재 섹션과 프로젝트 목록 관리

### 반응형 레이아웃

- 데스크톱에서는 넓은 그리드 기반 섹션 구성
- 모바일에서는 한 줄 상단바와 단일 컬럼 레이아웃 적용
- 고정 헤더와 섹션 이동 간격을 맞춰 콘텐츠 가림 방지
- 긴 기술 스택도 줄바꿈 가능한 칩 형태로 표시

### 프로젝트 데이터

- 프로젝트 목록은 MariaDB `projects` 테이블에서 조회
- 컨테이너 최초 실행 시 기본 프로젝트 데이터를 자동 시드
- API 장애 또는 DB 초기화 실패 시 서버 내 seed 데이터로 응답
- 현재 등록 프로젝트:
  - [cozyIoT](https://github.com/sigjm/cozyIoT): MQTT 기반 Android IoT 제어 앱
  - [portfolio-site](https://github.com/sigjm/portfolio-site): React 기반 개인 포트폴리오 사이트

### 보안 및 배포

- Node/Express 기반 React 빌드 파일 서빙
- Docker Compose로 웹 앱과 MariaDB 실행 구성 관리
- read-only filesystem, `no-new-privileges`, capability 제한 적용
- MariaDB는 외부 포트를 열지 않고 내부 Docker 네트워크에서만 접근
- CSP, HSTS, X-Frame-Options, Referrer-Policy, Permissions-Policy 적용

## 📁 프로젝트 구조

```text
portfolio-site/
├── server/
│   ├── index.mjs
│   ├── projects.mjs
│   └── seed-projects.json
├── src/
│   ├── App.tsx
│   ├── CanvasBackground.tsx
│   ├── state.ts
│   ├── styles.ts
│   └── types.ts
├── tests/
│   └── projects.test.mjs
├── Dockerfile
├── docker-compose.yml
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🔗 링크

- Website: [jmllem.com](https://jmllem.com/)
- GitHub: [github.com/sigjm](https://github.com/sigjm)
- Email: [sigheartjm@gmail.com](mailto:sigheartjm@gmail.com)
