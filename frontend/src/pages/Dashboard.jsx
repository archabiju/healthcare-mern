import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { Heart, Activity, ShieldCheck, ArrowRight, BrainCircuit, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <Container className="py-5 fade-in">
      <header className="text-center mb-5">
        <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill bg-primary bg-opacity-10 text-primary small font-weight-bold mb-3">
          <Sparkles size={14} /> AI-POWERED HEALTHCARE
        </div>
        <h1 className="display-4 font-weight-bold h-gradient mb-3">Dashboard Overview</h1>
        <p className="text-subtitle">
          Secure, AI-driven insights for early disease detection and health monitoring.
        </p>
      </header>

      <Row className="g-4">
        {[
          { 
            title: 'Diabetes Screening', 
            icon: <Activity size={32} className="text-primary" />, 
            desc: 'Analyze glucose, BMI and metabolic indicators using clinical-grade SVM algorithms.', 
            link: '/predict' 
          },
          { 
            title: 'Cardiac Analysis', 
            icon: <Heart size={32} className="text-danger" />, 
            desc: 'Cardiovascular risk assessment based on cholesterol, BP and activity metrics.', 
            link: '/predict' 
          },
          { 
            title: 'Health Repository', 
            icon: <ShieldCheck size={32} className="text-success" />, 
            desc: 'Access your securely encrypted history of assessments and clinical patterns.', 
            link: '/history' 
          },
        ].map((item, idx) => (
          <Col key={idx} lg={4}>
            <Card className="card-premium h-100">
              <Card.Body className="p-0 d-flex flex-column gap-3">
                <div className="mb-2">{item.icon}</div>
                <h3 className="h4 font-weight-bold mb-2">{item.title}</h3>
                <p className="small text-secondary mb-4">{item.desc}</p>
                <Link to={item.link} className="btn-primary-new mt-auto">
                  Launch Tool <ArrowRight size={18} />
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      
      <section className="mt-5 pt-5">
        <div className="card-premium bg-opacity-50">
          <Row className="align-items-center">
            <Col lg={8}>
              <div className="d-flex align-items-center gap-2 text-primary small font-weight-bold mb-3">
                <BrainCircuit size={16} /> CORE TECHNOLOGY
              </div>
              <h2 className="display-6 font-weight-bold mb-3">Predictive Intelligence</h2>
              <p className="text-secondary lead">
                Our platform integrates verified medical datasets with Random Forest and SVM models 
                to deliver preliminary health indicators. This tool is designed to assist in 
                early detection and proactive wellness management.
              </p>
            </Col>
            <Col lg={4} className="d-none d-lg-block text-center">
              <Activity size={120} className="text-primary opacity-20" />
            </Col>
          </Row>
        </div>
      </section>
    </Container>
  );
};

export default Dashboard;


