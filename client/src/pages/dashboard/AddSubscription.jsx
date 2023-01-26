import { FormRow, FormRowSelect, Alert } from '../../components';
import { useAppContext } from '../../context/appContext';

const AddSubscription = () => {
  const {
    isLoading,
    displayAlert,
    isEditing,
    subscriptionName,
    subscriptionPrice,
    subscriptionType,
    subscriptionTypeOptions,
    subscriptionStatus,
    subscriptionStatusOptions,
    handleChange,
    clearValues,
    createSubscription,
  } = useAppContext();

  const handleSubscriptionInput = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    handleChange({ name, value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO - Add validation
    // console.log('submit');
    if (isEditing) {
      // TODO - Update subscription
      return;
    }
    createSubscription();
  };

  return (
    <section className='subscription'>
      <form className='form'>
        <h3>{isEditing ? 'Edit Subscription' : 'Add Subscription'}</h3>
        {displayAlert && <Alert />}
        <div>
          {/*  Subscription Name */}
          <FormRow
            type='text'
            name='subscriptionName'
            placeholder='Enter Subscription Name'
            value={subscriptionName}
            onChange={handleSubscriptionInput}
            labelText='Subscription Name'
          />
          {/*  Subscription Price */}
          <FormRow
            type='text'
            name='subscriptionPrice'
            placeholder='Enter Subscription Price'
            value={subscriptionPrice}
            onChange={handleSubscriptionInput}
            labelText='Subscription Price'
          />

          {/*  Subscription Type */}
          <FormRowSelect
            name='subscriptionType'
            labelText='Subscription Type'
            value={subscriptionType}
            onChange={handleSubscriptionInput}
            list={subscriptionTypeOptions}
          />

          {/*  Subscription Status */}
          <FormRowSelect
            name='subscriptionStatus'
            labelText='Subscription Status'
            value={subscriptionStatus}
            onChange={handleSubscriptionInput}
            list={subscriptionStatusOptions}
          />

          <div className='btn-container'>
            <button
              type='submit'
              className='btn btn-block submit-btn'
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading
                ? 'Loading...'
                : isEditing
                ? 'Edit Subscription'
                : 'Add Subscription'}
            </button>

            <button
              type='button'
              className='btn btn-block clear-btn'
              onClick={(e) => (e.preventDefault(), clearValues())}
            >
              Clear Form
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};
export default AddSubscription;
