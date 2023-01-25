import '../assets/styles/card.scss'
import { useState } from 'react';
import ReactCardFlip from 'react-card-flip';


/*
Next steps:
- review user model, card 'gallery' should be pulled from whatever is currently stored there
*/

const Card = ({
    name,
    price,
    frequency,
    startDate,
    user,
    status,
    endDate,
    logoUrl,
    notes,
  }) => {
    const [flip, setFlip] = useState(false);

  const dummyDB = {
    key: 'someId',
    name: 'Netflix',
    price: '$12',
    frequency: 'monthly',
    startDate: '8/23/2022',
    user: 'codesmith',
    status: 'active',
    endDate: '8/23/2023',
    logoUrl: 'https://klazify.s3.amazonaws.com/151716925161173635260112520c68720.99513922.png',
    notes: 'lorem ipsum dolor',
}

  return (
    <div className='card-container'>
    <ReactCardFlip isFlipped={flip} flipDirection="horizontal" >
      <div className='card-content card-front'>
        <div className='image-container'>
         <img src={dummyDB.logoUrl} alt="" />
        </div>
        <div className="card-body">
          <p>Subscription: {dummyDB.name}</p>
          <p>Status: {dummyDB.status}</p>
           <p>Price: {dummyDB.price}</p>
          <p>Frequency: {dummyDB.frequency}</p>
          <br />
          <button onClick={() => setFlip(!flip)}>View More</button>
        </div>
      </div>

      <div className="card-content card-back">
        <div className='image-container'>
           <img src={dummyDB.logoUrl} alt="" />
        </div>
        <div className='card-body'>
          <p>Username: {dummyDB.user}</p>
          <p>Start Date: {dummyDB.startDate}</p>
          <p>End Date: {dummyDB.endDate}</p>
          <p>Notes: {dummyDB.notes}</p>
          <a href="https://netflix.com/youraccount/" target="_blank">
            Manage Account
          </a>
        </div>
        <button onClick={() => setFlip(!flip)}>Return</button>
      </div>
    </ReactCardFlip>
    </div>
  )
}

export default Card
