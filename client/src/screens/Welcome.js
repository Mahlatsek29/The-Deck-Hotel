import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Welcome() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/home');
  };

  return (
    <div className='row welcome'>
      <div className='col-md-12 text-center'>
        {/* Remove the carousel-related <div> element */}
        <img src="/img/Home.jpg" className="d-block mx-auto img-responsive" alt="..." style={{ maxWidth: '400vh', maxHeight: '800px' }} />
      </div>
      {/* Add the "btn-sm" class to make the button smaller */}
      <button className="btn btn-sm" style={{ color: '#806043', backgroundColor: 'white' }}onClick={handleGetStarted}>
        Get Started
      </button>
      <p style={{ color: '#806043'}}>
  "Elevate Your Experience"
</p>

    </div>
  );
}

export default Welcome;