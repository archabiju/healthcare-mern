import React, { useState } from 'react';
import { Container, Row, Col, Form, Alert } from 'react-bootstrap';
import { Brain, AlertCircle, CheckCircle2, ChevronRight, Activity, Heart, ShieldCheck, Stethoscope } from 'lucide-react';
import axios from 'axios';

const Predict = () => {
  const [disease, setDisease] = useState('diabetes');
  const [formData, setFormData] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

  const diabetesFields = [
    { name: 'Pregnancies', label: 'Pregnancies', help: 'Number of times pregnant' },
    { name: 'Glucose', label: 'Blood Sugar', help: 'Normal: <140 mg/dL' },
    { name: 'BloodPressure', label: 'Blood Pressure', help: 'Diastolic (Normal: 60-80)' },
    { name: 'BMI', label: 'BMI Body Mass', help: 'Weight/Height² (Normal: 18-25)' },
    { name: 'Insulin', label: 'Insulin Level', help: 'Normal: 15-200 mu U/ml' },
    { name: 'Age', label: 'Age', help: 'Years' }
  ];

  const heartFields = [
    { name: 'Age', label: 'Age', help: 'Years' }, 
    { name: 'Sex', label: 'Gender', help: '1 = Male, 0 = Female' },
    { name: 'Cholesterol', label: 'Cholesterol', help: 'mg/dL (Normal: <200)' }, 
    { name: 'RestingBP', label: 'Resting BP', help: 'Pressure at rest (Normal: <120)' },
    { name: 'ECG', label: 'ECG Scan', help: '0: Normal, 1: ST-T wave, 2: LVH' }, 
    { name: 'MaxHeartRate', label: 'Max Heart Rate', help: 'Highest rate achieved' }
  ];

  const fillDemoData = () => {
    const diabetesDemo = { Pregnancies: '2', Glucose: '110', BloodPressure: '70', BMI: '24', Insulin: '80', Age: '30' };
    const heartDemo = { Age: '55', Sex: '1', Cholesterol: '220', RestingBP: '130', ECG: '1', MaxHeartRate: '150' };
    setFormData(disease === 'diabetes' ? diabetesDemo : heartDemo);
  };

  const fields = disease === 'diabetes' ? diabetesFields : heartFields;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_BASE_URL}/predict/${disease}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Analysis failed. Please check inputs.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5 fade-in">
      <Row className="justify-content-center">
        <Col lg={10}>
          <div className="card-premium mb-4">
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
              <div>
                <div className="d-flex align-items-center gap-2 text-primary small font-weight-bold mb-1">
                  <Brain size={16} /> AI DIAGNOSTICS
                </div>
                <h2 className="h3 font-weight-bold mb-0 text-white">Health Risk Analysis</h2>
              </div>
              <div className="d-flex gap-2 bg-dark p-1 rounded-pill border border-secondary border-opacity-10">
                {['diabetes', 'heart'].map(type => (
                  <button 
                    key={type} 
                    type="button"
                    onClick={() => { setDisease(type); setResult(null); setFormData({}); }}
                    className={`px-4 py-2 rounded-pill font-weight-bold small transition-all border-0 ${disease === type ? 'bg-primary text-dark' : 'bg-transparent text-secondary'}`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <Alert variant="info" className="bg-primary bg-opacity-10 border-primary border-opacity-20 text-white mb-4 x-small d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center gap-2">
                <Stethoscope size={16} className="text-primary" />
                <span>
                  <strong>Guidance:</strong> These values are found in your <strong>Blood Test</strong> or <strong>Physical report</strong>. 
                  Don't have them? <button type="button" className="btn btn-link p-0 text-primary x-small font-weight-bold text-decoration-none" onClick={fillDemoData}>Use Sample Data</button>
                </span>
              </div>
            </Alert>

            <Form onSubmit={handleSubmit}>
              <Row className="g-3">
                {fields.map(field => (
                  <Col md={6} lg={4} key={field.name}>
                    <Form.Group>
                      <Form.Label className="small text-white font-weight-bold mb-1">{field.label}</Form.Label>
                      <Form.Control 
                        type="number" step="any" required 
                        className="bg-dark text-white border-secondary border-opacity-20" 
                        placeholder="0.0"
                        value={formData[field.name] || ''}
                        onChange={e => setFormData({...formData, [field.name]: e.target.value})}
                      />
                      <Form.Text className="text-secondary x-small d-block mt-1">
                        {field.help}
                      </Form.Text>
                    </Form.Group>
                  </Col>
                ))}
              </Row>
              <div className="mt-4 pt-3 border-top border-secondary border-opacity-10 text-center">
                <button type="submit" disabled={loading} className="btn-primary-new w-100 max-w-sm justify-content-center py-3">
                  {loading ? 'Processing Data...' : `Run Analysis`}
                  <ChevronRight size={20} />
                </button>
              </div>
            </Form>
          </div>

          {(result || error) && (
            <div className={`card-premium mt-4 ${result?.prediction === 'Positive' ? 'border-danger' : 'border-success'}`}>
              {error ? (
                <div className="text-center text-danger py-3">
                  <AlertCircle size={48} className="mb-3" />
                  <h4 className="font-weight-bold">System Error</h4>
                  <p className="mb-0">{error}</p>
                </div>
              ) : (
                <Row className="align-items-center g-4">
                  <Col md={7}>
                    <div className="d-flex align-items-center gap-3 mb-3">
                      {result.prediction === 'Positive' || result.prediction === '1' ? (
                        <AlertCircle className="text-danger" size={40} />
                      ) : (
                        <CheckCircle2 className="text-success" size={40} />
                      )}
                      <div>
                        <h4 className="font-weight-bold mb-1 text-white">Diagnostic Result</h4>
                        <p className="small text-secondary mb-0">AI confidence: {Math.round(result.confidence * 100)}%</p>
                      </div>
                    </div>
                    <p className="text-white lead mt-3 italic">"{result.recommendation}"</p>
                  </Col>
                  <Col md={5} className="text-center">
                    <div className={`p-4 rounded-3 d-inline-block w-100 ${result.prediction === 'Positive' || result.prediction === '1' ? 'bg-danger bg-opacity-10 text-danger' : 'bg-success bg-opacity-10 text-success'}`}>
                      <div className="small font-weight-bold opacity-75 mb-1">RISK LEVEL</div>
                      <div className="display-6 font-weight-bold">{result.prediction === 'Positive' || result.prediction === '1' ? 'HIGH RISK' : 'NORMAL'}</div>
                    </div>
                  </Col>
                </Row>
              )}
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Predict;
