import { useRouteError, isRouteErrorResponse } from "react-router-dom";

const ErrorPage: React.FC = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="flex justify-center min-h-screen items-center flex-col">
        <h1 className="text-3xl font-bold">Waduuh!</h1>
        <p className="my-5 text-xl">Ga ada page nya brow, salah link kali..</p>
        <p className="text-lg">{error.statusText}</p>
      </div>
    );
  }

  if (error instanceof Error) {
    return (
      <div className="flex justify-center min-h-screen items-center flex-col">
        <h1 className="text-3xl font-bold">Waduuh!</h1>
        <p className="my-5 text-xl">Ga ada page nya brow, salah link kali..</p>
        <p className="text-lg">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center min-h-screen items-center flex-col">
      <h1 className="text-3xl font-bold">Waduuh!</h1>
      <p className="my-5 text-xl">Ga ada page nya brow, salah link kali..</p>
      <p className="text-lg">Unknown error occurred</p>
    </div>
  );
};

export default ErrorPage
