/* eslint-disable no-alert */

'use client';

/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';

// HOOKS
import { useSignIn } from '@clerk/nextjs';
import { SubmitHandler, useForm } from 'react-hook-form';

// UI Components
// import USA from '../../assets/svg/USA.svg';
import { EmailCodeFactor } from '@clerk/types';
import { Button } from '@/src/components/ui/button/button-auth';
import { ErrorMessage } from '@/src/components/ui/error-states/error';
import { Input } from '@/src/components/ui/inputs/input';
import { Title } from '@/src/components/auth/common/title';

// Handlers
import { APIResponseError, parseError } from '@/src/lib/errors/error';
import { Notice } from '@/src/components/auth/common/notice';
import { SignInCode } from '@/src/components/auth/sign-in/sign-in-code';
import { Terms } from '@/src/components/auth/common/terms';

// Validations
// import { Validations } from '@/src/lib/errors/form-validation';
// Type for defining the email code factor.

interface SignInInputs {
  emailAddress: string;
  clerkError?: string;
}

interface ErrorWithResponse extends Error {
  response?: {
    status?: number;
  };
}

export enum SignInFormSteps {
  FORM,
  EMAIL,
  CODE,
}

const SignInForm = () => {
  const router = useRouter();
  const { isLoaded, signIn, setActive } = useSignIn();
  const [isLoading, setIsLoading] = React.useState(false);
  const [formStep, setFormStep] = React.useState(SignInFormSteps.FORM);

  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors },
    watch,
    clearErrors,
  } = useForm<SignInInputs>();

  if (!isLoaded) {
    return null;
  }

  const onSubmit: SubmitHandler<SignInInputs> = async ({ emailAddress }) => {
    try {
      setIsLoading(true);
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
      });
      const emailCodeFactor = signInAttempt.supportedFirstFactors.find(
        (factor) => factor.strategy === 'email_code'
      ) as EmailCodeFactor;

      await signInAttempt.prepareFirstFactor({
        strategy: 'email_code',
        emailAddressId: emailCodeFactor.emailAddressId,
      });

      setFormStep(SignInFormSteps.CODE);
    } catch (err) {
      setError('clerkError', {
        type: 'manual',
        message: parseError(err as APIResponseError),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithOAuth = async (strategy: any) => {
    if (!signIn) {
      console.error('SignIn is not ready yet');
      return;
    }

    try {
      await signIn.authenticateWithRedirect({
        strategy,
        redirectUrl: '/sso-callback',
        redirectUrlComplete: `/dashboard`,
      });
    } catch (err) {
      const error = err as ErrorWithResponse;

      if (error.response && error.response.status === 403) {
        console.error('User already exists', err);
        alert(
          'An account with your Google credentials already exists. Please try logging in instead.'
        );
      } else {
        console.error('Sign up error', err);
      }
    }
  };

  watch(() => errors.clerkError && clearErrors('clerkError'));

  const signUpComplete = async (createdSessionId: any) => {
    await setActive({ session: createdSessionId });
    router.push('/dashboard');
  };

  return (
    <div className="max-w-[33rem]">
      <Title content="Welcome Back! Login" />
      {formStep === SignInFormSteps.FORM && (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Notice
            content="Already have an account?"
            actionLink="/sign-up"
            actionMessage="Sign up"
          />
          <div className="mb-[2rem] w-full">
            <Input
              label="Email"
              type="email"
              {...register('emailAddress')}
              // errorText={errors.emailAddress?.message}
              hasError={!!errors.clerkError}
            />
          </div>
          {/* {errors.clerkError?.message && (
            <div>
              <ErrorMessage message="Email is invalid" />
            </div>
          )} */}
          <div className="flex items-center justify-center text-white">
            <Button bgColor="black" isLoading={isLoading}>
              Next
            </Button>
          </div>
        </form>
      )}
      {formStep === SignInFormSteps.FORM && (
        <div>
          <div className="flex items-center justify-center my-[2rem]">
            <div className="text-[1.2rem] uppercase">or</div>
          </div>
          <div className="flex items-center justify-center text-white mb-[1rem]">
            <Button
              borderSize="[0.2rem]"
              textColor="black"
              isLoading={isLoading}
              onClick={async () => {
                await signInWithOAuth('oauth_google');
              }}
            >
              Sign in with Google
            </Button>
          </div>
          <Terms />
        </div>
      )}
      {formStep === SignInFormSteps.CODE && (
        <SignInCode
          emailAddress={getValues('emailAddress')}
          onDone={signUpComplete}
        />
      )}
    </div>
  );
};

export default SignInForm;
