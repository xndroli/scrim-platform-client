"use client";

// import { signUp } from '@/lib/actions/auth';
import AuthForm from '@/components/AuthForm'
import { signUpSchema } from '@/lib/validations';

const ResetPassword = () => (
    <AuthForm 
        type="RESET_PASSWORD"
        schema={signUpSchema}
        defaultValues={{ email: "", password: "" , fullName: "", teamId: 0, }}
        // onSubmit={signUp}
        onSubmit={async () => ({ success: true })}
    />
);

export default ResetPassword;