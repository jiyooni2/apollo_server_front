import { isLoggedInVar, logUserOut } from "./../apollo";

function Home() {
  return (
    <div>
      <h1>Welcome!</h1>
      <button onClick={logUserOut}>Logout</button>
    </div>
  );
}

export default Home;
