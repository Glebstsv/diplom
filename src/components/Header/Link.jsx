import { useNavigate } from 'react-router-dom';

const Link = ({ link, title }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate('/', { replace: true });
    setTimeout(() => {
      const element = document.querySelector(link);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <li className="header__nav-item">
      <a href={link} onClick={handleClick} className="header__nav-link">
        {title}
      </a>
    </li>
  );
};

export default Link;