"use client";

//import { signUp } from '@/lib/actions/auth';
import AuthForm from '../../../../src/components/AuthForm'
import { signUpSchema } from '../../../../src/lib/validations';

const Register = () => (
    <AuthForm 
        type="SIGN_UP"
        schema={signUpSchema}
        defaultValues={{ email: "", password: "" , fullName: "", teamId: 0, }}
        //onSubmit={signUp}
        onSubmit={async () => ({ success: true })}
    />
);

export default Register;