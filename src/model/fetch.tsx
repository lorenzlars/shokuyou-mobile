import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import {sync} from "./sync";

const BACKGROUND_FETCH_TASK = 'background-fetch';

export async function registerBackgroundFetchAsync() {
  const isRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_FETCH_TASK);

  if (!isRegistered) {
    TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
      await sync()

      return BackgroundFetch.BackgroundFetchResult.NewData;
    });

    return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
      minimumInterval: 60 * 15, // 15 minutes
      stopOnTerminate: false, // android only,
      startOnBoot: true, // android only
    });
  }
}
