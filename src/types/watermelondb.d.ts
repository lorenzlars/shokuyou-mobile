import { RawRecord, Database, Model } from '@nozbe/watermelondb';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Observable } from '@nozbe/watermelondb/utils/rx';

export type RawModel<T> = RawRecord & T;
export type EnhancedPropsWithDatabase<T extends NativeStackScreenProps> = T & {
  database: Database;
};
export type ObservableProps<T extends Record<string, Model | Model[]>> = {
  [key: keyof T]: Observable<T[keyof T]>;
};
