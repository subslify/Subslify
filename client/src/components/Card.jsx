import '../assets/styles/card.scss'


/*
Next steps:
- review user model, card 'gallery' should be pulled from whatever is currently stored there
*/

const Card = ({subscription, logo, costPerMonth, billingDate, renewalDate, activationDate}) => {

  const dummyDB = {
  subscription: 'Netflix',
  logo: 'https://klazify.s3.amazonaws.com/151716925161173635260112520c68720.99513922.png',
  costPerMonth: '$12',
  billingDate: '1/28/2023',
  renewalDate: '8/23/2023',
  activationDate: '8/23/2022'
}

  return (
    <div className='card-container'>
      <div className='image-container'>
        <img src={dummyDB.logo} alt="" />
      </div>
      <div className="card-content">
        <div className='card-title'>
          {dummyDB.subscription}
        </div>
        <div className="card-body">
           <p>Cost per month {dummyDB.costPerMonth}</p>
          <p>Date of payment: {dummyDB.billingDate}</p>
          <p>Renewal date: {dummyDB.renewalDate}</p>
          <p>Activation Date: {dummyDB.activationDate}</p>
          <p>Manage Account: somewebsite</p>
        </div>
      </div>

      <div className="btn">
        <button>
          <a href="">
            view more
          </a>
        </button>
      </div>
    </div>
  )
}

export default Card
