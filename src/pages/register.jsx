import React from 'react'
import { useNavigate } from 'react-router-dom'
import accountImg from '../assets/images/Account.png'
// import LoginForm from '../../../frontend - Copie/loginForm_1'
import RegisterForm from '../components/registerForm'

function Register() {
  let navigate = useNavigate()
  const handleClick = () => navigate('/security/login');

  // const goToActivation = () => navigate('/security/activation');


  return (
    <div className="md:mx-3 md:p-4 ">
        <div className="flex flex-col justify-center items-center text-center">
          <img src={accountImg} alt="Logo" width="100" height="100" className="align-text-top" />
          <h4  className=" mt-1 pb-1 text-xl font-semibold {connectionError ? 'mb-4': 'mb-12'} ">
            Creation de compte
          </h4>
        </div>
        <RegisterForm />
        {/* <div className="flex flex-row items-center justify-end pb-6">
          <div className="text-sm py-1.5">
            <a href="#!" onClick={handleClick} className="font-semibold text-indigo-600 hover:text-indigo-500">
              Retour au login
            </a>
          </div>
        </div> */}

        {/* <div className="flex flex-row items-center justify-end pb-6">
          <div className="text-sm py-1.5">
            <a href="#!" onClick={goToActivation} className="font-semibold text-indigo-600 hover:text-indigo-500">
              go to Activation
            </a>
          </div>
        </div> */}
    </div>
  )
}


export default Register