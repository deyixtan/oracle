<script>
	import { fileToImagePart, queryModel } from '../utils/gemini';
	import { marked } from '../utils/marked';
	import { messages, settings } from '../utils/stores';
	import { scrollToBottom } from '../utils/ui';

	let key = '';
	let debug = false;
	let prompt = '';
	let images = [];
	let sending = false;

	settings.subscribe((settings) => {
		key = settings.apiKey || '';
		debug = settings.debug || false;
	});

	async function handleFileUpload(event) {
		const files = event.target.files;
		images = await Promise.all([...files].map(fileToImagePart));
	}

	async function handleSend() {
		sending = true;

		while ($messages.length > 0 && $messages[$messages.length - 1].role != 'model') {
			$messages.pop();
		}

		const input = { key, prompt, images };
		const history = $messages;

		const result =
			images.length === 0 ? prompt : `*[Images were attached to this prompt]*\n\n${prompt}`;

		$messages = [...$messages, { role: 'user', parts: result }];
		const response = await queryModel(input, history, debug);
		if (response.error) {
			$messages = [
				...$messages,
				{ role: 'model', parts: `An error occurred...\n${response.result}` }
			];
		} else {
			$messages = [...$messages, { role: 'model', parts: response.result }];
		}

		document.querySelector('input[type=file]').value = null;
		prompt = '';
		images = [];

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
				<div class="chat-bubble chat-bubble-info break-words">{@html marked.parse(parts)}</div>
			</div>
		{:else if role === 'model'}
			<div class="chat chat-end">
				<div class="chat-image">
					<strong>Oracle</strong>
				</div>
				<div class="chat-bubble chat-bubble-success break-words">{@html marked.parse(parts)}</div>
			</div>
		{/if}
	{/each}
</div>
<div class="mt-3 border-2 bg-base-100 p-3">
	<span class="label-text mr-3">Prompt:</span>
	<textarea
		class="textarea textarea-bordered textarea-primary my-2 w-full"
		disabled={sending}
		bind:value={prompt}
	/>

	<span class="label-text mr-3">Images (optional):</span>
	<input
		type="file"
		accept="image/*"
		multiple
		class="file-input file-input-bordered file-input-primary my-2 w-full"
		disabled={sending}
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
