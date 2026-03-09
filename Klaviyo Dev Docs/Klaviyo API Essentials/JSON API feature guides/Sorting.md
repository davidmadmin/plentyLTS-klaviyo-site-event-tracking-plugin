### **Sorting**Learn how to use our JSON:API sorting feature.



## **Sort syntax**



Klaviyo’s JSON:API sorting syntax can be used across all supported endpoints in our new APIs. Please note that support for given fields is unique to each endpoint. Refer to the `sort` query parameter in the \[API reference documentation](https://developers.klaviyo.com/en/reference/api_overview).



For endpoints that support sort operations, you can set `sort` to a field name in the response body such as `datetime`, for example. The sorting direction can be ascending (default) or descending.



The following example shows how to retrieve a sorted list of events by `datetime` in ascending order (oldest to newest):



RequestResponse



`curl --request GET \\

&nbsp;    --url 'https://a.klaviyo.com/api/events/?sort=datetime' \\

&nbsp;    --header 'Authorization: Klaviyo-API-Key your-private-api-key' \\

&nbsp;    --header 'accept: application/json' \\

&nbsp;    --header 'revision: 2023-07-15'`



You can retrieve events by `datetime` in descending order (newest to oldest) by using a `-` prefix as shown below:



RequestResponse



`curl --request GET \\

&nbsp;    --url 'https://a.klaviyo.com/api/events/?filter=profile\&sort=-datetime' \\

&nbsp;    --header 'Authorization: Klaviyo-API-Key your-private-api-key' \\

&nbsp;    --header 'accept: application/json' \\

&nbsp;    --header 'revision: 2023-07-15'`



## **Example request and response**



In the following example, we make a request to get email campaigns and sort them in descending order (oldest to newest) with the `created_at` field:



RequestResponse



`curl --request GET \\

&nbsp;    --url 'https://a.klaviyo.com/api/campaigns/?filter=equals(messages.channel,’email’)\&sort=created_at' \\

&nbsp;    --header 'Authorization: Klaviyo-API-Key your-private-api-key' \\

&nbsp;    --header 'accept: application/json' \\

&nbsp;    --header 'revision: 2023-07-15'`



> **🚧**

> 

> 

> Sorting by multiple fields is not supported.

> 



## **SDK example (Node, PHP, Python, Ruby)**



This example shows how to sort events by `datetime` with Klaviyo’s SDKs:



NodePHPPythonRuby



`import { ConfigWrapper, EventsApi } from 'klaviyo-api'

const eventsApi = new EventsApi(ConfigWrapper("<Your Private Key Here>"))



const events = await eventsApi.getEvents({sort: '-datetime'})`

