import { CSSTransition } from 'react-transition-group';

interface ErrorInputs {
  message: string;
}

const ErrorMessage = ({ message }: ErrorInputs) => {
  console.log(message)
  return (
      <span className="block text-[1rem] text-red-500 errorDisplay mt-[1rem]">
        {message}
      </span>
  );
};

export { ErrorMessage };
