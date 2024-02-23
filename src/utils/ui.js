export const scrollToBottom = (node) => {
	const scroll = () =>
		node.scroll({
			top: node.scrollHeight,
			behavior: 'smooth'
		});
	scroll();

	return { update: scroll };
};
