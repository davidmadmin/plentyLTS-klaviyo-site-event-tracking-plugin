\### \*\*Events API overview\*\*



\## \*\*Before you begin\*\*



Check out our general \[API overview](https://developers.klaviyo.com/en/reference/api\_overview) to make sure you’re ready to get started with specific endpoints.



> \*\*📘\*\*

> 

> 

> Check out our \[YouTube tutorial on creating custom events](https://www.youtube.com/watch?v=ksvZ5Kdvf8o\&list=PLHkNfHgtxcUanrkMnKPdkRzuWU7MGv\_xM) with the Events API.

> 



Our \[Events API](https://developers.klaviyo.com/en/reference/get\_events) allows you to retrieve and create events, which are actions taken by Klaviyo profiles. Each event has exactly one metric (effectively the “event type”) associated with it and a timestamp for when it occurred. The metric and profile associated with an event are stored in the event’s \[relationships](https://developers.klaviyo.com/en/docs/relationships\_) object. There are two types of endpoints within the Events API:



\- Events endpoints for fetching or creating event data.

\- Relationships endpoints for accessing a list of related metrics or profiles for a specific event.



\## \*\*Use cases\*\*



The Events API supports the following use cases:



\- Creating custom events that can be used to trigger flows (e.g., a \*Reset Password\* event that triggers an email with a reset password URL).

\- Getting Klaviyo events that can be used for data analysis (e.g., retrieving engagement events tracked by native Klaviyo metrics, such as \*Opened Email\* and \*Clicked SMS\*).

\- Getting a specific profile’s events to power an activity feed.

\- Getting related profile and/or metric data for a given event.



You can find example code for all of these use cases in our \[api-examples repo](https://github.com/klaviyo-labs/api-examples/tree/main/events).



> \*\*📘Analyze your marketing performance with the Reporting API\*\*

> 

> 

> Use Klaviyo's \[Reporting API](https://developers.klaviyo.com/en/reference/reporting\_api\_overview) to request 1:1 matches of campaign, flow, form, or segment performance data shown in the Klaviyo app.

> 



\## \*\*Data model\*\*



An event can have the following:



\- `properties` (required)

&nbsp;   

&nbsp;   The properties of the event (see \*Event properties\*). Non-object properties can be used for creating segments. The `$extra` property records any non-segmentable values, e.g., HTML templates, that can be referenced later.

&nbsp;   

\- `time`

&nbsp;   

&nbsp;   The timestamp of when the event occurred. By default, the value is the time the event was created. You should provide `time` when creating a historical event for a profile.

&nbsp;   

\- `value`

&nbsp;   

&nbsp;   The numeric value to associate with the event, e.g., a price. Defaults to 0 if events logged under the provided metric have historically contained a `value` field.

&nbsp;   

\- `unique\_id`

&nbsp;   

&nbsp;   The unique identifier for an event. We recommend using \[uuidv4](https://www.npmjs.com/package/uuidv4) or a similar method to create unique IDs for your events.

&nbsp;   

&nbsp;   > \*\*🚧Use unique ID to avoid event loss\*\*

&nbsp;   > 

&nbsp;   > 

&nbsp;   > If you do not provide a `unique\_id`, multiple events sent at the same time will be assigned the same default `unique\_id` and may be removed as duplicates (see \*Event deduplication behavior\*).

&nbsp;   > 

\- `relationships`

&nbsp;   - `metric`

&nbsp;       

&nbsp;       The metric associated with the event.

&nbsp;       

&nbsp;   - `profile`

&nbsp;       

&nbsp;       The profile associated with the event.

&nbsp;       



\## \*\*Events and metrics\*\*



Each event object is related to a \[metric](https://help.klaviyo.com/hc/en-us/articles/115005076787) object, per the data model above. A metric is what defines an event’s type. Think of a metric as a recipe name and its defined events as the instances in which the recipe was cooked. Each event includes the recipe name (`metric`), the chef (`profile`), the `time` the recipe was cooked, and details like ingredients (`properties`) and, optionally, `value`. When you create a custom event object via API, you’ll need to provide a metric `name` associated with the event, for example, \*Viewed Product\*. If the metric you provide does not match an existing one, a new metric will be created with its own `metric\_id`. The `metric\_id` connects the metric to an event. This ID, along with other fields like `profile\_id,` can be used to query events.



\## \*\*Event properties\*\*



Each event includes a `properties` object, which stores relevant details about the event being tracked. Some use cases of these properties include:



\- \*\*Segmentation\*\*

&nbsp;   

&nbsp;   Non-object property values can be used to build segments, e.g., a segment with customers who have purchased products within the "Skincare" category. See our \[FAQ](https://developers.klaviyo.com/en/docs/custom\_integration\_faqs#how-should-i-structure-my-data-for-segmentation-and-flow-filtering) for more information on how to structure event data for segmentation.

&nbsp;   

\- \*\*Flows\*\*

&nbsp;   

&nbsp;   Use data stored in event properties to personalize flows, e.g., build show/hide conditions in an abandoned cart flow based on a cart's value or items added.

&nbsp;   

\- \*\*Reporting\*\*

&nbsp;   

&nbsp;   Understand trends in reports by key event properties, e.g., create a report that gives performance data on revenue for Placed Order events for a specific product.

&nbsp;   



You may have up to 400 event properties per event. See \*Limitations\* for information.



\### \*\*Excluded property values\*\*



When setting event property values, it's important to know how Klaviyo handles certain inputs. The following values are ignored when used to update event properties:



\- `0` (number data type)

\- `null` or `None`

\- `""` (empty string)



If you assign these values to event properties, Klaviyo treats them as if they were never set, i.e., the properties are excluded and cannot be used for segmentation.



Note that the way Klaviyo handles event properties differs from how it handles profile properties. You may create and segment of off profile properties with a value of `0`.



\## \*\*Create Event\*\*



To create an event, you’ll need at least one \[profile identifier](https://developers.klaviyo.com/en/reference/profiles\_api\_overview#profile-identifiers) (e.g., `id`, `email`, or `phone\_number`) and a metric `name`.



> \*\*🚧Events using test emails are silently dropped\*\*

> 

> 

> Creating an event using an `@example.com` , `@test.com` , or similar email address is accepted by the API and will return a 202. However, please note that events with these email addresses are silently dropped in the background and are stripped from the event pipeline.

> 



Your request payload for \[Create Event](https://developers.klaviyo.com/en/reference/create\_event) should be formatted like the example \*Reset Password\* event below:



Request payload



`{

&nbsp;   "data": {

&nbsp;       "type": "event",

&nbsp;       "attributes": {

&nbsp;           "properties": {

&nbsp;               "action": "Reset Password",

&nbsp;               "PasswordResetLink": "https://www.website.com/reset/1234567890987654321"

&nbsp;           },

&nbsp;           "metric": {

&nbsp;               "data": {

&nbsp;                   "type": "metric",

&nbsp;                   "attributes": {

&nbsp;                       "name": "Reset Password"

&nbsp;                   }

&nbsp;               }

&nbsp;           },

&nbsp;           "profile": {

&nbsp;               "data": {

&nbsp;                   "type": "profile",

&nbsp;                   "attributes": {

&nbsp;                       "email": "sarah.mason@klaviyo-demo.com"

&nbsp;                   }

&nbsp;               }

&nbsp;           },

&nbsp;           "unique\_id": "4b5d3f33-2e21-4c1c-b392-2dae2a74a2ed"

&nbsp;       }

&nbsp;   }

}`



In the example Create Event payload, an `email`, `sarah.mason@klaviyo-demo.com`, and a metric `name`, \*Reset Password\*, are provided to associate the created event with a profile and a metric. The only optional field provided is the `unique\_id` in UUID format for good practice. Once the event has been created, you should see the event logged in the profile’s activity feed in Klaviyo:



!\[A reset password event shown in the metrics activity log](https://files.readme.io/6f2d9e07daaeaa42746b1bd8917f918a24eea971c3d541601fa76c4d8395d554-reset\_pass\_ui.png)



\### \*\*Using optional fields like `time` and `value` in events\*\*



Use optional fields like `time` (for historical events) and/or `value` (e.g., price) to enrich your event data. \*Ordered Product\* events are useful for creating flows based on product-specific information. They can also help with creating more personalized recommendations for your customers. In the example below, an \*Ordered Product\* event is created with the `value` field representing the product’s price:



Request payload



`{

&nbsp; "data": {

&nbsp;   "type": "event",

&nbsp;   "attributes": {

&nbsp;     "properties": {

&nbsp;       "OrderId": "cc50e5b3-059c-4f7d-9e26-821302b63235",

&nbsp;       "ProductID": "1111",

&nbsp;       "SKU": "WINNIEPOOH",

&nbsp;       "ProductName": "Winnie the Pooh",

&nbsp;       "Quantity": 1,

&nbsp;       "ProductURL": "http://www.example.com/path/to/product",

&nbsp;       "value": 9.99,

&nbsp;       "metric": {

&nbsp;           "data": {

&nbsp;           "type": "metric",

&nbsp;           "attributes": {

&nbsp;               "name": "Ordered Product"

&nbsp;           }

&nbsp;       }

&nbsp;     },

&nbsp;     "profile": {

&nbsp;       "data": {

&nbsp;         "type": "profile",

&nbsp;         "id": "01H7FZEVECGN0MNQ8V417TPVP0",

&nbsp;         "attributes": {

&nbsp;           "email": "sarah.mason@klaviyo-demo.com",

&nbsp;           "phone\_number": "+15005550006",

&nbsp;           ...

&nbsp;       }

&nbsp;     },

&nbsp;     "unique\_id": "cc50e5b3-059c-4f7d-9e26-821302b63235"

&nbsp;  }

}`



> \*\*🚧Default behavior for missing `value` field\*\*

> 

> 

> If events associated with a metric have previously been created with a `value` field, future events under the same metric will be created with a default `value` of `0`. Take the \*Ordered Product\* event above, for example, which has a `value` of `9.99`. If another \*Ordered Product\* event is created next, without a `value` field present in its request payload, you can expect its value field to be created and set to 0.

> 



\## \*\*Bulk Create Events\*\*



The \[Bulk Create Events API](https://developers.klaviyo.com/en/reference/bulk\_create\_events) supports creating multiple events for one or more profiles at a time.



A maximum of 1,000 events can be created in a single request, and the max allowed payload size is 5MB.



\### \*\*Bulk create events for a single profile\*\*



The example below is a request to \[Bulk Create Events](https://developers.klaviyo.com/en/reference/bulk\_create\_events) to create 2 events (\*Refunded Order\* and \*Placed Order\*) for a single profile:



Request



`{

&nbsp;   "data": {

&nbsp;       "type": "event-bulk-create-job",

&nbsp;       "attributes": {

&nbsp;           "events-bulk-create": {

&nbsp;               "data": \[

&nbsp;                   {

&nbsp;                       "type": "event-bulk-create",

&nbsp;                       "attributes": {

&nbsp;                           "profile": {

&nbsp;                               "data": {

&nbsp;                                   "type": "profile",

&nbsp;                                   "attributes": {

&nbsp;                                       "email": "bill.joel@klaviyo-demo.com",

&nbsp;                                   }

&nbsp;                               }

&nbsp;                           },

&nbsp;                           "events": {

&nbsp;                               "data": \[

&nbsp;                                   {

&nbsp;                                       "type": "event",

&nbsp;                                       "attributes": {

&nbsp;                                           "properties": {

&nbsp;                                               "Reason": "No longer needed.",

&nbsp;                                               "Brand": "Kids Book",

&nbsp;                                               "Categories": \[

&nbsp;                                                   "Fiction",

&nbsp;                                                   "Children"

&nbsp;                                               ]

&nbsp;                                           },

&nbsp;                                           "time": "2024-05-10T00:00:00+00:00",

&nbsp;                                           "value": 9.99,

&nbsp;                                           "value\_currency": "USD",

&nbsp;                                           "unique\_id": "3e57326a-f0b8-4d4f-98e5-aa56a39842d9",

&nbsp;                                           "metric": {

&nbsp;                                               "data": {

&nbsp;                                                   "type": "metric",

&nbsp;                                                   "attributes": {

&nbsp;                                                       "name": "Refunded Order"

&nbsp;                                                   }

&nbsp;                                               }

&nbsp;                                           }

&nbsp;                                       }

&nbsp;                                   },

&nbsp;                                   {

&nbsp;                                       "type": "event",

&nbsp;                                       "attributes": {

&nbsp;                                           "properties": {

&nbsp;                                               "Brand": "Kids Book",

&nbsp;                                               "Categories": \[

&nbsp;                                                   "Fiction",

&nbsp;                                                   "Children"

&nbsp;                                               ]

&nbsp;                                           },

&nbsp;                                           "time": "2024-05-11T00:00:00+00:00",

&nbsp;                                           "value": 9.99,

&nbsp;                                           "value\_currency": "USD",

&nbsp;                                           "unique\_id": "bd29b5e8-076f-405c-b34c-591794e196e6",

&nbsp;                                           "metric": {

&nbsp;                                               "data": {

&nbsp;                                                   "type": "metric",

&nbsp;                                                   "attributes": {

&nbsp;                                                       "name": "Placed Order"

&nbsp;                                                   }

&nbsp;                                               }

&nbsp;                                           }

&nbsp;                                       }

&nbsp;                                   }

&nbsp;                               ]

&nbsp;                           }

&nbsp;                       }

&nbsp;                   }

&nbsp;               ]

&nbsp;           }

&nbsp;       }

&nbsp;   }

}`



> \*\*📘Keep profile properties up-to-date\*\*

> 

> 

> You can create a new profile or update a profile's properties when creating an event via Events API. For bulk events, it’s important to ensure that any included profile properties are up-to-date.

> 



\### \*\*Bulk create events for multiple profiles\*\*



You can use Bulk Create Events for creating events for multiple profiles at a time. The request payload in the example below creates events for 2 different profiles:



Request



`{

&nbsp;   "data": {

&nbsp;       "type": "event-bulk-create-job",

&nbsp;       "attributes": {

&nbsp;           "events-bulk-create": {

&nbsp;               "data": \[

&nbsp;                   {

&nbsp;                       "type": "event-bulk-create",

&nbsp;                       "attributes": {

&nbsp;                           "profile": {

&nbsp;                               "data": {

&nbsp;                                   "type": "profile",

&nbsp;                                   "attributes": {

&nbsp;                                       "email": "bill.joel@klaviyo-demo.com"

&nbsp;                                   }

&nbsp;                               }

&nbsp;                           },

&nbsp;                           "events": {

&nbsp;                               "data": \[

&nbsp;                                   {

&nbsp;                                       "type": "event",

&nbsp;                                       "attributes": {

&nbsp;                                           "properties": {

&nbsp;                                               "Brand": "Kids Book",

&nbsp;                                               "Categories": \[

&nbsp;                                                   "Fiction",

&nbsp;                                                   "Children"

&nbsp;                                               ]

&nbsp;                                           },

&nbsp;                                           "time": "2023-05-08T00:00:00+00:00",

&nbsp;                                           "value": 9.99,

&nbsp;                                           "value\_currency": "USD",

&nbsp;                                           "unique\_id": "baf5fcf1-8e41-4868-a9b0-3a3c63c805e8",

&nbsp;                                           "metric": {

&nbsp;                                               "data": {

&nbsp;                                                   "type": "metric",

&nbsp;                                                   "attributes": {

&nbsp;                                                       "name": "Placed Order"

&nbsp;                                                   }

&nbsp;                                               }

&nbsp;                                           }

&nbsp;                                       }

&nbsp;                                   }

&nbsp;                               ]

&nbsp;                           }

&nbsp;                       }

&nbsp;                   },

&nbsp;                   {

&nbsp;                       "type": "event-bulk-create",

&nbsp;                       "attributes": {

&nbsp;                           "profile": {

&nbsp;                               "data": {

&nbsp;                                   "type": "profile",

&nbsp;                                   "attributes": {

&nbsp;                                       "phone\_number": "+13105555555"

&nbsp;                                   }

&nbsp;                               }

&nbsp;                           },

&nbsp;                           "events": {

&nbsp;                               "data": \[

&nbsp;                                   {

&nbsp;                                       "type": "event",

&nbsp;                                       "attributes": {

&nbsp;                                           "properties": {

&nbsp;                                               "Brand": "Kids Book",

&nbsp;                                               "Categories": \[

&nbsp;                                                   "Fiction",

&nbsp;                                                   "Children"

&nbsp;                                               ]

&nbsp;                                           },

&nbsp;                                           "time": "2023-05-09T00:00:00+00:00",

&nbsp;                                           "value": 9.99,

&nbsp;                                           "value\_currency": "USD",

&nbsp;                                           "unique\_id": "fc2ac97b-24dc-4c2c-8e8e-232834dd69a8",

&nbsp;                                           "metric": {

&nbsp;                                               "data": {

&nbsp;                                                   "type": "metric",

&nbsp;                                                   "attributes": {

&nbsp;                                                       "name": "Viewed Product"

&nbsp;                                                   }

&nbsp;                                               }

&nbsp;                                           }

&nbsp;                                       }

&nbsp;                                   }

&nbsp;                               ]

&nbsp;                           }

&nbsp;                       }

&nbsp;                   }

&nbsp;               ]

&nbsp;           }

&nbsp;       }

&nbsp;   }

}`



\## \*\*Event deduplication behavior\*\*



The Bulk Create Events API handles deduplication of events. This means that there are cases in which you may receive a `202 Accepted` response upon creating events, but later find that some of your events were considered duplicates and discarded. To ensure that your events are processed successfully, follow the best practices outlined below.



\### \*\*Use a unique ID for each event\*\*



If you attempt to create multiple events for a profile with the same metric and timestamp (either identical `time` values or no `time` specified), only one event will be processed, and the others will be discarded as duplicates.



To ensure that these events are treated as distinct, assign a unique identifier (`unique\_id`) to each event. This ensures that events with the same profile and metric are processed separately.



\### \*\*Include the `time` field for historical events\*\*



When importing historical events, always include the `time` field to specify when the event occurred. If the `time` field is omitted, events with the same profile and metric will be assumed to have occurred at the current time, which may result in some events being discarded as duplicates.



\## \*\*Troubleshooting\*\*



If you're trying to create events via either of the APIs above, and your events are not showing up in Klaviyo, follow the troubleshooting tips below.



\### \*\*Receiving a 400?\*\*



\- Make sure you're using a valid email address that is less than 100 characters. We recommend using \[regex for email validation](https://emailregex.com/index.html).

\- Make sure you're using a valid E.164 phone number. If your request only contains an invalid phone number without a valid email address, it will be rejected. We recommend using a library like \[libphonenumber](https://github.com/google/libphonenumber) to ensure numbers are valid and properly formatted prior to sending.

\- Make sure your payload is in the format indicated by the API’s reference documentation.



\### \*\*Receiving a 202?\*\*



Events are created asynchronously, so it may take up to a few minutes to see them in the UI or returned via the \[Get Events API](https://developers.klaviyo.com/en/reference/get\_events).



If you're still not seeing the events in Klaviyo, you may be sending a payload that:



\- Contains email addresses using an "@example.com" or "@test.com" domain. Such email addresses may be silently dropped by our event pipeline during processing.

\- Provides a non-unique `unique\_id` that will result in duplicates for a given metric and profile.

\- Creates multiple events for a metric and profile at once. \[Duplicates will be ignored](https://developers.klaviyo.com/en/reference/events\_api\_overview#event-deduplication-behavior) if you're not using a `unique\_id`.

\- Contains an incorrect profile identifier. At least one profile identifier is needed to determine which profile triggered the event. Only include known identifiers when creating events.



> \*\*🚧Limit profile identifiers to known values\*\*

> 

> 

> Our API reference documentation lists all supported profile identifiers (`id`, `email`, `phone\_number`, `external\_id`), however, providing every identifier is unnecessary. If you're including a profile ID along with an email and/or phone number, it's possible that the ID is incorrect. To avoid this error, limit your provided identifiers to known values.

> 



\## \*\*Get Event(s)\*\*



When making a \[Get Event](https://developers.klaviyo.com/en/reference/get\_event) or \[Get Events](https://developers.klaviyo.com/en/reference/get\_events) request, here’s an example of how the \*Reset Password\* event object from the example above might look in your response:



RequestResponse



`curl --request GET \\

&nbsp;    --url https://a.klaviyo.com/api/events/ \\

&nbsp;    --header 'Authorization: Klaviyo-API-Key your-private-api-key' \\

&nbsp;    --header 'accept: application/json' \\

&nbsp;    --header 'revision: 2023-10-15'`



Note that there are `id` values for the `profile` and `metric` associated with the event in the `relationships` object. The following example is a call to \[Get Profile](https://developers.klaviyo.com/en/reference/get\_profile) using the profile `id` returned in the response:



RequestResponse



`curl --request GET \\

&nbsp;    --url https://a.klaviyo.com/api/profile/01H7FZEVECGN0MNQ8V417TPVP0/ \\

&nbsp;    --header 'Authorization: Klaviyo-API-Key your-private-api-key' \\

&nbsp;    --header 'accept: application/json' \\

&nbsp;    --header 'revision: 2023-10-15'`



The response contains the profile object with the same identifier used to create the \*Reset Password\* event, `sarah.mason@klaviyo-demo.com`.



The following example is a call to \[Get Metric](https://developers.klaviyo.com/en/reference/get\_metric) with the metric `id` value from the \*Reset Password\* response:



RequestResponse



`curl --request GET \\

&nbsp;    --url https://a.klaviyo.com/api/metrics/WvcZZE/ \\

&nbsp;    --header 'Authorization: Klaviyo-API-Key your-private-api-key' \\

&nbsp;    --header 'accept: application/json' \\

&nbsp;    --header 'revision: 2023-10-15'`



The API-created metric object with the name \*Reset Password\* is returned in the response.



\## \*\*Querying events\*\*



Querying events with the Events API can help you achieve many use cases, such as populating a list with events that match a specific `profile\_id`. Check out the supported query parameters below and \[test them out with our latest Postman collection](https://developers.klaviyo.com/en/docs/use\_klaviyos\_postman\_collections). Note that support for given operators and fields is endpoint-specific. Review the \[API reference documentation](https://developers.klaviyo.com/en/reference/get\_events) for more information on allowed fields and query operators.



| \*\*Parameter\*\* | \*\*Description\*\* | \*\*Query example\*\* |

| --- | --- | --- |

| `filter` | Retrieve a subset of events, e.g., events for a specific `profile\_id` and/or `metric\_id` Learn about the \[filter query parameter](https://developers.klaviyo.com/en/docs/filtering\_). | `GET /api/events?filter=and(equals(profile\_id,"PROFILE\_ID") ,equals(metric\_id,"METRIC\_ID")` |

| `sort` | Sort events, e.g., by `datetime` in ascending order (oldest to newest). Learn about the \[sort query parameter](https://developers.klaviyo.com/en/docs/sorting\_). | `GET /api/events?sort=datetime` |

| `fields` | Request for only specified event data, e.g., timestamp attributes. You can also request for only specified related resource data. Learn more about \[sparse fieldsets](https://developers.klaviyo.com/en/docs/sparse\_fieldsets). | `GET /api/events?fields\[event]=timestampGET /api/events?include=profile\&fields\[profile]=email` |

| `include` | Include related resources in the response, e.g., profile data. Learn about the \[include query parameter](https://developers.klaviyo.com/en/docs/relationships\_#the-include-query-parameter). | `GET /api/events?include=profile` |

| `has` | Request for events that are related to existing profiles. This is useful for filtering out events that do not have any existing profile data (i.e., deleted profiles). | `GET /api/events?filter=has(profile)` |



\### \*\*Query example\*\*



To filter events by profile ID `profile\_id`, you can first use a \[Get Profiles](https://developers.klaviyo.com/en/reference/get\_profiles) query to obtain a profile’s `id` by email or phone number, like this call to \[Get Events](https://developers.klaviyo.com/en/reference/get\_events):



`GET /api/events?filter=equals(email,"sarah.mason@klaviyo-demo.com")`



The following example is a request to \[Get Events](https://developers.klaviyo.com/en/reference/get\_events) and uses the `id` value obtained from the \[Get Profiles](https://developers.klaviyo.com/en/reference/get\_profiles) query above as the `profile\_id` to filter events:



RequestResponse



`curl --request GET \\

&nbsp;    --url https://a.klaviyo.com/api/events/?filter=equals(profile\_id,"01H7FZEVECGN0MNQ8V417TPVP0") \\

&nbsp;    --header 'Authorization: Klaviyo-API-Key your-private-api-key' \\

&nbsp;    --header 'accept: application/json' \\

&nbsp;    --header 'revision: 2023-10-15'`



\## \*\*Limitations\*\*



A set limit is allotted for each unique data identifier or digested piece of information. In most instances, if you reach the maximum data limit for a set category, the overflow information will not be processed and messages will be rejected. The following table provides the data limits for each event so you can ensure successful delivery and storage.



| \*\*Limitation type\*\* | \*\*Description\*\* | \*\*Limit\*\* |

| --- | --- | --- |

| Max payload size (includes `$extra`) | Applies to custom event data; excludes profile data | 5 MB decompressed |

| Max number of event properties per event | The number of pieces of data within an event | 400 |

| Max string size | Any string value | 100 KB |

| Max number of items in arrays | Event data in a list format, see \[understanding data types](https://help.klaviyo.com/hc/en-us/articles/115005237648) | 4000 |

| Max levels of nested objects | Any combination of objects and arrays within event properties; currently only applies to objects | 10 |

| Timestamp of events | The time an event occurred; learn more about \[acceptable date and timestamp formats for profile and event properties](https://developers.klaviyo.com/en/docs/acceptable\_date\_and\_timestamp\_formats\_for\_profile\_and\_event\_properties) | Between 2000 and “now”+1 year (e.g., max 2026, minimum 2000) |

| Field length for `$event\_id` (`unique\_id`) | Allowed characters for the unique identifier of an event | 1-255 characters |

| Max integers | Applies anywhere there's an integer | 64 bits (-9,223,372,036,854,775,808 \& +9,223,372,036,854,775,807) |

| Max size of an event's profile object | Profile objects created or updated via Events API | 95 KB |

