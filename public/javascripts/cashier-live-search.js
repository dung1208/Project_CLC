var index_product= 1; //index_productfor table row
var totalBill = 0;
var el = document.querySelector("#autoComplete");
// //indexChange for right-table
// function indexChange(i){
// 	index_product+= i;
// 	document.getElementsByClassName("text-right")[0].firstElementChild.innerHTML = index_product- 1;
// }; 
// //totalBillChange for 
// function totalBillChange (amountChange){
// 	totalBill += amountChange;
// 	document.getElementsByClassName("text-right")[1].firstElementChild.innerHTML = totalBill;
// };
if(el){
	el.addEventListener("autoComplete", event => {
		console.log(event);
	});
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
		key: ["Product_name", "Product_id", "Product_price"],
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
		const table = document.getElementsByClassName("table table-striped table-listProducts")[0];
		const data = feedback.selection.value;
		//Create rows 
		var row = table.insertRow(index_product);
		row.className = "product-list";
		//Create cells in row
		var cell_orderID = row.insertCell(0);
		cell_orderID.className = "order-product";
		cell_orderID.innerHTML = index_product;

		var cell_codeProduct = row.insertCell(1);
		cell_codeProduct.className = "code-product";
		cell_codeProduct.innerHTML = data.Product_id;

		var cell_nameProduct = row.insertCell(2);
		cell_nameProduct.className = "name-product";
		cell_nameProduct.innerHTML = data.Product_name;

		var cell_priceProduct = row.insertCell(3);
		cell_priceProduct.className = "price-product";
		cell_priceProduct.innerHTML = data.Product_small_unit_price;
		//AmountProduct <td>
		var cell_amountProduct = row.insertCell(4);
		cell_amountProduct.className = "amount-product";

		var minusAmountITag = document.createElement("button");
		minusAmountITag.className = "fas fa-minus";

		var inputAmount = document.createElement("input");
		inputAmount.className = "form-control input-info-product";
		inputAmount.type = "text";
		inputAmount.defaultValue = 1;

		var plusAmountITag = document.createElement("input");
		plusAmountITag.className = "fas fa-plus";
		plusAmountITag.type = "button";

		cell_amountProduct.appendChild(minusAmountITag);
		cell_amountProduct.appendChild(inputAmount);
		cell_amountProduct.appendChild(plusAmountITag);

		var cell_totalPrice = row.insertCell(5);
		cell_totalPrice.className = "total-price";
		cell_totalPrice.innerHTML = parseFloat(cell_priceProduct.innerHTML) * parseFloat(inputAmount.value);

		var cell_deleteProduct = row.insertCell(6);
		cell_totalPrice.className = "total-price";
		index_product += 1;
		document.getElementsByClassName("text-right")[0].firstElementChild.innerHTML = index_product- 1;	
		totalBill += parseFloat(cell_totalPrice.innerHTML);
		document.getElementsByClassName("text-right")[1].firstElementChild.innerHTML = totalBill;
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
// Plus button click event

var plusBt_elements = document.getElementsByClassName("fas fa-plus");
	Array.from(plusBt_elements).forEach( (amount_element,index) =>{
	amount_element.click =  function (){
	var amount = parseFloat(document.getElementsByClassName("form-control input-info-product")[index].innerHTML);
	document.getElementsByClassName("form-control input-info-product")[index].innerHTML = amount + 1;
	var totalPrice = parseFloat(document.getElementsByClassName("total-price")[index].innerHTML);
	document.getElementsByClassName("total-price")[index].innerHTML = totalPrice + parseFloat(cell_priceProduct.innerHTML);
	index_product+= 1;
	document.getElementsByClassName("text-right")[0].firstElementChild.innerHTML = index_product- 1;	
	totalBill += parseFloat(cell_totalPrice.innerHTML);
	document.getElementsByClassName("text-right")[1].firstElementChild.innerHTML = totalBill;
	};
});
// //Minus button click event
// var minusBt_elements = document.getElementsByClassName("fa-minus");
// Array.from(minusBt_elements).forEach((amount_element,index) =>{
// 	amount_element.click = function(event){
// 		console.log(event.target.tagName);
// 		var amount = parseFloat(document.getElementsByClassName("form-control input-info-product")[index].innerHTML);
// 		document.getElementsByClassName("form-control input-info-product")[index].innerHTML = amount - 1;
// 		var totalPrice = parseFloat(document.getElementsByClassName("total-price")[index].innerHTML);
// 		document.getElementsByClassName("total-price")[index].innerHTML = totalPrice - parseFloat(cell_priceProduct.innerHTML);
// 		index_product-= 1;
// 		document.getElementsByClassName("text-right")[0].firstElementChild.innerHTML = index_product- 1;	
// 		totalBill -= parseFloat(cell_totalPrice.innerHTML);
// 		document.getElementsByClassName("text-right")[1].firstElementChild.innerHTML = totalBill;
// 	};
// });


