# JMLLEM Portfolio

개인 포트폴리오 웹사이트입니다. 인프라 운영, 자동화, Android IoT 프로젝트를 중심으로 작업 기록과 기술 스택을 정리했습니다.

## Live

- Website: [jmllem.com](https://jmllem.com)
- GitHub: [github.com/sigjm](https://github.com/sigjm)
- Contact: [sigheartjm@gmail.com](mailto:sigheartjm@gmail.com)

## Overview

이 사이트는 단일 정적 페이지로 구성된 포트폴리오입니다. 소개, 사용 기술, 프로젝트 목록, 연락 채널을 한 화면 흐름 안에서 확인할 수 있도록 만들었습니다.

주요 구성:

- 고정형 상단 내비게이션
- 섹션별 스크롤 이동 및 active 상태 표시
- 반응형 레이아웃
- 프로젝트 데이터를 `projects.json`으로 분리
- Docker/Nginx 기반 배포
- 보안 헤더와 제한된 컨테이너 실행 설정

## Sections

### Intro

인프라, 자동화, Android IoT 작업을 간결하게 소개합니다.

### About

Docker 서비스 운영, 자동화 스크립트, Android IoT 앱 개발 경험을 정리합니다.

### Skills

- Infrastructure: Docker, Nginx Proxy Manager, Cloudflare Tunnel, Portainer
- Automation: AI Workflow, Shell, Monitoring, Ops Script
- Cloud Services: Immich, File Browser, Private Storage, Media Archive
- Android / IoT: Java, Android SDK, Gradle, MQTT, Python, MicroPython, CAD (SolidWorks)

### Projects

현재 등록된 프로젝트:

- [cozyIoT](https://github.com/sigjm/cozyIoT): MQTT 기반 Android IoT 제어 앱

### Links

GitHub와 Gmail 연락 채널을 제공합니다.

## Tech Stack

- HTML
- CSS
- JavaScript
- Nginx
- Docker Compose

## Project Structure

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

## Run

```bash
docker compose up -d --build
```

## Security

- Read-only container filesystem
- `no-new-privileges`
- Dropped Linux capabilities with required capabilities added back explicitly
- CSP, HSTS, X-Frame-Options, Referrer-Policy, Permissions-Policy 적용
- Static files served through Nginx

## Repository

이 저장소는 포트폴리오 사이트의 소스와 배포 구성을 함께 관리합니다.
