/* eslint-disable react/jsx-boolean-value */
import { SignedOut } from '@clerk/nextjs/app-beta';
import AuthLayout from '@/src/components/auth/common/auth-layout';
import SignUpForm from '@/src/components/auth/sign-up/sign-up-form';

export default function SignUpPage() {
  return (
    <AuthLayout>
      <SignedOut>
        <SignUpForm />
      </SignedOut>
    </AuthLayout>
  );
}
