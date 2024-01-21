import React from 'react';
import { useForm } from 'react-hook-form';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import Pro from '../Images/pro.png'

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  // Function to handle form submission
  const onSubmit = async (data) => {
    try {
      // Convert the password to a Uint8Array
      const encoder = new TextEncoder();
      const passwordData = encoder.encode(data.password);

      // Hash the password using the SubtleCrypto API
      const passwordHashBuffer = await crypto.subtle.digest('SHA-256', passwordData);

      // Convert the hashed password to a hex string
      const hashedPassword = Array.from(new Uint8Array(passwordHashBuffer))
        .map((byte) => byte.toString(16).padStart(2, '0'))
        .join('');

      // Make the API call with the hashed password
      const formData = new FormData();
      formData.append('username', data.email);
      formData.append('password', hashedPassword);
      formData.append('grant_type', 'password');

      const response = await fetch(
        'https://apiv2stg.promilo.com/user/oauth/token',
        {
          method: 'POST',
          body: formData,
          headers: {
            Authorization: 'Basic UHJvbWlsbzpxNCE1NkBaeSN4MiRHQg==',
          },
        }
      );

      const responseData = await response.json();
      console.log(responseData);

      if (response.ok) {
        const accessToken = responseData.response.access_token;
        console.log(accessToken);
        localStorage.setItem('accessToken', accessToken);
        // Redirect to the product page after successful login
        navigate('/products');
      } else {
        // Handle login error here (e.g., show an error message to the user)
        console.error('Login failed:', responseData.error_description);
      }
    } catch (error) {
      console.error('Login failed:', error.message);
      // Handle other errors here
    }
  };

  return (
    <>
      <div className="flex container justify-center items-center h-screen">
        <div className="w-full h-full md:h-[80vh] lg:h-[80vh] lg:w-[70%] md:w-[70%] grid grid-cols-1 sm:grid-cols-1 md:grid-col-2 lg:grid-cols-2 my-40 bg-white shadow-lg shadow-slate-900 rounded-md">
          <div className='w-full flex bg-violet-500 justify-center items-center'>
            <div>
              <h1 className='text-center text-2xl font-bold '>Welcome to <span className='rounded-[50%] p-2 bg-white'>🙏</span></h1>
              <img className='h-42' src={Pro} alt="Logo" />
            </div>
          </div>
          <div className='flex w-full p-14 justify-center items-center '>
            <div className='p-8'>
              <h1 className="text-2xl font-bold mb-4">User Login</h1>
              {/* Form for user login */}
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Email input field */}
                <input
                  type="email"
                  placeholder="Email"
                  className={`w-full p-2 my-2 border border-black rounded-3xl ${errors.email ? 'border-red-500' : ''}`}
                  {...register('email', { required: 'Email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email format' } })}
                />
                {errors.email && <p className="text-red-500 mb-2 text-xs w-full">{errors.email.message}</p>}

                {/* Password input field */}
                <input
                  type="password"
                  placeholder="Password"
                  className={`w-full p-2 my-2 mt-2 border border-black rounded-3xl ${errors.password ? 'border-red-500' : ''}`}
                  {...register('password', {
                    required: 'Password is required',
                    pattern: {
                      value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message: 'Invalid format. It must contain at least 1 capital letter, 1 small letter, 1 digit, 1 special character, and be at least 8 characters long.',
                    },
                  })}
                />
                {errors.password && <p className="w-full text-red-500 mb-2 text-xs">{errors.password.message}</p>}

                {/* Login button */}
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-2 mt-4 rounded w-full"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
