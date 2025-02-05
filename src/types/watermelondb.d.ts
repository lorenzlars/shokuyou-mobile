import {RawRecord, Database} from "@nozbe/watermelondb";

export type RawModel<T> = RawRecord & T
export type EnhancedPropsWithDatabase<T> = T & { database: Database }
