export type StepperProps = {
  className?: string;
  style?: object;
  activeStep: number;
  isLastStep: (value: boolean) => void;
  isFirstStep: (value: boolean) => void;
  label?: string;
  children: JSX.Element[];
};

export type StepProps = {
  index?: number;
  activeStep?: number;
  isLastStep?: boolean;
  onClick?: (index: number) => void;
  children?: JSX.Element[];
};

export type GetClassNameProps = (stepIndex: number, activeStepIndex: number) => string;
