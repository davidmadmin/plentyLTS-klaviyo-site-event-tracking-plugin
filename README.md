# Klaviyo Site Event Tracking Plugin (PlentyLTS)

This repository currently contains a **basic scaffold** for a Plenty plugin that will later enable Klaviyo on-site event tracking via the Klaviyo JavaScript API.

## Current scope

- Plugin definition and namespace setup
- One plugin config setting (`tracking.integrationMode`) as select option:
  - `gtm` (Klaviyo JS handled through Google Tag Manager)
  - `plugin` (Klaviyo JS provided by this plugin)
- Placeholder data provider + template container integration point
- Placeholder storefront script entrypoint for later tracking logic

## Next steps (later)

- Add real script loading strategy depending on integration mode
- Implement event mapping from storefront interactions to Klaviyo API calls
- Add consent handling and robust error logging
