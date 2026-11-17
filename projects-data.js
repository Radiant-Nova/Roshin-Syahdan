/* ==========================================================================
   PROJECTS DATA  -  edit this file to add / change projects.
   Nothing else needs to be touched: cards, filter chips and the gallery
   lightbox are all generated from the list below (see projects.js).

   TO ADD A NEW MAP (or any project), copy one object and fill it in:

   {
     id: 'my-new-map',                 // unique, no spaces
     title: 'Title of the map',
     subtitle: 'Place / study area',   // small line above the title (optional)
     category: 'maps',                 // key from CATEGORIES below
     featured: false,                  // true = wide hero card on its own row
     description: 'One to three sentences.',
     tags: ['QGIS', 'Python'],
     cover: 'assets/thumbs/my-map.jpg',// card image (use a small ~1000px JPG/WebP)
     fit: 'cover',                     // 'cover' (fills the card) or 'contain' (logos, icons)
     highlights: [                     // big numbers on the hero card (optional, featured only)
       { value: '3', label: 'scenarios' }
     ],
     gallery: [                        // images shown in the lightbox (optional)
       { label: 'Short tab name',
         src: 'assets/my-map.png',     // full-size image
         thumb: 'assets/thumbs/my-map.jpg',  // small preview (optional)
         caption: 'Sentence shown under the title when this image is open.',
         facts: [ { label: 'Area', value: '1,827 ha' } ] }   // optional
     ],
     links: [                          // buttons on the card (optional)
       { label: 'Live site', href: 'https://...' }
     ]
   }

   Tip: shrink big PNGs to small JPG thumbnails for the cards, keep the
   full-size PNG only in `gallery[].src`, so the page stays fast.
   ========================================================================== */

// Order here = order of the filter chips.
const CATEGORIES = {
    maps: 'Maps',
    modeling: 'Modeling',
    conservation: 'Conservation',
    tools: 'Tools',
    web: 'Web'
};

const PROJECTS = [
    {
        id: 'pekalongan-rob-ssp',
        title: 'Tidal Flood (Rob) Inundation under SSP Climate Scenarios',
        subtitle: 'Pekalongan Regency, Central Java',
        category: 'maps',
        featured: true,
        description: 'Coastal tidal-flood (rob) inundation maps for Pekalongan Regency under three SSP emission ' +
            'scenarios. Flood-depth rasters are classed and draped over a DEM hillshade, with district boundaries, ' +
            'a locator inset and per-district area statistics, plus a side-by-side comparison layout. ' +
            'Most of the inundation falls in Wonokerto, Siwalan and Tirto.',
        tags: ['GIS', 'Python', 'Coastal hazard', 'SSP scenarios', 'Climate risk'],
        cover: 'assets/thumbs/peta_rob_gabungan_cover.jpg',
        fit: 'cover',
        highlights: [
            { value: '3', label: 'SSP scenarios' },
            { value: '≈1,820 ha', label: 'inundated' },
            { value: '5.1 m', label: 'max depth' }
        ],
        gallery: [
            {
                label: 'All scenarios',
                src: 'assets/peta_rob_gabungan_SSP.png',
                thumb: 'assets/thumbs/peta_rob_gabungan_SSP.jpg',
                caption: 'SSP1-2.6, SSP2-4.5 and SSP5-8.5 side by side. Inundated area differs by less than 1% ' +
                    'between the scenarios.',
                facts: [
                    { label: 'Inundated area', value: '1,814–1,827 ha' },
                    { label: 'Most affected', value: 'Wonokerto' },
                    { label: 'Depth classes', value: '6 (<0.5 to >2.5 m)' }
                ]
            },
            {
                label: 'SSP1-2.6',
                src: 'assets/peta_rob_SSP_1_26.png',
                thumb: 'assets/thumbs/peta_rob_SSP_1_26.jpg',
                caption: 'Low-emissions pathway.',
                facts: [
                    { label: 'Inundated area', value: '1,814 ha' },
                    { label: 'Mean / max depth', value: '1.57 m / 5.1 m' },
                    { label: 'Wonokerto', value: '1,068 ha' }
                ]
            },
            {
                label: 'SSP2-4.5',
                src: 'assets/peta_rob_SSP_2_45.png',
                thumb: 'assets/thumbs/peta_rob_SSP_2_45.jpg',
                caption: 'Intermediate-emissions pathway.',
                facts: [
                    { label: 'Inundated area', value: '1,819 ha' },
                    { label: 'Mean / max depth', value: '1.57 m / 5.1 m' },
                    { label: 'Wonokerto', value: '1,070 ha' }
                ]
            },
            {
                label: 'SSP5-8.5',
                src: 'assets/peta_rob_SSP_5_85.png',
                thumb: 'assets/thumbs/peta_rob_SSP_5_85.jpg',
                caption: 'Very-high-emissions pathway.',
                facts: [
                    { label: 'Inundated area', value: '1,827 ha' },
                    { label: 'Mean / max depth', value: '1.59 m / 5.1 m' },
                    { label: 'Wonokerto', value: '1,073 ha' }
                ]
            }
        ]
    },
    {
        id: 'shark-bycatch',
        title: 'Shark Bycatch Management in Demersal Fisheries',
        subtitle: 'Fisheries & conservation',
        category: 'conservation',
        description: 'Shark bycatch management in demersal fisheries, with field observations and bycatch ' +
            'risk maps.',
        tags: ['Bycatch', 'Sharks', 'GIS'],
        cover: 'assets/bycatch3.png',
        fit: 'contain',
        gallery: [
            { label: 'Overview', src: 'assets/bycatch3.png', caption: 'Fieldwork and bycatch risk maps.' }
        ]
    },
    {
        id: 'triaenodon-xgboost',
        title: 'Triaenodon obesus XGBoost Distribution Modelling',
        subtitle: 'Species distribution model',
        category: 'modeling',
        description: 'Species distribution model for the whitetip reef shark built with XGBoost, using SST, ' +
            'salinity and bathymetry. SHAP values show how each variable drives the predicted habitat suitability.',
        tags: ['Python', 'XGBoost', 'SHAP', 'SDM'],
        cover: 'assets/xgboost.png',
        fit: 'contain',
        gallery: [
            {
                label: 'Model outputs',
                src: 'assets/xgboost.png',
                caption: 'SHAP feature impact, response curves, feature importance and the habitat suitability map.'
            }
        ]
    },
    {
        id: 'extent-matcher',
        title: 'QGIS Plugin: Extent Matcher',
        subtitle: 'Open-source tool',
        category: 'tools',
        description: 'A QGIS plugin published on the official QGIS plugin repository.',
        tags: ['QGIS', 'Python', 'Plugin'],
        cover: 'assets/extentmatcher.png',
        fit: 'contain',
        links: [{ label: 'View plugin', href: 'https://plugins.qgis.org/plugins/extent_matcher/' }]
    },
    {
        id: 'plastic-free-markets',
        title: 'Plastic Free Markets Establishment in Banjarmasin',
        subtitle: 'Community & conservation',
        category: 'conservation',
        description: 'Establishing plastic-free markets in Banjarmasin.',
        tags: ['Plastic pollution', 'Community'],
        cover: 'assets/gidkp.webp',
        fit: 'cover',
        links: [{ label: 'Read more', href: 'https://plasticdiet.id/pasar-bebas-plastik-banjarmasin/' }]
    },
    {
        id: 'portfolio-site',
        title: 'Portfolio',
        subtitle: 'Personal website',
        category: 'web',
        description: 'Personal portfolio website.',
        tags: ['HTML', 'CSS', 'JavaScript'],
        cover: 'assets/portfolio.png',
        fit: 'contain',
        links: [{ label: 'Visit site', href: 'https://radiant-nova.github.io/Roshin-Syahdan/' }]
    },
    {
        id: 'kaydent',
        title: 'Kaydent Dental Care Website',
        subtitle: 'Client website',
        category: 'web',
        description: 'Website for a dental clinic in Palangka Raya.',
        tags: ['HTML', 'CSS', 'JavaScript'],
        cover: 'assets/kaydent.png',
        fit: 'contain',
        links: [{ label: 'Visit site', href: 'https://radiant-nova.github.io/kaydentfix/' }]
    }
];
