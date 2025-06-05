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
          <button><Link to="/"><strong>Home</strong></Link></button>
          {auth ? (
            <>
              <button><Link to="/create"><strong>Create</strong></Link></button>
              <button onClick={handleLogout}><strong>Logout</strong></button>
            </>
          ) : (
            <>
              <button><Link to="/login"><strong>Login</strong></Link></button>
              <button><Link to="/signup"><strong>Sign Up</strong></Link></button>
            </>
          )}
        </nav>
      </header>
      <main className="content-container">
        <h1 className="welcome"><strong>Welcome to my playground</strong></h1>
        {children}
      </main>
    </>
  );
};

export default Layout;