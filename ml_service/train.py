import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
import joblib
import os

# Create models directory
if not os.path.exists('models'):
    os.makedirs('models')

def train_diabetes():
    print("Training Diabetes Model...")
    # Synthetic data for demo
    # Features: Pregnancies, Glucose, BloodPressure, BMI, Insulin, Age
    X = np.random.rand(100, 6)
    y = np.random.randint(0, 2, 100)
    
    model = RandomForestClassifier()
    model.fit(X, y)
    joblib.dump(model, 'models/diabetes_model.pkl')
    print("Diabetes model saved.")

def train_heart():
    print("Training Heart Disease Model...")
    # Features: Age, Sex, Cholesterol, RestingBP, ECG, MaxHeartRate
    X = np.random.rand(100, 6)
    y = np.random.randint(0, 2, 100)
    
    model = LogisticRegression()
    model.fit(X, y)
    joblib.dump(model, 'models/heart_model.pkl')
    print("Heart disease model saved.")

if __name__ == "__main__":
    train_diabetes()
    train_heart()
