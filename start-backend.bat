@echo off
echo Starting FastAPI Backend...
cd backend
set PYTHON_CMD=python
if exist "venv\Scripts\python.exe" (
    set PYTHON_CMD=venv\Scripts\python.exe
)
if not exist "app\ml\fraud_model.joblib" (
    echo Model not found. Training model first...
    %PYTHON_CMD% train_model.py
)
echo Starting API server on http://localhost:8000
%PYTHON_CMD% -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
pause
