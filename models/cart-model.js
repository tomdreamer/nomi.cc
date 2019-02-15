module.exports = function Cart(oldCart) {
	this.items = oldCart.items;
	this.totalQty = oldCart.totalQty;
	this.totalPrice = oldCart.totalPrice;

	this.add = function(item, id) {
		var storedItem = this.storedItem[id];
		if (!storedItem) {
			storedItem = this.storedItem[id] = { item: item, qty: 0, price: 0 };
		}
		storedItem.price = storedItem.qty * storedItem.price;
		this.totalQty++;
		this.totalPrice += storedItem.price;
	};

	this.generateArray = function() {
		var array = [];
		for (var id in this.items) {
			array.push(this.items[id]);
		}
		return array;
	};
};
