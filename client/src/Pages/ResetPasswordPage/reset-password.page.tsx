import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const ResetPasswordPage = () => {
  const { resetToken } = useParams();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const resetPasswordHandler = async (e: any) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPassword('');
      setConfirmPassword('');
      setTimeout(() => {
        setError('');
      }, 5000);
      return setError("Passwords don't match");
    }

    try {
      const { data } = await axios({
        method: 'put',
        url: `/api/auth/reset/${resetToken}`,
        data: {
          password,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setSuccess(data.message);
    } catch (error: any) {
      setError(error.response.data.message);
      setTimeout(() => {
        setError('');
      }, 5000);
    }
  };

  return (
    <div>
      <form onSubmit={resetPasswordHandler}>
        <h3>Reset Password</h3>
        {error && <p>{error} </p>}
        {success && (
          <p>
            {success} <Link to="/login">Login</Link>
          </p>
        )}
        <div>
          <input
            type="password"
            required
            id="password"
            placeholder="Enter new password"
            autoComplete="true"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            required
            id="confirmpassword"
            placeholder="Confirm new password"
            autoComplete="true"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
