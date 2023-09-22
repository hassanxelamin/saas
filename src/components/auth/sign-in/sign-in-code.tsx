import React, { useCallback } from 'react';

import { useSignIn } from '@clerk/nextjs';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@/src/components/ui/button/button-auth';
import { Input } from '@/src/components/ui/inputs/input';

import { VerifyCodeNotice } from '@/src/components/auth/common/verify-code-notice';
import { APIResponseError, parseError } from '@/src/lib/errors/error';
import { Validations } from '@/src/lib/errors/form-validation';

interface SignInCodeProps {
  emailAddress: string;
  onDone: (sessionId: string) => void;
}

const SignInCode = ({ emailAddress, onDone }: SignInCodeProps) => {
  const { isLoaded, signIn } = useSignIn();
  const [isLoading, setIsLoading] = React.useState(false);

  console.log(emailAddress);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<{ code: string }>();

  const resendSignUpCode = useCallback(async () => {
    if (!signIn) {
      throw new Error('Sign up is not initialized');
    }
    const emailCodeFactor = signIn.supportedFirstFactors.find(
      (factor) => factor.strategy === 'email_code'
    );
    console.log(emailCodeFactor)
    // try {
      if (emailCodeFactor) {
        await signIn.prepareFirstFactor({
          strategy: 'email_code',
          emailAddressId: emailCodeFactor.emailAddressId,
        });
      }
    // } catch (error) {
    //   if (error.response && error.response.data) {
    //     console.log('Error Response Data:', error.response.data);
    //   }
    // }
  }, [signIn]);

  if (!isLoaded) {
    return null;
  }

  if (!isLoaded || !signIn) {
    return null;
  }

  const verifySignInCode: SubmitHandler<{ code: string }> = async ({
    code,
  }) => {
    if (!signIn) {
      throw new Error('Sign up is not initialized');
    }
    try {
      setIsLoading(true);
      const signInAttempt = await signIn.attemptFirstFactor({
        strategy: 'email_code',
        code,
      });

      if (signInAttempt.status === 'complete') {
        onDone(signInAttempt.createdSessionId!);
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

  return (
    <form onSubmit={handleSubmit(verifySignInCode)} className="flex flex-col text-center mt-[1rem]">
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

export { SignInCode };
