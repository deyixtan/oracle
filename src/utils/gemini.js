import { GoogleGenerativeAI } from '@google/generative-ai';

export async function fileToImagePart(file) {
	const base64EncodedDataPromise = new Promise((resolve) => {
		const reader = new FileReader();
		reader.onloadend = () => resolve(reader.result.split(',')[1]);
		reader.readAsDataURL(file);
	});
	return {
		inlineData: { data: await base64EncodedDataPromise, mimeType: file.type }
	};
}

export async function queryModel(input, history, debug, output_callback) {
	if (!input || !input.key || !input.prompt || !input.images) {
		output_callback('Please ensure valid API key, prompt or image files...', true);
		return;
	}

	const modelType = input.images.length === 0 ? 'gemini-pro' : 'gemini-pro-vision';
	const userQuery = input.images.length === 0 ? input.prompt : [input.prompt, ...input.images];

	try {
		const genAI = new GoogleGenerativeAI(input.key);
		const model = genAI.getGenerativeModel({ model: modelType });

		let result;
		if (input.images.length === 0) {
			const chat = model.startChat({ history });
			result = await chat.sendMessageStream([userQuery]);
		} else {
			result = await model.generateContentStream([userQuery]);
		}

		// callback with stream data
		for await (const chunk of result.stream) {
			output_callback(chunk.text(), false);
		}
	} catch (error) {
		const exception_output = debug ? `\n\n${error.message}` : '';
		output_callback(`An error occurred...${exception_output}`, true);
	}
}
