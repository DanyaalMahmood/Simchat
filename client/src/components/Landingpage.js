import { Link } from 'react-router-dom';

export default function Landingpage() {
  return (
    <div className="h-[100vh] w-[100vw] flex justify-center items-center">
      <div className="h-[12vh] w-[30vw] flex-col">

        <div className="bg-red-400 h-1/2 flex">
          <Link className="bg-red-300 w-full h-full flex items-center justify-center" to="signup">Signup</Link>
        </div>

        <div className="bg-blue-400 h-1/2 flex">
          <Link className="bg-blue-300 w-full h-full flex items-center justify-center" to="signin">Signin</Link>
        </div>

      </div>
    </div>
  );
}
