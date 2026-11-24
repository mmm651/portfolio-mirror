requirements
every thing is fuckin dynamic.
categories include subcats .
use slug.
no delete only sof delete.
is available.
product{
    img,
    name,
    qty,
    price,
    id,
    is available
}

in home page 2 sections: 1 new arrives , best seller and the admin chooses it not automatic.
cart :cant check out without login ,items added before login stay in cart using{local storage},objec of item ely mawgoda gwa el araay bta3 el cart and compared every time item add or cart is open and flag isPriceChanged.
stock of product doesnot appear to user only if there 3 or less and when it finish show with red out of stock.
 user{
    name,
    adress{default ,and other adress}
    phone num,
    role,
    password

 }
 signup form{
    name;
    eamil;
    phone
 }

 order{
    array of products {product id,qty,price,},
    address id,
    address as string,
    phone num
    staut{one of: bending ,preparing, shiped, delivered, rejected,canceled by {admin or user}, refund}// admin has the rigth to change status to any one freely.
 }

 admin can make reports for sales apply filter to compare sales with gap of time.

 testmoniens
 showed under products only that admin accepted its default status is pending on admin panel and he approve or decline it 
form{
    name :
    rank 5 stars
    message}

faq and contact us and privacyand copyrigths {
    admin can manage its content 
}

home page admin( pending orders testmoiens , unsean messages)



