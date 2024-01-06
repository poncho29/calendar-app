import { useFormik } from 'formik';
import * as Yup from 'yup';

import './loginPage.css';
import { useAuthStore } from '../../hooks';

const initialLogin = {
  email: '',
  password: ''
}

const initialRegister = {
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
}

export const LoginPage = () => {
  const { startLogin } = useAuthStore();

  const formikLogin = useFormik({
    initialValues: initialLogin,
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email('Correo Invalido')
        .required('El correo es obligatorio'),
      password: Yup.string()
        .min(6, 'La contaseña debe tener minimo 4 caracteres')
        .required('La contraseña es obligatorio'),
    }),
    onSubmit: values => {
      startLogin(values)
    },
  });

  const formikRegister = useFormik({
    initialValues: initialRegister,
    validationSchema: Yup.object().shape({
      name: Yup.string().required('El nombre es obligatorio'),
      email: Yup.string()
        .email('Correo Invalido')
        .required('El correo es obligatorio'),
      password: Yup.string()
        .min(6, 'La contaseña debe tener minimo 4 caracteres')
        .required('La contraseña es obligatorio'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), undefined], 'Las contraseñas deben coincidir')
        .min(6, 'La confirmación de contaseña debe tener minimo 4 caracteres')
        .required('La confirmación de contraseña es obligatorio'),
    }),
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Ingreso</h3>
          <form onSubmit={formikLogin.handleSubmit}>
            <div className="form-group mb-2">
              <input
                name='email'
                type="text"
                className="form-control"
                placeholder="Correo"
                value={formikLogin.values.email}
                onBlur={formikLogin.handleBlur}
                onChange={formikLogin.handleChange}
              />
              {formikLogin.errors.email && formikLogin.touched.email && (
                <span className="error-input">
                  {formikLogin.errors.email}
                </span>
              )}
            </div>
            <div className="form-group mb-2">
              <input
                name='password'
                type="password"
                className="form-control"
                placeholder="Contraseña"
                value={formikLogin.values.password}
                onBlur={formikLogin.handleBlur}
                onChange={formikLogin.handleChange}
              />
              {formikLogin.errors.password && formikLogin.touched.password && (
                <span className="error-input">
                  {formikLogin.errors.password}
                </span>
              )}
            </div>
            <div className="d-grid gap-2">
              <input
                type="submit"
                className="btnSubmit"
                value="Login"
              />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Registro</h3>
          <form onSubmit={formikRegister.handleSubmit}>
            <div className="form-group mb-2">
              <input
                name="name"
                type="text"
                className="form-control"
                placeholder="Nombre"
                value={formikRegister.values.name}
                onBlur={formikRegister.handleBlur}
                onChange={formikRegister.handleChange}
              />
              {formikRegister.errors.name && formikRegister.touched.name && (
                <span className="error-input">
                  {formikRegister.errors.name}
                </span>
              )}
            </div>
            <div className="form-group mb-2">
              <input
                name="email"
                type="email"
                className="form-control"
                placeholder="Correo"
                value={formikRegister.values.email}
                onBlur={formikRegister.handleBlur}
                onChange={formikRegister.handleChange}
              />
              {formikRegister.errors.email && formikRegister.touched.email && (
                <span className="error-input">
                  {formikRegister.errors.email}
                </span>
              )}
            </div>
            <div className="form-group mb-2">
              <input
                name="password"
                type="password"
                className="form-control"
                placeholder="Contraseña"
                value={formikRegister.values.password}
                onBlur={formikRegister.handleBlur}
                onChange={formikRegister.handleChange}
              />
              {formikRegister.errors.password && formikRegister.touched.password && (
                <span className="error-input">
                  {formikRegister.errors.password}
                </span>
              )}
            </div>

            <div className="form-group mb-2">
              <input
                name="confirmPassword"
                type="password"
                className="form-control"
                placeholder="Repita la contraseña"
                value={formikRegister.values.confirmPassword}
                onBlur={formikRegister.handleBlur}
                onChange={formikRegister.handleChange}
              />
              {formikRegister.errors.confirmPassword && formikRegister.touched.confirmPassword && (
                <span className="error-input">
                  {formikRegister.errors.confirmPassword}
                </span>
              )}
            </div>

            <div className="d-grid gap-2">
              <input
                type="submit"
                className="btnSubmit"
                value="Crear cuenta" />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}