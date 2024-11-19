import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TableSearch as Search, SearchProps } from './Search';

export type SearchWithQueryParamsProps = {
  queryParams?: string;
} & Omit<SearchProps, 'onChange' | 'value'> &
  Partial<Pick<SearchProps, 'onChange'>>;

export function SearchWithQueryParams(props: SearchWithQueryParamsProps) {
  const { queryParams = 'search', onChange, ...rest } = props;
  const { search, pathname } = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(search);
  const initialValue = params.get(queryParams) || '';
  const [value, setValue] = useState(initialValue);

  function handleOnChange(value: string) {
    const { onChange } = props;
    params.set(queryParams, value);
    navigate(`${pathname}?${params.toString()}`, { replace: true });
    setValue(value);

    if (typeof onChange === 'function') {
      onChange(value);
    }
  }

  return (
    <Search
      onChange={handleOnChange}
      value={value}
      onReset={() => {
        handleOnChange('');
      }}
      {...rest}
    />
  );
}
