import React, { useState } from 'react';
import { Form, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        const result = await login(formData.email, formData.password);
        setLoading(false);
        if (result.success) navigate('/');
        else setError(result.message);
    };

    return (
        <div className="auth-container fade-in">
            <div className="auth-card">
                <div className="text-center mb-4">
                    <div className="d-inline-flex p-3 rounded-circle bg-primary bg-opacity-10 mb-3">
                        <Shield className="text-primary" size={32} />
                    </div>
                    <h1 className="h3 font-weight-bold mb-1 text-white">Sign In</h1>
                    <p className="small text-secondary">Access your AI health dashboard</p>
                </div>

                {error && <Alert variant="danger" className="py-2 small">{error}</Alert>}
                
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label className="small font-weight-bold text-secondary">Email Address</Form.Label>
                        <Form.Control 
                            type="email" required 
                            className="bg-dark text-white"
                            placeholder="name@example.com"
                            onChange={e => setFormData({...formData, email: e.target.value})}
                        />
                    </Form.Group>
                    <Form.Group className="mb-4">
                        <Form.Label className="small font-weight-bold text-secondary">Password</Form.Label>
                        <Form.Control 
                            type="password" required 
                            className="bg-dark text-white"
                            placeholder="••••••••"
                            onChange={e => setFormData({...formData, password: e.target.value})}
                        />
                    </Form.Group>
                    <button type="submit" disabled={loading} className="btn-primary-new w-100 justify-content-center">
                        {loading ? 'Authenticating...' : 'Sign In'} <LogIn size={18} />
                    </button>
                </Form>

                <div className="text-center mt-4 pt-3 border-top border-secondary border-opacity-10">
                    <span className="small text-secondary">New here? </span>
                    <Link to="/register" className="small font-weight-bold text-primary text-decoration-none">
                        Create Account
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;


