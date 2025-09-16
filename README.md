# Automated Attendance Monitoring & Analytics System - Backend

A robust Django-based backend system for automated attendance monitoring using facial recognition technology.

## Features

- **RESTful API**: Comprehensive API endpoints for all system operations
- **Facial Recognition**: Advanced face detection and recognition using face_recognition library
- **Real-time Updates**: WebSocket support for live attendance notifications
- **Database Models**: Complete data models for students, courses, and attendance tracking
- **Analytics**: Advanced reporting and analytics capabilities
- **Scalable Architecture**: Built for cloud deployment with Docker support

## Tech Stack

- **Framework**: Django 4.2 with Django REST Framework
- **Database**: PostgreSQL
- **Real-time**: Django Channels with Redis
- **Face Recognition**: face_recognition library (dlib-based)
- **Task Queue**: Celery with Redis
- **Containerization**: Docker & Docker Compose

## Quick Start

### Prerequisites

- Python 3.11+
- PostgreSQL
- Redis
- Docker (optional)

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd attendance-backend
   \`\`\`

2. **Create virtual environment**
   \`\`\`bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   \`\`\`

3. **Install dependencies**
   \`\`\`bash
   pip install -r requirements.txt
   \`\`\`

4. **Environment setup**
   \`\`\`bash
   cp .env.example .env
   # Edit .env with your configuration
   \`\`\`

5. **Database setup**
   \`\`\`bash
   python manage.py makemigrations
   python manage.py migrate
   python manage.py createsuperuser
   \`\`\`

6. **Run the server**
   \`\`\`bash
   python manage.py runserver
   \`\`\`

### Docker Setup

1. **Build and run with Docker Compose**
   \`\`\`bash
   docker-compose up --build
   \`\`\`

2. **Run migrations**
   \`\`\`bash
   docker-compose exec web python manage.py migrate
   docker-compose exec web python manage.py createsuperuser
   \`\`\`

## API Documentation

### Authentication
- `POST /api/login/` - User authentication

### Student Management
- `GET /api/students/` - List all students
- `POST /api/students/` - Register new student with photo
- `GET /api/students/{id}/` - Get student details
- `PUT /api/students/{id}/` - Update student information
- `DELETE /api/students/{id}/` - Delete student

### Course Management
- `GET /api/courses/` - List all courses
- `POST /api/courses/` - Create new course
- `GET /api/courses/{id}/` - Get course details
- `PUT /api/courses/{id}/` - Update course
- `DELETE /api/courses/{id}/` - Delete course

### Class Sessions
- `GET /api/sessions/` - List class sessions
- `POST /api/sessions/` - Create new session
- `POST /api/sessions/{id}/start-attendance/` - Start attendance monitoring
- `POST /api/sessions/{id}/stop-attendance/` - Stop attendance monitoring

### Analytics & Reporting
- `GET /api/reports/attendance/` - Attendance reports with filters
- `GET /api/analytics/trends/` - Attendance trends and analytics

### WebSocket Events
- `attendance_event` - Real-time attendance notifications

## Project Structure

\`\`\`
attendance_system/
├── api/                    # Main API application
│   ├── models.py          # Database models
│   ├── views.py           # API views
│   ├── serializers.py     # DRF serializers
│   └── urls.py            # API URLs
├── facial_recognition/     # Face recognition engine
├── realtime/              # WebSocket handling
├── attendance_system/     # Django project settings
├── requirements.txt       # Python dependencies
├── Dockerfile            # Docker configuration
├── docker-compose.yml    # Multi-container setup
└── README.md             # This file
\`\`\`

## Deployment

The application is containerized and ready for cloud deployment on:
- AWS (ECS, EKS, or EC2)
- Google Cloud Platform (Cloud Run, GKE)
- Azure (Container Instances, AKS)
- Any Docker-compatible platform

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

This project is licensed under the MIT License.
