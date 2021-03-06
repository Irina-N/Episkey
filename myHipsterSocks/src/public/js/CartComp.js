const cartItem = {
    props: ['cartItem', 'img'],
    template: `
                <div class="cart-item">
                    <div class="product-bio">
                        <img :src="img" class="cart-item-photo" :alt=cartItem.product_name>
                        <div class="product-desc">
                            <div class="product-title">{{cartItem.product_name}}</div>
                            <div class="product-quantity">Количество: {{cartItem.quantity}}</div>
                            <div class="product-single-price">{{cartItem.price}} руб.</div>
                        </div>
                    </div>
                    <div class="right-block">
                        <div class="product-price">{{cartItem.quantity*cartItem.price}} руб.</div>
                        <button class="del-btn" @click="$emit('remove', cartItem)">&times;</button>
                    </div>
                </div>
    `
};
const cart = {
    data(){
      return {
          cartUrl: '/getBasket.json',
          cartItems: [],
          showCart: false,
      }
    },
    components: {
      'cart-item': cartItem
    },
    methods: {
        addProduct(product){

            let find = this.cartItems.find(el => el.id_product === product.id_product);
            console.log(find);
            if(find){
                this.$parent.putJson(`/api/cart/${find.id_product}`, {quantity: 1})
                    .then(data => {
                        if(data.result === 1){
                            find.quantity++;
                        }
                    })
            } else {
                let prod = Object.assign({quantity: 1}, product);
                this.$parent.postJson(`/api/cart`, prod)
                    .then(data => {
                        if(data.result === 1){
                            this.cartItems.push(prod);
                        }
                    })
            }
        },
        remove(item) {
            if(item.quantity > 1){
                this.$parent.putJson(`/api/cart/${item.id_product}`, {quantity: -1})
                    .then(data => {
                        if(data.result === 1){
                            item.quantity--;
                        }
                    })
            } else {
                this.$parent.deleteJson(`/api/cart/${item.id_product}`)
                    .then(data => {
                        if(data.result === 1){
                            this.cartItems.splice(this.cartItems.indexOf(item), 1)
                        }
                    })
            }
        },
    },
    mounted(){
        this.$parent.getJson(`/api/cart`)
            .then(data => {
                for(let el of data.contents){
                    this.cartItems.push(el);
                }
            });
    },
    template: `
<div>
            <button class="btn-cart" type="button" @click="showCart = !showCart">Корзина</button>
            <div class="cart-block" v-show="showCart">
                <p v-if="!cartItems.length">Cart is empty</p>
                <cart-item v-for="item of cartItems" 
                :key="item.id_product" 
                :img="item.product_img" 
                :cart-item="item" 
                @remove="remove">
            </cart-item>
            </div>
</div>`
};

export default cart