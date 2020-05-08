const formatDate = (value: Date): string => {
	const date = new Date(value);
	const formatedDate = Intl.DateTimeFormat('en-GB').format(date);
	return formatedDate;
};

export default formatDate;
