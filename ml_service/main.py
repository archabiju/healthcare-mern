from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import os
import random

app = FastAPI()

# Model paths (placeholder, assumes models will be trained and placed in models/ directory)
DIABETES_MODEL_PATH = "models/diabetes_model.pkl"
HEART_MODEL_PATH = "models/heart_model.pkl"

class DiabetesInput(BaseModel):
    Pregnancies: int
    Glucose: float
    BloodPressure: float
    BMI: float
    Insulin: float
    Age: int

class HeartInput(BaseModel):
    Age: int
    Sex: int
    Cholesterol: float
    RestingBP: float
    ECG: int
    MaxHeartRate: float

def mock_prediction(input_data):
    # Fallback mock if model isn't here
    return {
        "prediction": "Positive" if random.random() > 0.5 else "Negative",
        "confidence": round(random.uniform(0.7, 0.95), 2)
    }

@app.post("/predict/diabetes")
async def predict_diabetes(input_data: DiabetesInput):
    if os.path.exists(DIABETES_MODEL_PATH):
        try:
            model = joblib.load(DIABETES_MODEL_PATH)
            # Preprocess features into list
            features = [[input_data.Pregnancies, input_data.Glucose, input_data.BloodPressure, input_data.BMI, input_data.Insulin, input_data.Age]]
            pred = model.predict(features)[0]
            # Probabilities if available
            confidence = 0.85
            if hasattr(model, "predict_proba"):
                probs = model.predict_proba(features)[0]
                confidence = max(probs)
            return {"prediction": str(pred), "confidence": confidence}
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
    # Return mock if model doesn't exist yet
    return mock_prediction(input_data)

@app.post("/predict/heart")
async def predict_heart(input_data: HeartInput):
    if os.path.exists(HEART_MODEL_PATH):
        try:
            model = joblib.load(HEART_MODEL_PATH)
            features = [[input_data.Age, input_data.Sex, input_data.Cholesterol, input_data.RestingBP, input_data.ECG, input_data.MaxHeartRate]]
            pred = model.predict(features)[0]
            # Probabilities if available
            confidence = 0.85
            if hasattr(model, "predict_proba"):
                probs = model.predict_proba(features)[0]
                confidence = max(probs)
            return {"prediction": str(pred), "confidence": confidence}
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
    # Return mock if model doesn't exist yet
    return mock_prediction(input_data)

@app.get("/health")
async def health():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
