# bamazon

The application can be launched by 'node bamazon.js'. The following commands are prompted:

<ul>
<li> what would you like to do: 
    <ul>
        <li> Buy an item
        <li> Search for an item
        <li> Exit
    </ul>
</ul>

**Buy an item:** The system will prompt the user to enter the ID and quantity to purchase
**Search for an item:** The system will prompt the user to enter partial text to search for

**The following is a sample output:**

```
$ node bamazon.js


bamazon connection started


(ID:1): Samsung phone is for sale at: $400
(ID:2): IPHONE phone is for sale at: $100
(ID:3): Raven is for sale at: $10
(ID:4): The Old Man and the Sea is for sale at: $5
(ID:5): Nike is for sale at: $10
(ID:6): Rebock is for sale at: $12
(ID:7): Pots is for sale at: $20
(ID:8): Pans is for sale at: $10
(ID:9): Spoons is for sale at: $12
(ID:10): knives is for sale at: $77

******************************

? What would you like to do?
 Buy an item
? Enter the ID of the product you would like to purchase
 1
? Enter the quantity you would like to purchase
 2

******************************

Thank you for purchasing 2 of Samsung phone. The total due is: $800

******************************

(ID:1): Samsung phone is for sale at: $400
(ID:2): IPHONE phone is for sale at: $100
(ID:3): Raven is for sale at: $10
(ID:4): The Old Man and the Sea is for sale at: $5
(ID:5): Nike is for sale at: $10
(ID:6): Rebock is for sale at: $12
(ID:7): Pots is for sale at: $20
(ID:8): Pans is for sale at: $10
(ID:9): Spoons is for sale at: $12
(ID:10): knives is for sale at: $77

******************************

? What would you like to do?
 Search for an item
? Enter the product name you are looking for.
 phone
select item_id, product_name, department_name, price, stock_quantity from products where product_name like '%phone%';
(ID:1): Samsung phone found. There are 8 remaining and is for sale at: $400
(ID:2): IPHONE phone found. There are 5 remaining and is for sale at: $100

******************************

? What would you like to do?
 (Use arrow keys)
> Buy an item
  Search for an item
  exit

```
