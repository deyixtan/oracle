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
		$messages = [...$messages, { user: 'You', text: prompt }];

		const response = await queryModel({ key, prompt, images });
		$messages = [...$messages, { user: 'Oracle', text: response.result }];
	}

	async function handleSave() {
		$settings = {
			apiKey: key
		};
	}
</script>

<div role="tablist" class="tabs tabs-lifted bg-neutral">
	<input type="radio" name="tabList" role="tab" class="tab" aria-label="Chat" />
	<div role="tabpanel" class="tab-content h-full rounded-box bg-base-100 p-6">
		<div class="base-300 mt-3 flex-grow overflow-y-auto p-3">
			{#each $messages as { user, text }}
				<div class="my-2 bg-primary p-4">
					<strong>{user}</strong>:
					<p>{text}</p>
				</div>
			{/each}
		</div>
		<div class="base-300 mt-3 p-3">
			<label for="inputPrompt">Prompt:</label>
			<textarea
				id="inputPrompt"
				class="textarea textarea-bordered textarea-primary my-2 w-full"
				bind:value={prompt}
			/>
			<label for="inputImages">Images (optional):</label>
			<input
				id="inputImages"
				type="file"
				accept="image/*"
				multiple
				class="file-input file-input-bordered file-input-primary my-2 w-full"
				on:change={handleFileUpload}
			/>
			<button class="btn btn-primary my-2 w-full" on:click={handleSend}>Send</button>
		</div>
	</div>

	<input type="radio" name="tabList" role="tab" class="tab" aria-label="Settings" />
	<div role="tabpanel" class="tab-content h-full rounded-box bg-base-100 p-6">
		<label for="inputKey">API Key:</label>
		<input
			id="inputKey"
			type="text"
			class="input input-bordered input-primary mt-2 w-full"
			bind:value={key}
		/>
		<button class="btn btn-primary my-2 w-full" on:click={handleSave}>Save</button>
	</div>
</div>
