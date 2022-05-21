import { Formik, Form, Field, ErrorMessage, useField } from 'formik';
import * as yup from 'yup';


const MyField = ({ label, ...props }) => {
  const [ field, { error, touched } ] = useField(props);

  return (
    <>
      <label htmlFor={ props.name }>{ label }</label>
      <Field { ...field } { ...props } />
      { error && touched ? <div className='error'>{ error }</div> : null }
    </>
  )
}

const CustomForm = () => {
  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        amount: 0,
        currency: '',
        text: '',
        terms: false
      }}
      validationSchema={
        yup.object({
          name: yup.string()
                    .min(2, 'minimum 2 symbols')
                    .required('Required to fill'),
          email: yup.string()
                    .email('Invalid email')
                    .required('Required to fill'),
          amount: yup.number()
                      .integer('Number must be integer')
                      .positive('Number must be positive')
                      .required('Required to fill'),
          currency: yup.string().required('Choose a currency'),
          text: yup.string()
                    .min(10, 'Minimum 10 symbols'),
          terms: yup.boolean()
                      .required('You have to agree')
                      .oneOf([true], 'You have to agree')
      })}
      onSubmit={ (values) => console.log(JSON.stringify(values, null, 2)) }>
        <Form className='form'>
          <h2>Отправить пожертвование</h2>
          <MyField
            label='Your name'
            id='name'
            name='name'
            type='text'
          />

          <MyField
            label='Your email'
            id='email'
            name='email'
            type='email'
          />

          <MyField
            label='Summ'
            id='amount'
            name='amount'
            type='number'
          />


          <label htmlFor='currency'>Валюта</label>
          <Field
            as='select'
            id='currency'
            name='currency'
            >
              <option value=''>Выберите валюту</option>
              <option value='USD'>USD</option>
              <option value='UAH'>UAH</option>
              <option value='RUB'>RUB</option>
          </Field>
          <ErrorMessage className='error' name='currency' component='div'/>


          <MyField
            label='Your message'
            as='textarea'
            id='text'
            name='text'
          />


          <label className='checkbox'>
            <Field
              name='terms'
              type='checkbox'
            />
              Соглашаетесь с политикой конфиденциальности?
          </label>
          <ErrorMessage className='error' name='terms' component='div'/>

          <button type='submit'>Отправить</button>
        </Form>
    </Formik>
  )
}

export default CustomForm;