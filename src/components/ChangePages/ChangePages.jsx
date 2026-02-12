import "./ChangePages.css";

const ChangePages = () => {
  const trains = JSON.parse(localStorage.getItem("trains")) || [];
  const itemsPerPage = JSON.parse(localStorage.getItem("itemsPerPage")) || 5;
  const totalPages = Math.ceil((trains?.length || 0) / itemsPerPage);

  if (!trains || trains.length <= itemsPerPage) {
    return null;
  }

  return (
    <div className="pagination">
      <div className="pagination__list">
        <button className="pagination__button pagination__button--prev" type="button" aria-label="Предыдущая страница"></button>
        {[...Array(totalPages)].map((_, index) => (
          <button 
            key={index + 1}
            className={`pagination__button ${index === 0 ? 'pagination__button--active' : ''}`} 
            type="button"
          >
            {index + 1}
          </button>
        ))}
        <button className="pagination__button pagination__button--next" type="button" aria-label="Следующая страница"></button>
      </div>
    </div>
  );
};

export default ChangePages;
