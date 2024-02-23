<script>
	import { fileToImagePart, queryModel } from '../utils/gemini';
	import { messages, settings } from '../utils/stores';

	let key = '';
	let prompt = '';
	let images = [];

	settings.subscribe((settings) => {
		key = settings.apiKey || '';
	});

	async function handleFileUpload(event) {
		const files = event.target.files;
		images = await Promise.all([...files].map(fileToImagePart));
	}

	async function handleSend() {
		const history = $messages;
		$messages = [...$messages, { role: 'user', parts: prompt }];

		const response = await queryModel({ key, prompt, images }, history);
		$messages = [...$messages, { role: 'model', parts: response.result }];
	}

	async function handleSave() {
		$settings = {
			apiKey: key
		};
	}
</script>

<div role="tablist" class="tabs-boxed tabs bg-base-100">
	<input type="radio" name="tabList" role="tab" class="tab" aria-label="Chat" checked />
	<div role="tabpanel" class="tab-content h-full bg-base-100 p-6">
		<div class="mt-3 flex-grow overflow-y-auto border-2 bg-base-100 p-3">
			{#each $messages as { role, parts }}
				<div class="my-2 bg-primary p-4">
					{#if role === 'user'}
						<strong>You</strong>:
					{:else if role === 'model'}
						<strong>Oracle</strong>:
					{/if}
					<p>{parts}</p>
				</div>
			{/each}
		</div>
		<div class="base-100 mt-3 p-3">
			<label class="label">
				<span class="label-text mr-3">Prompt</span>
				<textarea
					class="textarea textarea-bordered textarea-primary my-2 w-full"
					bind:value={prompt}
				/>
			</label>
			<label class="label">
				<span class="label-text mr-3">Images (optional)</span>
				<input
					type="file"
					accept="image/*"
					multiple
					class="file-input file-input-bordered file-input-primary my-2 w-full"
					on:change={handleFileUpload}
				/>
			</label>
			<button class="btn btn-primary my-2 w-full" on:click={handleSend}>Send</button>
		</div>
	</div>

	<input type="radio" name="tabList" role="tab" class="tab" aria-label="Settings" />
	<div role="tabpanel" class="tab-content h-full bg-base-100 p-6">
		<label class="label">
			<span class="label-text">API Key</span>
			<input type="text" class="input input-bordered input-primary" bind:value={key} />
		</label>
		<button class="btn btn-primary my-2 w-full" on:click={handleSave}>Save</button>
	</div>
</div>
