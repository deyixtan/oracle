<script>
	import { fileToImagePart, queryModel } from '../utils/gemini';
	import { marked } from '../utils/marked';
	import { messages, settings } from '../utils/stores';
	import { scrollToBottom } from '../utils/ui';

	let key = '';
	let prompt = '';
	let images = [];
	let sending = false;

	settings.subscribe((settings) => {
		key = settings.apiKey || '';
	});

	async function handleFileUpload(event) {
		const files = event.target.files;
		images = await Promise.all([...files].map(fileToImagePart));
		event.target.value = null;
	}

	async function handleSend() {
		sending = true;
		const input = { key, prompt, images };
		const history = $messages;

		$messages = [...$messages, { role: 'user', parts: prompt }];
		prompt = '';
		images = [];

		const response = await queryModel(input, history);
		$messages = [...$messages, { role: 'model', parts: response.result.toString() }];
		sending = false;
	}
</script>

<div class="mt-3 flex-grow overflow-y-auto border-2 bg-base-100 p-3" use:scrollToBottom={$messages}>
	{#each $messages as { role, parts }}
		{#if role === 'user'}
			<div class="chat chat-start">
				<div class="chat-image">
					<strong>You</strong>
				</div>
				<div class="chat-bubble chat-bubble-info">{@html marked.parse(parts)}</div>
			</div>
		{:else}
			<div class="chat chat-end">
				<div class="chat-image">
					<strong>Oracle</strong>
				</div>
				<div class="chat-bubble chat-bubble-success">{@html marked.parse(parts)}</div>
			</div>
		{/if}
	{/each}
</div>
<div class="base-100 mt-3 border-2 p-3">
	<span class="label-text mr-3">Prompt:</span>
	<textarea class="textarea textarea-bordered textarea-primary my-2 w-full" bind:value={prompt} />

	<span class="label-text mr-3">Images (optional):</span>
	<input
		type="file"
		accept="image/*"
		multiple
		class="file-input file-input-bordered file-input-primary my-2 w-full"
		on:change={handleFileUpload}
	/>

	<button class="btn btn-primary my-2 w-full" disabled={sending} on:click={handleSend}>
		{#if sending}
			<span class="loading loading-spinner"></span>
		{:else}
			<span>Send</span>
		{/if}
	</button>
</div>
