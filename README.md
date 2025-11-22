# CRODE

**CRODE** is 100byte’s personal portfolio and project hub.  
It showcases real-world infrastructure, networking, and automation work based on datacenter Ops experience.

> Infra · Network · Automation — built and documented by 100byte.

---

## Overview

CRODE is a simple multi-page site inspired by layouts like Supabase:

- A clean top navigation bar
- Separate pages for:
  - `Home`
  - `About`
  - `Projects`
  - `Blog`
  - `Contact`

The goal is to present:

- Datacenter Ops experience (IDC 운영, 장애 대응, 자산/출입 관리)
- Networking & DevOps skills
- Internal tools and experiments (VCC, NetDocs, DoTree, Auto Reels Factory / R2K, etc.)

---

## Tech Stack

- **Backend / Framework**
  - Python
  - Django

- **Frontend**
  - HTML templates (Django templates)
  - Bootstrap 5 (via CDN)
  - Custom dark theme + green accent (Supabase-like)

- **Other**
  - SQLite for local development
  - GitHub for version control and hosting the source

---

## Pages

### Home (`/`)

- Hero section with a short introduction:
  - Infra · Network · Automation
  - “Build in the datacenter. Grow as an engineer.”
- Highlight of key projects:
  - VCC (VMS Compliance Checker)
  - NetDocs
  - DoTree
  - R2K / Auto Reels Factory

### About (`/about`)

- Short profile of 100byte
- Focus on:
  - Datacenter Ops background
  - Target role: Systems / Infra / Network Engineer
  - Interests: automation, monitoring, documentation, networking (CCNP level)

### Projects (`/projects`)

- Cards describing major projects:
  - **VCC** – IDC 출입/자산 로그와 카드 권한을 자동 대조하는 컴플라이언스 도구
  - **NetDocs** – 네트워크/IDC 문서화 템플릿 & 위키 구조
  - **DoTree** – 기획→구현→운영→회고까지 이어지는 작업 관리 시스템
  - **R2K / Auto Reels Factory** – 트렌드 기반 콘텐츠 자동 생성 파이프라인

### Blog (`/blog`)

- Links to external posts (e.g. velog)
- Will be used later as a hub for:
  - Networking basics
  - Automation / tooling write-ups
  - Project postmortems

### Contact (`/contact`)

- Basic contact information:
  - Email
  - GitHub
  - Blog

---

## Project Structure

Simplified layout:

```text
CRODE/
  crode_site/          # Django project settings and URL routing
  main/                # Main app: views for home/about/projects/blog/contact
  templates/           # Django templates (base.html, home.html, etc.)
  static/              # Static assets (CSS, JS, images)
  db.sqlite3           # Local dev database
  manage.py


⸻

Getting Started

1. Clone the repository

git clone https://github.com/croc100/CRODE.git
cd CRODE

2. Create and activate a virtual environment

python -m venv .venv
# macOS / Linux
source .venv/bin/activate
# Windows (PowerShell)
# .venv\Scripts\Activate.ps1

3. Install dependencies

pip install -r requirements.txt

(If requirements.txt does not exist yet, you can start with:)

pip install django
pip freeze > requirements.txt

4. Apply migrations

python manage.py migrate

5. Run the development server

python manage.py runserver

Then open:
	•	http://127.0.0.1:8000/

⸻

Development Notes
	•	This project is primarily for personal portfolio and practice:
	•	Clean, readable layout rather than heavy frontend frameworks
	•	Focus on Django structure and content
	•	Future ideas:
	•	Add a simple admin-editable project list
	•	Blog posts pulled from an API or markdown files
	•	Deployment on a VPS or cloud provider with proper CI/CD

⸻

License / Usage

© 2025 CRODE — Built by 100byte.

All content in this repository is provided for personal portfolio and educational purposes.
Commercial use, redistribution, or modification for profit is not allowed without explicit permission from the author.

If you want to reference or reuse parts of this project, please reach out first.

