"use client";

import { signUp } from '@/lib/actions/auth';
import AuthForm from '../../../../components/AuthForm'
import { signUpSchema } from '../../../../lib/validations';

const Register = () => (
    <AuthForm 
        type="SIGN_UP"
        schema={signUpSchema}
        defaultValues={{ email: "", password: "" , fullName: "", teamId: 0, }}
        onSubmit={signUp}
    />
);

export default Register;