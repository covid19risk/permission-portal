import React, { useState, createRef } from 'react'
import Toast from '../components/Toast'
import '../../Styles/screens/code_validations.scss'
import * as ROUTES from '../constants/routes'
import { withStore } from '../store'
import { Redirect } from 'react-router-dom'
import { observer } from 'mobx-react'
import PageTitle from '../components/PageTitle'
import PendingOperationButton from '../components/PendingOperationButton'

const CodeValidationsBase = observer((props) => {
  const [code, setCode] = useState('')
  const [toastInfo, setToastInfo] = useState({
    success: false,
    msg: '',
  })

  let confirmedToast = createRef()

  const genNewCode = async () => {
    try {
      // TODO: testType and testDate should be set by fields in the interface; blocked awaiting v4 figma
      let code = await props.store.getVerificationCode({
        testType: 'confirmed',
        testDate: new Date().toJSON().substring(0, 10),
      })
      setCode(code.data.split('').join(' '))
    } catch (err) {
      setToastInfo({ success: false, msg: 'Could not generate new code, please try again' })
      confirmedToast.current.show()
    }
  }

  return !props.store.data.user.isSignedIn ||
    props.store.data.user.isFirstTimeUser ||
    (props.store.data.user.passwordResetRequested && props.store.data.user.signedInWithEmailLink) ? (
    <Redirect to={ROUTES.LANDING} />
  ) : (
    <div className="module-container">
      <PageTitle title="Positive Test Validations" />
      <h1>Positive Test Validations</h1>
      <div id="actions-box" className="gray-background">
        <div className="validation-container">
          <div className="section-heading-container">
            <h2>Validation Code</h2>
          </div>
          <div className="validation-text">
            Provide this code to the person you want to verify over the phone. Each code can only be used once.
          </div>
          <div className="code-box">{code}</div>
          <PendingOperationButton className="save-button generate-button" operation={genNewCode}>
            Generate New Code
          </PendingOperationButton>
        </div>
      </div>
      <Toast ref={confirmedToast} isSuccess={toastInfo.success} message={toastInfo.msg} />
    </div>
  )
})

const CodeValidations = withStore(CodeValidationsBase)

export default CodeValidations
