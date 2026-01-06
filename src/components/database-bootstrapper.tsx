import { useEffect, useState } from 'react';
import { db, getSetting, setSetting, getAdaptationSignalsByPeriod } from '@/lib/database';
import { createLogger } from '@/lib/logger';

const logger = createLogger('DatabaseBootstrapper');

export function DatabaseBootstrapper() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    let cancelled = false;
    let pruneInterval: ReturnType<typeof setInterval> | undefined;

    async function bootstrap() {
      try {
        // Ensure database is ready
        await db.tasks.count();
        logger.info('Database ready');
      } catch (error) {
        logger.error('DB bootstrap failed', error as Error);
        return;
      }

      if (cancelled) return;

      // Schedule periodic data cleanup
      pruneInterval = setInterval(() => {
        db.pruneData(90).catch(() => null);
      }, 24 * 60 * 60 * 1000);
    }

    bootstrap().catch(() => null);

    return () => {
      cancelled = true;
      if (pruneInterval) clearInterval(pruneInterval);
    };
  }, [isMounted]);

  if (!isMounted) return null;
  return null;
}
