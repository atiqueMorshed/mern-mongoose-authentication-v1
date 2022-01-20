import { useState } from 'react';
import axios from 'axios';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const forgotPasswordHandler = async (e: any) => {
    e.preventDefault();

    try {
      const { data } = await axios({
        method: 'post',
        url: '/api/auth/forgot',
        data: { email },
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setSuccess(data.message);
    } catch (error: any) {
      setError(error.response.data.message);
      setEmail('');
      setTimeout(() => {
        setError('');
      }, 5000);
    }
  };

  return (
    <div>
      <form onSubmit={forgotPasswordHandler}>
        <h3>Forgot Password</h3>
        {error && <p>{error}</p>}
        {success && <p>{success}</p>}
        <div>
          <p>Please enter your registered email.</p>
          <input
            type="email"
            required
            id="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit">Send Email</button>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
