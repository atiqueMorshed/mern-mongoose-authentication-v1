import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
type iProps = {
  title: string;
};
const PrivatePage = ({ title }: iProps) => {
  const navigate = useNavigate();

  const [error, setError] = useState<string>('');
  const [privateData, setPrivateData] = useState<string>('');

  useEffect(() => {
    if (!localStorage.getItem('authToken')) navigate('/');

    const fetchPrivateData = async () => {
      try {
        const { data } = await axios({
          method: 'get',
          url: '/api/private',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        setPrivateData(data.message);
        navigate('/');
      } catch (error: any) {
        localStorage.removeItem('authToken');
        setError('You Are Not Authorized, Please Login.');
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }
    };
    fetchPrivateData();
  }, [navigate]);

  const logoutHandler = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return error ? (
    <p>{error}</p>
  ) : (
    <>
      <div>{privateData}</div>
      <button onClick={logoutHandler}>LogOut</button>
    </>
  );
};

export default PrivatePage;
