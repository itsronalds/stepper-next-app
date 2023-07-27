import { Step, GetClassName } from '../../types';

const Step = ({ index, activeStep, isLastStep, onClick, children }: Step) => {
  if (index === undefined || typeof index !== 'number') {
    throw new Error('The "index" value is required and must be a numeric value.');
  }

  if (activeStep === undefined || typeof activeStep !== 'number') {
    throw new Error('The "activeStep" value is required and must be a numeric value.');
  }

  if (isLastStep === undefined || typeof isLastStep !== 'boolean') {
    throw new Error('The "isLastStep" value is required and must be a boolean value.');
  }

  const getStepClassName: GetClassName = (stepIndex, activeStepIndex) => {
    let className = 'flex justify-center items-center w-10 h-10 rounded-full cursor-pointer ';

    if (stepIndex < activeStepIndex) {
      className += 'bg-success-900 text-white';
    }

    if (stepIndex === activeStepIndex) {
      className += 'bg-success-100 border border-success-900 text-success-900';
    }

    if (stepIndex > activeStepIndex) {
      className += 'bg-neutral-100 text-neutral-200';
    }

    return className;
  };

  const getStepTextClassName: GetClassName = (stepIndex, activeStepIndex) => {
    let className = 'text-sm mt-2 transition-all ';

    if (stepIndex < activeStepIndex) {
      className += 'text-success-900';
    }

    if (stepIndex === activeStepIndex) {
      className += 'text-success-900 font-semibold';
    }

    if (stepIndex > activeStepIndex) {
      className += 'text-neutral-200';
    }

    return className;
  };

  const getStepLineClassName: GetClassName = (stepIndex, activeStepIndex) => {
    let className = 'absolute top-5 -right-1/2 w-full h-0.5 pointer-none transition-all ';

    if (stepIndex < activeStepIndex) {
      className += 'bg-success-900';
    } else {
      className += 'bg-neutral-100';
    }

    return className;
  };

  const stepContainerClassName = `flex text-center relative flex-1`;
  const stepClassName = getStepClassName(index, activeStep);
  const stepTextClassName = getStepTextClassName(index, activeStep);
  const stepLineClassName = getStepLineClassName(index, activeStep);

  /**
   * Function to render the first child (should be an icon)
   */
  const renderStep =
    index < activeStep ? (
      <div className={`${stepClassName} text-white`}>{children?.[0]}</div>
    ) : (
      <div className={stepClassName}>{index + 1}</div>
    );

  /**
   * Function to render step childs
   */
  const renderStepChilds = children?.slice(1)?.map((child, index) => (
    <div key={index} className={stepTextClassName}>
      {child}
    </div>
  ));

  /**
   * Conditional to determine if we will render the step line or not
   */
  const renderStepLine = !isLastStep ? <span className={stepLineClassName} /> : null;

  return (
    <div className={stepContainerClassName}>
      <div>{renderStepLine}</div>
      <div className="flex-1 flex flex-col items-center" onClick={() => onClick?.(index)}>
        <div style={{ zIndex: 1 }}>{renderStep}</div>
        {renderStepChilds}
      </div>
    </div>
  );
};

export default Step;
