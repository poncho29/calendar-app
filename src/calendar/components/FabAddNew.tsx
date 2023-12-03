import { addHours } from "date-fns";
import { useCalendarStore, useUiStore } from "../../hooks"

export const FabAddNew = () => {
  const { openDateModal } = useUiStore();
  const { setActiveEvent } = useCalendarStore();

  const handleNewEvent = () => {
    setActiveEvent({
      title: '',
      notas: '',
      start: new Date(),
      end: addHours(new Date(), 2),
      bgColor: '#fafafa',
      user: {
        _id: '',
        name: ''
      }
    })
    openDateModal()
  };

  return (
    <button className='btn btn-primary fab' onClick={handleNewEvent}>
      <i className='fas fa-plus'></i>
    </button>
  )
}
