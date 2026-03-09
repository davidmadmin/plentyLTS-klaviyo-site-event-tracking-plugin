\### \*\*Klaviyo's data model\*\*Learn about Klaviyo's data model, including Metrics, Profiles, Catalogs, and Feeds objects.



> \*\*📘\*\*

> 

> 

> Learn about Klaviyo's data model and how to map your data into Klaviyo with our official \[Map your data into Klaviyo](https://academy.klaviyo.com/map-your-data-into-klaviyo) course.

> 



\## \*\*Primary data objects\*\*



When syncing data to Klaviyo, it helps to have an understanding of our underlying data model. Klaviyo considers the following objects to be primary data types, since Klaviyo is designed to natively handle these forms of data. This is a non-exhaustive list of data types in Klaviyo:



\- \*\*Profiles\*\*

\- \*\*Metrics and Events\*\*

\- \*\*Catalogs\*\*

\- \*\*Web feeds\*\*



Klaviyo’s Event and Profile APIs feed directly into the Events and Profiles objects, respectively.



Catalogs are supported through native integrations (Shopify, WooCommerce, Magento, SFCC, etc.), our Catalogs API, or via a JSON feed.



Web feeds are supported either through a JSON or XML endpoint.



The table below provides more detail on supported data types.



| \*\*Data object\*\* | \*\*Description\*\* | \*\*Resources\*\* |

| --- | --- | --- |

| Profiles | Profiles represent people, using either an email (`email`) or a specified customer ID (`id`) as a primary identifier. Klaviyo supports custom profile properties with the following data types: strings, integers, floats, dates, booleans, arrays/lists, or JSON. | • \[Profiles](https://help.klaviyo.com/hc/en-us/sections/14508656438555) (Help Center articles)

• \[Profiles API overview](https://developers.klaviyo.com/en/reference/profiles\_api\_overview) |

| Metrics and Events | Events are the actions undertaken by Profiles represented as timestamped records with JSON-formatted payloads. Metrics are the groupings for Events of the same name. An Event contains a quantity of attribute-value pairs and arrays, optionally including a nesting structure.The Event object is extremely versatile, since it can be used to record any type of timestamped action whether originating client-side (such as \*Viewed Product\* or \*Added to Cart\*) or server-side (such as \*Placed Order\*) and can include associated information. | • \[Klaviyo onsite tracking](https://developers.klaviyo.com/en/docs/javascript\_api) (JavaScript API guide)

• \[Sample ecommerce events](https://developers.klaviyo.com/en/docs/guide\_to\_integrating\_a\_platform\_without\_a\_pre\_built\_klaviyo\_integration) (Integration guide)

• \[Events API overview](https://developers.klaviyo.com/en/reference/events\_api\_overview)

• \[Metrics API overview](https://developers.klaviyo.com/en/reference/metrics\_api\_overview) |

| Catalogs and Web feeds | Catalogs are used to represent products (or product-like records, such as physical stores) that can be referenced in message templates.Catalog items can be synced automatically via a native integration, via a JSON web feed, or via our Catalogs API. | • \[Sync a custom catalog feed to Klaviyo](https://developers.klaviyo.com/en/docs/guide\_to\_syncing\_a\_custom\_catalog\_feed\_to\_klaviyo) (Developer guide)

• \[Catalogs API](https://developers.klaviyo.com/en/reference/get\_catalog\_items) (API reference) |



\## \*\*Other data objects\*\*



Klaviyo has other supported data objects such as Lists and Campaigns. These data objects can be created in the Klaviyo app, or utilized programmatically via API.



| \*\*Data object\*\* | \*\*Description\*\* | \*\*Resources\*\* |

| --- | --- | --- |

| Lists and Segments | Klaviyo allows you to organize profiles into static lists and dynamic segments.Profiles may optionally be assigned membership of multiple lists (or no lists) and may be added to lists automatically by filling out a form, programmatically via API, or manually by CSV upload.Profiles will be programmatically added or removed from segments as they meet or fail to meet the segment criteria. | • \[Lists API](https://developers.klaviyo.com/en/reference/get\_lists) (API reference)

• \[Segments API overview](https://developers.klaviyo.com/en/reference/segments\_api\_overview) |

| Campaigns | Klaviyo allows you to create and execute messaging campaigns that are sent to a target audience defined as a list or segment. Campaigns are can be created in the UI or via API. | • \[Campaigns API overview](https://developers.klaviyo.com/en/reference/campaigns\_api\_overview) |

| Templates | The content and design of a messaging campaign is stored in a template. Templates can contain HTML, CSS, and dynamic tags or logic that utilize Django syntax. | • \[Templates API](https://developers.klaviyo.com/en/reference/get\_templates) (API reference)

• \[Django tags \& templating](https://developers.klaviyo.com/en/docs/django\_message\_design) (Developer guide) |

