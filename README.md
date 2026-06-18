# 📄 JMLLEM Portfolio

인프라 운영, 자동화, Android IoT 프로젝트를 정리한 개인 포트폴리오 웹사이트입니다.  
정적 웹 구조 위에 섹션 이동, 프로젝트 카드, 반응형 레이아웃, 보안 헤더를 적용해 간결하게 구성했습니다.

🔗 [사이트 바로가기](https://jmllem.com/)

## ✨ 주요 기능

- 🎯 한 화면 흐름으로 구성한 개인 포트폴리오
- 📌 고정형 상단 내비게이션과 섹션 active 표시
- 📱 모바일과 데스크톱을 고려한 반응형 레이아웃
- 🧩 `projects.json` 기반 프로젝트 카드 렌더링
- 💫 스크롤 기반 reveal 애니메이션
- 🔐 Nginx 보안 헤더와 제한된 Docker 실행 설정

## 🛠 기술 스택

- **Frontend**: HTML, CSS, JavaScript
- **상태 관리**: 별도 상태 관리 라이브러리 없음
- **데이터베이스**: 없음 (`projects.json` 정적 데이터 사용)
- **배포**: Docker, Docker Compose, Nginx
- **UI / Interaction**: CSS Grid, Responsive Layout, Intersection Observer, Canvas
- **Network / Ops**: Cloudflare Tunnel, Nginx Proxy Manager, Portainer
- **Project Stack**: Android, Java, MQTT, Python, MicroPython, CAD (SolidWorks)

## 💡 핵심 기능 설명

### 인터랙티브 포트폴리오

- 섹션 진입 시 자연스럽게 표시되는 reveal 애니메이션
- 상단 메뉴 클릭 시 해당 섹션으로 부드럽게 이동
- 현재 보고 있는 섹션을 내비게이션 active 상태로 표시
- 배경 Canvas 애니메이션으로 포트폴리오 분위기 구성

### 반응형 레이아웃

- 데스크톱에서는 넓은 그리드 기반 섹션 구성
- 모바일에서는 한 줄 상단바와 단일 컬럼 레이아웃 적용
- 고정 헤더와 섹션 이동 간격을 맞춰 콘텐츠 가림 방지
- 긴 기술 스택도 줄바꿈 가능한 칩 형태로 표시

### 프로젝트 데이터 분리

- 프로젝트 목록은 `public/projects.json`에서 관리
- 새 프로젝트 추가 시 JSON 데이터만 확장하면 카드 UI에 반영
- 현재 등록 프로젝트:
  - [cozyIoT](https://github.com/sigjm/cozyIoT): MQTT 기반 Android IoT 제어 앱

### 보안 및 배포

- Nginx 기반 정적 파일 서빙
- Docker Compose로 컨테이너 실행 구성 관리
- read-only filesystem, `no-new-privileges`, capability 제한 적용
- CSP, HSTS, X-Frame-Options, Referrer-Policy, Permissions-Policy 적용

## 📁 프로젝트 구조

```text
portfolio-site/
├── public/
│   ├── index.html
│   ├── main.js
│   ├── projects.json
│   └── styles.css
├── Dockerfile
├── docker-compose.yml
├── nginx.conf
└── README.md
```

## 🚀 실행 방법

```bash
docker compose up -d --build
```

## 🔗 링크

- Website: [jmllem.com](https://jmllem.com/)
- GitHub: [github.com/sigjm](https://github.com/sigjm)
- Email: [sigheartjm@gmail.com](mailto:sigheartjm@gmail.com)
