import axios from 'axios'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React from 'react'
import { BiArrowBack } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

export default function ChangePassword() {
  const navigate = useNavigate()
  // const [loading, setLoading] = useState(false)
  const initialValues = {
    oldPassword: '',
    newPassword: '',
  }

  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Old password is required'),
    newPassword: Yup.string().required('New password is required'),
    // username: Yup.string().min(3).max(15).required('Username is required'),
  })

  const onSubmit = (data) => {
    axios
      .put('http://localhost:2023/auth/change-password', data, {
        headers: { accessToken: localStorage.getItem('accessToken') },
      })
      .then((response) => {
        if (response.error) {
          alert(error)
        }
      })
    console.log(data)
  }
  return (
    <div className="wrapper">
      <div className="p-3" style={{ marginTop: 65, marginBottom: 65 }}>
        <div
          className="mb-3 d-flex justify-content-even align-items-center mb-3"
          style={{ gap: 20 }}
        >
          <BiArrowBack
            style={{ color: 'white', fontSize: 25 }}
            onClick={() => navigate(-1)}
          />{' '}
          <h5 className="app_title m-0">Edit Password</h5>
        </div>

        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form>
            <label className="app_label">Old Password</label>
            <div>
              <Field
                className="post_input"
                type="password"
                autoComplete="off"
                id="inputCreatePost"
                name="oldPassword"
              />
              <div>
                <ErrorMessage name="oldPassword" component="span" />
              </div>
            </div>

            <label className="app_label">New Password</label>
            <div>
              <Field
                className="post_input"
                autoComplete="off"
                type="password"
                id="inputCreatePost"
                name="newPassword"
              />
              <div>
                <ErrorMessage name="newPassword" component="span" />
              </div>
            </div>

            <button
              type="submit"
              className="app_primary_button mt-3"
              style={{ width: '100%' }}
            >
              Save Changes
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  )
}
