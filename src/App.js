import './App.css';
import React from 'react'
import Header from './components/Header.js'
import Form from './components/Form.js'
import Records from './components/Records.js'
import Login from './components/Login.js'
import Metrics from './components/Metrics.js'


function App() {
  const [submissionStatus, setSubmissionStatus] = React.useState(false)
  React.useEffect(()=>{
    setSubmissionStatus(false)
  }, [submissionStatus])
  function handleSubmissionStatus(status) {
    setSubmissionStatus(status)
  }

  return (
    <div className="App">
      <div className="App--left">
        <Header />
        <Form
          handleSubmissionStatus={handleSubmissionStatus}
        />
      </div>
      <div className="App--right">
        <Login />
        <Metrics 
          submissionStatus={submissionStatus}
        />
        <Records
          submissionStatus={submissionStatus}
        />
      </div>
    </div>
  );
}

export default App;
