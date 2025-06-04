import { Link, useNavigate } from 'react-router-dom';
import '../index.css';

const Layout = ({ auth, setAuth, children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuth(false);
    navigate('/');
  };

  return (
    <>
      <header className="header">
        <nav className="nav">
          <Link to="/">Home</Link>
          {auth ? (
            <>
              <Link to="/create">Create</Link>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </>
          )}
        </nav>
      </header>
      <main className="container">
        <h1 className="welcome">Welcome to my playground</h1>
        {children}
      </main>
    </>
  );
};

export default Layout;