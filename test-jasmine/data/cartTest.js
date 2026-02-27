import { addToCart, cart,loadFromStorage } from "../../data/cart.js";

describe ('test suite: addTocart',() =>{
    it('adds an existing product to the cart', ()=>{ 
        spyOn(localStorage,'setItem')
        spyOn(localStorage , 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity:1,
                deliveryOptionId:'1'

            }]);
        });
        // this reload cart from local storage
        loadFromStorage()

         addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
        // we are comparing cart.length[0] with cart.length[1]
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        // the quantity will increase by one
        expect(cart[0].quantity).toEqual(2)
       })    
    

    it('adds a new product to the cart ',() =>{
        spyOn(localStorage,'setItem')
        // mock local storage: ".getItem" first to return an empty array when we reload the cart this export function loadFromStorage() 
        // {   cart= JSON.parse(localStorage.getItem('cart')) is going to be an  empty array and the cart will be empty
        
        spyOn(localStorage , 'getItem').and.callFake(() => {
            return JSON.stringify([]);
        });
        loadFromStorage()
        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
        // we are comparing cart.length[0] with cart.length[1]
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(1)
       })    

});
       
