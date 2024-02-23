<script async>
	import { fileToImagePart, queryModel } from '../utils/gemini';

	let key = '';
	let prompt = '';
	let images = [];
	let messages = [];

	async function handleFileUpload(event) {
		const files = event.target.files;
		images = await Promise.all([...files].map(fileToImagePart));
	}

	async function handleSubmit() {
		messages = [...messages, { user: 'You', text: prompt }];

		const response = await queryModel({ key, prompt, images });
		messages = [...messages, { user: 'Oracle', text: response.result }];
	}
</script>

<div class="container flex flex-col h-screen mx-auto base-100">
	<div class="my-3 p-3 flex-grow overflow-y-auto base-300">
		{#each messages as { user, text }}
			<div class="my-2 p-4 bg-primary"><strong>{user}</strong>: <p>{text}</p></div>
		{/each}
	</div>
	<div class="my-3 p-3 base-300">
		<label for="inputKey">API Key:</label>
		<input
			id="inputKey"
			type="text"
			class="input input-bordered input-primary w-full my-2"
			bind:value={key}
		/>
		<label for="inputPrompt">Prompt:</label>
		<textarea
			id="inputPrompt"
			class="textarea textarea-bordered textarea-primary w-full my-2"
			bind:value={prompt}
		/>
		<label for="inputImages">Images (optional):</label>
		<input
			id="inputImages"
			type="file"
			accept="image/*"
			multiple
			class="file-input file-input-bordered file-input-primary w-full my-2"
			on:change={handleFileUpload}
		/>
		<button class="btn btn-primary w-full my-2" on:click={handleSubmit}>Send</button>
	</div>
</div>
