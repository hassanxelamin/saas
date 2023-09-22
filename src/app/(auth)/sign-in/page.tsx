/* eslint-disable react/jsx-boolean-value */
import { SignedOut } from '@clerk/nextjs/app-beta';
import AuthLayout from '@/src/components/auth/common/auth-layout';
import SignInForm from '@/src/components/auth/sign-in/sign-in-form';

export default function SignUpPage() {
  return (
    <AuthLayout>
      <SignedOut>
        <SignInForm />
      </SignedOut>
    </AuthLayout>
  );
}
