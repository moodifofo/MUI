import {
  NumberInputActionContext,
  NumberInputReducerAction,
  NumberInputState,
  StepDirection,
} from './useNumberInput.types';
import { NumberInputActionTypes } from './numberInputAction.types';
import { clamp, isNumber } from './utils';

// extracted from handleValueChange
function getClampedValues(rawValue: number | undefined, context: NumberInputActionContext) {
  const { min, max, step } = context;

  const clampedValue = rawValue === undefined ? '' : clamp(rawValue, min, max, step);

  const newInputValue = clampedValue === undefined ? '' : String(clampedValue);

  return {
    value: clampedValue,
    inputValue: newInputValue,
  };
}

function stepValue(
  state: NumberInputState,
  context: NumberInputActionContext,
  direction: StepDirection,
  multiplier: number,
) {
  const { value } = state;
  const { step = 1, min, max } = context;

  if (isNumber(value)) {
    return {
      up: value + (step ?? 1) * multiplier,
      down: value - (step ?? 1) * multiplier,
    }[direction];
  }

  return {
    up: min ?? 0,
    down: max ?? 0,
  }[direction];
}

function handleClamp<State extends NumberInputState>(
  state: State,
  context: NumberInputActionContext,
  inputValue: string,
) {
  const { getInputValueAsString } = context;

  const parsedValue = getInputValueAsString(inputValue);

  const intermediateValue =
    parsedValue === '' || parsedValue === '-' ? undefined : parseInt(parsedValue, 10);

  const clampedValues = getClampedValues(intermediateValue, context);

  return {
    ...state,
    ...clampedValues,
  };
}

function handleInputChange<State extends NumberInputState>(
  state: State,
  context: NumberInputActionContext,
  inputValue: string,
) {
  const { getInputValueAsString } = context;

  const parsedValue = getInputValueAsString(inputValue);

  if (parsedValue === '' || parsedValue === '-') {
    return {
      ...state,
      inputValue: parsedValue,
      value: '',
    };
  }

  if (parsedValue.match(/^-?\d+?$/)) {
    return {
      ...state,
      inputValue: parsedValue,
      value: parseInt(parsedValue, 10),
    };
  }

  return state;
}

// use this for ArrowUp, ArrowDown
// use this with shiftKey: true for PageUp, PageDown
function handleStep<State extends NumberInputState>(
  state: State,
  context: NumberInputActionContext,
  shiftKey: boolean,
  direction: StepDirection,
) {
  const multiplier = shiftKey ? context.shiftMultiplier : 1;

  const newValue = stepValue(state, context, direction, multiplier);

  const clampedValues = getClampedValues(newValue, context);

  return {
    ...state,
    ...clampedValues,
  };
}

function handleToMinOrMax<State extends NumberInputState>(
  state: State,
  context: NumberInputActionContext,
  to: 'min' | 'max',
) {
  const newValue = context[to];

  if (!isNumber(newValue)) {
    return state;
  }

  return {
    ...state,
    value: newValue,
    inputValue: String(newValue),
  };
}

export function numberInputReducer(
  state: NumberInputState,
  action: NumberInputReducerAction,
): NumberInputState {
  const { type, context } = action;

  switch (type) {
    case NumberInputActionTypes.clamp:
      return handleClamp(state, context, action.inputValue);
    case NumberInputActionTypes.inputChange:
      return handleInputChange(state, context, action.inputValue);
    case NumberInputActionTypes.increment:
      return handleStep(state, context, action.shiftKey, 'up');
    case NumberInputActionTypes.decrement:
      return handleStep(state, context, action.shiftKey, 'down');
    case NumberInputActionTypes.incrementToMax:
      return handleToMinOrMax(state, context, 'max');
    case NumberInputActionTypes.decrementToMin:
      return handleToMinOrMax(state, context, 'min');
    default:
      return state;
  }
}
