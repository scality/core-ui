import prettyBytes from 'pretty-bytes';
type Props = {
  bytes?: number | null;
  decimals?: number | null;
  unit?: 'iB' | 'B';
};

function PrettyBytes({ bytes, decimals = 0, unit = 'iB' }: Props) {
  if (bytes === undefined || bytes === null) return <>-</>;
  let fractionDigits = decimals;
  if (
    !Number.isFinite(decimals) ||
    (decimals !== undefined && decimals !== null && decimals < 0) ||
    bytes < 1024
  )
    fractionDigits = 0;
  if (!Number.isFinite(bytes) || !bytes || bytes < 0)
    return bytes === Infinity ||
      bytes === -Infinity ||
      (bytes === 0 && !Object.is(bytes, -0)) ? (
      <>0 B</>
    ) : (
      <>-</>
    );
  return (
    <>
      {prettyBytes(bytes, {
        locale: 'en',
        binary: unit === 'iB',
        minimumFractionDigits: fractionDigits ?? undefined,
        maximumFractionDigits: fractionDigits ?? undefined,
      })
        .replace(/,/g, ' ')
        .replace(/kiB/g, 'KiB')}
    </>
  );
}

export { PrettyBytes };
