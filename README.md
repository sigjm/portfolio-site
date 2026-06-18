# JMLLEM Portfolio

개인 포트폴리오 정적 웹사이트입니다. 인프라 운영, 자동화, Android IoT 프로젝트를 한 곳에 정리합니다.

## Stack

- HTML
- CSS
- JavaScript
- Nginx
- Docker Compose

## Structure

```text
portfolio-site/
├── public/
│   ├── index.html
│   ├── main.js
│   ├── projects.json
│   └── styles.css
├── Dockerfile
├── docker-compose.yml
└── nginx.conf
```

## Run

```bash
docker compose up -d --build
```

The site is served by Nginx and bound to `172.17.0.1:3000` for use behind Cloudflare Tunnel.

## Security

- Read-only container filesystem
- Dropped Linux capabilities with only required capabilities added back
- `no-new-privileges`
- CSP, HSTS, frame protection, referrer policy, and MIME sniffing protection headers
