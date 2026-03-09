# JavaScript API for Identification and Tracking



Learn how to use Klaviyo's JavaScript API to track people on your website.



---



## Add the Klaviyo snippet



To start tracking people, add the snippet below to your website's main template so it will automatically be added to every page on your website.



If you have a developer adding this script, you can send them this guide.



Adjust the code snippet based on your business needs.



```html

<script async src="https://static.klaviyo.com/onsite/js/klaviyo.js?company\_id=YOUR\_PUBLIC\_API\_KEY"></script>

```



This snippet loads Klaviyo’s onsite JavaScript (`klaviyo.js`) which enables client-side tracking and interactions with the Klaviyo JavaScript API.



---



# Identify visitors



Use the `identify` method to associate browsing activity with a known profile.



When identifying a visitor, Klaviyo stores profile information so that future events can be attributed to that user.



Example:



```javascript

klaviyo.identify({

&nbsp; "email": "\[email protected]",

&nbsp; "first\_name": "Jane",

&nbsp; "last\_name": "Doe"

});

```



You can include any additional profile properties in this object.



Common profile properties include:



\- email

\- first_name

\- last_name

\- phone_number

\- custom attributes



These properties allow segmentation and personalization within Klaviyo.



---



# Track events



Use the `track` method to record events (metrics) for a user.



Events can represent actions such as:



\- Viewed product

\- Added to cart

\- Started checkout

\- Completed purchase



Example:



```javascript

klaviyo.track("Viewed Product", {

&nbsp; "ProductName": "Red T-Shirt",

&nbsp; "ProductID": "1111",

&nbsp; "SKU": "REDTSHIRT1",

&nbsp; "Categories": \["Apparel", "T-Shirts"],

&nbsp; "ImageURL": "https://example.com/image.jpg",

&nbsp; "URL": "https://example.com/product/red-shirt",

&nbsp; "Brand": "Example Brand",

&nbsp; "Price": 19.99,

&nbsp; "CompareAtPrice": 24.99

});

```



Tracked events can then be used to:



\- Trigger flows

\- Build segments

\- Analyze user behavior



---



# Track purchases



Purchase tracking is one of the most common implementations.



Example purchase event:



```javascript

klaviyo.track("Placed Order", {

&nbsp; "OrderId": "1234",

&nbsp; "Total": 29.99,

&nbsp; "Items": \[

&nbsp;   {

&nbsp;     "ProductID": "1111",

&nbsp;     "ProductName": "Red T-Shirt",

&nbsp;     "Quantity": 1,

&nbsp;     "ItemPrice": 19.99

&nbsp;   }

&nbsp; ]

});

```



Typical purchase properties include:



\- OrderId

\- Total

\- Items

\- DiscountCode

\- Categories



These values help power revenue attribution and customer lifecycle analysis.



---



# Track custom events



You can track any custom behavior on your website.



Examples include:



\- Submitted form

\- Watched video

\- Clicked promotion

\- Referred friend



Example custom event:



```javascript

klaviyo.track("Clicked Banner", {

&nbsp; "BannerName": "Spring Sale",

&nbsp; "Location": "Homepage"

});

```



Custom events enable advanced lifecycle marketing workflows.



---



# Common workflow



Typical event tracking workflow:



1\. Load the Klaviyo JavaScript snippet

2\. Identify the user once you know their identity

3\. Track behavioral events as they occur



Example:



```javascript

klaviyo.identify({

&nbsp; email: "\[email protected]"

});



klaviyo.track("Viewed Product", {

&nbsp; ProductName: "Red T-Shirt",

&nbsp; ProductID: "1111"

});

```



This ensures events are associated with the correct profile.



---



# Key concepts



## Identify



Associates browsing activity with a known user profile.



## Track



Sends behavioral events (metrics) to Klaviyo.



## Events (Metrics)



Actions performed by a user that can trigger flows or reporting.



Examples:



\- Viewed Product

\- Added to Cart

\- Started Checkout

\- Placed Order



---



# Summary



The Klaviyo JavaScript API allows you to:



\- Identify website visitors

\- Track user actions

\- Send event data to Klaviyo

\- Trigger marketing automation flows

\- Build behavioral segments

