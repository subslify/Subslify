import { useState, useEffect } from 'react';
import { Logo, FormRow, Alert } from '../components';
import { useAppContext } from '../context/appContext';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/form.scss';
import fb from '../assets/images/oauth-logos/fb.svg';
import google from '../assets/images/oauth-logos/google.svg';
import gh from '../assets/images/oauth-logos/gh.svg';

const initialState = {
  name: '',
  email: '',
  password: '',
  isRegistered: true,
  user: null,
};

const Register = () => {
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState(initialState);

  const { user, isLoading, showAlert, displayAlert, registerUser, loginUser } =
    useAppContext();

  const toggleMember = () => {
    setNewUser({ ...newUser, isRegistered: !newUser.isRegistered });
  };

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isRegistered } = newUser;
    if (!email) {
      displayAlert('Please enter your email address');
      return;
    }

    if (!password) {
      displayAlert('Please enter your password');
      return;
    }

    if (!isRegistered && !name) {
      displayAlert('Please enter your name');
      return;
    }

    if (isRegistered) {
      loginUser({ email, password });
      return;
    }
    // console.log('register user', { name, email, password });
    registerUser({ name, email, password });
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/');
      }, 1500);
    }
  }, [user, navigate]);

  return (
    <section className='full-page register'>
      <form className='form' onSubmit={handleSubmit}>
        <Logo />
        <h3>{newUser.isRegistered ? 'Login' : 'Register'}</h3>
        {showAlert && <Alert />}
        {!newUser.isRegistered && (
          <FormRow
            type='text'
            name='name'
            value={newUser.name}
            placeholder='Enter your name'
            handleChange={handleChange}
            autocomplete='name'
          />
        )}
        <FormRow
          type='email'
          name='email'
          value={newUser.email}
          placeholder='Enter your email'
          handleChange={handleChange}
          autocomplete='email'
        />
        <FormRow
          type='password'
          name='password'
          value={newUser.password}
          placeholder='Enter your password'
          handleChange={handleChange}
          autocomplete='current-password'
        />

        <button type='submit' className='btn btn-block' disabled={isLoading}>
          Submit
        </button>
        <p>
          {newUser.isRegistered
            ? "Don't have an account?"
            : 'Already have an account?'}
        </p>
        <button type='button' className='member-btn' onClick={toggleMember}>
          {newUser.isRegistered ? 'Register' : 'Login'}
        </button>
        <div className='Icons'>
          <a className='icon' href='#'>
            <img alt='svg' src={fb}/>
          </a>
          <a className='icon' href='http://localhost:8080/api/v1/auth/google'>
            <img alt='svg' src={google}/>
          </a>
          <a className='icon' href='#'>
            <img alt='svg' src={gh}/>
          </a>
        </div>
      </form>
    </section>
  );
};

export default Register;
