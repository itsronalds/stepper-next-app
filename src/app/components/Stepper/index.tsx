import { useEffect, Children, cloneElement, isValidElement } from 'react';
import { StepperProps, StepProps } from '../../types';

const Stepper = ({ className, style, activeStep, isLastStep, isFirstStep, label, children }: StepperProps) => {
  /**
   * Stepper style & className default value
   */
  let stepperStyle = {
    minWidth: '100%',
  };
  let stepperClassname = 'px-10 py-5  bg-white rounded shadow-md';

  /**
   * If we pass style or className from the component properties assign it to values
   */
  if (typeof style === 'object' && !Array.isArray(style)) {
    stepperStyle = { ...stepperStyle, ...style };
  }

  if (typeof className === 'string') {
    className += ` ${className}`;
  }

  useEffect(() => {
    handleFirstAndLastStep();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStep]);

  /**
   * Children quantity
   */
  const childrenLen = Children.count(children);

  /**
   * Function that return children with new props
   */
  const renderChildren = () =>
    Children.map(children, (child, index: number) => {
      if (isValidElement(child)) {
        const props: StepProps = {
          index,
          activeStep,
          isLastStep: index === childrenLen - 1,
        };

        return cloneElement(child, props);
      }
    });

  /**
   * Function that handle de first and last step
   */
  const handleFirstAndLastStep = () => {
    if (activeStep === 0) {
      isFirstStep(true);
      isLastStep(false);
    } else if (activeStep === childrenLen) {
      isFirstStep(false);
      isLastStep(true);
    } else {
      isFirstStep(false);
      isLastStep(false);
    }
  };

  return (
    <>
      <div className={stepperClassname} style={stepperStyle}>
        <h2 className="text-xl font-bold text-center text-yankees-blue">{label}</h2>
        <div className="flex py-10">{renderChildren()}</div>
      </div>
    </>
  );
};

export default Stepper;
