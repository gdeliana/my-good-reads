const truncate: (s:string, l: number) => string = (s, l = 30) => {
	s = s.trim();
	return s.length > l ? `${s.substring(0, l)}...` : s;
}

export default truncate;