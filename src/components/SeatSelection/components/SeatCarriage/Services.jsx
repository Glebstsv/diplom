const Services = ({ coach }) => {
  return (
    <div className="carriage-services">
      <h3 className="services-subtitle">Обслуживание ФПК</h3>
      <div className="services-images">
        {coach.have_air_conditioner && (
          <div className="service-img serv1"></div>
        )}
        {coach.have_wifi && <div className="service-img serv2"></div>}
        {coach.is_linens_included && <div className="service-img serv3"></div>}
      </div>
    </div>
  );
};

export default Services;
