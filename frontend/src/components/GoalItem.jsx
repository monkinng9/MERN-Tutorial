import { useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { deleteGoal } from '../features/goals/goalSlice'

function GoalItem({ goal }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="goal">
      <div>
        <h2>{goal.text}</h2>
        <button onClick={() => dispatch(deleteGoal(goal._id))} className="close"
          >X</button>
        <button onClick={() => navigate(`/edit/${goal._id}`)} className="edit"
          >Edit</button>
      </div>
    </div>
  )
}

export default GoalItem