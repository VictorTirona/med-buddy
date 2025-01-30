import React from 'react';
import CreatableSelect from 'react-select/creatable';
import Alert from './Alert/Alert.js'
import options from '../data/options.js';

/*
TO DO:
✔ Date input (https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date)
✔ Multi-input field (https://www.youtube.com/watch?v=bAJlYgeovlg)
✔ My records UI
    ✔ Use record dummy data and change styling
    ✔ Change the styling to match the Figma file
✔ Setup backend
    ✔ Node.js setup and APIs setup
        ✔ View all records
        ✔ Add record
        ✔ Delete record
        ✔ Edit record
    ✔ Postgresql setup
        ✔ Setup Records data
        
✔ Integrate UI with APIs
    ✔ Submit button
        ✔ UI submit button
        ✔ Clears form fields
        ✔ Add record
    ✔ Initial load
        ✔ Load/view all records
        ✔ Change the experienceData fields to use the Postgres data
    ✔ Queries for metrics
        ✔ Logic: useEffect to query SELECT COUNT() of illnesses
        ✔ Logic: useEffect to query SELECT SUM() of days sick
✔ Metrics
    ✔ Use dummy data first
    ✔ Metrics UI
✔ Add real data
    ✔ Add common symptoms
    ✔ Add common medicine
    ✔ Add common diagnosis
✔ REGEX of forms
    ✔ Symptoms must be filled in
    ✔ Start date must be filled in
    ✔ Setup error state and messages
        ✔ Integrate error message
        ✔ Create an error state in the form
        ✔ In handle submit, if ERROR state is true, don't fetch and show error message. If false, fetch and show success message "Added records"
✔ Light testing
    ✔ What happens when all that can be optional IS optional?
✔ Deploy
    ✔ Deploy frontend
    ✔ Deploy backend
    ✔ Deploy database
✔ Adjust all the fetch requests to use the Supabase methods
✔ Update title and icons
✔ Investigate bug. Why are the errors not showing up properly? Symptoms, start date, start and end date.
✔ Improvement. Maybe add the date sa JAN 2025
✔. Create guest mode and adjust on database
    - Add a warning:
        - Data resets every day. Data included today will be removed!
        - proof of content warning. Do not include sensitive information!
    - Change login button to "Guest mode only" and add an icon of a guest
16. Improvement. Increase all text (1.25x)
14. After all the fetch requests have been done, figure out how to run this locally as well. 
    - Technically dapat pwede bc the database just changed. Everything else should stil be the same.

18. For the future: What if interviewers load this on their mobile phones?
    - Maybe for now, if mobile or ipad, there should be an alert that tells them to use their laptops.
    - https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
19. BUG: Select symptom, then unselect, then submit. You can submit without a symptom

----END OF MVP----
8. Fix the date input
    - order_of_dates should be checked as dates are inputted
    - Add max and min to the dates. Max should be the present day. You can't be sick AFTER today
7. Stage 2 implementation:
    - Make records clickable (reuse what I have sa portfolio). After click, it should present two options:
        - Delete record UI and link to API
        - Edit record UI and link to API
7. Integration with login and registration page
    - Add "user" column in the records table
8. Attached files input -- need to research Firebase and how to store data


Other improvements:
    1. Add max and min to the dates. Max should be the present day. You can't be sick AFTER today
*/

/*
Technical Debt:
1. Multi select inputs are not styled properly
2. Other notes area should expand vertically automatically
3. Other notes area should have a default height
4. When scrolling down, gray is cut off 
*/

export default function Form(props) {
    //General Form Data
    const [formData, setFormData] = React.useState({
        symptoms: "",
        start_date: "",
        end_date: "",
        other_notes: "",
    })

    const [successStatus, setSuccessStatus] = React.useState(false)

    function handleChange(event) {
        const { name, value } = event.target
        setSuccessStatus(false)
        setFormData((oldState) => {
            return {
                ...oldState,
                [name]: value
            }
        })
    }

    //Symptoms
    const [selectedSymptoms, setSelectedSymptoms] = React.useState([])

    function handleChangeSymptoms(selectedOption) {
        setSelectedSymptoms(selectedOption);
        setSuccessStatus(false)
    }



    //Diagnosis
    const [selectedDiagnosis, setSelectedDiagnosis] = React.useState([])

    function handleChangeDiagnosis(selectedOption) {
        setSelectedDiagnosis(selectedOption);
        setSuccessStatus(false)
    }

    //Medicine
    const [selectedMedicine, setSelectedMedicine] = React.useState([])

    function handleChangeMedicine(selectedOption) {
        setSelectedMedicine(selectedOption);
        setSuccessStatus(false)
    }

    //Error handling
    const [errorData, setErrorData] = React.useState({
        symptoms: "",
        start_date: "",
        order_of_dates: ""
    })

    function handleBlurSymptoms() {
        const message = "Please fill in a symptom.";
        if (selectedSymptoms.length === 0) {
            setErrorData((oldState) => {
                return {
                    ...oldState,
                    symptoms: message
                }
            })
        } else {
            setErrorData((oldState) => {
                return {
                    ...oldState,
                    symptoms: ""
                }
            })
        }
    }

    function handleBlurStartDate() {
        const message = "Please fill in a start date.";
        if (formData.start_date.length === 0) {
            setErrorData((oldState) => {
                return {
                    ...oldState,
                    start_date: message
                }
            })
        } else {
            setErrorData((oldState) => {
                return {
                    ...oldState,
                    start_date: ""
                }
            })
        }
    }


    //Submit button

    function handleSubmit(event) {
        event.preventDefault();
        const start_date = new Date(formData.start_date)
        const end_date = new Date(formData.end_date)
        if (selectedSymptoms !== "" && errorData.symptoms == "" && formData.start_date !== "" && (end_date > start_date || formData.end_date == "")) {
            fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/records`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...formData,
                    symptoms: selectedSymptoms,
                    diagnosis: selectedDiagnosis,
                    medicine: selectedMedicine
                })
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    if (data.status === true) {
                        setFormData({
                            start_date: "",
                            end_date: "",
                            other_notes: "",
                        })
                        setSelectedSymptoms([])
                        setSelectedDiagnosis([])
                        setSelectedMedicine([])
                        setErrorData({
                            symptoms: "",
                            start_date: "",
                            order_of_dates: ""
                        })
                        setSuccessStatus(true)
                    }
                })
                .then(() => { props.handleSubmissionStatus(true) })

        } else {
            handleBlurSymptoms()
            handleBlurStartDate()
            const message = "End date must be after the start date.";
            console.log(end_date > start_date ? "Correct" : "Incorrect")
            if (end_date < start_date) {
                setErrorData((oldState) => {
                    return {
                        ...oldState,
                        order_of_dates: message
                    }
                })
            } else {
                setErrorData((oldState) => {
                    return {
                        ...oldState,
                        order_of_dates: ""
                    }
                })
            }
        }

    }

    const multiSelectStyles = {
        control: (baseStyles, state) => ({
            ...baseStyles,
            borderRadius: "10px",
            border: "none",
            minHeight: "44px",
            fontFamily: "Inter, sans-serif",
            height: "auto"
        }),
        multiValue: (baseStyles) => ({
            ...baseStyles,
            backgroundColor: "#1FCC33",
            borderRadius: "5px",
        }),
        multiValueLabel: (baseStyles) => ({
            ...baseStyles,
            color: "white"
        }),
        multiValueRemove: (baseStyles) => ({
            ...baseStyles,
            color: "white",
            ':hover': {
                backgroundColor: "#1DB52E",
                cursor: "pointer"
            }
        }),
    }

    return (
        <form className="Form" onSubmit={handleSubmit}>
            <div className="Form--container">

                {successStatus && <Alert
                    type="success"
                    title="Record has been logged!"
                    bullets={{}}
                />}
                {(errorData.symptoms !== "" || errorData.start_date !== "" || errorData.order_of_dates !== "") && <Alert
                    type="error"
                    title="Record cannot be submitted:"
                    bullets={errorData}
                />}
                <div className="Form--line">
                    <label for="symptoms" className="Form--label">Symptoms Felt</label>
                    <CreatableSelect
                        isMulti
                        options={options.symptoms}
                        value={selectedSymptoms}
                        onChange={handleChangeSymptoms}
                        className="Form--multi-select"
                        styles={multiSelectStyles}
                        classNamePrefix="react-select"
                        onBlur={handleBlurSymptoms}
                    />
                </div>
                <div className="Form--dates-container Form--line">
                    <div className="Form--date Form--startdate">
                        <label for="start_date" className="Form--label">Start date of Symptoms</label>
                        <br />
                        <input
                            type="date"
                            id="start_date"
                            name="start_date"
                            value={formData.start_date}
                            onChange={handleChange}
                            className="Form--date-input"
                            onBlur={handleBlurStartDate}
                        />
                    </div>
                    <div className="Form--date-spacer"></div>
                    <div className="Form--date Form--enddate">
                        <label for="end" className="Form--label">End date <span className="Form--optional">(Optional)</span></label>
                        <br />
                        <input
                            type="date"
                            id="end_date"
                            name="end_date"
                            value={formData.end_date}
                            onChange={handleChange}
                            className="Form--date-input"
                        />
                    </div>
                </div>
                <div className="Form--line">
                    <label for="other_notes" className="Form--label">Other Notes <span className="Form--optional">(Optional)</span></label>
                    <br />
                    <textarea
                        id="other_notes"
                        rows="12"
                        value={formData.other_notes}
                        name="other_notes"
                        onChange={handleChange}
                        placeholder="Started as a cough with green phlegm. After my doctor gave..."
                        className="Form--othernotes-input"
                    />
                </div>
                <div className="Form--line">
                    <label for="diagnosis" className="Form--label">Diagnosis <span className="Form--optional">(Optional)</span></label>
                    <CreatableSelect
                        isMulti
                        options={options.diagnosis}
                        value={selectedDiagnosis}
                        onChange={handleChangeDiagnosis}
                        className="Form--multi-select"
                        styles={multiSelectStyles}
                        classNamePrefix="react-select"
                    />
                </div>
                <div className="Form--line">
                    <label for="medicine" className="Form--label">Medicine Prescribed <span className="Form--optional">(Optional)</span></label>
                    <CreatableSelect
                        isMulti
                        options={options.medicine}
                        value={selectedMedicine}
                        onChange={handleChangeMedicine}
                        className="Form--multi-select"
                        styles={multiSelectStyles}
                        classNamePrefix="react-select"
                    />
                </div>
                <button className="Form--submitbtn" >Log illness</button>
            </div>
        </form>
    )
}