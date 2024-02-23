import { writable } from 'svelte/store';
import {
	persist,
	createIndexedDBStorage,
	createLocalStorage
} from '@macfja/svelte-persistent-store';

export let settings = persist(writable({}), createLocalStorage(), 'settings');
export let messages = persist(writable([]), createIndexedDBStorage(), 'messages');
