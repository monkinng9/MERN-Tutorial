import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getGoals, reset } from '../features/goals/goalSlice'
import GoalForm from '../components/GoalForm';

function Dashboard() {
  const navigate = useNavigate()
  
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if(!user) {
      navigate('/login');
    }
  }, [user, navigate]);


  return (
    <>
      <section className="heading">
        <h1>Welcom {user && user.name}</h1>
        <p>Goals Dashboard</p>
        <GoalForm/>
      </section>
    </>
  )
}

export default Dashboard