console.clear();

function preview() {
	let img = document.getElementById("imgg");
	if (!img.value) return alert("Please select an image!");
	let file = img.files[0];
	const Reader = new FileReader();
	Reader.onload = (e) => {
		document.getElementById("preview").src = e.target.result;
	};
	
	Reader.readAsDataURL(file);
}
