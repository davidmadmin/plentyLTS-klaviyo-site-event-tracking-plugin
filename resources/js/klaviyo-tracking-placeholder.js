(function () {
  const integrationMode = window.KlaviyoSiteEventTracking?.integrationMode || "plugin";

  // Placeholder only: full Klaviyo JS integration + event tracking will be implemented later.
  if (integrationMode === "gtm") {
    return;
  }

  // Future implementation hook for plugin-provided Klaviyo bootstrap and event dispatching.
})();
