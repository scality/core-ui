import prettyBytes from 'pretty-bytes';
type Props = {
  bytes?: number;
  decimals?: number;
};

function PrettyBytes({ bytes, decimals = 0 }: Props): string {
  if (bytes === undefined) return '-';
  let fractionDigits = decimals;
  if (
    !Number.isFinite(decimals) ||
    (decimals !== undefined && decimals < 0) ||
    bytes < 1024
  )
    fractionDigits = 0;
  if (!Number.isFinite(bytes) || !bytes || bytes < 0)
    return bytes === Infinity ||
      bytes === -Infinity ||
      (bytes === 0 && !Object.is(bytes, -0))
      ? '0 B'
      : '-';
  return prettyBytes(bytes, {
    locale: 'en',
    binary: true,
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  })
    .replace(/,/g, ' ')
    .replace(/kiB/g, 'KiB');
}

export { PrettyBytes };
