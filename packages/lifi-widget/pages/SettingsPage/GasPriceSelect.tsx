import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { FormControl, MenuItem } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Card, CardTitle } from '../../components/Card';
import { Select } from '../../components/Select';
import { useSettings, useSettingsStore } from '../../stores';

export const GasPriceSelect = () => {
  const { t } = useTranslation();
  const setValue = useSettingsStore((state) => state.setValue);
  const { gasPrice } = useSettings(['gasPrice']);

  return (
    <Card flex={1} sx={{background: 'transparent', border: 'none'}}>
      <CardTitle sx={{marginBottom: '8px'}}>{t(`settings.gasPrice.title`)}</CardTitle>
      <FormControl fullWidth>
        <Select
          MenuProps={{ elevation: 2 }}
          value={gasPrice}
          onChange={(event) =>
            setValue('gasPrice', event.target.value as string)
          }
          IconComponent={KeyboardArrowDownIcon}
          dense
          sx={{background: '#131313', borderRadius: '10px'}}
        >
          <MenuItem value="slow">{t(`settings.gasPrice.slow`)}</MenuItem>
          <MenuItem value="normal">{t(`settings.gasPrice.normal`)}</MenuItem>
          <MenuItem value="fast">{t(`settings.gasPrice.fast`)}</MenuItem>
        </Select>
      </FormControl>
    </Card>
  );
};
