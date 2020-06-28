var index_product= 0; //index of total product 
var index_table = 0; //index for table rows
var totalBill = 0;
var index_bill = 0;
var el = document.querySelector("#autoComplete");
//Process multiple class elements
function clickedClassHandler(name,target,callback) {

	// apply click handler to all elements with matching className
	var allElements = document.body.getElementsByClassName(name);

	for(var x = 0, len = allElements.length; x < len; x++) {
		if(allElements[x] == target) {
			allElements[x].onclick = callback.call(this,x);
			break;
		}
	}
};

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
			return data;
		},
		key: ["Product_name", "Product_id", "Product_price", "Product_unit"],
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
		const table = document.getElementsByClassName("table table-striped table-listProducts")[0].tBodies[0];
		const data = feedback.selection.value;
		//Create rows 
		var row = table.insertRow(index_table);
		row.className = "product-list";
		//Create cells in row
		var cell_orderID = row.insertCell(0);
		cell_orderID.className = "order-product";
		cell_orderID.innerHTML = index_table + 1;

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

		var minusAmountBt = document.createElement("input");
		minusAmountBt.className = "fas fa-minus";
		minusAmountBt.type = "button";
		minusAmountBt.value = "-";

		var inputAmount = document.createElement("input");
		inputAmount.className = "form-control input-info-product";
		inputAmount.type = "text";
		inputAmount.defaultValue = 1;

		var plusAmountBt = document.createElement("input");
		plusAmountBt.className = "fas fa-plus";
		plusAmountBt.type = "button";
		plusAmountBt.value = "+";

		cell_amountProduct.appendChild(minusAmountBt);
		cell_amountProduct.appendChild(inputAmount);
		cell_amountProduct.appendChild(plusAmountBt);

		var cell_totalPrice = row.insertCell(5);
		cell_totalPrice.className = "total-price";
		cell_totalPrice.innerHTML = parseFloat(cell_priceProduct.innerHTML) * parseFloat(inputAmount.value);

		var cell_deleteProduct = row.insertCell(6);
		cell_deleteProduct.className = "delete-product";
		var deleteBt = document.createElement("input");
		deleteBt.className = "far fa-trash-alt";
		deleteBt.type = "button";
		deleteBt.value = "Del";
		cell_deleteProduct.appendChild(deleteBt);
		
		var cell_productUnit = row.insertCell(7);
		cell_productUnit.className = "product-unit";
		cell_productUnit.innerHTML = data.Product_small_unit;

		index_table += 1;
		index_product += 1;
		document.getElementsByClassName("text-right")[0].firstElementChild.innerHTML = index_product;	
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

//Increase, decrease, delete button for each row
let rootElement = document.getElementsByClassName('table table-striped table-listProducts')[0].tBodies[0];
//since the root element is set to be body for our current dealings
rootElement.addEventListener("click", function (evt) {
		var targetElement = evt.target;
		while (targetElement != null) {
			if (targetElement.classList.contains("fa-plus")) {
				clickedClassHandler("fas fa-plus",targetElement,function(index){
					var amount = parseFloat(document.getElementsByClassName("form-control input-info-product")[index].value);
					if(amount > 0){
					document.getElementsByClassName("form-control input-info-product")[index].value = amount + 1;
					var totalPrice = parseFloat(document.getElementsByClassName("total-price")[index + 1].innerHTML);
					document.getElementsByClassName("total-price")[index + 1].innerHTML = totalPrice + parseFloat(document.getElementsByClassName("price-product")[index].innerHTML);
					index_product += 1;
					document.getElementsByClassName("text-right")[0].firstElementChild.innerHTML = index_product;	
					totalBill += parseFloat(document.getElementsByClassName("price-product")[index].innerHTML);
					document.getElementsByClassName("text-right")[1].firstElementChild.innerHTML = totalBill;
					}
				});
				break;
			} else if (targetElement.classList.contains("fa-minus")) {
				clickedClassHandler("fas fa-minus",targetElement,function(index){
					var amount = parseFloat(document.getElementsByClassName("form-control input-info-product")[index].value);
					if (amount > 2){
					document.getElementsByClassName("form-control input-info-product")[index].value = amount - 1;
					var totalPrice = parseFloat(document.getElementsByClassName("total-price")[index + 1].innerHTML);
					document.getElementsByClassName("total-price")[index + 1].innerHTML = totalPrice - parseFloat(document.getElementsByClassName("price-product")[index].innerHTML);
					index_product-= 1;
					document.getElementsByClassName("text-right")[0].firstElementChild.innerHTML = index_product;	
					totalBill -= parseFloat(document.getElementsByClassName("price-product")[index].innerHTML);
					document.getElementsByClassName("text-right")[1].firstElementChild.innerHTML = totalBill;
					}
				});
				break;
			} else if(targetElement.classList.contains("fa-trash-alt")) {
				clickedClassHandler("far fa-trash-alt",targetElement,function(index){
					var amount = parseFloat(document.getElementsByClassName("form-control input-info-product")[index].value);
					var totalPrice = parseFloat(document.getElementsByClassName("total-price")[index + 1].innerHTML);
					index_product-= amount;
					document.getElementsByClassName("text-right")[0].firstElementChild.innerHTML = index_product;
					totalBill -= totalPrice;
					document.getElementsByClassName("text-right")[1].firstElementChild.innerHTML = totalBill;
					//Remove <tr>
					rootElement.removeChild(targetElement.parentElement.parentNode);
					index_table -= 1;
				});
				break;
			} else {
				evt.stopPropagation();
			}
			targetElement = targetElement.parentElement;
		}
	},
	true
);

//Pay button
let payBt = document.getElementsByClassName("btn-pay btn-danger")[0];
payBt.addEventListener("click", async function(){
	function getProductsDetails(){
		var date = new Date();
		var table_body = document.getElementsByClassName('table table-striped table-listProducts')[0].tBodies[0].children;
		var order_detail = [
			'HD' + date.toISOString().slice(2,19).replace(/[-T:]/g, ''),
			'STAFF-0003',
			'STORE-0001',
			'KH-0000',
			date.toISOString().slice(0, 19).replace('T', ' '),
			0,
			parseFloat(document.getElementsByClassName("text-right")[1].firstElementChild.innerHTML),
		]
		var order_product_details = [];
		for(var index = 0, len = table_body.length; index < len; index++) {
			var order_list_product = [
				'HD' + date.toISOString().slice(2,19).replace(/[-T:]/g, ''),
				document.getElementsByClassName("code-product")[index].innerHTML,
				document.getElementsByClassName("product-unit")[index].innerHTML,
				parseFloat(document.getElementsByClassName("form-control input-info-product")[index].value),
				parseFloat(document.getElementsByClassName("price-product")[index].innerHTML),
				0,
				parseFloat(document.getElementsByClassName("total-price")[index + 1].innerHTML),
			];
			order_product_details.push(order_list_product)
		}
		console.log(order_detail);
		console.log(order_product_details);
		var data = {
			data_order: order_detail,
			datas_order_product: order_product_details,
		}
		return data;
	}

	const data = getProductsDetails();
	const option = {
		method: 'POST',
		headers: {
			'Accept':' application/json',
			'Content-Type' : 'application/json',
		},
		body: JSON.stringify(data),
	}
	console.log(option.body)
	await fetch('/cashier/submit',option).then(function(response) {                      // first then()
		if(response.ok)
		{
		  return response.text();         
		}
  
		throw new Error('Something went wrong.');
	})  
	.then(function(text) {                          // second then()
	  console.log('Request successful', text);  
	})  
	.catch(function(error) {                        // catch
	  console.log('Request failed', error);
	});;
	//Reset page variable
	index_product = 0;
	index_table = 0;
	totalBill = 0;
	index_bill += 1;
	rootElement.innerHTML = "";
})

