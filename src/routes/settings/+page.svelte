<script>
	import { messages, settings } from '../../utils/stores';

	let key = '';

	settings.subscribe((settings) => {
		key = settings.apiKey || '';
	});

	async function handleSave() {
		$settings = { apiKey: key };
	}

	async function handleWipeSettings() {
		settings.delete();
		alert('Settings wiped!');
		location.href = '/settings';
	}

	async function handleWipeHistory() {
		messages.delete();
		alert('History wiped!');
		location.href = '/settings';
	}
</script>

<label class="label">
	<span class="label-text">API Key</span>
	<input type="text" class="input input-bordered input-primary w-full" bind:value={key} />
</label>
<button class="btn btn-primary my-2 w-full" on:click={handleSave}>Save</button>
<button class="btn btn-error my-2 w-full" on:click={handleWipeSettings}>Wipe Settings</button>
<button class="btn btn-error my-2 w-full" on:click={handleWipeHistory}>Wipe History</button>
