import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        // "http://localhost:5000/api/password/forgot-password",
        "https://alumni-api.iiitkota.in/api/password/forgot-password",
        { email },
        { headers: { "Content-Type": "application/json" } }
      );

      setLoading(false);
      toast.success("Password reset email sent successfully!");
      setTimeout(() => {
        navigate('/signin');
      }, 3000); // Redirect to sign-in page after 3 seconds

    } catch (error) {
      console.error("Error sending password reset email:", error);
      setLoading(false);
      toast.error("Failed to send password reset email.");
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-[#1A1C4E]">
      <div><Toaster position="top-right"/></div>
      <div className="md:w-[85%] md:h-auto w-[95%] h-auto max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-semibold text-center text-[#32325D] mb-6">
          Forgot Password
        </h2>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="mb-4 flex items-center">
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your registered email"
              required
              className="w-full px-4 py-3 border border-[#0E407C] rounded-md focus:outline-none focus:ring-1 focus:ring-[#0E407C]"
            />
          </div>
          <div className="w-full h-auto flex justify-center items-center">
          <button
            type="submit"
            className="px-4 py-3 bg-[#0E407C] hover:bg-[#19194D] text-white rounded-md shadow-xl w-full flex items-center justify-center transition-colors"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="inline-block w-4 h-4 border-2 border-t-2 border-gray-200 border-t-blue-500 rounded-full animate-spin mr-2" />{" "}
                Sending...
              </>
            ) : (
              "Send Reset Link"
            )}
          </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
