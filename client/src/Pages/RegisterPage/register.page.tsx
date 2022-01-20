import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (localStorage.getItem('authToken')) navigate('/');
  }, [navigate]);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPassword('');
      setConfirmPassword('');
      setTimeout(() => {
        setError('');
      }, 5000);
      return setError('Passwords do not match.');
    }
    try {
      const { data } = await axios({
        method: 'post',
        url: '/api/auth/register',
        data: {
          name,
          email,
          password,
        },
        headers: { 'Content-Type': 'application/json' },
      });
      localStorage.setItem('authToken', data.token);
      navigate('/');
    } catch (error: any) {
      console.log(error.response.data.message);
      setError(error.response.data.message);
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
          id="name"
          name="name"
          type="text"
          required
          placeholder="Enter Your Full Name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          required
          placeholder="Confirm Your Password..."
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit">Register</button>
        {error && <p>{error}</p>}
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
