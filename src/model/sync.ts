import {synchronize} from '@nozbe/watermelondb/sync'
import {useDatabase} from "@nozbe/watermelondb/react";
import axios from "axios";

async function sync() {
  const database = useDatabase()
  const token = await database.localStorage.get("token")

  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

  await synchronize({
    database,
    pullChanges: async ({lastPulledAt, schemaVersion, migration}) => {
      const response = await axios.get(`/sync`, {
        params: {
          'last_pulled_at': lastPulledAt,
          'schema_version': schemaVersion,
          'migration': JSON.stringify(migration),
        }
      })

      if (response.status !== 200) {
        throw new Error()
      }

      const {changes, timestamp} = await response.json()
      return {changes, timestamp}
    },
    pushChanges: async ({changes, lastPulledAt}) => {
      const response = await axios.post('/sync', {
        params: {
          'last_pulled_at': lastPulledAt
        },
        body: JSON.stringify(changes),
      })

      if (response.status !== 200) {
        throw new Error()
      }
    },
    migrationsEnabledAtVersion: 1,
  })
}
