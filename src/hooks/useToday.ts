import { useSyncExternalStore } from "react";

const subscribe = () => () => {};
const getToday = () => new Date().toLocaleDateString("en-CA");
const getServerSnapshot = () => undefined;

export const useToday = () => useSyncExternalStore(subscribe, getToday, getServerSnapshot);
