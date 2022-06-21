
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getGoals, reset, updateGoal } from '../features/goals/goalSlice'
import Spinner from '../components/Spinner'


function EditFrom() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { itemId } = useParams();
  const [itemForm, setItemForm] = useState('');
  const [headItemForm, setHeadItemForm] = useState('');



  const { user } = useSelector((state) => state.auth);
  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goals
  );


  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    } else {
      dispatch(getGoals())

      if (goals.length > 0) {
        const item = goals.filter(obj => {
          return obj._id === itemId;
        });
        const item_name = Object.values(item)[0]['text'];
        setItemForm(item_name);
        setHeadItemForm(item_name);
      }
      return () => {
        dispatch(reset())
      }
    }
  }, [user, navigate, isError, message, dispatch]);

  const onSubmit = (e) => {
    e.preventDefault()
    let updateForm = {
      itemId: itemId,
      itemForm: itemForm
    }
    dispatch(updateGoal(updateForm))
    navigate('/');
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>Edit Goal: {headItemForm}</h1>
      </section>
      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='name'
              name='name'
              value={itemForm}
              placeholder='Enter your name'
              onChange={(e) => setItemForm(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <button type='submit' className='btn btn-block'>
              Submit
            </button>
          </div>
        </form>
      </section>

    </>
  );
}

export default EditFrom;