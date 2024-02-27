<script>
	import { base } from '$app/paths';
	import { messages, settings } from '../../utils/stores';

	let key = '';
	let debug = false;

	settings.subscribe((settings) => {
		key = settings.apiKey || '';
		debug = settings.debug || false;
	});

	async function handleSave() {
		$settings = { apiKey: key, debug: debug };
		alert('Settings saved!');
		location.href = `${base}/settings`;
	}

	async function handleWipeSettings() {
		settings.delete();
		alert('Settings wiped!');
		location.href = `${base}/settings`;
	}

	async function handleWipeHistory() {
		messages.delete();
		alert('History wiped!');
		location.href = `${base}/settings`;
	}
</script>

<div class="mt-3 rounded-2xl border-2 border-neutral bg-base-300 p-6 shadow-2xl">
	<label class="label">
		<span class="label-text text-base-content">API Key</span>
		<input type="text" class="input-neutral input w-full" bind:value={key} />
	</label>
	<label class="label">
		<span class="label-text text-base-content">Debug Mode</span>
		<input type="checkbox" class="checkbox-neutral checkbox" bind:checked={debug} />
	</label>
	<button class="btn btn-info my-2 w-full" on:click={handleSave}>Save</button>
	<button class="btn btn-error my-2 w-full" on:click={handleWipeSettings}>Wipe Settings</button>
	<button class="btn btn-error my-2 w-full" on:click={handleWipeHistory}>Wipe History</button>
</div>
