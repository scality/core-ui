import React from 'react';
import { useLocation, useHistory, useRouteMatch } from 'react-router-dom';
import Search, { SearchProps } from './Search';

export type SearchWithQueryParamsProps = {
  queryParams?: string,
} & SearchProps;

export default function SearchWithQueryParams(props) {
  const { queryParams = 'search', onChange, ...rest } = props;
  const match = useRouteMatch();
  const { search } = useLocation();
  const history = useHistory();
  const params = new URLSearchParams(search);
  const initialValue = params.get(queryParams);
  const [value, setValue] = React.useState(initialValue);

  function handleOnChange(value) {
    const { onChange } = props;
    params.set(queryParams, value);
    history.replace(`${match.url}?${params.toString()}`);
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
        setValue('');
      }}
      {...rest}
    />
  );
}