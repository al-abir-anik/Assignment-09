import { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const LogIn = () => {
  const { signInUser, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const [wrongPass, setWrongPass] = useState("");
  const emailRef = useRef();

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    setWrongPass("");
    signInUser(email, password)
      .then((result) => {
        console.log(result);
        e.target.reset();
        navigate("/");
      })
      .catch((error) => {
        console.log("ERROR", error.message);
        setWrongPass("Invalid Email or Password");
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        console.log(result);
        navigate("/");
      })
      .catch((error) => {
        console.log("ERROR", error.message);
      });
  };

  const getEmailForResetPass = () => {
    const emailForReset = emailRef.current.value;
    if (!emailForReset) {
      setWrongPass("Please provide a valid Email address");
    } else {
      navigate("/forgotPass",{ state: { email: emailForReset } });
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://i.ibb.co.com/YpPQmYv/pexels-rachel-claire-7263404.jpg')",
      }}
    >
      <div className="w-full max-w-md p-6 bg-white bg-opacity-75 rounded-lg shadow-lg">
        <h2 className="text-4xl font-bold text-center text-green-800 mb-6">
          EcoTourism Login
        </h2>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-green-600">
              Email
            </label>
            <input
              type="email"
              name="email"
              ref={emailRef}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-green-600">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your password"
              required
            />
            {wrongPass && <p className="text-red-600">{wrongPass}</p>}
          </div>

          <div className="flex justify-end">
            <button onClick={getEmailForResetPass} className="text-sm text-green-500 hover:text-green-700">
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Log In
            </button>
          </div>
        </form>

        {/* Other Options */}
        <div className="mt-6 text-center">
          {/* Register Link */}
          <p className="text-sm text-gray-700">
            Don't have an account?
            <Link
              to="/register"
              className="text-green-500 hover:text-green-700"
            >
              {" "}
              Register
            </Link>
          </p>

          {/* Social Login */}
          <div className="mt-4">
            <button
              className="w-full py-2 px-4 bg-[#456289] text-white font-semibold rounded-lg hover:bg-[#80A4C0] focus:outline-none focus:ring-2 focus:ring-[#80A4C0]"
              onClick={handleGoogleSignIn}
            >
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
