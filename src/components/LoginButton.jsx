export default function LoginButton({ handleLogin }) {
  return (
    <button
      className="bg-cyan-500 text-white rounded-lg p-3 shadow-2xl font-medium hover:font-bold hover:bg-cyan-700 active:bg-cyan-600 hover:rounded-xl transition-all duration-800"
      onClick={handleLogin}
    >
      Login with Google
    </button>
  );
}
