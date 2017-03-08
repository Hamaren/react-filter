const PRODUCTS = [
    {category: 'PC Laptop', price: 379, img: 'toshi1.jpg', stocked: true, name: 'Toshiba - Satellite 15.6" Touch-Screen Laptop - Intel Core i3 - 6GB Memory - 1TB Hard Drive - Brushed Black', scrsize: '15.6', touch: true, hdmi: true, onsale: false},
    {category: 'PC Laptop', price: 279, img: 'hp1.jpg', stocked: true, name: 'HP - 15.6" Laptop - AMD A6-Series - 4GB Memory - 500GB Hard Drive - Black', scrsize: '15.6', touch: true, hdmi: true, onsale: false},
    {category: 'PC Laptop', price: 179, img: 'len1.jpg', stocked: true, name: 'Lenovo - 15.6" Laptop - AMD E1-Series - 4GB Memory - 500GB Hard Drive - Black', scrsize: '15.6', touch: true, hdmi: false, onsale: false},
    {category: 'PC Laptop', price: 229, img: 'dell1.jpg', stocked: false, name: 'Dell - Inspiron 14" Laptop - Intel Celeron - 2GB Memory - 32GB eMMC Flash Memory - Black', scrsize: '14', touch: false, hdmi: true, onsale: false},
    {category: 'PC Laptop', price: 426, img: 'asus1.jpg', stocked: true, name: 'Asus - 15.6" Laptop - Intel Core i5 - 6GB Memory - 1TB Hard Drive - Black/Silver', scrsize: '15.6', touch: true, hdmi: true, onsale: true},
    {category: 'PC Laptop', price: 399, img: 'hp2.jpg', stocked: false, name: 'HP - 17.3" Laptop - AMD A10-Series - 6GB Memory - 1TB Hard Drive - Black', scrsize: '17.3', touch: false, hdmi: false, onsale: true},
    {category: 'MacBooks', price: 999, img: 'mac1.jpg', stocked: true, name: 'Apple - MacBook® - 12" Display - Intel Core M - 8GB Memory - 256GB Flash Storage - Gold', scrsize: '12', touch: false, hdmi: true, onsale: false},
    {category: 'MacBooks', price: 949, img: 'mac1.jpg', stocked: true, name: 'Apple - MacBook Air® (Latest Model) - 13.3" Display - Intel Core i5 - 4GB Memory - 128GB Flash Storage - Silver', scrsize: '13.3', touch: true, hdmi: true, onsale: true},
    {category: 'MacBooks', price: 1999, img: 'mac2.jpg', stocked: true, name: 'Apple - MacBook® Pro - 15.4" Display - Intel Core i7 - 16GB Memory - 256GB Flash Storage - Silver', scrsize: '15.4', touch: true, hdmi: true, onsale: false},
    {category: 'MacBooks', price: 1799, img: 'mac2.jpg', stocked: true, name: 'Apple - MacBook Pro with Retina display (Latest Model) - 13.3" Display - 8GB Memory - 512GB Flash Storage - Silver', scrsize: '13.3', touch: true, hdmi: false, onsale: false},
    {category: 'MacBooks', price: 1499, img: 'mac1.jpg', stocked: false, name: 'Apple - MacBook Air® (Latest Model) - 13.3" Display - Intel Core i5 - 4GB Memory - 256GB Flash Storage - Silver', scrsize: '13.3', touch: false, hdmi: true, onsale: true}
];

const priceSlider = document.getElementById('price_slider'),
	priceMin = document.getElementById('price_slider__min'),
	priceMax = document.getElementById('price_slider__max'),
	maxPrice = PRODUCTS.map((product) => product.price).reduce((x,y) => (x > y) ? x : y);

noUiSlider.create(priceSlider, {
	start: [ 0, maxPrice ],
	connect: true,
	step: 1,
	range: {
		'min': 0,
		'max': maxPrice
	},
	format: {
		to: function ( value ) {
			return value;
		},
		from: function ( value ) {
			return value;
		}
	}
});

const Category = React.createClass({
	render (){
		return(
			<h3 className="product-list__category">{this.props.category}</h3>
		)
	}
});

const Product = React.createClass({
	render (){
		const name = this.props.product.name,
		    img = this.props.product.img,
			price = this.props.product.price;
		let stocked,
			sale;
		if(!this.props.product.stocked){
			stocked = <span className='filter__product-list__product__stock'>Out of stock</span>
		}
		if(this.props.product.onsale){
			sale = <span className='filter__product-list__product__sale'>Sale!</span>
		}
		return(
			<div className='filter__product-list__product product-fade-in'>
				<span className='filter__product-list__product__name'>{name}</span>
				<img className='filter__product-list__product__image' src={'img/' + img} />
				<div className='filter__product-list__product__priceblock'>
					<span className='filter__product-list__product__price'>{'$' + price}</span>
					{sale}
					{stocked}
				</div>
			</div>
		)
	}
});

const ProductList = React.createClass({
	render (){
		const rows = [];
		const data = this.props.stateCollection;
		let lastCategory = null;
		this.props.products.forEach(function(product){
			if(product.name.toLowerCase().indexOf(data.textFilter.toLowerCase()) === -1 || (!product.stocked && data.stocked)
				||(!product.onsale && data.sale) || (product.price < data.minPrice || product.price > data.maxPrice)){
				return
			}
			if(product.category !== lastCategory){
				rows.push(<Category category={product.category} key={product.category} />);

			}
			rows.push(<Product product={product} className="fade" key={product.name} />);
			lastCategory = product.category;
		}.bind(this));
		return(
			<div className='filter__product-list'>
				{rows}
			</div>
		)
	}
});

const HandleControl = React.createClass({
	onChangeInput (){
		const text = this.refs.search.value,
			  stock = this.refs.stock.checked,
			  sale = this.refs.sale.checked,
			  maxPrice = parseInt(priceMax.value),
			  minPrice = parseInt(priceMin.value);
		this.props.handleUserInput(text, stock, sale, minPrice, maxPrice);
	},
	componentDidMount() {
		const componentThis = this;
		priceSlider.noUiSlider.on('update', function ( values, handle ) {
			if ( handle ) {
				priceMax.value = Math.round(values[handle]);
			} else {
				priceMin.value = Math.round(values[handle]);
			}
			componentThis.onChangeInput();
		});
		priceMax.onchange = function (){
			priceSlider.noUiSlider.set([null, this.value])
		};
		priceMin.onchange = function (){
			priceSlider.noUiSlider.set([this.value, null])
		};
		document.getElementById('price_slider_wrap').style = '';
		document.getElementById('external_controls').appendChild(document.getElementById('price_slider_wrap'));
	},
	render (){
		return(
			<div  className='filter__control' onChange={this.onChangeInput}>
				<div id="external_controls"></div>
				<span className="filter__control__caption">Search by name:</span>
				<input className="filter__control__search-field" type='text' ref='search' defaultValue='' />
				<div className="filter__control__input-wrapper">
					<span className="filter__control__caption">Filters:</span>
					<div className="filter__control__checkbox-container">
						<input className="filter__control__checkbox checkbox" type='checkbox' ref='stock' />
						<label for="checkbox" className="filter__control__stock">In stock</label>
					</div>
					<div className="filter__control__checkbox-container">
						<input className="filter__control__checkbox checkbox" type='checkbox' ref='sale' />
						<label for="checkbox" className="filter__control__sale">Sale item</label>
					</div>
				</div>
			</div>
		)
	}
});

const App = React.createClass({
	getInitialState (){
		return{
			textFilter: '',
			stocked: false,
			sale: false,
			minPrice: 0,
			maxPrice: maxPrice
		}
	},
	stateFilterCollection (){
		return{
			textFilter: this.state.textFilter,
			stocked: this.state.stocked,
			sale: this.state.sale,
			minPrice: this.state.minPrice,
			maxPrice: this.state.maxPrice
		}
	},
	handleInput (text, stock, sale, minPrice, maxPrice){
		this.setState({
			textFilter: text,
			stocked: stock,
			sale: sale,
			minPrice: minPrice,
			maxPrice: maxPrice
		});
	},
	render (){
		return(
			<div className='filter'>
			<HandleControl handleUserInput={this.handleInput} />
			<ProductList stateCollection={this.stateFilterCollection()} products={PRODUCTS} />
			</div>
		)
	}
});

ReactDOM.render(
	<App />,
    document.getElementById('content')
);