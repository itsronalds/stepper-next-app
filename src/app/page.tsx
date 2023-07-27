'use client';

import { useState } from 'react';
import { Stepper, Step } from './components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faUserPlus, faUserCheck, faGear, faFaceLaughWink } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  const [activeStep, setActiveStep] = useState(0);
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(false);

  /**
   * Prev and next step functions
   */
  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

  /**
   * Disable button logic
   */
  const disablePrevButton = isFirstStep ? true : false;
  const disableNextButton = isLastStep ? true : false;

  /**
   * Button className
   */
  let commonButtonClassName = 'bg-blue-700 py-2.5 px-12 text-white rounded';
  const prevButtonClassName = `${commonButtonClassName} ${disablePrevButton ? 'opacity-40' : ''}`;
  const nextButtonClassName = `${commonButtonClassName} ${disableNextButton ? 'opacity-40' : ''}`;

  /**
   * Button text logic by step
   */
  const nextButtontext = activeStep === 4 ? 'Complete ✅' : activeStep === 5 ? 'Completed 😄 ' : 'Next';

  return (
    <main className="min-h-screen flex justify-center items-center bg-yankees-blue" style={{ minWidth: 800 }}>
      <div>
        <Stepper
          style={{ minWidth: 800 }}
          activeStep={activeStep}
          isLastStep={(value) => setIsLastStep(value)}
          isFirstStep={(value) => setIsFirstStep(value)}
          label="My Tracking System"
        >
          <Step onClick={() => setActiveStep(0)}>
            <FontAwesomeIcon icon={faUserPlus} />
            <div>
              <p>Step 1</p>
              <p>Registration</p>
            </div>
          </Step>
          <Step onClick={() => setActiveStep(1)}>
            <FontAwesomeIcon icon={faCircleCheck} className="w-5 h-5" />
            <div>
              <p>Step 2</p>
              <p>Verification</p>
            </div>
          </Step>
          <Step onClick={() => setActiveStep(2)}>
            <FontAwesomeIcon icon={faUserCheck} />
            <div>
              <p>Step 3</p>
              <p>Login</p>
            </div>
          </Step>
          <Step onClick={() => setActiveStep(3)}>
            <FontAwesomeIcon icon={faGear} className="w-5 h-5" />
            <div>
              <p>Step 4</p>
              <p>Setting</p>
            </div>
          </Step>
          <Step onClick={() => setActiveStep(4)}>
            <FontAwesomeIcon icon={faFaceLaughWink} />
            <div>
              <p>Step 5</p>
              <p>Enjoy!</p>
            </div>
          </Step>
        </Stepper>
        <div className="flex justify-between mt-8">
          <button className={prevButtonClassName} disabled={disablePrevButton} onClick={handlePrev}>
            Prev
          </button>
          <button className={nextButtonClassName} disabled={disableNextButton} onClick={handleNext}>
            {nextButtontext}
          </button>
        </div>
      </div>
    </main>
  );
}
