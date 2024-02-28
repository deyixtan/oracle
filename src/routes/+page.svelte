<script>
	import { encode } from 'html-entities';
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

		// only encode user input when rendering HTML
		// not required to encode response from model
		$messages = [...$messages, { role: 'user', parts: encode(result) }];
		$messages = [...$messages, { role: 'model', parts: '' }];
		await queryModel(input, history, debug, (text, error) => {
			if (error) {
				$messages[$messages.length - 1].parts = text;
				return;
			}
			$messages[$messages.length - 1].parts += text;
		});

		document.querySelector('input[type=file]').value = null;
		prompt = '';
		images = [];

		sending = false;
	}
</script>

<div
	class="mt-3 flex-grow overflow-y-auto rounded-2xl border-2 border-neutral bg-base-300 p-6 shadow-2xl"
	use:scrollToBottom={$messages}
>
	{#each $messages as { role, parts }}
		{#if role === 'user'}
			<div class="chat chat-start">
				<div class="chat-image text-base-content">
					<strong>You</strong>
				</div>
				<div
					class="border-1 chat-bubble chat-bubble-primary break-words border-neutral p-4 text-primary-content shadow-lg"
				>
					{@html marked.parse(parts)}
				</div>
			</div>
		{:else if role === 'model'}
			<div class="chat chat-end">
				<div class="chat-image text-base-content">
					<strong>Oracle</strong>
				</div>
				<div
					class="border-1 chat-bubble chat-bubble-secondary break-words border-neutral p-4 text-secondary-content shadow-lg"
				>
					{@html marked.parse(parts)}
				</div>
			</div>
		{/if}
	{/each}
</div>
<div class="mt-3 rounded-2xl border-2 border-neutral bg-base-300 p-6 shadow-2xl">
	<span class="label-text mr-3 text-base-content">Prompt:</span>
	<textarea class="textarea-neutral textarea my-2 w-full" disabled={sending} bind:value={prompt} />

	<span class="label-text mr-3 text-base-content">Images (optional):</span>
	<input
		type="file"
		accept="image/*"
		multiple
		class="file-input-neutral file-input my-2 w-full"
		disabled={sending}
		on:change={handleFileUpload}
	/>

	<button class="btn btn-info my-2 w-full" disabled={sending} on:click={handleSend}>
		{#if sending}
			<span class="loading loading-infinity loading-lg"></span>
		{:else}
			<span>Send</span>
		{/if}
	</button>
</div>
