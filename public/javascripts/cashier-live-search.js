var el = document.querySelector("#autoComplete");
if(el){
	el.addEventListener("autoComplete", event => {
		console.log(event);
	});
	console.log("Hahahahaha");
	// The autoComplete.js Engine instance creator
const autoCompletejs = new autoComplete({
	data: {
		src: async () => {
			const query = document.querySelector("#autoComplete").value;
			// Loading placeholder text
			document
				.querySelector("#autoComplete")
				.setAttribute("placeholder", "Loading...");
			// Fetch External Data Source
			const source = await fetch("/cashier/search/" + query);

			const data = await source.json();
			// Post loading placeholder text
			document
				.querySelector("#autoComplete")
				.setAttribute("placeholder", "Tìm kiếm mặt hàng");
			// Returns Fetched data
			console.log(data);
			return data;
		},
		key: ["Product_name", "Product_id"],
		cache: false
	},

	placeHolder: "Tìm kiếm mặt hàng",
	selector: "#autoComplete",
	threshold: 0,
	debounce: 300,
	searchEngine: "strict",
	highlight: true,
	maxResults: 5,
	resultsList: {
		render: true,
		container: source => {
      		source.setAttribute("id", "autoComplete_list");
		},
		destination: document.querySelector("#autoComplete"),
		position: "afterend",
		element: "ul"
	},
	resultItem: {
		content: (data, source) => {
      		source.innerHTML = data.match;
		},
		element: "li"
	},
	noResults: () => {
		const result = document.createElement("li");
		result.setAttribute("class", "no_result");
		result.setAttribute("tabindex", "1");
		result.innerHTML = "No Results";
		document.querySelector("#autoComplete_list").appendChild(result);
	},
	onSelection: feedback => {
		const selection = feedback.selection.value.food;
		// Render selected choice to selection div
		document.querySelector(".selection").innerHTML = selection;
		// Clear Input
		document.querySelector("#autoComplete").value = "";
		// Concole log autoComplete data feedback
		console.log(feedback);
	}
});

// Toggle event for search input
// showing & hidding results list onfocus / blur
["focus", "blur"].forEach(function(eventType) {
	const resultsList = document.querySelector("#autoComplete_list");
  
	document.querySelector("#autoComplete").addEventListener(eventType, function() {
	  // Hide results list & show other elemennts
	  if (eventType === "blur") {
		action("dim");
		resultsList.style.display = "none";
	  } else if (eventType === "focus") {
		// Show results list & hide other elemennts
		action("light");
		resultsList.style.display = "block";
	  }
	});
  });
  
}
