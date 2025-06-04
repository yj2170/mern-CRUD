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
          <button><Link to="/">Home</Link></button>
          {auth ? (
            <>
              <button><Link to="/create">Create</Link></button>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <button><Link to="/login">Login</Link></button>
              <button><Link to="/signup">Sign Up</Link></button>
            </>
          )}
        </nav>
      </header>
      <main className="content-container">
        <h1 className="welcome">Welcome to my playground</h1>
        {children}
      </main>
    </>
  );
};

export default Layout;