import React, { FC, useState } from "react";
import { Input, Button, Icon } from "@canonical/react-components";
import { LxdConfigOption } from "types/config";
import { getConfigId } from "./SettingForm";

interface Props {
  initialValue: boolean;
  configField: LxdConfigOption;
  onSubmit: (newValue: string | boolean) => void;
  onCancel: () => void;
}

const SettingFormCheckbox: FC<Props> = ({
  initialValue,
  configField,
  onSubmit,
  onCancel,
}) => {
  const [checked, setChecked] = useState(initialValue);

  const canBeReset = String(configField.default) !== String(checked);

  const resetToDefault = () => {
    setChecked(String(configField.default) === "true");
  };

  return (
    <>
      <Input
        id={getConfigId(configField.key)}
        wrapperClassName="input-wrapper"
        type="checkbox"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
      <Button onClick={onCancel}>Cancel</Button>
      <Button appearance="positive" onClick={() => onSubmit(checked)}>
        Save
      </Button>
      {canBeReset && (
        <Button
          className="reset-button"
          appearance="base"
          onClick={resetToDefault}
          hasIcon
        >
          <Icon name="restart" className="flip-horizontally" />
          <span>Reset to default</span>
        </Button>
      )}
    </>
  );
};

export default SettingFormCheckbox;