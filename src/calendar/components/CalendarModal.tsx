import { ChangeEvent, useState } from 'react';
import { addHours } from 'date-fns';
import Modal from 'react-modal'
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    maxWidth: '600px',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

export const CalendarModal = () => {
  const [isOpen, setIsOpen] = useState(true);

  const [formValues, setFormValues] = useState({
    title: '',
    notes: '',
    start: new Date(),
    end: addHours(new Date(), 2)
  })

  const onInputChange = ({ target }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const onDateChange = (event: Date | null, field: string) => {
    setFormValues({
      ...formValues,
      [field]: event
    });
  };

  const onCloseModal = () => {
    console.log('Cerrando modal');
    setIsOpen(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      style={customStyles}
      className='modal'
      closeTimeoutMS={200}
      overlayClassName='modal-fondo'
      onRequestClose={onCloseModal}
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className="container">
        <div className="form-group mb-2">
          <label className='w-100'>Fecha y hora inicio</label>
          <DatePicker
            dateFormat='Pp'
            className='form-control'
            selected={formValues.start}
            onChange={(e) => onDateChange(e, 'start')}
          />
        </div>

        <div className="form-group mb-2">
          <label className='w-100'>Fecha y hora fin</label>
          <DatePicker
            dateFormat='Pp'
            className='form-control'
            selected={formValues.end}
            minDate={formValues.start}
            onChange={(e) => onDateChange(e, 'end')}
          />
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Titulo y notas</label>
          <input
            type="text"
            name="title"
            autoComplete="off"
            placeholder="Título del evento"
            className="form-control"
            value={formValues.title}
            onChange={onInputChange}
          />
          <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
        </div>

        <div className="form-group mb-2">
          <textarea
            rows={5}
            name="notes"
            placeholder="Notas"
            className="form-control"
            value={formValues.notes}
            onChange={onInputChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">Información adicional</small>
        </div>

        <button
          type="submit"
          className="btn btn-outline-primary btn-block"
        >
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>

      </form>
    </Modal>
  )
}
