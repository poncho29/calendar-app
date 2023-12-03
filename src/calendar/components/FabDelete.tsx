import { useCalendarStore, useUiStore } from "../../hooks"

export const FabDelete = () => {
  const { isDateModalOpen } = useUiStore()
  const { hasEventSelected, startDeletingEvent } = useCalendarStore();

  const handleDeleteEvent = () => {
    startDeletingEvent();
  };

  return (
    <button
      className='btn btn-danger fab-danger'
      onClick={handleDeleteEvent}
      style={{
        display: hasEventSelected && !isDateModalOpen ? '' : 'none'
      }}
    >
      <i className='fas fa-trash-alt'></i>
    </button>
  )
}
