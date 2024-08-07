import { FormControl, InputAdornment } from '@mui/material';
import type { ChangeEventHandler, FocusEventHandler } from 'react';
import { useRef } from 'react';
import Tooltip from "app/components/elements/Tooltip";
import TooltipIcon from "app/components/elements/TooltipIcon";
import { useTranslation } from 'react-i18next';
import { Card, CardTitle } from '../../components/Card';
import { Input } from '../../components/Input';
import { useSettings, useSettingsStore } from '../../stores';
import { formatSlippage } from '../../utils';

export const SlippageInput = () => {
  const { t } = useTranslation();
  const { slippage } = useSettings(['slippage']);
  const setValue = useSettingsStore((state) => state.setValue);
  const defaultValue = useRef(slippage);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value } = event.target;
    setValue('slippage', formatSlippage(value, defaultValue.current, true));
  };

  const handleBlur: FocusEventHandler<HTMLInputElement> = (event) => {
    const { value } = event.target;
    setValue('slippage', formatSlippage(value, defaultValue.current));
  };

  const value = slippage ?? '';

  return (
    <Card sx={{background: 'transparent', border: 'none'}}>
      <CardTitle sx={{marginBottom: '8px'}}>{t(`settings.slippage`)}</CardTitle>
      <FormControl fullWidth>
        <Input
          size="small"
          placeholder={t(`settings.slippage`) as string}
          endAdornment={<InputAdornment position="end">%</InputAdornment>}
          autoComplete="off"
          inputProps={{
            inputMode: 'decimal',
          }}
          onChange={handleChange}
          onBlur={handleBlur}
          value={value}
          sx={{background: '#131313', borderRadius: '10px'}}
        />
      </FormControl>
    </Card>
  );
};
