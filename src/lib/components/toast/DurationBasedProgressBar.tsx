import { darken } from 'polished';
import { useEffect, useState } from 'react';
import { ProgressBar } from '../progressbar/ProgressBar.component';

export function DurationBasedProgressBar({
  duration,
  color,
}: {
  duration: number | null;
  color: string;
}) {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    if (duration) {
      const interval = setInterval(() => {
        setProgress((prevProgress) => prevProgress + (100 / duration) * 1000);
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [duration]);

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        borderRadius: 4,
      }}
    >
      <ProgressBar
        size="custom"
        percentage={progress}
        color={color}
        backgroundColor={`${darken(0.1, color)}`}
        height={'4px'}
      />
    </div>
  );
}
