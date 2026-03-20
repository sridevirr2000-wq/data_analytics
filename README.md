# Chatbot + Data Analytics App

This project is a modern Angular 21 application featuring:

* Analytics Dashboard (KPIs, Charts, Table)
* Chatbot with voice input
* Speech Recognition integration
* Angular Signals for state management
* Fully responsive UI

## Architecture Overview

* **UI Layer** → Angular Components
* **State Management** → Angular Signals
* **Services Layer**

  * ChatbotService
  * AnalyticsService
  * SpeechRecognitionService

* **External APIs**

  * Browser Speech Recognition API

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd data_analytics
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the application

```bash
ng serve
```

### 4. Open in browser

```
http://localhost:4200
```

## Running Tests

```bash
ng test
```

## Project Structure

```
src/
│
├── app/
│   ├── core/
│   ├── shared/
│   │   ├── models/
│   │   ├── components/
│   │
│   ├── features/
│   │   ├── analytics/
│   │   │   ├── components/
│   │   │   ├── services/
│   │   │
│   │   ├── chatbot/
│   │       ├── components/
│   │       ├── services/
│   │
│   ├── app.routes.ts
│   ├── app.component.ts
│
└── assets/
    └── icons/
```

## Key Features

### Angular Signals

* Used for reactive state management
* Replaces traditional RxJS-heavy state

### Chatbot

* Send/receive messages
* Auto-scroll behavior
* Typing indicator
* Voice input support

### Analytics Dashboard

* KPI cards
* Line / Bar / Doughnut charts
* Searchable & sortable table
* CSV export

## Speech Recognition

Works in:

* Chrome
* Edge

## Technologies Used

* Angular 21
* Chart.js (ng2-charts)
* SCSS
* RxJS
* Web Speech API

## Author

Sridevi RR
