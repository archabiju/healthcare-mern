# Start All Services for AI Healthcare Prediction System

# 1. Start ML Service (Python FastAPI)
Write-Host "Starting ML Service..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd ml_service; .\venv\Scripts\Activate.ps1; python main.py"

# 2. Start Backend (Node.js Express)
Write-Host "Starting Backend..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd server; npm start"

# 3. Start Frontend (React Vite)
Write-Host "Starting Frontend..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm run dev"

Write-Host "All services starting! Check separate terminals." -ForegroundColor Magenta
