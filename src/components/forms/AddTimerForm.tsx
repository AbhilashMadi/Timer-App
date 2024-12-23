import Button from "@/components/custom/Button";
import Input from "@/components/custom/Input";
import Label from "@/components/custom/Label";
import TextArea from "@/components/custom/TextArea";

import { type AddTimerFormSchema, FormKeys } from "@/types/form.types";
import { type FC, type FormEvent, useState } from "react";

import { useTimerStore } from "@/hooks/useTimerStore";
import { validateTimerForm } from "@/utils/validation";
import { Timer } from "@/types/timer";
import { convertSeconds } from "@/utils/time";

export type AddTimerFormProps = {
  onClose: () => void;
  editTimerObj?: Timer;
}

const AddTimerForm: FC<AddTimerFormProps> = (props) => {
  const { onClose, editTimerObj } = props;
  const { addTimer, editTimer } = useTimerStore();

  const editDurations = convertSeconds(editTimerObj?.duration ?? 0);
  const intialFormState: Readonly<AddTimerFormSchema> = {
    [FormKeys.TITLE]: editTimerObj?.[FormKeys.TITLE] || "",
    [FormKeys.DESCRIPTION]: editTimerObj?.[FormKeys.DESCRIPTION] || "",
    [FormKeys.HOURS]: editDurations.hours,
    [FormKeys.MINUTES]: editDurations.minutes,
    [FormKeys.SECONDS]: editDurations.seconds,
  };

  // Initial touched state to track which fields were interacted with
  const intitalTouched: Readonly<Record<keyof AddTimerFormSchema, boolean>> = {
    [FormKeys.TITLE]: false,
    [FormKeys.DESCRIPTION]: false,
    [FormKeys.HOURS]: false,
    [FormKeys.MINUTES]: false,
    [FormKeys.SECONDS]: false,
  } as const;

  // Setting up form and touched state using useState hooks
  const [formState, setFormState] = useState<AddTimerFormSchema>(intialFormState);
  const [touchedState, setTouchedState] = useState<typeof intitalTouched>(intitalTouched);

  const TITLE_MAX_LENGTH: number = 50;

  // Handle form input change: Updates the corresponding field in formState
  const handleChange = (field: FormKeys, value: string | number): void => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  // Handle input field blur: Marks the field as "touched"
  const handleBlur = (field: FormKeys): void => {
    setTouchedState((pre) => ({ ...pre, [field]: true }))
  }

  // Handle form submission: Validates and then adds the timer to the store
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Form validation before proceeding
    if (!validateTimerForm(formState)) {
      return; // If invalid, stop the form submission
    }

    // Calculate total timer duration in seconds
    const totalSeconds =
      (formState[FormKeys.HOURS] || 0) * 3600 +
      (formState[FormKeys.MINUTES] || 0) * 60 +
      (formState[FormKeys.SECONDS] || 0);

    // Create the timer object
    const timer = {
      title: formState[FormKeys.TITLE].trim(),
      description: formState[FormKeys.DESCRIPTION].trim(),
      duration: totalSeconds,
      remainingTime: totalSeconds,
      isRunning: false,
    };

    const editTimerObjId = editTimerObj?.id;

    if (editTimerObjId) {
      // If we're editing an existing timer, call editTimer
      editTimer(editTimerObjId, timer);
    } else {
      // If it's a new timer, call addTimer
      addTimer(timer);
    }

    // Reset the form state after successful submission
    setFormState(intialFormState);
    setTouchedState(intitalTouched);
    onClose();
  };

  // Validation checks for title (required and max length) and time (must be > 0)
  const isTitleValid: boolean = formState[FormKeys.TITLE].trim().length > 0 && formState[FormKeys.TITLE].length <= TITLE_MAX_LENGTH;

  const isTimeValid: boolean =
    (formState[FormKeys.HOURS] || 0) +
    (formState[FormKeys.MINUTES] || 0) +
    (formState[FormKeys.SECONDS] || 0) > 0;

  return (
    <form className="mt-4" onSubmit={handleSubmit}>
      <div className="space-y-8">
        <div>
          {/* Title input field with validation */}
          <Input
            label="Title"
            name={FormKeys.TITLE}
            placeholder="Enter timer title"
            maxLength={TITLE_MAX_LENGTH}
            value={formState[FormKeys.TITLE]}
            onChange={(e) => handleChange(FormKeys.TITLE, e.target.value)}
            onBlur={() => handleBlur(FormKeys.TITLE)}
            touched={touchedState[FormKeys.TITLE]}
            errorMessage={"Title is required and must be less than 50 characters"}
            required
            isValid={isTitleValid}
            autoFocus
          />
          {/* Display character count and validation message */}
          {(isTitleValid || !touchedState[FormKeys.TITLE]) &&
            <p className="mt-1 text-sm text-gray-500">{formState.title.length}/50 characters</p>}
        </div>

        {/* Description text area */}
        <TextArea
          label="Description"
          rows={3}
          touched={touchedState[FormKeys.DESCRIPTION]}
          onChange={(e) => handleChange(FormKeys.DESCRIPTION, e.target.value)}
          value={formState[FormKeys.DESCRIPTION]}
          onBlur={() => handleBlur(FormKeys.DESCRIPTION)}
          placeholder="Enter timer description (optional)"
          name={FormKeys.DESCRIPTION}
          isValid={true}
        />

        {/* Duration input fields for hours, minutes, and seconds */}
        <div className="space-y-2">
          <Label required>Duration</Label>
          <div className="flex gap-3">
            {/* Hours input field */}
            <Input
              label="Hours"
              type="number"
              min={0}
              max={23}
              className="inline"
              name={FormKeys.HOURS}
              touched={touchedState[FormKeys.HOURS]}
              onChange={(e) => handleChange(FormKeys.HOURS, parseInt(e.target.value))}
              onBlur={() => handleBlur(FormKeys.HOURS)}
              value={formState[FormKeys.HOURS]}
              placeholder="Hours"
              isValid={true}
            />
            {/* Minutes input field */}
            <Input
              label="Minutes"
              type="number"
              min={0}
              max={59}
              className="inline"
              value={formState[FormKeys.MINUTES]}
              onBlur={() => handleBlur(FormKeys.MINUTES)}
              name={FormKeys.MINUTES}
              touched={touchedState[FormKeys.MINUTES]}
              onChange={(e) => handleChange(FormKeys.MINUTES, parseInt(e.target.value))}
              placeholder="Minutes"
              isValid={true}
            />
            {/* Seconds input field */}
            <Input
              label="Seconds"
              type="number"
              min={0}
              max={59}
              className="inline"
              value={formState[FormKeys.SECONDS]}
              touched={touchedState[FormKeys.SECONDS]}
              onBlur={() => handleBlur(FormKeys.SECONDS)}
              name={FormKeys.SECONDS}
              onChange={(e) => handleChange(FormKeys.SECONDS, parseInt(e.target.value))}
              placeholder="Seconds"
              isValid={true}
            />
          </div>
          {/* Duration validation message */}
          {!isTimeValid && (touchedState[FormKeys.HOURS] || touchedState[FormKeys.MINUTES] || touchedState[FormKeys.SECONDS]) && (
            <p className="mt-2 text-sm text-red-500">Please set a duration greater than 0</p>
          )}
        </div>
      </div>

      <hr className="my-6" />
      <div className="flex justify-end gap-2">
        <Button
          variant="ghost"
          type="reset"
          onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="primary"
          type="submit"
        // disabled={!isTitleValid || !isTimeValid}
        >
          Add Timer
        </Button>
      </div>
    </form>
  )
}

export default AddTimerForm;
