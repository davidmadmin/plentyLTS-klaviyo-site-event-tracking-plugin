<?php

namespace KlaviyoSiteEventTracking\Containers;

use Plenty\Plugin\Templates\Twig;

class KlaviyoTrackingContainer
{
    public function call(Twig $twig): string
    {
        return $twig->render('KlaviyoSiteEventTracking::content.KlaviyoTracking');
    }
}
