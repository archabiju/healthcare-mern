import React, { useState } from 'react';
import { Form, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        const result = await register(formData.name, formData.email, formData.password);
        setLoading(false);
        if (result.success) navigate('/login');
        else setError(result.message);
    };

    return (
        <div className="auth-container fade-in">
            <div className="auth-card">
                <div className="text-center mb-4">
                    <div className="d-inline-flex p-3 rounded-circle bg-primary bg-opacity-10 mb-3">
                        <Sparkles className="text-primary" size={32} />
                    </div>
                    <h1 className="h3 font-weight-bold mb-1 text-white">Create Account</h1>
                    <p className="small text-secondary">Start your health monitoring journey</p>
                </div>

                {error && <Alert variant="danger" className="py-2 small">{error}</Alert>}
                
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label className="small font-weight-bold text-secondary">Full Name</Form.Label>
                        <Form.Control 
                            type="text" required 
                            className="bg-dark text-white"
                            placeholder="John Doe"
                            onChange={e => setFormData({...formData, name: e.target.value})}
                        />
                    </Form.Group>
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
                        {loading ? 'Creating Account...' : 'Register'} <UserPlus size={18} />
                    </button>
                </Form>

                <div className="text-center mt-4 pt-3 border-top border-secondary border-opacity-10">
                    <span className="small text-secondary">Already have an account? </span>
                    <Link to="/login" className="small font-weight-bold text-primary text-decoration-none">
                        Sign In
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;


