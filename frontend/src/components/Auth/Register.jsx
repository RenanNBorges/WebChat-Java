import React from 'react';
import { Link } from 'react-router-dom';
import AuthForm from './AuthForm.jsx';
import logo from '../../assets/images/logo.svg';


const RegisterPage = () => {
    return (
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 w-full max-w-md mx-auto">
                <div className="text-center mb-8">
                        <div className="flex items-center justify-center mb-4">
                            <img src={logo} alt="Ícone de bola de futebol" className="h-20 w-20 mr-2" />
                            <h2 className="text-5xl font-bold text-teal-custom text-[#38B4A0]">Regi<span className="text-[#8AC0B8]">strar</span></h2>
                        </div>
                        <p className="text-gray-600">Comece a bater papo</p>
                    </div>

                    <AuthForm isRegisterForm={true} />

                    <div className="text-center mt-6">
                        <p className="text-[#37B29E]">
                            Já está escalado?{' '}
                            <Link to="/login" className="text-teal-custom font-semibold hover:underline">
                                Faça login
                            </Link>
                        </p>
                    </div>
                </div>
    );
};

export default RegisterPage;