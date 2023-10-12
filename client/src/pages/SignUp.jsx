import { Link } from 'react-router-dom';

const SignUp = () => {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form className="flex flex-col gap-4 ">
        <input
          type="text"
          className="border p-3 rounded-lg"
          placeholder=""
          id="username"
        />
        <input
          type="email"
          className="border p-3 rounded-lg"
          placeholder=""
          id="email"
        />
        <input
          type="password"
          className="border p-3 rounded-lg"
          placeholder=""
          id="password"
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 disabled:cursor-not-allowed">
          Sign Up
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to={'/sign-in'}>
          <span className="text-blue-700">Sign In</span>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
