import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (localStorage.getItem('authToken')) navigate('/');
  }, [navigate]);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const { data } = await axios({
        method: 'post',
        url: '/api/auth/login',
        data: {
          email,
          password,
        },
        headers: { 'Content-Type': 'application/json' },
      });
      localStorage.setItem('authToken', data.token);
      navigate('/');
    } catch (error: any) {
      console.log(error.response.data);
      setError(error.response.data.error);
      setTimeout(() => {
        setError('');
      }, 5000);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Register Now</h1>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="Enter Your Email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          id="password"
          name="password"
          type="password"
          required
          placeholder="Enter Your Password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        {error && <p>{error}</p>}
      </form>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
      <p>
        <Link to="/forgot">Forgot password?</Link>
      </p>
    </div>
  );
};

export default LoginPage;
