import { signOut } from "firebase/auth";

export default function LogoutButton({ auth }) {
  return (
    <button
      className="bg-red-500  text-white rounded-lg p-3 shadow-2xl font-medium hover:font-bold hover:bg-orange-500 active:bg-orange-600 hover:rounded-xl transition-all duration-800"
      onClick={() => signOut(auth)}
    >
      {"Sign Out "}
    </button>
  );
}
