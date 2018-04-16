/* global instantsearch */

app({
  appId: 'G9HWOSPASU',
  apiKey: '993d94d6a60d020e105d15d176b29824',
  indexName: 'AND',
});

function app(opts) {
  const search = instantsearch({
    appId: opts.appId,
    apiKey: opts.apiKey,
    indexName: opts.indexName,
    urlSync: true,
  });

  search.addWidget(
    instantsearch.widgets.searchBox({
      container: '#search-input',
      placeholder: 'Search for events',
    })
  );

  search.addWidget(
    instantsearch.widgets.hits({
      container: '#hits',
      hitsPerPage: 10,
      templates: {
        item: getTemplate('hit'),
        empty: getTemplate('no-results'),
      },
    })
  );

  search.addWidget(
    instantsearch.widgets.stats({
      container: '#stats',
    })
  );

  search.addWidget(
    instantsearch.widgets.sortBySelector({
      container: '#sort-by',
      autoHideContainer: true,
      indices: [{
        name: opts.indexName, label: 'Most relevant',
      }, {
        name: `${opts.indexName}_price_asc`, label: 'Lowest price',
      }, {
        name: `${opts.indexName}_price_desc`, label: 'Highest price',
      }],
    })
  );

  search.addWidget(
    instantsearch.widgets.pagination({
      container: '#pagination',
      scrollTo: '#search-input',
    })
  );

  search.addWidget(
    instantsearch.widgets.refinementList({
      container: '#name',
      attributeName: 'name',
      sortBy: ['isRefined', 'count:desc', 'name:asc'],
      limit: 10,
      operator: 'and',
      templates: {
        header: getHeader('Name'),
      },
    })
  );

  search.addWidget(
    instantsearch.widgets.refinementList({
      container: '#country',
      attributeName: 'country',
      sortBy: ['isRefined', 'count:desc', 'name:asc'],
      limit: 10,
      operator: 'or',
      templates: {
        header: getHeader('Country'),
      },
    })
  );

  search.addWidget(
    instantsearch.widgets.refinementList({
      container: '#city',
      attributeName: 'city',
      sortBy: ['isRefined', 'count:desc', 'name:asc'],
      limit: 10,
      operator: 'or',
      templates: {
        header: getHeader('City'),
      },
    })
  );

  search.addWidget(
    instantsearch.widgets.refinementList({
      container: '#state',
      attributeName: 'state',
      sortBy: ['isRefined', 'count:desc', 'name:asc'],
      limit: 10,
      operator: 'or',
      searchForFacetValues: {
        placeholder: 'Search for states',
        templates: {
          noResults: '<div class="sffv_no-results">No matching states.</div>',
        },
      },
      templates: {
        header: getHeader('State'),
      },
    })
  );

  search.addWidget(
    instantsearch.widgets.rangeSlider({
      container: '#postcode',
      attributeName: 'postcode',
      templates: {
        header: getHeader('Postcode'),
      },
    })
  );



  search.start();
}

function getTemplate(templateName) {
  return document.querySelector(`#${templateName}-template`).innerHTML;
}

function getHeader(title) {
  return `<h5>${title}</h5>`;
}
