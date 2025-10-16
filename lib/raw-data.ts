// @ts-nocheck
// This file is responsible for dynamically and safely loading all project JSON data.
// It's designed to be resilient to missing or malformed files, ensuring the app runs
// even if some data is incomplete.

const projectManifest = [
  // DAMAC
  { url: '/data/damac/damac-bay-by-cavalli/damac-bay-by-cavalli.json', dev: 'damac', slug: 'damac-bay-by-cavalli' },
  { url: '/data/damac/damac-bay-2-by-cavalli/damac-bay-2-by-cavalli.json', dev: 'damac', slug: 'damac-bay-2-by-cavalli' },
  { url: '/data/damac/canal-crown/canal-crown.json', dev: 'damac', slug: 'canal-crown' },
  { url: '/data/damac/canal-heights/canal-heights.json', dev: 'damac', slug: 'canal-heights' },
  { url: '/data/damac/cavalli-tower/cavalli-tower.json', dev: 'damac', slug: 'cavalli-tower' },
  { url: '/data/damac/chelsea-residences/chelsea-residences.json', dev: 'damac', slug: 'chelsea-residences' },
  { url: '/data/damac/couture-by-cavalli/couture-by-cavalli.json', dev: 'damac', slug: 'couture-by-cavalli' },
  { url: '/data/damac/damac-district/damac-district.json', dev: 'damac', slug: 'damac-district' },
  { url: '/data/damac/damac-islands/damac-islands.json', dev: 'damac', slug: 'damac-islands' },
  { url: '/data/damac/damac-majestine/damac-majestine.json', dev: 'damac', slug: 'damac-majestine' },
  { url: '/data/damac/damac-sun-city/damac-sun-city.json', dev: 'damac', slug: 'damac-sun-city' },
  { url: '/data/damac/damac-towers-by-paramount-hotels-and-resorts-dubai/damac-towers-by-paramount-hotels-and-resorts-dubai.json', dev: 'damac', slug: 'damac-towers-by-paramount-hotels-and-resorts-dubai' },
  { url: '/data/damac/elo/elo.json', dev: 'damac', slug: 'elo' },
  { url: '/data/damac/evergreens/evergreens.json', dev: 'damac', slug: 'evergreens' },
  { url: '/data/damac/ghalia/ghalia.json', dev: 'damac', slug: 'ghalia' },
  { url: '/data/damac/golf-town-at-damac-hills/golf-town-at-damac-hills.json', dev: 'damac', slug: 'golf-town-at-damac-hills' },
  { url: '/data/damac/green-park/green-park.json', dev: 'damac', slug: 'green-park' },
  { url: '/data/damac/harbour-lights-de-grisogono-geneve/harbour-lights-de-grisogono-geneve.json', dev: 'damac', slug: 'harbour-lights-de-grisogono-geneve' },
  { url: '/data/damac/kiara-at-damac-hills/kiara-at-damac-hills.json', dev: 'damac', slug: 'kiara-at-damac-hills' },
  { url: '/data/damac/park-town-at-damac-hills/park-town-at-damac-hills.json', dev: 'damac', slug: 'park-town-at-damac-hills' },
  { url: '/data/damac/damac-riverside-views/damac-riverside-views.json', dev: 'damac', slug: 'damac-riverside-views' },
  { url: '/data/damac/safa-gate/safa-gate.json', dev: 'damac', slug: 'safa-gate' },
  { url: '/data/damac/safa-one-de-grisogono/safa-one-de-grisogono.json', dev: 'damac', slug: 'safa-one-de-grisogono' },
  { url: '/data/damac/safa-two-de-grisogono/safa-two-de-grisogono.json', dev: 'damac', slug: 'safa-two-de-grisogono' },
  { url: '/data/damac/volta/volta.json', dev: 'damac', slug: 'volta' },

  // EMAAR
  { url: '/data/emaar/address-residences-zabeel/address-residences-zabeel.json', dev: 'emaar', slug: 'address-residences-zabeel' },
  { url: '/data/emaar/altan/altan.json', dev: 'emaar', slug: 'altan' },
  { url: '/data/emaar/altus/altus.json', dev: 'emaar', slug: 'altus' },
  { url: '/data/emaar/arabian-ranches-iii/arabian-ranches-iii.json', dev: 'emaar', slug: 'arabian-ranches-iii' },
  { url: '/data/emaar/baystar/baystar.json', dev: 'emaar', slug: 'baystar' },
  { url: '/data/emaar/chevalia-fields/chevalia-fields.json', dev: 'emaar', slug: 'chevalia-fields' },
  { url: '/data/emaar/clearpoint/clearpoint.json', dev: 'emaar', slug: 'clearpoint' },
  { url: '/data/emaar/club-place-at-dubai-hills-estate/club-place-at-dubai-hills-estate.json', dev: 'emaar', slug: 'club-place-at-dubai-hills-estate' },
  { url: '/data/emaar/dubai-hills-estate/dubai-hills-estate.json', dev: 'emaar', slug: 'dubai-hills-estate' },
  { url: '/data/emaar/fairway-villas/fairway-villas.json', dev: 'emaar', slug: 'fairway-villas' },
  { url: '/data/emaar/golf-hillside-at-dubai-hills-estate/golf-hillside-at-dubai-hills-estate.json', dev: 'emaar', slug: 'golf-hillside-at-dubai-hills-estate' },
  { url: '/data/emaar/golf-point/golf-point.json', dev: 'emaar', slug: 'golf-point' },
  { url: '/data/emaar/hillsedge-at-dubai-hills-estate/hillsedge-at-dubai-hills-estate.json', dev: 'emaar', slug: 'hillsedge-at-dubai-hills-estate' },
  { url: '/data/emaar/marina-cove/marina-cove.json', dev: 'emaar', slug: 'marina-cove' },
  { url: '/data/emaar/marina-views/marina-views.json', dev: 'emaar', slug: 'marina-views' },
  { url: '/data/emaar/montura/montura.json', dev: 'emaar', slug: 'montura' },
  { url: '/data/emaar/ocean-cove/ocean-cove.json', dev: 'emaar', slug: 'ocean-cove' },
  { url: '/data/emaar/ocean-star/ocean-star.json', dev: 'emaar', slug: 'ocean-star' },
  { url: '/data/emaar/park-gate-2-at-dubai-hills-estate/park-gate-2-at-dubai-hills-estate.json', dev: 'emaar', slug: 'park-gate-2-at-dubai-hills-estate' },
  { url: '/data/emaar/parkland-at-dubai-hills-estate/parkland.json', dev: 'emaar', slug: 'parkland-at-dubai-hills-estate' },
  { url: '/data/emaar/parkside-views/parkside-views.json', dev: 'emaar', slug: 'parkside-views' },
  { url: '/data/emaar/parkwood-at-dubai-hills-estate/parkwood-at-dubai-hills-estate.json', dev: 'emaar', slug: 'parkwood-at-dubai-hills-estate' },
  { url: '/data/emaar/pier-point/pier-point.json', dev: 'emaar', slug: 'pier-point' },
  { url: '/data/emaar/rosehill-dubai-hills-estate/rosehill-dubai-hills-estate.json', dev: 'emaar', slug: 'rosehill-dubai-hills-estate' },
  { url: '/data/emaar/savanna/savanna.json', dev: 'emaar', slug: 'savanna' },
  { url: '/data/emaar/seascape/seascape.json', dev: 'emaar', slug: 'seascape' },
  { url: '/data/emaar/selvara/selvara.json', dev: 'emaar', slug: 'selvara' },
  { url: '/data/emaar/silva/silva.json', dev: 'emaar', slug: 'silva' },
  { url: '/data/emaar/terra-heights/terra-heights.json', dev: 'emaar', slug: 'terra-heights' },
  { url: '/data/emaar/the-heights-country-club/the-heights-country-club.json', dev: 'emaar', slug: 'the-heights-country-club' },
  { url: '/data/emaar/velora-2-at-the-valley-phase-2/velora-2-at-the-valley-phase-2.json', dev: 'emaar', slug: 'velora-2-at-the-valley-phase-2' },
  { url: '/data/emaar/vida-residences-club-point-at-dubai-hills-estate/vida-residences-club-point-at-dubai-hills-estate.json', dev: 'emaar', slug: 'vida-residences-club-point-at-dubai-hills-estate' },

  // NAKHEEL
  { url: '/data/nakheel/baygrove-residences/baygrove-residences.json', dev: 'nakheel', slug: 'baygrove-residences' },
  { url: '/data/nakheel/bay-villas/bay-villas.json', dev: 'nakheel', slug: 'bay-villas' },
  { url: '/data/nakheel/club-vista-mare/club-vista-mare.json', dev: 'nakheel', slug: 'club-vista-mare' },
  { url: '/data/nakheel/como-residences/como-residences.json', dev: 'nakheel', slug: 'como-residences' },
  { url: '/data/nakheel/district-11-opal-gardens/district-11-opal-gardens.json', dev: 'nakheel', slug: 'district-11-opal-gardens' },
  { url: '/data/nakheel/district-one-west/district-one-west.json', dev: 'nakheel', slug: 'district-one-west' },
  { url: '/data/nakheel/jebel-ali-village/jebel-ali-village.json', dev: 'nakheel', slug: 'jebel-ali-village' },
  { url: '/data/nakheel/jumeirah-islands/jumeirah-islands.json', dev: 'nakheel', slug: 'jumeirah-islands' },
  { url: '/data/nakheel/lagoon-views/lagoon-views.json', dev: 'nakheel', slug: 'lagoon-views' },
  { url: '/data/nakheel/marina-residences/marina-residences.json', dev: 'nakheel', slug: 'marina-residences' },
  { url: '/data/nakheel/masakin-al-furjan/masakin-al-furjan.json', dev: 'nakheel', slug: 'masakin-al-furjan' },
  { url: '/data/nakheel/naya-at-district-one/naya-at-district-one.json', dev: 'nakheel', slug: 'naya-at-district-one' },
  { url: '/data/nakheel/palm-beach-towers/palm-beach-towers.json', dev: 'nakheel', slug: 'palm-beach-towers' },
  { url: '/data/nakheel/palm-views/palm-views.json', dev: 'nakheel', slug: 'palm-views' },
  { url: '/data/nakheel/palma-residences/palma-residences.json', dev: 'nakheel', slug: 'palma-residences' },
  { url: '/data/nakheel/rixos-dubai-islands-hotel-residences/rixos-dubai-islands-hotel-residences.json', dev: 'nakheel', slug: 'rixos-dubai-islands-hotel-residences' },
  { url: '/data/nakheel/veneto/veneto.json', dev: 'nakheel', slug: 'veneto' },

  // SOBHA
  { url: '/data/sobha/310-riverside-crescent/310-riverside-crescent.json', dev: 'sobha', slug: '310-riverside-crescent' },
  { url: '/data/sobha/320-riverside-crescent/320-riverside-crescent.json', dev: 'sobha', slug: '320-riverside-crescent' },
  { url: '/data/sobha/330-riverside-crescent/330-riverside-crescent.json', dev: 'sobha', slug: '330-riverside-crescent' },
  { url: '/data/sobha/340-riverside-crescent/340-riverside-crescent.json', dev: 'sobha', slug: '340-riverside-crescent' },
  { url: '/data/sobha/350-riverside-crescent/350-riverside-crescent.json', dev: 'sobha', slug: '350-riverside-crescent' },
  { url: '/data/sobha/360-riverside-crescent/360-riverside-crescent.json', dev: 'sobha', slug: '360-riverside-crescent' },
  { url: '/data/sobha/creek-vistas-grande/creek-vistas-grande.json', dev: 'sobha', slug: 'creek-vistas-grande' },
  { url: '/data/sobha/creek-vistas-reserve/creek-vistas-reserve.json', dev: 'sobha', slug: 'creek-vistas-reserve' },
  { url: '/data/sobha/crest-grande/crest-grande.json', dev: 'sobha', slug: 'crest-grande' },
  { url: '/data/sobha/golf-ridges-at-sobha-one/golf-ridges-at-sobha-one.json', dev: 'sobha', slug: 'golf-ridges-at-sobha-one' },
  { url: '/data/sobha/sobha-hartland-2/sobha-hartland-2.json', dev: 'sobha', slug: 'sobha-hartland-2' },
  { url: '/data/sobha/sobha-hartland-greens/sobha-hartland-greens.json', dev: 'sobha', slug: 'sobha-hartland-greens' },
  { url: '/data/sobha/sobha-hartland/sobha-hartland.json', dev: 'sobha', slug: 'sobha-hartland' },
  { url: '/data/sobha/one-park-avenue/one-park-avenue.json', dev: 'sobha', slug: 'one-park-avenue' },
  { url: '/data/sobha/sobha-reserve/sobha-reserve.json', dev: 'sobha', slug: 'sobha-reserve' },
  { url: '/data/sobha/seahaven/seahaven.json', dev: 'sobha', slug: 'seahaven' },
  { url: '/data/sobha/skyscape-aura/skyscape-aura.json', dev: 'sobha', slug: 'skyscape-aura' },
  { url: '/data/sobha/skyscape-avenue/skyscape-avenue.json', dev: 'sobha', slug: 'skyscape-avenue' },
  { url: '/data/sobha/skyvue-stellar/skyvue-stellar.json', dev: 'sobha', slug: 'skyvue-stellar' },
  { url: '/data/sobha/the-crest/the-crest.json', dev: 'sobha', slug: 'the-crest' },
  { url: '/data/sobha/the-s/the-s.json', dev: 'sobha', slug: 'the-s' },
  { url: '/data/sobha/verde/verde.json', dev: 'sobha', slug: 'verde' },
  { url: '/data/sobha/waves-grande/waves-grande.json', dev: 'sobha', slug: 'waves-grande' },
  { url: '/data/sobha/waves-opulence/waves-opulence.json', dev: 'sobha', slug: 'waves-opulence' },
  { url: '/data/sobha/sobha-waves/sobha-waves.json', dev: 'sobha', slug: 'sobha-waves' },
];

interface RawProjectData {
  data: any;
  dev: string;
  slug: string;
}

export async function fetchAllRawData(): Promise<RawProjectData[]> {
  const promises = projectManifest.map(async ({ url, dev, slug }) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${url} with status ${response.status}`);
      }
      const data = await response.json();
      return { data, dev, slug };
    } catch (error) {
      console.warn(`⚠️ Could not load project data from: ${url}. Skipping.`);
      return null;
    }
  });

  const results = await Promise.allSettled(promises);
  
  const successfulResults = results
    .filter(result => result.status === 'fulfilled' && result.value !== null)
    .map(result => (result as PromiseFulfilledResult<RawProjectData>).value);

  return successfulResults;
}