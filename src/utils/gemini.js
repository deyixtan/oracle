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

export async function queryModel(input, history, debug = false) {
	const output = {
		error: false,
		result: ''
	};

	if (!input || !input.key || !input.prompt || !input.images) {
		output.error = true;
		output.result = 'Please ensure valid API key, prompt or image files...';
		return output;
	}

	const modelType = input.images.length === 0 ? 'gemini-pro' : 'gemini-pro-vision';
	const userQuery = input.images.length === 0 ? input.prompt : [input.prompt, ...input.images];

	try {
		const genAI = new GoogleGenerativeAI(input.key);
		const model = genAI.getGenerativeModel({ model: modelType });
		if (input.images.length === 0) {
			const chat = model.startChat({ history });
			const result = await chat.sendMessage(userQuery);
			output.result = result.response.text();
		} else {
			const result = await model.generateContent(userQuery);
			output.result = result.response.text();
		}
	} catch (error) {
		output.error = true;
		output.result = debug ? error.message : '';
	}
	return output;
}
