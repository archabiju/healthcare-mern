# AI Healthcare Disease Prediction System using MERN Stack and Machine Learning

## 1. Introduction
Artificial Intelligence is transforming the healthcare industry by enabling early disease detection and predictive analytics. Chronic diseases such as diabetes and heart disease require continuous monitoring and early identification to prevent serious complications. Machine learning techniques can analyze medical parameters and identify hidden patterns that help in predicting disease risks.

The **AI Healthcare Disease Prediction System** is a web-based intelligent healthcare platform that predicts the probability of diabetes and heart disease using machine learning algorithms. The system allows users to enter health parameters such as glucose level, BMI, blood pressure, cholesterol, and age to receive an instant risk prediction.

The application is developed using the MERN stack for web development and Python-based machine learning models for prediction. The system aims to provide an accessible and user-friendly platform for preliminary health risk assessment.

## 2. Problem Statement
Chronic diseases are one of the major causes of mortality worldwide. Many patients are diagnosed only after symptoms become severe due to lack of early screening tools. Traditional diagnostic procedures require medical tests and consultation which may delay preventive care.

The main problems addressed by this project include:
- Lack of early disease prediction systems
- Limited access to preventive healthcare tools
- Manual analysis of medical data
- Absence of AI-assisted healthcare platforms
- Lack of centralized health prediction systems

This project proposes an AI-driven healthcare prediction system to provide early disease risk assessment using machine learning models.

## 3. Objectives of the Project
- Develop an AI-based healthcare disease prediction system
- Predict diabetes risk using machine learning
- Predict heart disease risk using machine learning
- Provide a web interface for disease prediction
- Store user prediction history
- Implement secure user authentication
- Provide health recommendations
- Create dashboards for prediction analytics

## 4. Scope of the Project
The system focuses on disease risk prediction based on medical datasets and is intended for educational and research purposes.

**Features:**
- AI based disease prediction
- Web-based prediction interface
- Prediction history management
- Health recommendations
- Secure user authentication

**Out of Scope:**
- Real time hospital integration
- Medical device integration
- Clinical decision replacement
- Emergency healthcare services

## 5. System Architecture
The system follows a modular architecture:
- **Presentation Layer:** React user interface.
- **Application Layer:** Node.js backend API.
- **Machine Learning Layer:** Python prediction service (FastAPI).
- **Data Layer:** MongoDB database.

```text
User Interface (React) -> Node Backend (Express API) -> ML Prediction Service (Python FastAPI) -> MongoDB Database
```

## 6. Technology Stack
- **Frontend:** React.js, Bootstrap/Material UI, Axios, Chart.js
- **Backend:** Node.js, Express.js, JWT, bcrypt, Mongoose
- **ML:** Python, Pandas, NumPy, Scikit Learn, Joblib, FastAPI
- **Database:** MongoDB

## 7. Machine Learning Methodology
- **Diabetes:** Logistic Regression, Random Forest, SVM (Dataset: Glucose, BMI, BP, etc.)
- **Heart Disease:** Random Forest, Logistic Regression (Dataset: Age, Sex, Cholesterol, BP, etc.)
- **Storage:** Models saved as `.pkl` via Joblib.

## 9. Azure Cloud Deployment Architecture
The system is fully deployed on Microsoft Azure using a modern, scalable cloud-native architecture:

| Azure Service | URL / Component | Role |
| :--- | :--- | :--- |
| **App Service (Backend)** | [https://backend-api-hck99.azurewebsites.net](https://backend-api-hck99.azurewebsites.net) | Node.js API & Frontend Hosting |
| **App Service (ML)** | [https://ml-service-hck99.azurewebsites.net](https://ml-service-hck99.azurewebsites.net) | Python FastAPI Prediction Engine |
| **Static Web App** | `healthcare-frontend` | Optimized Global Frontend Delivery |
| **Key Vault** | `healthcare-kv-895` | Secure Secret Management (managed identity) |
| **App Insights** | `healthcare-insights` | Real-time Monitoring & Telemetry |
| **Storage Account** | `healthcarestore8039` | Scalable Storage for ML Model Artifacts |
| **Database** | MongoDB Atlas | Global NoSQL Data Store |

### Security Implementation
- **Managed Identity**: Uses Azure System-Assigned Identities to eliminate hardcoded credentials.
- **Key Vault References**: Application secrets are retrieved dynamically at runtime using `@Microsoft.KeyVault` syntax.
- **HTTPS/SSL**: All endpoints are secured with automated SSL certificate management.

## 10. Development Progress
- [x] Initialize Repository
- [x] Node.js Backend with Express
- [x] React Frontend Interface
- [x] Python ML Service (FastAPI)
- [x] Azure Cloud Infrastructure Provisioning
- [x] Key Vault & Secret Management Integration
- [x] Application Insights Monitoring
- [x] **Production Deployment on Azure** (Completed)
