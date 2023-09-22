import React, { useCallback } from 'react';

import { useSignUp } from '@clerk/nextjs';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@/src/components/ui/button/button-auth';
import { Input } from '@/src/components/ui/inputs/input';

import { VerifyCodeNotice } from '@/src/components/auth/common/verify-code-notice';
import { APIResponseError, parseError } from '@/src/lib/errors/error';
import { Validations } from '@/src/lib/errors/form-validation';

interface SignUpCodeProps {
  emailAddress: string;
  onDone: (sessionId: string) => void;
}

const SignUpCode = ({ emailAddress, onDone }: SignUpCodeProps) => {
  const { isLoaded, signUp } = useSignUp();
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<{ code: string }>();

  const verifySignUpCode: SubmitHandler<{ code: string }> = async ({
    code,
  }) => {
    if (!signUp) {
      throw new Error('Sign up is not initialized');
    }
    try {
      setIsLoading(true);
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (signUpAttempt.status === 'complete') {
        onDone(signUpAttempt.createdSessionId!);
      }
    } catch (err) {
      setError('code', {
        type: 'manual',
        message: parseError(err as APIResponseError),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resendSignUpCode = useCallback(async () => {
    if (!signUp) {
      throw new Error('Sign up is not initialized');
    }
    await signUp.prepareEmailAddressVerification();
  }, [signUp]);

  if (!isLoaded || !signUp) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit(verifySignUpCode)} className="flex flex-col text-center mt-[1rem]">
      <VerifyCodeNotice
        onResendClick={resendSignUpCode}
        emailAddress={emailAddress}
      />
      <Input
        label="Code"
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...register('code', Validations.oneTimeCode)}
        errorText={errors.code?.message || ''}
        autoFocus
      />
      <div className="flex justify-end bg-black rounded-[0.5rem] mt-[1rem]">
        <Button className="flex justify-center w-32" isLoading={isLoading}>
          Verify
        </Button>
      </div>
    </form>
  );
};

export { SignUpCode };
