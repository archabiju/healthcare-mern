import React, { useEffect, useState } from 'react';
import { Container, Spinner, Table } from 'react-bootstrap';
import { ClipboardList, Calendar, Info, Activity, Heart, BadgeCheck, ShieldAlert } from 'lucide-react';
import axios from 'axios';

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${API_BASE_URL}/history`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setHistory(res.data);
      } catch (err) {
        console.error('Failed to fetch history');
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3 text-secondary text-uppercase small font-weight-bold tracking-widest">Accessing Records...</p>
      </Container>
    );
  }

  return (
    <Container className="py-5 fade-in">
      <div className="d-flex align-items-center gap-3 mb-5">
        <div className="bg-primary bg-opacity-10 p-3 rounded-circle border border-primary border-opacity-20 shadow-sm">
          <ClipboardList className="text-primary" size={32} />
        </div>
        <div>
          <h1 className="h3 font-weight-bold mb-1 text-white">Diagnostic History</h1>
          <p className="small text-secondary mb-0">Review your clinical assessment logs and AI insights</p>
        </div>
      </div>

      {history.length === 0 ? (
          <div className="card-premium text-center py-5 border-dashed">
            <Info size={48} className="text-secondary mb-3 opacity-50" />
            <h4 className="text-white font-weight-bold">No Records Found</h4>
            <p className="text-secondary mb-0">Complete a risk assessment to see your history here.</p>
          </div>
      ) : (
        <div className="table-responsive">
          <table className="table-custom">
            <thead>
              <tr>
                <th className="text-start">Date & Time</th>
                <th className="text-start">Analysis Type</th>
                <th className="text-start">Assessment Result</th>
                <th className="text-center">AI Confidence</th>
                <th className="text-start">Medical Recommendation</th>
              </tr>
            </thead>
            <tbody>
              {history.map((record, idx) => (
                <tr key={idx} className="fade-in" style={{ animationDelay: `${idx * 0.05}s` }}>
                  <td>
                    <div className="d-flex flex-column">
                      <div className="d-flex align-items-center gap-2 text-white font-weight-bold">
                        <Calendar size={14} className="text-primary" />
                        {new Date(record.date).toLocaleDateString()}
                      </div>
                      <span className="text-secondary x-small mt-1 ps-4">{new Date(record.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex align-items-center gap-2 text-white">
                      {record.diseaseType === 'diabetes' ? <Activity size={16} className="text-primary" /> : <Heart size={16} className="text-danger" />}
                      <span className="text-capitalize font-weight-bold">{record.diseaseType}</span>
                    </div>
                  </td>
                  <td>
                    <div className={`badge-user d-inline-flex align-items-center gap-2 ${record.prediction === 'Positive' || record.prediction === '1' ? 'border-danger text-danger' : 'border-success text-success'}`}>
                       {record.prediction === 'Positive' || record.prediction === '1' ? <ShieldAlert size={12} /> : <BadgeCheck size={12} />}
                       <span className="font-weight-bold small text-uppercase tracking-wider">
                         {record.prediction === 'Positive' || record.prediction === '1' ? 'High Risk' : 'Normal'}
                       </span>
                    </div>
                  </td>
                  <td className="text-center">
                    <div className="text-white font-weight-bold h5 mb-0">
                      {Math.round(record.confidence * 100)}%
                    </div>
                  </td>
                  <td>
                    <div className="text-secondary small italic leading-snug" style={{ maxWidth: '350px' }}>
                      "{record.recommendation}"
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Container>
  );
};

export default History;
