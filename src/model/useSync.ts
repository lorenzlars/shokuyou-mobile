import { synchronize } from '@nozbe/watermelondb/sync';
import { useDatabase } from '@nozbe/watermelondb/react';
import axios from 'axios';
import { SyncService } from '../api';

export async function useSync() {
  const database = useDatabase();
  const token = await database.localStorage.get('token');

  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  await synchronize({
    database,
    pullChanges: async ({ lastPulledAt, schemaVersion, migration }) => {
      const response = await SyncService.syncPull({
        query: {
          last_pulled_at: lastPulledAt,
          schema_version: schemaVersion,
          migration: JSON.stringify(migration),
        },
      });

      if (response.status !== 200 || !response.data) {
        throw new Error();
      }

      const { changes, timestamp } = response.data;

      return { changes, timestamp };
    },
    pushChanges: async ({ changes, lastPulledAt }) => {
      const response = await SyncService.syncPush({
        params: {
          last_pulled_at: lastPulledAt,
        },
        body: changes,
      });

      if (response.status !== 200) {
        throw new Error();
      }
    },
    migrationsEnabledAtVersion: 1,
  });
}
